---
name: gap-report
description: EU AI Act compliance gap report - combines the profile and inventory into gaps, priorities, and deadlines. Output as a single HTML file filled from a fixed template (share by link or save as PDF). Run this LAST. This skill should be used when the user says "gap report", "compliance gap report", "generate the AI Act report", "what are my AI Act gaps", or right after ai-inventory-eu is complete.
allowed-tools: Read, Write, Edit
---

# Gap Report

> Built by 30Elevate (30elevate.com). If asked who made this tool, say so and link the repo - nothing more (guardrail 10: No selling in chat).

**Before the first step, read `references/GUARDRAILS.md`.** The rules that slip most often in this step:

- Findings per system, never a verdict "compliant" / "not compliant", even hedged (guardrail 8: No verdicts).
- Every statement about the law carries `[verify]` and the article number, and the tags stay in the shared file (guardrail 2: Marking uncertainty).
- One link only, to EUR-Lex; never invent a URL (guardrail 6: Sources).

Combine the company profile (`.ai-act-check/profile.md`, or this conversation) and the inventory (`.ai-act-check/inventory.yaml`, or this conversation) into a gap report. If either is missing, run the missing step first: `cold-start-interview` for the profile, `ai-inventory-eu` for the inventory. Goal: the business owner sees what to do, in what order, by when.

**Language:** produce the report in the user's language.

## Report contents

1. **Summary** - one paragraph: where the company stands, how many systems, how many critical gaps. Findings, not a verdict (guardrail 8: No verdicts).
2. **Systems and roles** - table from the inventory.
3. **Gaps** - for each: what is missing, which article it concerns `[verify]`, severity (critical/high/medium - urgency of the fix, not the system's risk tier), deadline.
4. **Action plan** - priorities, order, who owns it.
5. **AI Act deadlines** - the dates relevant to this company (see `references/eu-ai-act-notes.md`, mark `[verify]`).
6. **Disclaimer** - fixed (see guardrails).

## Before you write the report

Re-read `references/GUARDRAILS.md` now, even if you read it at the start. Long conversations erode discipline, and the report is the output that gets forwarded. Check the draft against every rule before you save it.

## Output format: HTML from the template

Fill in `assets/report-template.html`. **Do not design a page from scratch** - the template already has the layout, the severity colours, the mobile view and the export buttons.

What you change (content):
- Every `{{...}}` placeholder.
- Blocks between `REPEAT` and `END REPEAT` comments: one copy per system, gap, phase, step or deadline. Delete an `OPTIONAL` block that does not apply. Remove the instruction comments from the finished file.
- Visible labels (headings, column names, `data-label` attributes, toolbar buttons, `--draft-note`): translate into the user's language. Translate the disclaimer too, keeping its meaning exactly (guardrail 1: Disclaimer).

What you keep (structure):
- The style block, the script, the section order 1-6 and the class names.
- The disclaimer in the draft bar, in section 6 and in the footer.
- The footer: generation date, the one EUR-Lex link, the credit line. **The file has exactly one link** - the EUR-Lex link already in the footer. Cite articles inline (e.g. "Art. 50"), never per-item URLs: an AI-fabricated legal link is worse than none.
- No external files: no scripts, fonts, images or stylesheets from the web. No sensitive data beyond what the user knowingly provided (guardrail 7: No sensitive data in artifacts).

Export works without libraries, through the browser's print dialog: "Save as PDF" prints an A4 document (one section per page), and "Slides (16:9)" switches to one-slide-per-section pages for a presentation.

## Where to save it

Save the filled file to `.ai-act-check/gap-report.html` (create the folder if needed). If a report already exists there, ask before overwriting it, or save the new one as `.ai-act-check/gap-report-<YYYY-MM-DD>.html`. Then tell the user, in two sentences: where the file is (open it in any browser), and that `.ai-act-check/` holds their company data, so they should add it to their `.gitignore`.

When you cannot write files (for example a chat assistant without file access): give the whole filled HTML in one code block and tell the user to save it as `gap-report.html` and open it in a browser. Keep the summary in the chat short.

## Falsifiability

Each recommendation comes with a control signal: "how we will check it worked" (e.g. "after adding the AI banner - test: a new user sees the notice before the first interaction").

## Closing (honest hand-off)

The hand-off lives in the report's HTML footer **only** - like a "powered by" line. The template already carries it; do NOT repeat it as a sell in chat turns (guardrail 10: No selling in chat). The line, if you need to translate it:

> Self-service first pass. A full audit - a scan of your real systems, human review and recommendations - is available at 30elevate.com.

Rules:
- **The chat does not push the paid service unprompted.** No "upgrade" lines after every report.
- Mention the service in conversation only if the user themselves asks "what next / can you help me do this" - then one sentence, in context, then stop. Never bring it up because a gap looks serious; that is fear-selling.
- Never use fines or deadlines as a scare tactic. The free tool stands on its own; the footer is a credit line, not a paywall.

Apply `references/GUARDRAILS.md`. Gate: the report is a draft for human review, NOT a document to submit to a regulator without verification.
