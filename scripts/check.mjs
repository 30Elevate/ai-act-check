// Structural checks for this repo. No LLM, no dependencies - plain Node 22.
//   node scripts/check.mjs
// Exit 1 with a list of problems, exit 0 when everything holds.
//
// What it checks:
//   1. Frontmatter of every skills/*/SKILL.md: parses, name = folder, description <= 500 chars,
//      allowed-tools includes Edit (skills update files instead of rewriting them).
//   2. File paths named in SKILL.md, README.md, AGENTS.md, USE-ANYWHERE.md exist.
//   3. Every "guardrail N: Title" reference points to rule N in guardrails/GUARDRAILS.md with that title.
//   4. AI Act dates agree between references/eu-ai-act-notes.md, USE-ANYWHERE.md, the skills and the
//      report template (list of dates below).
//   5. The gap report template carries the disclaimer, the credit line and exactly one https:// link;
//      the sample report uses the same style and script as the template.
//   6. USE-ANYWHERE.md has exactly one code block, fenced with four backticks, holding the whole prompt.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8').replaceAll('\r\n', '\n');
const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);

const skillDirs = readdirSync(join(root, 'skills')).filter((d) => statSync(join(root, 'skills', d)).isDirectory());
const skillFiles = skillDirs.map((d) => `skills/${d}/SKILL.md`);

// ---------- 1. frontmatter ----------
function parseFrontmatter(text, where) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) { fail(where, 'no frontmatter block'); return {}; }
  const lines = m[1].split('\n');
  const out = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const kv = line.match(/^([a-z][a-z-]*):(?:\s+(.*))?$/);
    if (!kv) { fail(where, `frontmatter line ${i + 2} is not "key: value": ${line}`); continue; }
    const [, key, raw = ''] = kv;
    let value = raw.trim();
    if (value === '>' || value === '|' || value === '>-' || value === '|-') {
      const block = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) block.push(lines[++i].trim());
      value = value.startsWith('>') ? block.join(' ') : block.join('\n');
    } else if (value.startsWith('"')) {
      if (!/^"(?:[^"\\]|\\.)*"$/.test(value)) fail(where, `${key}: unbalanced double quotes`);
      value = value.slice(1, -1).replace(/\\(.)/g, '$1');
    } else if (value.startsWith("'")) {
      if (!/^'(?:[^']|'')*'$/.test(value)) fail(where, `${key}: unbalanced single quotes`);
      value = value.slice(1, -1).replaceAll("''", "'");
    } else if (/: |\s#/.test(value)) {
      fail(where, `${key}: plain value contains ": " or " #" - quote it, or YAML parsers will break`);
    }
    out[key] = value;
  }
  return out;
}

for (const f of skillFiles) {
  const fm = parseFrontmatter(read(f), f);
  const folder = f.split('/')[1];
  if (fm.name !== folder) fail(f, `name "${fm.name}" does not match folder "${folder}"`);
  if (!fm.description) fail(f, 'description missing');
  else if (fm.description.length > 500) fail(f, `description is ${fm.description.length} chars (max 500)`);
  const tools = (fm['allowed-tools'] || '').split(',').map((t) => t.trim());
  for (const t of ['Read', 'Write', 'Edit']) if (!tools.includes(t)) fail(f, `allowed-tools lacks ${t}`);
}

