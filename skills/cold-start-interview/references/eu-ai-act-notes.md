# EU AI Act - working notes

> [!WARNING]
> Working notes to support a first-pass assessment. NOT a binding legal interpretation, NOT legal advice. The AI Act is still phasing in and part of the timeline was amended by the Digital Omnibus, Regulation (EU) 2026/1744 (OJ L, 24 July 2026, in force since 27 July 2026) - confirm every item against the current consolidated text (EUR-Lex) or with a lawyer. `[verify]` = confirm at the source before you rely on it. The `[verify]` tags are not hedging - they are the point: an unverified compliance claim can end up in a board memo.

## Timeline (staggered application)

The AI Act entered into force on 1 Aug 2024 and applies in stages. Dates below are the baseline from the Regulation; the Digital Omnibus, Regulation (EU) 2026/1744 (in force since 27 July 2026), moves part of the high-risk timeline - see the note under the table.

**Source for every date in this table:** Art. 113 of the Regulation (entry into force and application). Art. 113 sets 2 Aug 2026 as the general application date, then carves out: (a) Chapters I and II from 2 Feb 2025; (b) Chapter III Section 4, Chapter V, Chapter VII and **Chapter XII** plus Art. 78 from 2 Aug 2025, except Art. 101; (c) Art. 6(1) from 2 Aug 2027. Full text: [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) (OJ L, 2024/1689, 12.7.2024 - only the Official Journal version is authentic).

| Obligation | Applies from | What it means for a company | Status |
|---|---|---|---|
| Art. 5 - prohibited practices | 2 Feb 2025 | A short list of AI uses that are simply banned (see below). Check you are not doing any. | in force `[verify]` |
| Art. 4 - AI literacy | 2 Feb 2025 | Staff who use AI must have a basic, proportionate level of AI competence. Since the Omnibus the wording is softer - the duty is to *promote* AI literacy ("take measures to promote"), no longer to *ensure* it; the date did not move. | in force, wording amended by 2026/1744 `[verify]` |
| GPAI - provider obligations | 2 Aug 2025 | Duties for providers of general-purpose models (OpenAI, Google, Anthropic, ...). Most SMBs (small and medium businesses) are users, not providers - usually out of scope here. | in force `[verify]` |
| Penalties regime (Chapter XII, Art. 99) | 2 Aug 2025 | The penalty provisions themselves already apply - they did not wait for 2 Aug 2026. A fine is possible where the underlying duty is also in force, so a prohibited-practice breach has been sanctionable since 2 Aug 2025. Member states had to lay down their penalty rules by that date. | in force `[verify]` |
| Art. 50 - transparency | 2 Aug 2026 (machine-readable marking under Art. 50(2) for systems already on the market before that date: 2 Dec 2026) | Disclose that a user is talking to AI; label AI-generated / manipulated content (deepfakes). This is the one that touches most ordinary businesses. NOT postponed. | in force `[verify]` |
| High-risk - Annex III systems | 2 Aug 2026 baseline; moved to 2 Dec 2027 by the Digital Omnibus | Heavy obligations for high-risk uses (recruitment, credit scoring, ...). The Digital Omnibus delays this, tied to readiness of standards. | amended by 2026/1744, in force `[verify]` |
| High-risk - as a safety component of a regulated product (Annex I) | 2 Aug 2027 baseline; moved to 2 Aug 2028 by the Digital Omnibus | High-risk when the AI is a safety component of a product already regulated under EU law. The Digital Omnibus moves this too. | amended by 2026/1744, in force `[verify]` |
| Regulatory sandboxes | 2 Aug 2026 baseline; moved to 2 Aug 2027 by the Digital Omnibus | Member states must set up AI sandboxes (free for SMEs in some countries). | amended by 2026/1744, in force `[verify]` |

**Digital Omnibus (why the dates moved in the press).** The Commission proposed this simplification package in late 2025; the European Parliament approved it on 16 June 2026, the Council gave final adoption on 29 June 2026, the act was signed on 8 July 2026 and published as **Regulation (EU) 2026/1744** in the Official Journal (L series) on **24 July 2026**; it entered into force on **27 July 2026**, the third day after publication, so the amended text applied before the 2 Aug 2026 general application date. Source: [Regulation (EU) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj) `[verify]` against the consolidated text of 2024/1689. Main effects: Annex III high-risk moves to 2 Dec 2027; Annex I product high-risk to 2 Aug 2028; regulatory sandboxes to 2 Aug 2027; new prohibitions (AI-generated CSAM, non-consensual intimate deepfakes) apply from 2 Dec 2026; a watermarking grace period for systems already on the market runs to 2 Dec 2026; the Art. 4 literacy wording was softened (date unchanged). The frequent misread: "the AI Act was postponed." Only part of the *high-risk* timeline moved. What touches an ordinary business - transparency (Art. 50, in force since 2 Aug 2026) and AI literacy (Art. 4, in force since 2 Feb 2025) - stands.

