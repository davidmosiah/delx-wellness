#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const banned = [/mannacup/i, /boring-apps/i, /asa\b/i, /creative-forge-private/i];
const docs = path.join(root, 'docs');
let fail = 0;
for (const f of readdirSync(docs)) {
  if (!/^oss-\d+-inventory\.md$/.test(f) && !/^oss-\d+-ledger\.md$/.test(f)) continue;
  // allow "no mannacup" phrasing in inventory headers
  const text = readFileSync(path.join(docs, f), 'utf8');
  // fail only if a table package column names banned products
  for (const line of text.split('\n')) {
    if (!line.startsWith('|')) continue;
    if (/no boring-apps|No boring-apps|not mannacup|MannaCup \/|without mannacup/i.test(line)) continue;
    for (const re of banned) {
      if (re.test(line) && /\|.*\|.*\|/.test(line) && !/No boring-apps|no boring-apps|ASA, MannaCup|or private/i.test(line)) {
        // only package column - crude: second cell
        const cells = line.split('|').map((s) => s.trim());
        if (cells[2] && re.test(cells[2])) {
          console.error(`banned package target in ${f}: ${line}`);
          fail = 1;
        }
      }
    }
  }
}
if (fail) process.exit(1);
console.log(JSON.stringify({ ok: true, suite: 'oss-inventory-no-private' }));
