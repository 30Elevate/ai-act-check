# Guardrails

Safety rules for outputs. Apply to EVERY output of every skill. An output that breaks them is defective.

## 1. Disclaimer (always)

Every output includes a visible disclaimer:

> This output is a draft for human review. It is not legal advice and not a substitute for a lawyer / compliance specialist. It is not a regulator's position. The AI Act and its deadlines change - confirm against the current text of the act.

## 2. Marking uncertainty

- Tag every statement about a rule, deadline, threshold, or classification with `[verify]`.
- Do not present an interpretation as certain. When in doubt, default to the cautious (conservative) reading.

## 3. Jurisdiction explicit

Never assume the legal regime. If jurisdiction is not established - ask, do not guess. State any founded assumptions plainly on the output.

## 4. No silent classification

Role / risk classification must be visible on the output together with its reasoning. No "auto-qualifying" without showing the basis.

## 5. Gate before sending

Nothing from this tool is ready to file with a regulator / hand over as an official document without human review. This is a hard stop.

## 6. Sources

Claims based on a specific provision must name it (article/annex); no citation = `[verify]`. **Never fabricate a URL or citation.** Cite article/annex numbers - they are stable and need no link - plus, at most, one canonical source link you are certain of. An invented legal link is worse than none.

## 7. No sensitive data in artifacts

Generated files (HTML, reports) contain only what the user knowingly provided in the session. No data from memory / other sessions. No secrets.