## National supervisory authority

Each member state designates its own market surveillance / notifying authority. Which authority applies, and its powers, depends on the country - `[verify]` per jurisdiction. (Poland: the supervisor is the **Komisja Rozwoju i Bezpieczeństwa Sztucznej Inteligencji** (KRiBSI) - the Commission for the Development and Security of Artificial Intelligence, a single central regulator; unusually, Poland chose one authority rather than splitting the role. It was created by a national AI Act implementing law: the **Act of 3 July 2026 on artificial intelligence systems** (ustawa o systemach sztucznej inteligencji), signed by the President on 24 July 2026 and published in the Journal of Laws as **Dz.U. 2026 poz. 1003** on 27 July 2026. It entered into force on **11 August 2026** `[verify]`; the provisions that set up KRiBSI itself (Art. 8-18 and the chapters on its powers and procedures) apply from **28 October 2026** `[verify]`, The Sejm appoints its chair, with Senate consent, for a five-year term; the Sejm made that appointment in September 2026 and the Senate consented on 24 September 2026 `[verify]`. Until 28 October 2026 the law is in force but the provisions that set up the regulator are not - do not describe KRiBSI as operating before that date.)

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
- **Limited risk** (Art. 50) - transparency duty: tell people they are interacting with AI; label deepfakes and the narrow slice of published text that informs the public on matters of public interest. Writing ordinary business copy with AI does **not** trigger a label, and a rules-only chat is not an AI system at all (Recital 12 - the test is inference). See "Art. 50 - what it does and does not cover" below. `[verify - Art. 50]`
- **Minimal risk** - most uses (spam filters, recommendations, internal assistants). No specific AI Act obligations.
- **GPAI** - general-purpose models; a separate obligations regime aimed at model providers. GPAI with systemic risk carries extra duties (e.g. models above a very high training-compute threshold, or designated by the Commission). `[verify - Art. 51 and surrounding]`

## Common SMB situations (working map)

| Company situation | Likely class | Note |
|---|---|---|
| Website chat serving customers, driven by a language model | Limited (Art. 50) | Must disclose it is AI, at the latest on first interaction. A provider duty (Art. 50(1)) - and a business that had the chat built and runs it under its own name is the provider `[verify - Art. 3(3)]` |
| Website chat running on human-written rules ("press 1 for...") | **Not an AI system** | Recital 12 excludes rules-only systems - no Art. 50 duty `[verify - Recital 12]` |
| Marketing copy / product descriptions written with AI | Minimal | **No label.** Writing with AI does not trigger Art. 50 `[verify - Art. 50(4)]` |
| Synthetic faces, voices, or footage that could pass for real | Limited (Art. 50) | Deepfake - disclose it is artificially generated `[verify]` |
| AI for CV screening / recruitment | High (Annex III) | Heaviest scope of obligations `[verify]` |
| Customer scoring / creditworthiness | High (Annex III) | `[verify]` |
| Internal AI assistant (notes, code) | Minimal | Usually no obligations `[verify]` |

## Art. 50 - what it does and does not cover

The single most over-claimed part of the Act. Two traps, both worth correcting before anything else.

**Trap 1: writing with AI does not trigger labeling.** Product descriptions, client emails, SEO articles and marketing posts drafted with AI need **no** label. Art. 50(4) reaches only text published *to inform the public on matters of public interest* - health, fundamental rights, the environment, consumer protection, public administration. Pure product advertising and corporate communications sit outside it. A further exception applies where a person reviewed the content and holds **documented** editorial responsibility (a named owner and a real workflow - "someone glanced at it" does not qualify). Watch the edge: native advertising dressed as editorial on health or financial topics can fall back in scope. `[verify - Art. 50(4)]`

What genuinely needs a label is the **deepfake** case: material a person could reasonably take as authentic - a face, a voice, footage of something that never happened. Background swaps, cropping and color correction do not. `[verify - Art. 50(4)]`

**Trap 2: not every chat is an AI system.** Recital 12 excludes "systems based on rules defined solely by natural persons to automatically execute operations". A menu chat ("press 1 for opening hours") is a form in disguise, not AI - Art. 50 never reaches it. The deciding property is the capability to **infer**; the Commission calls inference the key condition separating AI systems from other software. A language model composing answers nobody scripted does infer, so Art. 50(1) applies: tell the user it is AI, at the latest on first interaction. The "obvious from the circumstances" exception is narrow - a support chat mimicking a human conversation does not qualify. Careful with the simplification: Recital 12 also covers logic- and knowledge-based approaches that infer from encoded knowledge, so the line is **inference, not technology**. `[verify - Recital 12]`

