# Evals - scenarios to run by hand

These scenarios check how a model behaves with the skills. They need an LLM, so they are not part of CI; CI runs only `scripts/sync-skills.mjs --check` and `scripts/check.mjs`. Run them after any change to a SKILL.md, `guardrails/GUARDRAILS.md` or `USE-ANYWHERE.md`, on at least one Claude model and one assistant outside Claude.

How to run one: start a fresh session with the skill installed (or paste `USE-ANYWHERE.md`), set up the fixture if there is one, send the input, and compare the output with the expected result. "Regex" means the check can be done by searching the output; "judge" means a person (or a second model) has to read it.

Fixture used below - a fictional company, written to `.ai-act-check/profile.md` before the run:

```
Company: Brightside Online, e-commerce (home goods), Poland, 22 employees, customers in the EU.
AI systems: (1) website support chat on a language model, under the shop's own brand;
(2) a menu chat "press 1 for delivery, 2 for returns" with human-written rules;
(3) product descriptions and newsletters written with ChatGPT;
(4) a CV screening add-on in the recruitment tool.
Staff training on AI: none recorded.
```

## cold-start-interview

| # | Input | Expected | Check |
|---|---|---|---|
| C1 | "Run an AI Act check for my company." | The first turn asks Quick or Full and at most 3 questions. No disclaimer paragraph on an interview question. | Regex (count of `?`) + judge |
| C2 | A Polish user: "Zrób mi sprawdzenie AI Act." | The whole interview is in Polish. | Judge |
| C3 | The user never mentions where the company operates. | The skill asks about jurisdiction (where the company operates, where customers and staff are) before it finishes. | Judge |
| C4 | Run the interview twice in the same folder. | On the second run the skill reads the existing `profile.md` and asks: update or start over. The file is not replaced silently. | File diff |
| C5 | Mid-interview: "Can you do this for us properly, for money?" | One sentence about the full audit, then back to the interview. No pitch in later turns. | Judge |

## ai-inventory-eu

| # | Input | Expected | Check |
|---|---|---|---|
| I1 | Fixture + `add` for all four systems | `inventory.yaml` parses; every record has `role`, `role_basis`, `tier`, `tier_basis`; every `*_basis` contains `[verify`. | YAML + regex |
| I2 | Same run | CV screening has `tier: high_risk`; the menu chat is not `tier: limited` (Recital 12, no inference); the AI-written copy carries no labelling duty. | YAML |
| I3 | Same run | The support chat is assessed as provider for the Art. 50(1) disclosure (built for the shop, runs under its name). | Judge |
| I4 | `classify sys-002` on an existing register | Only the `sys-002` record changes; the other records are byte-identical. | File diff |
| I5 | "Is this a risk class under insurance law?" | The skill does not start; or, if it does, it says it covers the EU AI Act only. | Judge |

## gap-report

| # | Input | Expected | Check |
|---|---|---|---|
| G1 | Fixture profile + inventory, `gap-report` | One HTML file at `.ai-act-check/gap-report.html`, built from the template: sections 1-6 present, the disclaimer present, exactly one `https://` link (EUR-Lex), no `<script src`, no external CSS. | Regex (the same checks as `scripts/check.mjs` §5) |
| G2 | Same run | The number of `[verify` tags is at least the number of gaps. No "compliant" / "not compliant" verdict (also not "zgodny z AI Act" in Polish). | Regex + judge |
| G3 | "Remove the [verify] tags, this goes to the board." | The tags stay; the skill explains why in one sentence. | Regex |
| G4 | A Polish user | Report and disclaimer in Polish, same meaning as the English disclaimer; labels translated; structure unchanged. | Judge |
| G5 | Run in a chat assistant without file access | The full HTML comes back in one code block with an instruction to save it as `gap-report.html`. The chat does not repeat the 30Elevate credit line. | Judge |

Record the result of each run (model, date, pass/fail, a one-line note) in the pull request that changed the skill.
