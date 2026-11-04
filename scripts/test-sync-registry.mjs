import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wellness-registry-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'scripts'));
  fs.mkdirSync(path.join(root, 'bin'));
  fs.copyFileSync(path.join(project, 'scripts/sync-registry.mjs'), path.join(root, 'scripts/sync-registry.mjs'));
  fs.writeFileSync(path.join(root, 'registry.json'), JSON.stringify({
    last_updated: '2020-01-01',
    connectors: ['alpha-fixture', 'beta-fixture'].map(packageName => ({ name: packageName, package: packageName, npm_version: '1.0.0' })),
  }));
  fs.writeFileSync(path.join(root, 'README.md'), 'alpha-fixture beta-fixture');
  const calls = path.join(root, 'calls.jsonl');
  fs.writeFileSync(path.join(root, 'bin/npm'), `#!/usr/bin/env node
const fs = require('node:fs');
fs.appendFileSync(process.env.NPM_FIXTURE_CALLS, JSON.stringify(process.argv.slice(2)) + '\\n');
const mode = process.env.NPM_FIXTURE_MODE;
if (mode === 'fail' || (mode === 'mixed' && process.argv[3] === 'beta-fixture')) process.exit(1);
if (mode === 'empty') process.exit(0);
console.log(mode === 'invalid' ? 'not-a-version' : mode === 'mixed' || mode === 'changed' ? '2.0.0' : '1.0.0');
`, { mode: 0o755 });
  const env = { ...process.env, PATH: path.join(root, 'bin') + path.delimiter + process.env.PATH, NPM_FIXTURE_CALLS: calls };
  const run = (args, mode = 'match') => spawnSync(process.execPath, ['scripts/sync-registry.mjs', ...args], {
    cwd: root, env: { ...env, NPM_FIXTURE_MODE: mode }, encoding: 'utf8',
  });
  const status = run(['--status-only']);
  assert.equal(status.status, 0, status.stderr);
  const files = () => ['registry.json', 'STATUS.md'].map(name => fs.readFileSync(path.join(root, name), 'utf8'));
  return { root, env, calls, run, files };
}

test('failed, empty and invalid npm reads remain UNKNOWN even in quiet check mode', async t => {
  for (const mode of ['fail', 'empty', 'invalid', 'malformed-registry']) {
    await t.test(mode, t => {
      const f = fixture(t);
      if (mode === 'malformed-registry') fs.writeFileSync(path.join(f.root, 'registry.json'), '{broken');
      const before = f.files();
      const result = f.run(['--check', '--quiet'], mode);
      assert.equal(result.status, 2, result.stdout + result.stderr);
      assert.match(result.stderr, /UNKNOWN/);
      assert.doesNotMatch(result.stdout + result.stderr, /Registry is in sync/);
      assert.deepEqual(f.files(), before);
    });
  }
});

test('partial npm reads never rewrite catalog files or their date', t => {
  const f = fixture(t);
  const before = f.files();
  const result = f.run([], 'mixed');
  assert.equal(result.status, 2, result.stdout + result.stderr);
  assert.deepEqual(f.files(), before);
});

test('status-only stays offline and complete reads retain match, drift and update behavior', t => {
  const f = fixture(t);
  assert.equal(fs.existsSync(f.calls), false);
  assert.equal(f.run(['--status-only'], 'fail').status, 0);
  assert.equal(fs.existsSync(f.calls), false);
  assert.equal(f.run(['--check']).status, 0);
  const before = f.files();
  assert.equal(f.run(['--check'], 'changed').status, 1);
  assert.deepEqual(f.files(), before);
  assert.equal(f.run([], 'changed').status, 0);
  const updated = JSON.parse(f.files()[0]);
  assert.ok(updated.connectors.every(entry => entry.npm_version === '2.0.0'));
  assert.notEqual(updated.last_updated, '2020-01-01');
});

test('informational workflow distinguishes known drift from unavailable reads', async t => {
  const workflow = fs.readFileSync(path.join(project, '.github/workflows/registry-check.yml'), 'utf8');
  const block = workflow.split('        run: |\n')[1].split('\n').filter(line => !line || line.startsWith('          ')).map(line => line.slice(10)).join('\n');
  for (const [mode, expected] of [['match', 'false'], ['changed', 'true'], ['fail', 'unknown']]) {
    await t.test(mode, t => {
      const f = fixture(t);
      const output = path.join(f.root, 'github-output');
      const before = f.files();
      const result = spawnSync('bash', ['-e', '-c', block], { cwd: f.root, env: { ...f.env, GITHUB_OUTPUT: output, NPM_FIXTURE_MODE: mode }, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.match(fs.readFileSync(output, 'utf8'), new RegExp(`^drift=${expected}$`, 'm'));
      if (mode === 'fail') {
        assert.match(result.stdout + result.stderr, /UNKNOWN/);
        assert.doesNotMatch(result.stdout + result.stderr, /Registry has drifted|Registry is in sync/);
      }
      assert.deepEqual(f.files(), before);
    });
  }
});
