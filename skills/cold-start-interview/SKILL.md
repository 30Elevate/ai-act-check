---
name: cold-start-interview
description: Short interview that builds the company profile for an EU AI Act assessment - role, AI systems, jurisdiction, industry. Run this FIRST; the other skills (`ai-inventory-eu`, `gap-report`) read from it and produce generic output without it. This skill should be used when the user says "AI Act check", "EU AI Act assessment", "company profile", "cold start interview", or asks where their company stands on AI Act compliance.
allowed-tools: Read, Write
---

# Cold Start Interview

Collect the company profile needed for a sound AI Act assessment. Save it - the other skills (`ai-inventory-eu`, `gap-report`) read from it.

**Language:** conduct the interview and write all output in the user's language (e.g. Polish, English). These instructions are in English; adapt the interaction to the user.

## How to run it

- Max **2-3 questions per turn**. Do not dump a form.
- Two paths: **Quick** (2 min - role + jurisdiction + do you use AI) or **Full** (15 min - all sections). Ask up front which one.
- Pause/resume: when the user stops, leave a marker `<!-- SETUP PAUSED AT: <section> -->` and `[PENDING]` fields.
- **No silent guessing.** Before finalizing, list the skipped fields and ask: fill now or leave `[PLACEHOLDER]`?
- **Fact-check on the fly:** when the user cites a rule / deadline / threshold, check it against `${CLAUDE_SKILL_DIR}/../../references/eu-ai-act-notes.md`, flag uncertainty with `[verify]` - do not take it on faith.
- **Jurisdiction explicit:** never assume the legal regime. Ask where the company operates and where its customers and staff are.

## Profile sections

1. **Company** - industry, size (headcount), markets served.
2. **Role toward AI** - does the company build its own AI (provider), only use third-party AI (deployer), or import/distribute (importer/distributor). May be several at once, per system.
3. **AI systems in use** - list: chatbots, content generators, scoring, recruitment, monitoring, decision automation. For each: purpose, who provides it, whose data it processes. Do not rely on the user recalling everything - owners forget tools they do not think of as "AI". Offer likely systems from their business type (this is what `ai-inventory-eu infer` does), flagged as suggestions to confirm, not assumptions.
4. **Human contact** - does the AI talk directly to a customer or user (Art. 50 - transparency duty).
5. **Literacy** - do staff operating AI have training (Art. 4).
6. **Existing measures** - AI policies, registries, DPIA, prior assessments.

## Output

Save the profile as a structured record (sections above) to `.ai-act-check/profile.md` in the working directory (create the folder if needed). When file writing is unavailable - for example running as a plain prompt in a browser assistant - keep the profile in the conversation instead, and tell the user to run the next step in the same chat so it is not lost. Mark `[PENDING]` / `[PLACEHOLDER]` / `[verify]` where needed. End with one sentence: what we know, what is missing for a full assessment, and that `/ai-act-check:ai-inventory-eu` is the next step.

Apply `${CLAUDE_SKILL_DIR}/../../guardrails/GUARDRAILS.md` to the whole output.
