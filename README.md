# AI Act Check

**EU AI Act compliance check - Claude skills for SMB readiness.**
A first pass at where your company stands under the EU AI Act: your role for each AI system, whether Art. 50 transparency applies, whether any system is high-risk (Annex III) or prohibited (Art. 5), and whether your staff has the required AI literacy (Art. 4).

**Runs as a Claude Code / Cowork plugin - or as a portable prompt in any AI assistant (ChatGPT, Gemini, Claude.ai).**

> [!IMPORTANT]
> This tool produces a **draft for human review**. It is not legal advice and not a substitute for a lawyer or compliance specialist. AI Act obligations and deadlines are still changing (see the Digital Omnibus package) - treat every output as a starting point, not a binding position.

---

## Who it is for

Small and medium businesses (SMBs) in the EU that use or deploy AI systems (chatbots, content generators, scoring, decision automation) and want to know:

- whether the transparency obligation (Art. 50) applies to them, and from when,
- what role they play for each AI system (provider / deployer / importer / distributor),
- whether any AI system is high-risk (Annex III) or falls under a prohibited practice (Art. 5),
- whether their staff have the required AI literacy (Art. 4).

## What it does

Three skills that lead from interview to report:

| Skill | Role |
|---|---|
| `cold-start-interview` | Short interview building the company profile (role, AI systems, jurisdiction). Skipping it makes every later output generic. |
| `ai-inventory-eu` | AI system inventory - works out your role and a first-pass risk tier per system, since both can differ from one system to the next, not just company-wide. |
| `gap-report` | Compliance gap report - what is missing, priorities, deadlines. Output as a single HTML file (a deliverable you can share by link). |

## How to use

A plugin for [Claude Code](https://claude.com/claude-code) / Claude Cowork.

In Claude, add this repo as a plugin marketplace and install it:

```
/plugin marketplace add 30Elevate/ai-act-check
/plugin install ai-act-check@ai-act-check
```

**Restart Claude Code** - the commands are not live until you restart. Then run, in order:

```
/ai-act-check:cold-start-interview
/ai-act-check:ai-inventory-eu
/ai-act-check:gap-report
```

Prefer not to install? Clone the repo and point Claude at the `skills/` folder:

```
git clone https://github.com/30Elevate/ai-act-check.git
```

**Language:** instructions are written in English, but each skill runs the interview and produces output in the user's language (e.g. Polish, English). A Polish SMB gets a Polish conversation.

**Privacy:** the check runs entirely in your own AI session. Your answers stay with you - 30Elevate never sees or stores them.

## Use it outside Claude Code

The plugin is for Claude Code / Cowork. But the method is just a prompt - it works in ChatGPT, Gemini, Claude.ai, or any assistant.

**Simplest (if your assistant can browse the web):** paste this one line into ChatGPT, Claude, or Gemini -

> Run my free EU AI Act check, following the instructions at https://raw.githubusercontent.com/30Elevate/ai-act-check/main/USE-ANYWHERE.md - start with the first question, in my language.

Your assistant fetches the prompt and starts the interview.

**Always works (no web access needed):** open [`USE-ANYWHERE.md`](USE-ANYWHERE.md), copy the block, and paste it as your first message. Same interview -> inventory -> gap report flow, same guardrails.

## Structure

```
ai-act-check/
├── .claude-plugin/
│   ├── marketplace.json         # makes the repo installable as a plugin
│   └── plugin.json              # plugin manifest (name, version, license)
├── skills/
│   ├── cold-start-interview/SKILL.md
│   ├── ai-inventory-eu/SKILL.md
│   └── gap-report/SKILL.md
├── guardrails/GUARDRAILS.md      # safety rules for outputs (disclaimer, [verify], gate)
├── references/eu-ai-act-notes.md # working legal notes (verify against current text)
├── USE-ANYWHERE.md               # the same method as one portable prompt (ChatGPT, Gemini, ...)
└── AGENTS.md                     # guidance for AI agents working in this repo
```

## Guardrails

Every output goes through the rules in [`guardrails/GUARDRAILS.md`](guardrails/GUARDRAILS.md): disclaimer, marking uncertain claims with `[verify]`, surfacing jurisdiction assumptions, no silent classification, no fabricated legal citations or links, a gate before anything is sent to a regulator.

## Full audit

This is the free, self-service version. The full AI Act Check (a scan of your real systems, human review and recommendations) is our service: **[30elevate.com](https://30elevate.com)**.

## License

[MIT](LICENSE). Copyright (c) 2026 30Elevate.

## About

[30Elevate](https://30elevate.com) - AI agency for business. Websites, AI agents, training, and AI compliance.
