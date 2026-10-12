// Copies the shared files into each skill folder, so every skill works when it
// is installed on its own (npx skills add, Codex and Gemini CLI copy only the
// skill directory, not the whole repo).
//
// Edit the files at the repo root, never the copies under skills/*/.
//   node scripts/sync-skills.mjs          write the copies
//   node scripts/sync-skills.mjs --check  exit 1 if any copy is out of date

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// [source at repo root, destination inside a skill]. A folder copies every .md file in it.
const MAP = [
  ['guardrails/GUARDRAILS.md', 'skills/cold-start-interview/references/GUARDRAILS.md'],
  ['references/eu-ai-act-notes.md', 'skills/cold-start-interview/references/eu-ai-act-notes.md'],
  ['guardrails/GUARDRAILS.md', 'skills/ai-inventory-eu/references/GUARDRAILS.md'],
  ['references/eu-ai-act-notes.md', 'skills/ai-inventory-eu/references/eu-ai-act-notes.md'],
  ['guardrails/GUARDRAILS.md', 'skills/gap-report/references/GUARDRAILS.md'],
  ['references/eu-ai-act-notes.md', 'skills/gap-report/references/eu-ai-act-notes.md'],
];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const rel = (p) => relative(root, p).replaceAll('\\', '/');
// Line endings do not count as a difference (Git on Windows may convert them).
const text = (p) => readFileSync(p, 'utf8').replaceAll('\r\n', '\n');

const pairs = MAP.flatMap(([src, dest]) => {
  const from = join(root, src);
  if (!statSync(from).isDirectory()) return [[from, join(root, dest)]];
  return readdirSync(from)
    .filter((f) => f.endsWith('.md'))
    .map((f) => [join(from, f), join(root, dest, f)]);
});

const problems = [];
for (const [from, to] of pairs) {
  if (existsSync(to) && text(to) === text(from)) continue;
  if (check) {
    problems.push(`${rel(to)} (out of date)`);
  } else {
    mkdirSync(dirname(to), { recursive: true });
    writeFileSync(to, readFileSync(from));
    console.log('updated', rel(to));
  }
}

// Any other file in a destination folder has no source and would ship stale.
const expected = new Set(pairs.map(([, to]) => to));
for (const dir of new Set(pairs.map(([, to]) => dirname(to)))) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isFile() && !expected.has(p)) problems.push(`${rel(p)} (no source, remove it)`);
  }
}

if (problems.length) {
  console.error('Skill copies need attention:\n  ' + problems.join('\n  '));
  process.exit(1);
}
if (check) console.log('Skill copies are up to date.');