**Who carries the duty.** Art. 50 splits by paragraph. Art. 50(1) (tell people they are interacting with AI) and Art. 50(2) (machine-readable marking of AI-generated content) are addressed to the **provider**. A business that had a chat built and puts it into service under its own name or trademark is the provider of that system (Art. 3(3)), so the disclosure duty is its own. Machine marking of content from ChatGPT, Gemini or Claude is the model vendor's job - a business using them marks nothing itself. Art. 50(3) (emotion recognition, biometric categorisation) and Art. 50(4) (deepfakes, public-interest text) are addressed to the **deployer** - the business using the system. Separately, GPAI obligations (Art. 51-56) sit with the model provider: using ChatGPT, Gemini or Claude does not make a business a GPAI provider. `[verify - Art. 3(3)-(4), Art. 50, Art. 51]`

## Penalties (Art. 99) - keep the tiers apart

Headlines quote the top tier at everyone. It applies to almost no ordinary business.

| Tier | What it covers |
|---|---|
| **EUR 35M / 7%** | **Prohibited practices only (Art. 5)** - social scoring, subliminal manipulation and the rest of the Art. 5 list. Not ordinary AI use. |
| **EUR 15M / 3%** | Operator obligations: Art. 16, 22, 23, 24, 26, 31, 33, 34 **and Art. 50**. This is the tier a transparency breach lands in. |
| **EUR 7.5M / 1%** | Supplying incorrect or misleading information to authorities. |

- **SMEs: a fine is capped at the LOWER of the two values** (fixed amount or percentage of turnover), not the higher - Art. 99(6). Rarely mentioned, materially helpful.
- **Art. 4 (AI literacy)** is **not** listed among the provisions carrying their own tier in Art. 99(4). Commentary splits: some treat it as an operator obligation under the 15M/3% tier, others see no direct sanction. Cautious, defensible line: no separate tier; literacy gaps weigh as a factor in other breaches, and a trained team counts in the company's favour. `[verify - Art. 99]`
- Do **not** carry the phrase "no separate tier" over to Art. 50 - Art. 50 has one (15M/3%).
- **When a fine becomes possible** is a separate question from the tier. Chapter XII applies from 2 Aug 2025 (Art. 113(b)), so the machinery is live; what gates a given fine is whether the underlying duty is in force. Art. 5 duties started 2 Feb 2025, so those breaches have been sanctionable since Aug 2025; Art. 50 duties apply since 2 Aug 2026, so its tier has been enforceable since that date. Avoid the shorthand "fines start on 2 Aug 2026" - it is wrong about the regime and it misdates the Art. 5 exposure.
- **Art. 99(7)** lists what the authority must weigh when setting the amount: nature, gravity and duration of the breach, whether other authorities already fined the same operator for it, the operator's size, annual turnover and market share, and any aggravating or mitigating factors. Documented training and a maintained AI inventory are the kind of mitigating factor a company can actually produce.

**Source for this section:** Art. 99 of the Regulation (administrative fines) - tiers in Art. 99(3), (4) and (5), the SME cap in Art. 99(6), the weighing factors in Art. 99(7). Full text: [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj).

`[verify]` all of the above against the consolidated text before relying on it in an engagement.

## To refine (legal backlog)

- [x] EUR-Lex citation for each item. Done 25 July 2026: the timeline table cites Art. 113 with its carve-outs, the penalties section cites Art. 99(3)-(7), both link to the ELI permalink, and the OJ designation is `OJ L, 2024/1689, 12.7.2024`. Note the OJ format changed in 2023 - there is no series number, so "OJ L 1689/2024" is wrong.
- [ ] Legal review of all deadlines against the current consolidated text - reviewed against the Regulation on 25 July 2026 (Art. 99 and Art. 113 read in full); Omnibus dates re-checked against Regulation (EU) 2026/1744 on 26 August 2026; statuses refreshed and the Art. 50 addressees corrected on 10 October 2026; still open: a line-by-line read of the consolidated 2024/1689 text as amended.
- [ ] Detail obligations per role (deployer / provider checklists).
- [ ] Link to GDPR / DPIA where they overlap.
- [ ] Confirm the national supervisory authority per target country. Poland is confirmed (KRiBSI, Dz.U. 2026 poz. 1003, in force 11 Aug 2026); every other member state is still open.
