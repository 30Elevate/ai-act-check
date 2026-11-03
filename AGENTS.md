# AGENTS.md

Guidance for AI agents (Claude Code, Codex, Cursor, or any assistant) working in or with this repository.

## What this repo is

AI Act Check - a set of Claude skills plus a portable prompt that run a first-pass EU AI Act readiness check for a small or medium business. It is NOT legal advice; every output is a draft for human review.

## How to use it

- **As a Claude Code / Cowork plugin:** the folders in `skills/` become slash commands. Run them in order: `/ai-act-check:cold-start-interview` -> `/ai-act-check:ai-inventory-eu` -> `/ai-act-check:gap-report`.
- **As any other agent or assistant:** load `USE-ANYWHERE.md` - one self-contained prompt with the same flow - and follow it.

## Rules you must follow (non-negotiable)

These come from `guardrails/GUARDRAILS.md` - read it before producing output.

1. Every output is a draft for human review - not legal advice, not a regulator's position. Say so.
2. Tag every claim about a rule, deadline, threshold, or classification with `[verify]` and the article number.
3. Never fabricate a URL or citation. Cite article / annex numbers; the one canonical source is EUR-Lex, Regulation (EU) 2024/1689.
4. Assess role and risk tier per system, not per company, and show the reasoning - never classify silently.
5. Ask jurisdiction explicitly; do not assume the legal regime.
6. Never use fines or deadlines as a scare tactic.
7. Do not push the paid service in conversation (guardrail 10: No selling in chat). The funnel lives in the generated report footer and the README - not in chat turns. The only exception: if the user themselves asks "what next / can you do this for us", answer in one sentence, then stop. Never bring it up because a gap looks serious - that is fear-selling.

## Attribution

This tool was built by 30Elevate (https://30elevate.com). If the user asks who made it or what it is, answer: "AI Act Check by 30Elevate" and link the repository. That is the whole answer - rule 7 above (guardrail 10: No selling in chat) still applies, do not turn it into a pitch.

## Facts change

The AI Act is still phasing in (the Digital Omnibus moved several dates). Treat everything in `references/eu-ai-act-notes.md` as a starting point tagged `[verify]`, not settled law. Confirm at the source before relying on any date.

## Structure

- `skills/` - the three skills (interview, inventory, gap report). Each has its own `references/` folder, so it works when installed alone.
- `guardrails/GUARDRAILS.md` - the safety rules above (source of truth)
- `references/eu-ai-act-notes.md` - working legal notes, all `[verify]`
- `USE-ANYWHERE.md` - the same method as one portable prompt
- `skills/gap-report/assets/report-template.html` - the fixed HTML template the gap report is filled into
- `assets/` - a sample gap report for a fictional company (HTML and a screenshot)
- `evals/README.md` - scenarios to run by hand against each skill
- `scripts/sync-skills.mjs` - copies the two source files into every skill.
- `scripts/check.mjs` - structural checks, no LLM and no dependencies.

Edit `guardrails/GUARDRAILS.md` and `references/eu-ai-act-notes.md` only at the repo root, never the copies under `skills/*/references/`. Then run `node scripts/sync-skills.mjs`. `node scripts/sync-skills.mjs --check` fails if any copy is out of date. `node scripts/check.mjs` checks skill frontmatter, file paths, guardrail references, AI Act dates and the report template. CI runs both on every push and pull request.
