# Changelog

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
