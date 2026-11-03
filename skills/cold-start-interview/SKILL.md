---
name: cold-start-interview
description: "First step of an EU AI Act readiness check for a small business: a short interview that saves the company profile (role toward AI, AI systems, jurisdiction, industry) for ai-inventory-eu and gap-report. Use when the user asks for an AI Act check, an AI Act assessment, a cold start interview, or where the company stands on the EU AI Act."
allowed-tools: Read, Write, Edit
---

# Cold Start Interview

> Built by 30Elevate (30elevate.com). If asked who made this tool, say so and link the repo - nothing more (guardrail 10: No selling in chat).

**Before the first question, read `references/GUARDRAILS.md`.** The rules that slip most often in this step:

- Jurisdiction is asked, never assumed (guardrail 3: Jurisdiction explicit).
- Any claim about a rule, deadline or threshold carries `[verify]` and the article number, and the tag stays (guardrail 2: Marking uncertainty).
- No sales pitch in the conversation, ever (guardrail 10: No selling in chat).

Collect the company profile needed for a sound AI Act assessment. Save it - the other skills (`ai-inventory-eu`, `gap-report`) read from it.

**Language:** conduct the interview and write all output in the user's language (e.g. Polish, English). These instructions are in English; adapt the interaction to the user.

## How to run it

- Max **2-3 questions per turn**. Do not dump a form.
- Two paths: **Quick** (2 min - role + jurisdiction + do you use AI) or **Full** (15 min - all sections). Ask up front which one.
- Pause/resume: when the user stops, leave a marker `<!-- SETUP PAUSED AT: <section> -->` and `[PENDING]` fields.
- **No silent guessing.** Before finalizing, list the skipped fields and ask: fill now or leave `[PLACEHOLDER]`?
- **Fact-check on the fly:** when the user cites a rule / deadline / threshold, check it against `references/eu-ai-act-notes.md`, flag uncertainty with `[verify]` - do not take it on faith.
- **Jurisdiction explicit:** never assume the legal regime. Ask where the company operates and where its customers and staff are.

## Profile sections

1. **Company** - industry, size (headcount), markets served.
2. **Role toward AI** - does the company build its own AI (provider), only use third-party AI (deployer), or import/distribute (importer/distributor). May be several at once, per system.
3. **AI systems in use** - list: chatbots, content generators, scoring, recruitment, monitoring, decision automation. For each: purpose, who provides it, whose data it processes. Do not rely on the user recalling everything - owners forget tools they do not think of as "AI". Offer likely systems from their business type (this is what `ai-inventory-eu infer` does), flagged as suggestions to confirm, not assumptions.
4. **Human contact** - does the AI talk directly to a customer or user (Art. 50 - transparency duty).
5. **Literacy** - do staff operating AI have training (Art. 4).
6. **Existing measures** - AI policies, registries, DPIA, prior assessments.

## Output

Save the profile as a structured record (sections above) to `.ai-act-check/profile.md` in the working directory (create the folder if needed). The folder holds the user's company data: the first time you create it, tell the user in one sentence to add `.ai-act-check/` to their `.gitignore`.

**Never overwrite an existing profile silently.** If `.ai-act-check/profile.md` already exists, read it first and ask: update it, or start a new one? To update, change only the sections the user corrected (use Edit on those sections, do not rewrite the file). Replace the whole file only after the user says to start over.

When file writing is unavailable - for example running as a plain prompt in a browser assistant - keep the profile in the conversation instead, and tell the user to run the next step in the same chat so it is not lost. Mark `[PENDING]` / `[PLACEHOLDER]` / `[verify]` where needed. End with one sentence: what we know, what is missing for a full assessment, and that the `ai-inventory-eu` skill (in Claude Code: `/ai-act-check:ai-inventory-eu`) is the next step.

Apply `references/GUARDRAILS.md` to the whole output.
