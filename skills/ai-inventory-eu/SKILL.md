---
name: ai-inventory-eu
description: >
  EU AI Act inventory of a company's AI systems - for each system work out the
  company's role (provider, deployer, importer, distributor) and a first-pass
  risk tier (prohibited, high-risk, limited, minimal, GPAI). Includes a guided
  inference step suggesting likely AI systems from the business type. This skill
  should be used when the user says "ai inventory", "what AI systems do we have",
  "classify this system", "which risk class", or right after the cold-start-interview.
argument-hint: "[list | infer | add | classify <id>]"
allowed-tools: Read, Write
---

# AI Inventory (EU AI Act)

Build the register of AI systems and, for each, the company's role and risk tier. The rule this skill exists to enforce: **role and tier are per system, not per company.** One company can be a provider of System A, a deployer of System B, and an importer of System C - each triggers different obligations.

Classification happens in conversation, step by step. **Do not derive obligations from a hardcoded table** - the AI Act is phasing in and was touched by the Digital Omnibus (the EU's package of amendments simplifying and delaying parts of the Act). Use `${CLAUDE_SKILL_DIR}/../../references/eu-ai-act-notes.md` as an aid; mark every statement about the law `[verify]` with the article number.

**Language:** produce output in the user's language.

## Before you start

Read the profile from `.ai-act-check/profile.md` (or from this conversation, if `cold-start-interview` just ran in the same chat). If neither exists, tell the user to run `/ai-act-check:cold-start-interview` first - without it the inventory is generic guesswork.

## Dispatch

- no argument / `list` - show the inventory table.
- `infer` - run **Guided inference** (suggest likely systems from the business type).
- `add` - add a system and run the classification walk-through.
- `classify <id>` - re-run the walk-through on an existing system.

## Guided inference (suggest, don't assume)

Before asking "what AI systems do you have?" (owners answer that badly - they forget the tools they don't think of as "AI"), infer likely systems from the business type in the profile and offer them for confirmation.

This is a **suggestion layer, not a scan of reality** - say so out loud. Below is a starter table by sector - extend it for sectors not listed:

| Business | Likely AI systems | First flag |
|---|---|---|
| E-commerce / retail | support chatbot; product recommendations; dynamic pricing; AI in email marketing | chatbot -> Art. 50; pricing/scoring -> check Annex III |
| Recruitment / HR | CV screening; candidate ranking; workforce monitoring | CV screening -> **high-risk** (Annex III) |
| Marketing / agency | text generators; image/video generation; ad targeting | AI content -> Art. 50 labeling |
| Services / SaaS | in-app assistant; lead scoring; churn prediction | scoring of people -> check Annex III |
| Clinic / finance | booking assistant; credit or risk scoring | credit scoring -> **high-risk** (Annex III) |

Present as: *"Businesses like yours usually run these - which do you actually have?"* Every suggestion carries `[verify]` and the note: **these are inferences from your description, not a scan of your systems.** A full audit scans the real stack.

## Classification walk-through (per system)

Produces `role`, `role_basis`, `tier`, `tier_basis`. Both bases tagged `[verify]` - not hedging, the point: the article mapping is complex and still phasing in.

### Step 1 - Role

Who does what to this system?

- **Provider** - you develop it (or have it developed) and put it on the EU market / into service under your own name or brand.
- **Deployer** - you use it under your own authority, professionally. Most common for SMBs.
- **Importer** - you bring a system from a non-EU provider onto the EU market.
- **Distributor** - you make a system available on the EU market without being provider or importer.

**Dual-role flag.** If the company substantially modifies a vendor system (fine-tunes on its own data, changes the intended purpose, rebrands), it may become a **provider** of the modified system even if it started as a deployer. Raise this on any modification beyond configuration. `[verify - Art. 25]`

Write `role` + a one-sentence `role_basis`.

### Step 2 - Risk tier

Check in order. Summaries, not legal text - each tagged `[verify]` with the article.

**A. Prohibited (Art. 5)** - STOP if matched. Subliminal / deceptive techniques distorting behavior; exploiting vulnerabilities (age, disability, socio-economic status); social scoring by public authorities; real-time remote biometric ID in public spaces for law enforcement (narrow exceptions); biometric categorization inferring sensitive traits; emotion recognition at work or in education (medical / safety exceptions); untargeted facial-image scraping; predictive policing on profiling alone. `[verify - Art. 5]`

**B. High-risk (Annex III)** - heaviest obligations. Biometrics; critical infrastructure; education / vocational training; employment and worker management (recruitment, selection, promotion, termination, task allocation, monitoring); access to essential private and public services (public benefits, individual credit scoring, life / health insurance pricing, emergency dispatch); law enforcement; migration / asylum / border control; administration of justice and democratic processes. Note the matching area. `[verify - Annex III]`

**C. Limited risk (Art. 50)** - chatbots talking to people, deepfakes, AI-generated content -> transparency duty: disclose it is AI / label the content. Applies from 2 Aug 2026. `[verify - Art. 50]`

**D. Minimal** - everything else. No specific AI Act obligations.

**E. GPAI (general-purpose AI model)** - the system IS a general-purpose model that the company provides. Separate regime; an extra systemic-risk tier for the largest models. Most small and medium businesses are users of GPAI, not providers of it. `[verify - Art. 51]`

Write `tier` + a one-sentence `tier_basis` citing the article / Annex entry that matched.

### Step 3 - Next steps

Offer: walk through obligations in conversation (not from a table); set a review date; run `/ai-act-check:gap-report` once the inventory is complete.

## Record format (per system)

```yaml
- id: sys-001
  name: "Support chatbot"
  provider: "VendorX"          # who supplies it
  purpose: "Answers customer questions on the site"
  eu_nexus: true               # deployed / offered in the EU, or affects people in the EU
  role: deployer               # provider | deployer | importer | distributor
  role_basis: "We license it and run it internally [verify]"
  tier: limited                # prohibited | high_risk | limited | minimal | gpai
  tier_basis: "Art. 50 - a chatbot talking to customers must disclose it is AI [verify]"
  next_review: "2026-08-01"
```

## Output (list)

Compact table: `System | Provider | Role | Risk tier | Key obligation | [verify]`. Under it: counts by tier, and a list of systems needing urgent attention (prohibited / high-risk / missing transparency).

Save the register to `.ai-act-check/inventory.yaml` (or keep it in the conversation when file writing is unavailable) so `gap-report` can read it.

## Why this skill does NOT auto-derive obligations

It stores role, tier, and the basis for each - NOT a role x tier -> obligations table. When asked "what are my obligations for System X?", do the analysis in conversation, tagged `[verify]`, and route heavier cases to a human. Reasons: the article mapping is complex, the Act phases in through 2027, and being confidently wrong about a compliance duty carries real business risk.

Apply `${CLAUDE_SKILL_DIR}/../../guardrails/GUARDRAILS.md`. This is a first-pass classification to confirm with a human, not a final legal qualification. The full audit (real-stack scan + human review) is the paid service - see `${CLAUDE_SKILL_DIR}/../../README.md`.