// ---------- 2. paths ----------
const PATH_EXT = /\.(md|html|yaml|yml|json|mjs|png)$/;
function checkPaths(file, base) {
  const text = read(file);
  const seen = new Set();
  for (const [, p] of text.matchAll(/`([^`\s]+)`/g)) seen.add(p);
  for (const [, p] of text.matchAll(/\]\(([^)\s#]+)(?:#[^)]*)?\)/g)) seen.add(p);
  for (const p of seen) {
    if (/^[a-z]+:/i.test(p) || p.startsWith('/') || p.startsWith('.ai-act-check/') || p.includes('*') || p.includes('<')) continue;
    // only things that look like repo paths: a folder part plus a known extension, or a folder ending in /
    if (!p.includes('/')) continue;
    if (!PATH_EXT.test(p) && !p.endsWith('/')) continue;
    const full = join(root, base, p);
    if (!existsSync(full)) fail(file, `path does not exist: ${p}`);
  }
}
for (const f of skillFiles) checkPaths(f, dirname(f));
for (const f of ['README.md', 'AGENTS.md', 'USE-ANYWHERE.md']) checkPaths(f, '.');

// ---------- 3. guardrail references ----------
const guardrails = read('guardrails/GUARDRAILS.md');
const rules = new Map();
for (const [, n, title] of guardrails.matchAll(/^## (\d+)\. (.+)$/gm)) {
  rules.set(Number(n), title.replace(/\s*\(.*\)\s*$/, '').trim());
}
[...rules.keys()].forEach((n, i) => { if (n !== i + 1) fail('guardrails/GUARDRAILS.md', `rules are not numbered 1..N (found ${n} at position ${i + 1})`); });

const refFiles = [...skillFiles, 'guardrails/GUARDRAILS.md', 'AGENTS.md', 'README.md', 'USE-ANYWHERE.md'];
for (const f of refFiles) {
  for (const m of read(f).matchAll(/\bguardrail (\d+)(?::\s*([^)\].,;\n]+))?/gi)) {
    const n = Number(m[1]);
    const title = (m[2] || '').trim();
    if (!rules.has(n)) { fail(f, `"${m[0]}" - there is no guardrail ${n}`); continue; }
    if (!title) { fail(f, `"${m[0]}" - name the rule: "guardrail ${n}: ${rules.get(n)}"`); continue; }
    if (title.toLowerCase() !== rules.get(n).toLowerCase()) fail(f, `"${m[0]}" - guardrail ${n} is "${rules.get(n)}"`);
  }
}

// ---------- 4. AI Act dates ----------
const MONTHS = { jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr', may: 'May', jun: 'Jun', jul: 'Jul', aug: 'Aug', sep: 'Sep', oct: 'Oct', nov: 'Nov', dec: 'Dec' };
const DATE_RE = /\b(\d{1,2})(?:\s|&nbsp;|\*)+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?(?:\s|&nbsp;)+(20\d\d)\b/g;
const datesIn = (s) => [...s.matchAll(DATE_RE)].map(([, d, m, y]) => `${Number(d)} ${MONTHS[m.slice(0, 3).toLowerCase()]} ${y}`);

// When each duty applies (Art. 113 as amended by Regulation (EU) 2026/1744). A line that names the
// provision and carries an application date must carry this one.
const FACTS = [
  { name: 'Art. 5 prohibited practices', key: /\bArt\. 5\b/, date: '2 Feb 2025' },
  { name: 'Art. 4 AI literacy', key: /\bArt\. 4\b/, date: '2 Feb 2025' },
  { name: 'Penalties regime (Chapter XII)', key: /Chapter XII/, date: '2 Aug 2025' },
  { name: 'Art. 50 transparency', key: /\bArt\. 50\b/, date: '2 Aug 2026' },
  { name: 'High-risk, Annex III', key: /Annex III/, date: '2 Dec 2027' },
  { name: 'High-risk, Annex I products', key: /Annex I(?!I)/, date: '2 Aug 2028' },
  { name: 'Regulatory sandboxes', key: /sandbox/i, date: '2 Aug 2027' },
  { name: 'KRiBSI provisions (Poland)', key: /KRiBSI/, date: '28 Oct 2026' },
];
// Dates that say when a text was adopted, published or checked - not when a duty applies.
const CONTEXT_DATES = new Set(['16 Jun 2026', '29 Jun 2026', '3 Jul 2026', '8 Jul 2026', '24 Jul 2026', '27 Jul 2026', '25 Jul 2026', '11 Aug 2026', '26 Aug 2026', '24 Sep 2026', '10 Oct 2026']);
const OMNIBUS_IN_FORCE = '27 Jul 2026';

const notesFile = 'references/eu-ai-act-notes.md';
const notes = read(notesFile);
const knownDates = new Set(datesIn(notes));
const templateFile = 'skills/gap-report/assets/report-template.html';
// a missing template is reported in section 5
const dateFiles = [notesFile, 'USE-ANYWHERE.md', 'README.md', ...skillFiles, templateFile].filter((f) => existsSync(join(root, f)));

for (const fact of FACTS) {
  const inNotes = notes.split('\n').some((l) => fact.key.test(l) && datesIn(l).includes(fact.date));
  if (!inNotes) fail('scripts/check.mjs', `${fact.name}: ${fact.date} is not in ${notesFile} - update the FACTS list or the notes`);
}
for (const f of dateFiles) {
  const lines = read(f).split('\n');
  lines.forEach((line, i) => {
    const all = datesIn(line);
    for (const d of all) if (!knownDates.has(d)) fail(`${f}:${i + 1}`, `date ${d} does not appear in ${notesFile}`);
    const applying = all.filter((d) => !CONTEXT_DATES.has(d));
    if (applying.length) {
      for (const fact of FACTS) {
        if (fact.key.test(line) && !applying.includes(fact.date)) fail(`${f}:${i + 1}`, `${fact.name} should be ${fact.date}, line has ${applying.join(', ')}`);
      }
    }
    for (const m of line.matchAll(/2026\/1744[^.]{0,140}?in(?:to)? force (?:since|on) (.{0,40})/g)) {
      const d = datesIn(m[1])[0];
      if (d && d !== OMNIBUS_IN_FORCE) fail(`${f}:${i + 1}`, `Digital Omnibus in force ${d}, notes say ${OMNIBUS_IN_FORCE}`);
    }
  });
}

// ---------- 5. report template + sample ----------
const disclaimer = (guardrails.match(/^## 1\.[\s\S]*?^> (.+)$/m) || [])[1];
if (!disclaimer) fail('guardrails/GUARDRAILS.md', 'rule 1 has no "> disclaimer" line');
const CREDIT = 'Self-service first pass. A full audit - a scan of your real systems, human review and recommendations - is available at 30elevate.com.';
const block = (html, tag) => (html.match(new RegExp(`<${tag}>[\\s\\S]*?</${tag}>`)) || [''])[0];

function checkReport(f) {
  if (!existsSync(join(root, f))) { fail(f, 'missing'); return ''; }
  const html = read(f);
  const plain = html.replaceAll('&nbsp;', ' ');
  if (disclaimer && !plain.includes(disclaimer)) fail(f, 'disclaimer from guardrail 1 is missing');
  if (!plain.includes(CREDIT)) fail(f, 'credit line is missing or changed');
  const https = html.match(/https:\/\//g) || [];
  if (https.length !== 1) fail(f, `expected exactly one https:// link, found ${https.length}`);
  if (/http:\/\//.test(html)) fail(f, 'contains an http:// link');
  if (!html.includes('https://eur-lex.europa.eu/eli/reg/2024/1689/oj')) fail(f, 'the one link must be EUR-Lex, Regulation (EU) 2024/1689');
  if (/<script[^>]+src=|<link[^>]+stylesheet|@import|url\(\s*['"]?https?:/i.test(html)) fail(f, 'loads an external file');
  for (const n of [1, 2, 3, 4, 5, 6]) if (!new RegExp(`class="s-num"[^>]*>${n}<`).test(html)) fail(f, `section ${n} is missing`);
  return html;
}
const template = checkReport(templateFile);
const sample = checkReport('assets/report-sample.html');
if (template && !template.includes('{{')) fail(templateFile, 'has no {{placeholders}} - is this a filled report?');
if (template && sample) {
  if (block(template, 'style') !== block(sample, 'style')) fail('assets/report-sample.html', 'style block differs from the template');
  if (block(template, 'script') !== block(sample, 'script')) fail('assets/report-sample.html', 'script block differs from the template');
}

// ---------- 6. USE-ANYWHERE.md: one copyable block ----------
{
  const f = 'USE-ANYWHERE.md';
  const fences = read(f).split('\n').filter((l) => /^\s*```/.test(l));
  if (fences.length !== 2) fail(f, `expected one code block (2 fence lines), found ${fences.length} fence lines`);
  else if (!fences.every((l) => /^````/.test(l) && !/^`````/.test(l))) fail(f, 'the prompt block must be fenced with exactly four backticks');
  else {
    const body = read(f).split(/^````.*$/m)[1] || '';
    for (const must of ['## Hard rules', '## Step 1', '## Step 3', 'Begin with Step 1']) if (!body.includes(must)) fail(f, `prompt block lacks "${must}"`);
  }
}

if (problems.length) {
  console.error(`check.mjs found ${problems.length} problem(s):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`check.mjs: ${skillFiles.length} skills, ${rules.size} guardrails, ${FACTS.length} AI Act dates, template and prompt block - all good.`);
