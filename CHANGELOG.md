# Changelog

## 0.2.0 - 2026-11-03

- "No selling in chat" is now guardrail 10 in `guardrails/GUARDRAILS.md`, so a skill installed on its own carries it too. Before, it lived only in `AGENTS.md`, and the skills pointed to "guardrail 7", which is the rule on sensitive data.
- Guardrail 1 now holds the 0.1.7 disclaimer fix the skills read: translated into the user's language, in substantive outputs only, not in every interview turn. Until now only `USE-ANYWHERE.md` had it.
- Every skill starts by reading the guardrails and names the two or three rules that slip most often in that step. References use the form "guardrail N: Title".
- The gap report is filled into a fixed template (`skills/gap-report/assets/report-template.html`) instead of being designed from scratch: same layout, one EUR-Lex link, disclaimer and credit line built in. It saves to `.ai-act-check/gap-report.html`; without file access, the HTML comes back in a code block. The skill re-reads the guardrails before writing the report, as 0.1.2 intended.
- The report exports without libraries through the browser's print dialog: an A4 document (one section per page) or 16:9 slides (one section per slide, scaled to fit).
- `profile.md` and `inventory.yaml` are no longer overwritten silently: the skills ask first and edit only the section or record that changed (`Edit` added to `allowed-tools`).
- Skill descriptions narrowed: "what are my AI Act gaps", "which risk class under the EU AI Act", no more "company profile".
- README: plain-language first paragraph, the no-install path first, a sample report for a fictional company (`assets/`), the date of the last legal review, and the full-audit link pointing to the AI Trust Layer page.
- `USE-ANYWHERE.md`: the whole prompt sits in one code block, so GitHub shows one copy button.
- CI without an LLM (`.github/workflows/check.yml`): `sync-skills.mjs --check` plus `scripts/check.mjs` - frontmatter, paths, guardrail references, AI Act dates across the notes, the prompt and the skills, and the report template. Scenarios for manual runs in `evals/README.md`.
- Typo fixed in the Poland note (`eu-ai-act-notes.md`).

## 0.1.7 - 2026-10-12

- `USE-ANYWHERE.md` says what the quick pass covers (role, jurisdiction, whether AI is used) against the full one, as the `cold-start-interview` skill already did.
- The disclaimer is translated into the user's language with its meaning kept; the language rule and the disclaimer rule no longer pull in opposite directions.
- Found by running `USE-ANYWHERE.md` end to end on two assistants outside Claude.

## 0.1.6 - 2026-10-10

- All three skills now work when installed on their own, outside the plugin: each carries copies of the guardrails and the legal notes in its `references/` folder, and refers to them by paths relative to the skill. Before, an agent that installed only the skill folder lost both.
- New install path for Codex, Gemini CLI and other agents that read Agent Skills: `npx skills add 30Elevate/ai-act-check`.
- `scripts/sync-skills.mjs` keeps the copies in step with the source files (`--check` to verify).
- When one skill hands over to the next, it names the skill and gives the Claude Code command only as an example, because other agents have no `/ai-act-check:` commands.

## 0.1.5 - 2026-10-10

- Art. 50 addressees corrected: Art. 50(1) disclosure and Art. 50(2) machine marking are provider duties (a business that runs a chat built for it under its own name is the provider); Art. 50(3)-(4) are deployer duties. The notes previously put all of Art. 50 on the deployer.
- Art. 50 shown as in force since 2 Aug 2026, with the 2 Dec 2026 grace period for Art. 50(2) marking of systems already on the market.
- Poland: KRiBSI chair appointed by the Sejm in September 2026 with Senate consent; the regulator's provisions still apply from 28 Oct 2026.
- Inventory skill: phase-in runs through 2028; example review date moved forward.

## 0.1.4 - 2026-08-26

- Digital Omnibus is now cited as Regulation (EU) 2026/1744 (OJ L 24 July 2026, in force 27 July 2026) instead of "signed, awaiting publication"; timeline statuses updated accordingly.
- Art. 4 row notes the amended wording (promote AI literacy, not ensure it).
- Poland: the AI systems act is cited as Dz.U. 2026 poz. 1003 (in force 11 Aug 2026, KRiBSI provisions from 28 Oct 2026); the same note added to the portable prompt.
- Attribution line in AGENTS.md and each skill (answer "who made this" honestly, no pitch).

## 0.1.3 - 2026-07-25

- Dates and penalties verified against the Regulation; Polish regulator name fixed.

## 0.1.2 - 2026-07-16

- Guardrails hardened after adversarial test; hard rules re-anchored before the gap report.

## 0.1.0 - 2026-07-11

- First public release.
