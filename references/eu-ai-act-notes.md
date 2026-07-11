# EU AI Act - working notes

> [!WARNING]
> Working notes to support a first-pass assessment. NOT a binding legal interpretation, NOT legal advice. The AI Act is still phasing in and deadlines were touched by the Commission's Digital Omnibus proposal - confirm every item against the current consolidated text (EUR-Lex) or with a lawyer. `[verify]` = confirm at the source before you rely on it. The `[verify]` tags are not hedging - they are the point: an unverified compliance claim can end up in a board memo.

## Timeline (staggered application)

The AI Act entered into force on 1 Aug 2024 and applies in stages. Dates below are the baseline from the Regulation; the Digital Omnibus (adopted by the Council on 29 June 2026, awaiting Official Journal publication) moves part of the high-risk timeline - see the note under the table.

| Obligation | Applies from | What it means for a company | Status |
|---|---|---|---|
| Art. 5 - prohibited practices | 2 Feb 2025 | A short list of AI uses that are simply banned (see below). Check you are not doing any. | in force `[verify]` |
| Art. 4 - AI literacy | 2 Feb 2025 | Staff who use AI must have a basic, proportionate level of AI competence. | in force `[verify]` |
| GPAI - provider obligations | 2 Aug 2025 | Duties for providers of general-purpose models (OpenAI, Google, Anthropic, ...). Most SMBs (small and mid-sized businesses) are users, not providers - usually out of scope here. | in force `[verify]` |
| Art. 50 - transparency | 2 Aug 2026 | Disclose that a user is talking to AI; label AI-generated / manipulated content (deepfakes). This is the one that touches most ordinary businesses. NOT postponed. | upcoming `[verify]` |
| High-risk - Annex III systems | 2 Aug 2026 baseline; moved to 2 Dec 2027 by the Digital Omnibus | Heavy obligations for high-risk uses (recruitment, credit scoring, ...). The Digital Omnibus delays this, tied to readiness of standards. | adopted, awaiting OJ `[verify]` |
| High-risk - as a safety component of a regulated product (Annex I) | 2 Aug 2027 baseline; moved to 2 Aug 2028 by the Digital Omnibus | High-risk when the AI is a safety component of a product already regulated under EU law. The Digital Omnibus moves this too. | adopted, awaiting OJ `[verify]` |
| Regulatory sandboxes | 2 Aug 2026 baseline; moved to 2 Aug 2027 by the Digital Omnibus | Member states must set up AI sandboxes (free for SMEs in some countries). | adopted, awaiting OJ `[verify]` |

**Digital Omnibus (why the dates moved in the press).** The Commission proposed this simplification package in late 2025; the European Parliament approved it on 16 June 2026 and the Council gave final adoption on 29 June 2026 `[verify]`. It now awaits publication in the Official Journal (imminent as of early July 2026) and enters into force on the third day after publication. Until then the original AI Act text technically applies, but the amendments are effectively locked in - `[verify]` whether it has been published yet before quoting a date. Main effects: Annex III high-risk moves to 2 Dec 2027; Annex I product high-risk to 2 Aug 2028; regulatory sandboxes to 2 Aug 2027; new prohibitions (AI-generated CSAM, non-consensual intimate deepfakes) apply from 2 Dec 2026; a watermarking grace period for systems already on the market runs to 2 Dec 2026; the Art. 4 literacy wording was softened (date unchanged). The frequent misread: "the AI Act was postponed." Only part of the *high-risk* timeline moved. What touches an ordinary business - transparency (Art. 50, 2 Aug 2026) and AI literacy (Art. 4, already in force) - stands.

## National supervisory authority

Each member state designates its own market surveillance / notifying authority. Which authority applies, and its powers, depends on the country - `[verify]` per jurisdiction. (Poland: the supervisor is the "Komisja Rozwoju i Bezpieczeństwa Systemów Inteligentnych" (KRiBSI), a single central regulator - unusually, Poland chose one authority rather than splitting the role. It was created by a national AI Act implementing law that the Sejm passed on 11 June 2026; after Senate amendments it went back through the Sejm and, as of early July 2026, awaits the President's signature to become law `[verify]`.)

## Roles (who is who)

Assessed per system, not per company. One company can be a provider of System A, a deployer of System B, and an importer of System C - each triggers different obligations.

- **Provider** - develops an AI system (or has it developed) and places it on the EU market / puts it into service under its own name or trademark.
- **Deployer** - uses an AI system under its own authority in a professional capacity. Most common role for SMBs.
- **Importer** - brings an AI system from a provider established outside the EU onto the EU market.
- **Distributor** - makes an AI system available on the EU market without being provider or importer.
- **Authorized representative** - established in the EU, acting on behalf of a non-EU provider.
- **Product manufacturer** - puts an AI system into a product under its own name / trademark; treated as provider for that product.

**Dual-role flag.** If a company substantially modifies a vendor system (fine-tunes on its own data, changes the intended purpose, rebrands), it may become a **provider** of the modified system even though it started as a deployer. `[verify - Art. 25]`

## Risk classes

- **Prohibited** (Art. 5) - STOP if present. Summaries, not the legal text: subliminal / deceptive techniques that materially distort behavior; exploiting vulnerabilities (age, disability, socio-economic status); social scoring by public authorities; real-time remote biometric identification in public spaces for law enforcement (narrow exceptions); biometric categorization inferring sensitive traits; emotion recognition at work or in education (medical / safety exceptions); untargeted facial-image scraping; predictive policing based solely on profiling. `[verify - Art. 5]`
- **High-risk** (Annex III) - heaviest obligations. Areas: biometrics; critical infrastructure; education / vocational training; employment and worker management (recruitment, selection, promotion, termination, task allocation, monitoring); access to essential private and public services (public benefits, individual credit scoring, life / health insurance pricing, emergency dispatch); law enforcement; migration / asylum / border control; administration of justice and democratic processes. `[verify - Annex III]`
- **Limited risk** (Art. 50) - transparency duty: tell people they are interacting with AI; label AI-generated / manipulated content. `[verify - Art. 50]`
- **Minimal risk** - most uses (spam filters, recommendations, internal assistants). No specific AI Act obligations.
- **GPAI** - general-purpose models; a separate obligations regime aimed at model providers. GPAI with systemic risk carries extra duties (e.g. models above a very high training-compute threshold, or designated by the Commission). `[verify - Art. 51 and surrounding]`

## Common SMB situations (working map)

| Company situation | Likely class | Note |
|---|---|---|
| Website chatbot serving customers | Limited (Art. 50) | Must disclose it is AI `[verify]` |
| AI-generated marketing content | Limited (Art. 50) | Label AI / manipulated content where required `[verify]` |
| AI for CV screening / recruitment | High (Annex III) | Heaviest scope of obligations `[verify]` |
| Customer scoring / creditworthiness | High (Annex III) | `[verify]` |
| Internal AI assistant (notes, code) | Minimal | Usually no obligations `[verify]` |

## To refine (legal backlog)

- [ ] Legal review of all deadlines against the current consolidated text and the final Digital Omnibus outcome.
- [ ] Detail obligations per role (deployer / provider checklists).
- [ ] Link to GDPR / DPIA where they overlap.
- [ ] EUR-Lex citation for each item.
- [ ] Confirm the national supervisory authority per target country.
