# Nourish MCP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `wellness-nourish`, a public, MIT-licensed, local-first nutrition MCP server for agents and humans.

**Architecture:** Create a standalone TypeScript MCP repo that follows the existing Delx wellness connector pattern: stdio + Streamable HTTP, zod schemas, agent manifest, privacy audit, connection diagnostics, CLI UX, fixture-first tests, and provider-specific data adapters. Use USDA FoodData Central as the primary provider, Open Food Facts as an optional barcode provider, and a JSONL local intake store behind a storage interface.

**Tech Stack:** TypeScript, Node 20+, `@modelcontextprotocol/sdk`, `zod`, `express`, `cors`, built-in `node:test`/`assert`, JSON fixtures, JSONL local storage under `~/.wellness-nourish/`.

---

## File Structure

Create new top-level repository: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish`.

Primary files:

- `package.json`: package metadata, bin entry, scripts, dependency list.
- `tsconfig.json`: strict Node ESM TypeScript config.
- `.gitignore`: excludes build, node_modules, local env, and local data.
- `.npmignore`: excludes source-only noise and local artifacts from package publish.
- `LICENSE`: MIT.
- `SECURITY.md`: privacy, secrets, local logs, disclosure instructions.
- `README.md`: install, CLI, MCP clients, privacy, providers, source attribution.
- `server.json`: MCP registry metadata.

Source layout:

- `src/index.ts`: stdio/HTTP transport entrypoint and CLI dispatch.
- `src/constants.ts`: server name/version, paths, env names, provider defaults.
- `src/types.ts`: shared `FoodItem`, `IntakeEntry`, `ProviderSource`, `NutrientMap`, `NourishConfig`.
- `src/schemas/common.ts`: zod input schemas for all MCP tools.
- `src/services/config.ts`: env/config resolution and local directory setup.
- `src/services/format.ts`: MCP response helpers, markdown tables, errors.
- `src/services/nutrients.ts`: nutrient ids, macro math, rounding.
- `src/services/food-normalization.ts`: USDA/OFF normalized `FoodItem` mapping.
- `src/services/portion-engine.ts`: grams/serving conversion and confidence scoring.
- `src/services/intake-store.ts`: JSONL local store with add/update/delete/list/export.
- `src/services/meal-estimator.ts`: deterministic meal text estimation.
- `src/services/summary.ts`: daily/weekly summaries.
- `src/services/agent-manifest.ts`: install manifest and agent operating rules.
- `src/services/capabilities.ts`: provider and workflow capabilities.
- `src/services/connection-status.ts`: config/provider/store diagnostics.
- `src/services/privacy-audit.ts`: local storage and redaction boundary.
- `src/providers/usda.ts`: FoodData Central search/detail client and fixture mode.
- `src/providers/open-food-facts.ts`: Open Food Facts barcode/search client.
- `src/tools/nourish-tools.ts`: MCP tool registration.
- `src/resources/nourish-resources.ts`: MCP resources for manifest/capabilities/privacy guide.
- `src/prompts/nourish-prompts.ts`: prompt templates for agents.
- `src/cli/commands.ts`: setup/status/search/barcode/log/today/export/delete CLI.

Test and fixture layout:

- `fixtures/usda/search-banana.json`
- `fixtures/usda/food-banana.json`
- `fixtures/open-food-facts/barcode-peanut-butter.json`
- `fixtures/intake/sample-log.jsonl`
- `scripts/test-normalization.mjs`
- `scripts/test-providers.mjs`
- `scripts/test-intake-store.mjs`
- `scripts/test-meal-estimator.mjs`
- `scripts/test-summary.mjs`
- `scripts/smoke-tools.mjs`
- `scripts/smoke-http.mjs`
- `scripts/agent-readiness-test.mjs`
- `scripts/hermes-agent-manifest-test.mjs`
- `scripts/cli-ux-test.mjs`
- `scripts/privacy-redaction-test.mjs`
- `.github/workflows/ci.yml`

## Task 1: Scaffold Repository

**Files:**
- Create: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish/package.json`
- Create: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish/tsconfig.json`
- Create: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish/.gitignore`
- Create: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish/.npmignore`
- Create: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish/LICENSE`
- Create: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish/SECURITY.md`
- Create: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish/server.json`
- Create: `/Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish/src/constants.ts`

- [ ] **Step 1: Create repo folder and initialize git**

Run:

```bash
mkdir -p /Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish
cd /Users/davidmosiah/Desktop/AgentWellnessHub/wellness-nourish
git init
```

Expected: `Initialized empty Git repository`.

- [ ] **Step 2: Add package metadata**

Create `package.json`:

```json
{
  "name": "wellness-nourish",
  "version": "0.1.0",
  "description": "Agent-ready MCP server for nutrition search, meal logging, and local-first intake summaries.",
  "license": "MIT",
  "type": "module",
  "bin": {
    "wellness-nourish": "dist/index.js",
    "nourish-mcp": "dist/index.js"
  },
  "main": "dist/index.js",
  "files": [
    "dist",
    "README.md",
    "SECURITY.md",
    "server.json",
    "fixtures"
  ],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "start": "node dist/index.js",
    "dev": "tsx src/index.ts",
    "smoke": "node scripts/smoke-tools.mjs",
    "smoke:http": "node scripts/smoke-http.mjs",
    "test:normalization": "node scripts/test-normalization.mjs",
    "test:providers": "node scripts/test-providers.mjs",
    "test:intake-store": "node scripts/test-intake-store.mjs",
    "test:meal-estimator": "node scripts/test-meal-estimator.mjs",
    "test:summary": "node scripts/test-summary.mjs",
    "test:cli-ux": "node scripts/cli-ux-test.mjs",
    "test:agent-readiness": "node scripts/agent-readiness-test.mjs",
    "test:hermes-agent": "node scripts/hermes-agent-manifest-test.mjs",
    "test:privacy": "node scripts/privacy-redaction-test.mjs",
    "test": "npm run typecheck && npm run build && npm run test:normalization && npm run test:providers && npm run test:intake-store && npm run test:meal-estimator && npm run test:summary && npm run smoke && npm run smoke:http && npm run test:cli-ux && npm run test:agent-readiness && npm run test:hermes-agent && npm run test:privacy"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "nutrition",
    "calories",
    "macros",
    "wellness",
    "ai-agents",
    "fooddata-central",
    "open-food-facts"
  ],
  "author": "David Mosiah",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.21.0",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/node": "^25.6.0",
    "tsx": "^4.20.6",
    "typescript": "^6.0.3"
  },
  "engines": {
    "node": ">=20"
  },
  "homepage": "https://wellness.delx.ai/connectors/nourish",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/davidmosiah/wellness-nourish.git"
  }
}
```

- [ ] **Step 3: Add TypeScript config**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

- [ ] **Step 4: Add ignore and package hygiene files**

Create `.gitignore`:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
.DS_Store
coverage/
*.log
.wellness-nourish/
fixtures/private/
```

Create `.npmignore`:

```gitignore
src/
scripts/
.github/
.env
.env.*
coverage/
node_modules/
fixtures/private/
*.log
.DS_Store
```

- [ ] **Step 5: Add constants**

Create `src/constants.ts`:

```ts
export const SERVER_NAME = "nourish-mcp";
export const SERVER_VERSION = "0.1.0";
export const DEFAULT_HOST = "127.0.0.1";
export const DEFAULT_PORT = 3000;
export const LOCAL_DIR_NAME = ".wellness-nourish";
export const USER_AGENT = "wellness-nourish/0.1.0 (https://wellness.delx.ai; contact: david@delx.ai)";
export const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";
export const OFF_BASE_URL = "https://world.openfoodfacts.org";
```

- [ ] **Step 6: Install dependencies and verify typecheck fails for missing entrypoint**

Run:

```bash
npm install
npm run typecheck
```

Expected: install succeeds; typecheck fails because `src/index.ts` does not exist or no source inputs are present. This confirms the scaffold is ready for code tasks.

- [ ] **Step 7: Commit scaffold**

Run:

```bash
git add package.json package-lock.json tsconfig.json .gitignore .npmignore src/constants.ts
git commit -m "chore: scaffold nourish mcp package"
```

## Task 2: Define Shared Types, Schemas, And Formatting

**Files:**
- Create: `src/types.ts`
- Create: `src/schemas/common.ts`
- Create: `src/services/format.ts`
- Create: `scripts/test-normalization.mjs`

- [ ] **Step 1: Add a failing schema/format smoke test**

Create `scripts/test-normalization.mjs`:

```js
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const { ResponseOnlyInputSchema } = await import("../dist/schemas/common.js");
const { makeResponse, bulletList } = await import("../dist/services/format.js");

assert.equal(ResponseOnlyInputSchema.parse({}).response_format, "json");
assert.equal(ResponseOnlyInputSchema.parse({ response_format: "markdown" }).response_format, "markdown");

const markdown = bulletList("Nourish", { ok: true, source: "fixture" });
assert.match(markdown, /# Nourish/);
assert.match(markdown, /ok/);

const response = makeResponse({ ok: true }, "json", markdown);
assert.deepEqual(JSON.parse(response.content[0].text), { ok: true });

console.log("normalization/schema smoke ok");
```

Run:

```bash
node scripts/test-normalization.mjs
```

Expected: FAIL because `dist/schemas/common.js` does not exist.

- [ ] **Step 2: Implement shared types**

Create `src/types.ts`:

```ts
export type ResponseFormat = "json" | "markdown";
export type ProviderSource = "usda" | "open_food_facts" | "manual" | "estimate";
export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "other";

export interface NutrientMap {
  calories_kcal?: number;
  protein_g?: number;
  carbohydrates_g?: number;
  fat_g?: number;
  fiber_g?: number;
  sugar_g?: number;
  saturated_fat_g?: number;
  sodium_mg?: number;
}

export interface SourceLicense {
  name: string;
  attribution: string;
  share_alike: boolean;
  url?: string;
}

export interface FoodItem {
  id: string;
  source: ProviderSource;
  source_id: string;
  source_url?: string;
  name: string;
  brand?: string;
  barcode?: string;
  locale?: string;
  serving?: {
    quantity: number;
    unit: string;
    grams?: number;
  };
  available_portions: Array<{
    label: string;
    quantity: number;
    unit: string;
    grams?: number;
  }>;
  nutrients_per_100g: NutrientMap;
  nutrients_per_serving?: NutrientMap;
  data_quality: {
    completeness: "low" | "medium" | "high";
    confidence: number;
    warnings: string[];
  };
  license: SourceLicense;
}

export interface IntakeEntry {
  id: string;
  timestamp: string;
  date: string;
  meal_type: MealType;
  food_ref?: {
    source: ProviderSource;
    source_id: string;
    name: string;
  };
  custom_food?: FoodItem;
  quantity: number;
  unit: string;
  grams_estimate?: number;
  nutrients: NutrientMap;
  confidence: number;
  source_trace: "exact_food" | "barcode" | "estimate" | "manual" | "agent_inference";
  notes?: string;
  tags: string[];
  wellness_context_refs: string[];
}

export interface NourishConfig {
  local_dir: string;
  fixture_mode: boolean;
  usda_api_key?: string;
  off_enabled: boolean;
  cache_ttl_seconds: number;
  max_results: number;
}
```

- [ ] **Step 3: Implement input schemas**

Create `src/schemas/common.ts`:

```ts
import { z } from "zod";

export const ResponseOnlyInputSchema = z.object({
  response_format: z.enum(["json", "markdown"]).default("json")
});

export const AgentManifestInputSchema = ResponseOnlyInputSchema.extend({
  client: z.enum(["claude", "codex", "cursor", "windsurf", "hermes", "openclaw", "generic"]).default("generic")
});

export const FoodSearchInputSchema = ResponseOnlyInputSchema.extend({
  query: z.string().min(1),
  limit: z.number().int().min(1).max(25).default(10),
  provider: z.enum(["all", "usda", "open_food_facts"]).default("all")
});

export const BarcodeLookupInputSchema = ResponseOnlyInputSchema.extend({
  barcode: z.string().regex(/^[0-9]{6,18}$/),
  fallback_search: z.boolean().default(false)
});

export const FoodGetInputSchema = ResponseOnlyInputSchema.extend({
  source: z.enum(["usda", "open_food_facts"]),
  source_id: z.string().min(1)
});

export const MealEstimateInputSchema = ResponseOnlyInputSchema.extend({
  text: z.string().min(1),
  locale: z.string().default("en-US"),
  meal_type: z.enum(["breakfast", "lunch", "dinner", "snack", "other"]).default("other")
});

export const IntakeLogInputSchema = ResponseOnlyInputSchema.extend({
  text: z.string().min(1).optional(),
  food: z.unknown().optional(),
  meal_type: z.enum(["breakfast", "lunch", "dinner", "snack", "other"]).default("other"),
  quantity: z.number().positive().optional(),
  unit: z.string().min(1).optional(),
  timestamp: z.string().datetime().optional(),
  explicit_user_intent: z.boolean().default(false),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([])
});

export const IntakeUpdateInputSchema = ResponseOnlyInputSchema.extend({
  id: z.string().min(1),
  meal_type: z.enum(["breakfast", "lunch", "dinner", "snack", "other"]).optional(),
  quantity: z.number().positive().optional(),
  unit: z.string().min(1).optional(),
  timestamp: z.string().datetime().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export const IntakeDeleteInputSchema = ResponseOnlyInputSchema.extend({
  id: z.string().min(1)
});

export const SummaryInputSchema = ResponseOnlyInputSchema.extend({
  date: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).optional()
});

export const WeeklySummaryInputSchema = ResponseOnlyInputSchema.extend({
  start_date: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).optional()
});
```

- [ ] **Step 4: Implement MCP format helpers**

Create `src/services/format.ts`:

```ts
import type { ResponseFormat } from "../types.js";

export function makeResponse(data: unknown, responseFormat: ResponseFormat, markdown: string) {
  return {
    content: [
      {
        type: "text" as const,
        text: responseFormat === "markdown" ? markdown : JSON.stringify(data, null, 2)
      }
    ]
  };
}

export function makeError(message: string) {
  return {
    isError: true,
    content: [{ type: "text" as const, text: message }]
  };
}

export function bulletList(title: string, values: Record<string, unknown>): string {
  const lines = [`# ${title}`, ""];
  for (const [key, value] of Object.entries(values)) {
    const rendered = Array.isArray(value) ? value.join(", ") : String(value);
    lines.push(`- **${key}**: ${rendered}`);
  }
  return lines.join("\n");
}

export function compactTable(title: string, rows: Array<Record<string, unknown>>): string {
  if (rows.length === 0) return `# ${title}\n\nNo results.`;
  const headers = Object.keys(rows[0]);
  const header = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${headers.map((h) => String(row[h] ?? "")).join(" | ")} |`);
  return [`# ${title}`, "", header, sep, ...body].join("\n");
}
```

- [ ] **Step 5: Run schema/format test**

Run:

```bash
node scripts/test-normalization.mjs
```

Expected: PASS with `normalization/schema smoke ok`.

- [ ] **Step 6: Commit types and schemas**

Run:

```bash
git add src/types.ts src/schemas/common.ts src/services/format.ts scripts/test-normalization.mjs
git commit -m "feat: add nourish schemas and response formatting"
```

## Task 3: Implement Nutrient And Portion Normalization

**Files:**
- Create: `src/services/nutrients.ts`
- Create: `src/services/portion-engine.ts`
- Create: `src/services/food-normalization.ts`
- Modify: `scripts/test-normalization.mjs`

- [ ] **Step 1: Extend failing normalization test**

Append this to `scripts/test-normalization.mjs` before the final log:

```js
const { scaleNutrients, roundNutrient } = await import("../dist/services/nutrients.js");
const { gramsForQuantity, nutrientsForGrams } = await import("../dist/services/portion-engine.js");

assert.equal(roundNutrient(12.345), 12.35);
assert.deepEqual(scaleNutrients({ calories_kcal: 100, protein_g: 10 }, 0.5), {
  calories_kcal: 50,
  protein_g: 5
});
assert.equal(gramsForQuantity(2, "g"), 2);
assert.equal(gramsForQuantity(1, "oz"), 28.35);
assert.deepEqual(nutrientsForGrams({ calories_kcal: 200, protein_g: 20 }, 50), {
  calories_kcal: 100,
  protein_g: 10
});
```

Run:

```bash
node scripts/test-normalization.mjs
```

Expected: FAIL because nutrient modules do not exist.

- [ ] **Step 2: Implement nutrient math**

Create `src/services/nutrients.ts`:

```ts
import type { NutrientMap } from "../types.js";

export function roundNutrient(value: number): number {
  return Math.round(value * 100) / 100;
}

export function scaleNutrients(nutrients: NutrientMap, factor: number): NutrientMap {
  const scaled: NutrientMap = {};
  for (const [key, value] of Object.entries(nutrients) as Array<[keyof NutrientMap, number | undefined]>) {
    if (typeof value === "number" && Number.isFinite(value)) {
      scaled[key] = roundNutrient(value * factor);
    }
  }
  return scaled;
}

export function addNutrients(items: NutrientMap[]): NutrientMap {
  const total: NutrientMap = {};
  for (const item of items) {
    for (const [key, value] of Object.entries(item) as Array<[keyof NutrientMap, number | undefined]>) {
      if (typeof value === "number" && Number.isFinite(value)) {
        total[key] = roundNutrient((total[key] ?? 0) + value);
      }
    }
  }
  return total;
}
```

- [ ] **Step 3: Implement portion engine**

Create `src/services/portion-engine.ts`:

```ts
import type { NutrientMap } from "../types.js";
import { scaleNutrients } from "./nutrients.js";

const UNIT_TO_GRAMS: Record<string, number> = {
  g: 1,
  gram: 1,
  grams: 1,
  kg: 1000,
  oz: 28.35,
  ounce: 28.35,
  ounces: 28.35,
  lb: 453.59,
  ml: 1,
  l: 1000
};

export function gramsForQuantity(quantity: number, unit: string, servingGrams?: number): number | undefined {
  const normalized = unit.trim().toLowerCase();
  if (normalized === "serving" && servingGrams) return round(quantity * servingGrams);
  const factor = UNIT_TO_GRAMS[normalized];
  if (!factor) return undefined;
  return round(quantity * factor);
}

export function nutrientsForGrams(per100g: NutrientMap, grams: number): NutrientMap {
  return scaleNutrients(per100g, grams / 100);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
```

- [ ] **Step 4: Implement normalizer shell**

Create `src/services/food-normalization.ts`:

```ts
import type { FoodItem } from "../types.js";

export function foodCompleteness(food: Pick<FoodItem, "nutrients_per_100g" | "serving" | "barcode">): "low" | "medium" | "high" {
  const nutrientCount = Object.values(food.nutrients_per_100g).filter((value) => typeof value === "number").length;
  if (nutrientCount >= 4 && food.serving && food.barcode) return "high";
  if (nutrientCount >= 3) return "medium";
  return "low";
}

export function makeFoodId(source: string, sourceId: string): string {
  return `${source}:${sourceId}`;
}
```

- [ ] **Step 5: Run normalization test**

Run:

```bash
node scripts/test-normalization.mjs
```

Expected: PASS with `normalization/schema smoke ok`.

- [ ] **Step 6: Commit normalization**

Run:

```bash
git add src/services/nutrients.ts src/services/portion-engine.ts src/services/food-normalization.ts scripts/test-normalization.mjs
git commit -m "feat: normalize nutrients and portions"
```

## Task 4: Implement USDA Provider

**Files:**
- Create: `src/services/config.ts`
- Create: `src/providers/usda.ts`
- Create: `fixtures/usda/search-banana.json`
- Create: `fixtures/usda/food-banana.json`
- Create: `scripts/test-providers.mjs`

- [ ] **Step 1: Add failing provider fixture test**

Create `scripts/test-providers.mjs`:

```js
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

process.env.NOURISH_FIXTURE_MODE = "1";
process.env.NOURISH_FIXTURE_DIR = join(root, "fixtures");

const { searchUsdaFoods, getUsdaFood } = await import("../dist/providers/usda.js");

const search = await searchUsdaFoods("banana", 5);
assert.equal(search.foods.length, 1);
assert.equal(search.foods[0].source, "usda");
assert.equal(search.foods[0].name, "Bananas, raw");
assert.equal(search.foods[0].nutrients_per_100g.calories_kcal, 89);

const detail = await getUsdaFood("173944");
assert.equal(detail.source_id, "173944");
assert.equal(detail.license.share_alike, false);

console.log("provider fixture tests ok");
```

Run:

```bash
node scripts/test-providers.mjs
```

Expected: FAIL because provider module is missing.

- [ ] **Step 2: Add USDA fixtures**

Create `fixtures/usda/search-banana.json`:

```json
{
  "foods": [
    {
      "fdcId": 173944,
      "description": "Bananas, raw",
      "dataType": "SR Legacy",
      "foodNutrients": [
        { "nutrientId": 1008, "value": 89 },
        { "nutrientId": 1003, "value": 1.09 },
        { "nutrientId": 1005, "value": 22.84 },
        { "nutrientId": 1004, "value": 0.33 },
        { "nutrientId": 1079, "value": 2.6 },
        { "nutrientId": 1063, "value": 12.23 }
      ]
    }
  ]
}
```

Create `fixtures/usda/food-banana.json`:

```json
{
  "fdcId": 173944,
  "description": "Bananas, raw",
  "dataType": "SR Legacy",
  "foodNutrients": [
    { "nutrient": { "id": 1008 }, "amount": 89 },
    { "nutrient": { "id": 1003 }, "amount": 1.09 },
    { "nutrient": { "id": 1005 }, "amount": 22.84 },
    { "nutrient": { "id": 1004 }, "amount": 0.33 },
    { "nutrient": { "id": 1079 }, "amount": 2.6 },
    { "nutrient": { "id": 1063 }, "amount": 12.23 }
  ],
  "foodPortions": [
    { "gramWeight": 118, "modifier": "1 medium" }
  ]
}
```

- [ ] **Step 3: Implement config resolution**

Create `src/services/config.ts`:

```ts
import { homedir } from "node:os";
import { join } from "node:path";
import { mkdirSync } from "node:fs";
import { LOCAL_DIR_NAME } from "../constants.js";
import type { NourishConfig } from "../types.js";

export function getConfig(): NourishConfig {
  const localDir = process.env.NOURISH_LOCAL_DIR ?? join(homedir(), LOCAL_DIR_NAME);
  mkdirSync(localDir, { recursive: true });
  return {
    local_dir: localDir,
    fixture_mode: process.env.NOURISH_FIXTURE_MODE === "1",
    usda_api_key: process.env.FDC_API_KEY || process.env.USDA_FDC_API_KEY,
    off_enabled: process.env.NOURISH_OFF_ENABLED !== "0",
    cache_ttl_seconds: Number(process.env.NOURISH_CACHE_TTL_SECONDS ?? 3600),
    max_results: Number(process.env.NOURISH_MAX_RESULTS ?? 20)
  };
}

export function getFixtureDir(): string {
  return process.env.NOURISH_FIXTURE_DIR ?? "fixtures";
}
```

- [ ] **Step 4: Implement USDA provider**

Create `src/providers/usda.ts`:

```ts
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { USDA_BASE_URL } from "../constants.js";
import type { FoodItem, NutrientMap } from "../types.js";
import { getConfig, getFixtureDir } from "../services/config.js";
import { foodCompleteness, makeFoodId } from "../services/food-normalization.js";

const USDA_NUTRIENTS: Record<number, keyof NutrientMap> = {
  1008: "calories_kcal",
  1003: "protein_g",
  1005: "carbohydrates_g",
  1004: "fat_g",
  1079: "fiber_g",
  1063: "sugar_g",
  1258: "saturated_fat_g",
  1093: "sodium_mg"
};

export async function searchUsdaFoods(query: string, limit = 10): Promise<{ foods: FoodItem[]; provider: "usda" }> {
  const config = getConfig();
  const json = config.fixture_mode
    ? await readJson(join(getFixtureDir(), "usda", "search-banana.json"))
    : await fetchUsda(`/foods/search?query=${encodeURIComponent(query)}&pageSize=${limit}&dataType=Foundation,SR Legacy`);
  const foods = (json.foods ?? []).slice(0, limit).map((food: unknown) => normalizeUsdaSearchFood(food as Record<string, unknown>));
  return { provider: "usda", foods };
}

export async function getUsdaFood(sourceId: string): Promise<FoodItem> {
  const config = getConfig();
  const json = config.fixture_mode
    ? await readJson(join(getFixtureDir(), "usda", "food-banana.json"))
    : await fetchUsda(`/food/${encodeURIComponent(sourceId)}`);
  return normalizeUsdaDetail(json as Record<string, unknown>);
}

async function fetchUsda(path: string): Promise<unknown> {
  const config = getConfig();
  const key = config.usda_api_key ?? "DEMO_KEY";
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${USDA_BASE_URL}${path}${separator}api_key=${encodeURIComponent(key)}`);
  if (!response.ok) throw new Error(`USDA request failed: ${response.status}`);
  return response.json();
}

async function readJson(path: string): Promise<unknown> {
  return JSON.parse(await readFile(path, "utf8"));
}

function normalizeUsdaSearchFood(food: Record<string, unknown>): FoodItem {
  const sourceId = String(food.fdcId);
  const nutrients = nutrientsFromSearch(food.foodNutrients);
  const item: FoodItem = {
    id: makeFoodId("usda", sourceId),
    source: "usda",
    source_id: sourceId,
    source_url: `https://fdc.nal.usda.gov/fdc-app.html#/food-details/${sourceId}/nutrients`,
    name: String(food.description ?? "Unknown USDA food"),
    brand: typeof food.brandName === "string" ? food.brandName : undefined,
    available_portions: [{ label: "100 g", quantity: 100, unit: "g", grams: 100 }],
    nutrients_per_100g: nutrients,
    data_quality: { completeness: "medium", confidence: 0.8, warnings: [] },
    license: {
      name: "USDA FoodData Central public domain / CC0-compatible data",
      attribution: "Food data sourced from USDA FoodData Central.",
      share_alike: false,
      url: "https://fdc.nal.usda.gov/"
    }
  };
  item.data_quality.completeness = foodCompleteness(item);
  return item;
}

function normalizeUsdaDetail(food: Record<string, unknown>): FoodItem {
  const item = normalizeUsdaSearchFood({
    fdcId: food.fdcId,
    description: food.description,
    foodNutrients: (food.foodNutrients as unknown[] | undefined)?.map((entry) => {
      const record = entry as Record<string, unknown>;
      const nutrient = record.nutrient as Record<string, unknown> | undefined;
      return { nutrientId: nutrient?.id, value: record.amount };
    }) ?? []
  });
  const portions = (food.foodPortions as unknown[] | undefined) ?? [];
  item.available_portions = [
    { label: "100 g", quantity: 100, unit: "g", grams: 100 },
    ...portions.map((portion) => {
      const record = portion as Record<string, unknown>;
      return {
        label: String(record.modifier ?? "serving"),
        quantity: 1,
        unit: "serving",
        grams: typeof record.gramWeight === "number" ? record.gramWeight : undefined
      };
    })
  ];
  return item;
}

function nutrientsFromSearch(raw: unknown): NutrientMap {
  const nutrients: NutrientMap = {};
  for (const entry of Array.isArray(raw) ? raw : []) {
    const record = entry as Record<string, unknown>;
    const nutrientId = Number(record.nutrientId);
    const key = USDA_NUTRIENTS[nutrientId];
    const value = typeof record.value === "number" ? record.value : Number(record.value);
    if (key && Number.isFinite(value)) nutrients[key] = value;
  }
  return nutrients;
}
```

- [ ] **Step 5: Run provider tests**

Run:

```bash
node scripts/test-providers.mjs
```

Expected: PASS with `provider fixture tests ok`.

- [ ] **Step 6: Commit USDA provider**

Run:

```bash
git add src/services/config.ts src/providers/usda.ts fixtures/usda scripts/test-providers.mjs
git commit -m "feat: add usda food provider"
```

## Task 5: Implement Open Food Facts Barcode Provider

**Files:**
- Create: `src/providers/open-food-facts.ts`
- Create: `fixtures/open-food-facts/barcode-peanut-butter.json`
- Modify: `scripts/test-providers.mjs`

- [ ] **Step 1: Extend failing provider test**

Append this to `scripts/test-providers.mjs` before the final log:

```js
const { lookupOpenFoodFactsBarcode } = await import("../dist/providers/open-food-facts.js");
const off = await lookupOpenFoodFactsBarcode("737628064502");
assert.equal(off.food.source, "open_food_facts");
assert.equal(off.food.barcode, "737628064502");
assert.equal(off.food.license.share_alike, true);
assert.match(off.food.license.attribution, /Open Food Facts/);
```

Run:

```bash
node scripts/test-providers.mjs
```

Expected: FAIL because OFF provider module is missing.

- [ ] **Step 2: Add OFF fixture**

Create `fixtures/open-food-facts/barcode-peanut-butter.json`:

```json
{
  "code": "737628064502",
  "status": 1,
  "product": {
    "code": "737628064502",
    "product_name": "Peanut Butter",
    "brands": "Fixture Foods",
    "url": "https://world.openfoodfacts.org/product/737628064502",
    "quantity": "454 g",
    "serving_size": "2 tbsp (32 g)",
    "serving_quantity": 32,
    "nutriments": {
      "energy-kcal_100g": 588,
      "proteins_100g": 25,
      "carbohydrates_100g": 20,
      "fat_100g": 50,
      "fiber_100g": 6,
      "sugars_100g": 9,
      "saturated-fat_100g": 10,
      "sodium_100g": 0.4
    }
  }
}
```

- [ ] **Step 3: Implement OFF provider**

Create `src/providers/open-food-facts.ts`:

```ts
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OFF_BASE_URL, USER_AGENT } from "../constants.js";
import type { FoodItem, NutrientMap } from "../types.js";
import { getConfig, getFixtureDir } from "../services/config.js";
import { foodCompleteness, makeFoodId } from "../services/food-normalization.js";
import { nutrientsForGrams } from "../services/portion-engine.js";

export async function lookupOpenFoodFactsBarcode(barcode: string): Promise<{ food: FoodItem; provider: "open_food_facts" }> {
  const config = getConfig();
  if (!config.off_enabled) throw new Error("Open Food Facts provider is disabled");
  const json = config.fixture_mode
    ? await readJson(join(getFixtureDir(), "open-food-facts", "barcode-peanut-butter.json"))
    : await fetchOff(`/api/v2/product/${encodeURIComponent(barcode)}?fields=code,product_name,brands,url,quantity,serving_size,serving_quantity,nutriments`);
  const product = (json as Record<string, unknown>).product as Record<string, unknown> | undefined;
  if (!product) throw new Error(`Open Food Facts product not found for barcode ${barcode}`);
  return { provider: "open_food_facts", food: normalizeOffProduct(product, barcode) };
}

async function fetchOff(path: string): Promise<unknown> {
  const response = await fetch(`${OFF_BASE_URL}${path}`, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Open Food Facts request failed: ${response.status}`);
  return response.json();
}

async function readJson(path: string): Promise<unknown> {
  return JSON.parse(await readFile(path, "utf8"));
}

function normalizeOffProduct(product: Record<string, unknown>, barcode: string): FoodItem {
  const sourceId = String(product.code ?? barcode);
  const nutrients = nutrientsFromOff(product.nutriments as Record<string, unknown> | undefined);
  const servingQuantity = typeof product.serving_quantity === "number" ? product.serving_quantity : undefined;
  const item: FoodItem = {
    id: makeFoodId("open_food_facts", sourceId),
    source: "open_food_facts",
    source_id: sourceId,
    source_url: typeof product.url === "string" ? product.url : `https://world.openfoodfacts.org/product/${sourceId}`,
    name: String(product.product_name ?? "Unknown packaged food"),
    brand: typeof product.brands === "string" ? product.brands : undefined,
    barcode: sourceId,
    serving: servingQuantity ? { quantity: 1, unit: "serving", grams: servingQuantity } : undefined,
    available_portions: [
      { label: "100 g", quantity: 100, unit: "g", grams: 100 },
      ...(servingQuantity ? [{ label: String(product.serving_size ?? "serving"), quantity: 1, unit: "serving", grams: servingQuantity }] : [])
    ],
    nutrients_per_100g: nutrients,
    nutrients_per_serving: servingQuantity ? nutrientsForGrams(nutrients, servingQuantity) : undefined,
    data_quality: { completeness: "medium", confidence: 0.75, warnings: [] },
    license: {
      name: "Open Food Facts ODbL",
      attribution: "Food data sourced from Open Food Facts. Open Food Facts data is available under ODbL.",
      share_alike: true,
      url: "https://world.openfoodfacts.org/"
    }
  };
  item.data_quality.completeness = foodCompleteness(item);
  return item;
}

function nutrientsFromOff(raw: Record<string, unknown> | undefined): NutrientMap {
  const source = raw ?? {};
  return {
    calories_kcal: numberValue(source["energy-kcal_100g"]),
    protein_g: numberValue(source.proteins_100g),
    carbohydrates_g: numberValue(source.carbohydrates_100g),
    fat_g: numberValue(source.fat_100g),
    fiber_g: numberValue(source.fiber_100g),
    sugar_g: numberValue(source.sugars_100g),
    saturated_fat_g: numberValue(source["saturated-fat_100g"]),
    sodium_mg: typeof source.sodium_100g === "number" ? source.sodium_100g * 1000 : undefined
  };
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
```

- [ ] **Step 4: Run provider tests**

Run:

```bash
node scripts/test-providers.mjs
```

Expected: PASS with `provider fixture tests ok`.

- [ ] **Step 5: Commit OFF provider**

Run:

```bash
git add src/providers/open-food-facts.ts fixtures/open-food-facts scripts/test-providers.mjs
git commit -m "feat: add open food facts barcode lookup"
```

## Task 6: Implement Local Intake Store

**Files:**
- Create: `src/services/intake-store.ts`
- Create: `scripts/test-intake-store.mjs`

- [ ] **Step 1: Add failing intake store test**

Create `scripts/test-intake-store.mjs`:

```js
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const localDir = await mkdtemp(join(tmpdir(), "nourish-store-"));
process.env.NOURISH_LOCAL_DIR = localDir;

const { addIntakeEntry, updateIntakeEntry, listIntakeEntries, deleteIntakeEntry, exportIntakeData } = await import("../dist/services/intake-store.js");

const entry = await addIntakeEntry({
  meal_type: "breakfast",
  quantity: 100,
  unit: "g",
  nutrients: { calories_kcal: 89, protein_g: 1.09 },
  confidence: 0.9,
  source_trace: "manual",
  tags: ["fixture"],
  wellness_context_refs: []
});

assert.equal(entry.meal_type, "breakfast");
assert.match(entry.id, /^intake_/);

const entries = await listIntakeEntries({ date: entry.date });
assert.equal(entries.length, 1);

const updated = await updateIntakeEntry(entry.id, { meal_type: "snack", quantity: 125, notes: "updated fixture" });
assert.equal(updated.meal_type, "snack");
assert.equal(updated.quantity, 125);
assert.equal(updated.notes, "updated fixture");

const exported = await exportIntakeData();
assert.match(exported, /snack/);

const deleted = await deleteIntakeEntry(entry.id);
assert.equal(deleted, true);
assert.equal((await listIntakeEntries({ date: entry.date })).length, 0);

await rm(localDir, { recursive: true, force: true });
console.log("intake store tests ok");
```

Run:

```bash
node scripts/test-intake-store.mjs
```

Expected: FAIL because intake store is missing.

- [ ] **Step 2: Implement JSONL intake store**

Create `src/services/intake-store.ts`:

```ts
import { appendFile, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import type { IntakeEntry, MealType, NutrientMap } from "../types.js";
import { getConfig } from "./config.js";

interface AddEntryInput {
  meal_type: MealType;
  quantity: number;
  unit: string;
  nutrients: NutrientMap;
  confidence: number;
  source_trace: IntakeEntry["source_trace"];
  notes?: string;
  tags: string[];
  wellness_context_refs: string[];
  timestamp?: string;
  grams_estimate?: number;
  food_ref?: IntakeEntry["food_ref"];
  custom_food?: IntakeEntry["custom_food"];
}

export async function addIntakeEntry(input: AddEntryInput): Promise<IntakeEntry> {
  const timestamp = input.timestamp ?? new Date().toISOString();
  const entry: IntakeEntry = {
    id: `intake_${randomUUID()}`,
    timestamp,
    date: timestamp.slice(0, 10),
    meal_type: input.meal_type,
    food_ref: input.food_ref,
    custom_food: input.custom_food,
    quantity: input.quantity,
    unit: input.unit,
    grams_estimate: input.grams_estimate,
    nutrients: input.nutrients,
    confidence: input.confidence,
    source_trace: input.source_trace,
    notes: input.notes,
    tags: input.tags,
    wellness_context_refs: input.wellness_context_refs
  };
  await appendFile(await storePath(), `${JSON.stringify(entry)}\n`, "utf8");
  return entry;
}

export async function listIntakeEntries(filter: { date?: string } = {}): Promise<IntakeEntry[]> {
  const entries = await readEntries();
  return filter.date ? entries.filter((entry) => entry.date === filter.date) : entries;
}

export async function updateIntakeEntry(id: string, patch: Partial<Pick<IntakeEntry, "meal_type" | "quantity" | "unit" | "timestamp" | "notes" | "tags">>): Promise<IntakeEntry> {
  const path = await storePath();
  const entries = await readEntries();
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) throw new Error(`Intake entry not found: ${id}`);
  const existing = entries[index];
  const timestamp = patch.timestamp ?? existing.timestamp;
  const updated: IntakeEntry = {
    ...existing,
    ...patch,
    timestamp,
    date: timestamp.slice(0, 10),
    tags: patch.tags ?? existing.tags
  };
  entries[index] = updated;
  const tmp = `${path}.tmp`;
  await writeFile(tmp, entries.map((entry) => JSON.stringify(entry)).join("\n") + "\n", "utf8");
  await rename(tmp, path);
  return updated;
}

export async function deleteIntakeEntry(id: string): Promise<boolean> {
  const path = await storePath();
  const entries = await readEntries();
  const kept = entries.filter((entry) => entry.id !== id);
  if (kept.length === entries.length) return false;
  const tmp = `${path}.tmp`;
  await writeFile(tmp, kept.map((entry) => JSON.stringify(entry)).join("\n") + (kept.length ? "\n" : ""), "utf8");
  await rename(tmp, path);
  return true;
}

export async function exportIntakeData(): Promise<string> {
  const path = await storePath();
  return existsSync(path) ? readFile(path, "utf8") : "";
}

async function readEntries(): Promise<IntakeEntry[]> {
  const path = await storePath();
  if (!existsSync(path)) return [];
  const raw = await readFile(path, "utf8");
  return raw.split("\n").filter(Boolean).map((line) => JSON.parse(line) as IntakeEntry);
}

async function storePath(): Promise<string> {
  const config = getConfig();
  await mkdir(config.local_dir, { recursive: true });
  return join(config.local_dir, "intake.jsonl");
}
```

- [ ] **Step 3: Run intake store tests**

Run:

```bash
node scripts/test-intake-store.mjs
```

Expected: PASS with `intake store tests ok`.

- [ ] **Step 4: Commit intake store**

Run:

```bash
git add src/services/intake-store.ts scripts/test-intake-store.mjs
git commit -m "feat: add local intake store"
```

## Task 7: Implement Meal Estimator And Summaries

**Files:**
- Create: `src/services/meal-estimator.ts`
- Create: `src/services/summary.ts`
- Create: `scripts/test-meal-estimator.mjs`
- Create: `scripts/test-summary.mjs`

- [ ] **Step 1: Add failing meal estimator test**

Create `scripts/test-meal-estimator.mjs`:

```js
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const { estimateMeal } = await import("../dist/services/meal-estimator.js");

const estimate = await estimateMeal({ text: "2 eggs and 1 banana", meal_type: "breakfast", locale: "en-US" });
assert.equal(estimate.items.length, 2);
assert.equal(estimate.meal_type, "breakfast");
assert.ok(estimate.total_nutrients.calories_kcal > 200);
assert.ok(estimate.confidence < 1);
assert.match(estimate.warnings.join(" "), /estimate/i);

console.log("meal estimator tests ok");
```

Run:

```bash
node scripts/test-meal-estimator.mjs
```

Expected: FAIL because meal estimator is missing.

- [ ] **Step 2: Implement deterministic estimator**

Create `src/services/meal-estimator.ts`:

```ts
import type { MealType, NutrientMap } from "../types.js";
import { addNutrients, scaleNutrients } from "./nutrients.js";

const SIMPLE_FOODS: Record<string, { grams: number; per100g: NutrientMap }> = {
  egg: { grams: 50, per100g: { calories_kcal: 143, protein_g: 12.6, carbohydrates_g: 0.7, fat_g: 9.5 } },
  eggs: { grams: 50, per100g: { calories_kcal: 143, protein_g: 12.6, carbohydrates_g: 0.7, fat_g: 9.5 } },
  banana: { grams: 118, per100g: { calories_kcal: 89, protein_g: 1.09, carbohydrates_g: 22.84, fat_g: 0.33, fiber_g: 2.6, sugar_g: 12.23 } },
  toast: { grams: 30, per100g: { calories_kcal: 313, protein_g: 13, carbohydrates_g: 55, fat_g: 4 } }
};

export async function estimateMeal(input: { text: string; meal_type: MealType; locale: string }) {
  const lower = input.text.toLowerCase();
  const items = Object.entries(SIMPLE_FOODS)
    .filter(([name]) => new RegExp(`\\b${name}\\b`).test(lower))
    .map(([name, food]) => {
      const match = lower.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s+${name}\\b`));
      const quantity = match ? Number(match[1]) : 1;
      const grams = quantity * food.grams;
      return {
        name,
        quantity,
        unit: "serving",
        grams_estimate: grams,
        nutrients: scaleNutrients(food.per100g, grams / 100),
        confidence: 0.55
      };
    });
  const warnings = ["Natural-language meal parsing is an estimate; confirm before logging."];
  return {
    text: input.text,
    locale: input.locale,
    meal_type: input.meal_type,
    items,
    total_nutrients: addNutrients(items.map((item) => item.nutrients)),
    confidence: items.length ? 0.55 : 0.2,
    unresolved: items.length ? [] : [input.text],
    warnings
  };
}
```

- [ ] **Step 3: Add failing summary test**

Create `scripts/test-summary.mjs`:

```js
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const localDir = await mkdtemp(join(tmpdir(), "nourish-summary-"));
process.env.NOURISH_LOCAL_DIR = localDir;

const { addIntakeEntry } = await import("../dist/services/intake-store.js");
const { buildDailySummary } = await import("../dist/services/summary.js");

await addIntakeEntry({
  meal_type: "breakfast",
  quantity: 100,
  unit: "g",
  nutrients: { calories_kcal: 89, protein_g: 1 },
  confidence: 0.9,
  source_trace: "manual",
  tags: [],
  wellness_context_refs: [],
  timestamp: "2026-05-05T10:00:00.000Z"
});

const summary = await buildDailySummary("2026-05-05");
assert.equal(summary.date, "2026-05-05");
assert.equal(summary.entry_count, 1);
assert.equal(summary.total_nutrients.calories_kcal, 89);
assert.equal(summary.by_meal.breakfast.calories_kcal, 89);

await rm(localDir, { recursive: true, force: true });
console.log("summary tests ok");
```

Run:

```bash
node scripts/test-summary.mjs
```

Expected: FAIL because summary service is missing.

- [ ] **Step 4: Implement summary service**

Create `src/services/summary.ts`:

```ts
import type { MealType, NutrientMap } from "../types.js";
import { addNutrients } from "./nutrients.js";
import { listIntakeEntries } from "./intake-store.js";

export async function buildDailySummary(date = new Date().toISOString().slice(0, 10)) {
  const entries = await listIntakeEntries({ date });
  const byMeal: Record<MealType, NutrientMap> = {
    breakfast: {},
    lunch: {},
    dinner: {},
    snack: {},
    other: {}
  };
  for (const meal of Object.keys(byMeal) as MealType[]) {
    byMeal[meal] = addNutrients(entries.filter((entry) => entry.meal_type === meal).map((entry) => entry.nutrients));
  }
  return {
    date,
    entry_count: entries.length,
    total_nutrients: addNutrients(entries.map((entry) => entry.nutrients)),
    by_meal: byMeal,
    confidence: entries.length ? average(entries.map((entry) => entry.confidence)) : 0,
    source_coverage: [...new Set(entries.map((entry) => entry.source_trace))]
  };
}

export async function buildWeeklySummary(startDate?: string) {
  const start = startDate ?? new Date().toISOString().slice(0, 10);
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(`${start}T00:00:00.000Z`);
    date.setUTCDate(date.getUTCDate() + i);
    days.push(await buildDailySummary(date.toISOString().slice(0, 10)));
  }
  return {
    start_date: start,
    days,
    total_nutrients: addNutrients(days.map((day) => day.total_nutrients)),
    entry_count: days.reduce((sum, day) => sum + day.entry_count, 0)
  };
}

function average(values: number[]): number {
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 100) / 100;
}
```

- [ ] **Step 5: Run estimator and summary tests**

Run:

```bash
node scripts/test-meal-estimator.mjs
node scripts/test-summary.mjs
```

Expected: both PASS.

- [ ] **Step 6: Commit estimator and summaries**

Run:

```bash
git add src/services/meal-estimator.ts src/services/summary.ts scripts/test-meal-estimator.mjs scripts/test-summary.mjs
git commit -m "feat: add meal estimates and nutrition summaries"
```

## Task 8: Implement Agent Metadata Services

**Files:**
- Create: `src/services/agent-manifest.ts`
- Create: `src/services/capabilities.ts`
- Create: `src/services/privacy-audit.ts`
- Create: `src/services/connection-status.ts`
- Create: `scripts/agent-readiness-test.mjs`
- Create: `scripts/hermes-agent-manifest-test.mjs`
- Create: `scripts/privacy-redaction-test.mjs`

- [ ] **Step 1: Add failing agent readiness test**

Create `scripts/agent-readiness-test.mjs`:

```js
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const { buildAgentManifest } = await import("../dist/services/agent-manifest.js");
const manifest = buildAgentManifest("codex");

assert.equal(manifest.name, "nourish-mcp");
assert.ok(manifest.supported_clients.includes("codex"));
assert.ok(manifest.tools.includes("nourish_search_food"));
assert.ok(manifest.agent_rules.some((rule) => /confirmation/.test(rule)));
assert.ok(manifest.agent_rules.some((rule) => /medical advice/.test(rule)));

console.log("agent readiness ok");
```

Run:

```bash
node scripts/agent-readiness-test.mjs
```

Expected: FAIL because manifest service is missing.

- [ ] **Step 2: Implement capabilities, privacy, status, and manifest**

Create `src/services/capabilities.ts`:

```ts
export function buildCapabilities() {
  return {
    project: "Nourish MCP",
    role: "nutrition intelligence adapter for agents and local-first humans",
    providers: {
      primary: "USDA FoodData Central",
      optional_barcode: "Open Food Facts",
      bulk_imports: "OpenNutrition/Open Food Facts imports are separate opt-in flows"
    },
    workflows: [
      "food search",
      "barcode lookup",
      "meal estimation",
      "local intake logging",
      "daily and weekly summaries",
      "wearable-aware wellness context"
    ],
    recommended_first_tools: ["nourish_connection_status", "nourish_capabilities", "nourish_search_food"]
  };
}
```

Create `src/services/privacy-audit.ts`:

```ts
import { getConfig } from "./config.js";

export function buildPrivacyAudit() {
  const config = getConfig();
  return {
    local_storage: config.local_dir,
    personal_data: "intake logs only when the user explicitly logs meals",
    secrets_returned_by_tools: false,
    raw_provider_tokens_returned_by_tools: false,
    default_search_mode: "read-only",
    deletion: "nourish_delete_intake removes precise local entries by id; CLI export/delete commands expose user controls",
    medical_boundary: "Not medical advice, diagnosis, treatment, or emergency support.",
    source_license_boundary: "USDA data is primary; Open Food Facts results carry ODbL attribution and share-alike metadata."
  };
}
```

Create `src/services/connection-status.ts`:

```ts
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getConfig } from "./config.js";

export async function buildConnectionStatus() {
  const config = getConfig();
  const intakePath = join(config.local_dir, "intake.jsonl");
  return {
    ok: true,
    fixture_mode: config.fixture_mode,
    local_dir: config.local_dir,
    intake_store_exists: existsSync(intakePath),
    usda_api_key_configured: Boolean(config.usda_api_key),
    usda_mode: config.usda_api_key ? "api_key" : "demo_key_or_fixture",
    open_food_facts_enabled: config.off_enabled,
    cache_ttl_seconds: config.cache_ttl_seconds,
    max_results: config.max_results,
    next_steps: ["Use nourish_search_food for generic foods.", "Use nourish_lookup_barcode for packaged foods.", "Confirm before logging estimated meals."]
  };
}
```

Create `src/services/agent-manifest.ts`:

```ts
import { SERVER_NAME, SERVER_VERSION } from "../constants.js";
import { buildPrivacyAudit } from "./privacy-audit.js";

export function buildAgentManifest(client: string) {
  return {
    name: SERVER_NAME,
    version: SERVER_VERSION,
    client,
    supported_clients: ["claude", "codex", "cursor", "windsurf", "hermes", "openclaw", "generic"],
    install: {
      command: "npx",
      args: ["-y", "wellness-nourish"],
      optional_env: ["FDC_API_KEY", "NOURISH_OFF_ENABLED", "NOURISH_LOCAL_DIR"]
    },
    recommended_first_calls: ["nourish_connection_status", "nourish_capabilities", "nourish_search_food"],
    tools: [
      "nourish_agent_manifest",
      "nourish_capabilities",
      "nourish_connection_status",
      "nourish_privacy_audit",
      "nourish_search_food",
      "nourish_lookup_barcode",
      "nourish_get_food",
      "nourish_estimate_meal",
      "nourish_log_intake",
      "nourish_update_intake",
      "nourish_delete_intake",
      "nourish_daily_summary",
      "nourish_weekly_summary",
      "nourish_export_data"
    ],
    resources: ["nourish://agent-manifest", "nourish://capabilities", "nourish://privacy-audit", "nourish://usage-guide"],
    hermes: {
      tool_name_prefix: "mcp_nourish_",
      reload_after_config_change: "/reload-mcp or hermes mcp test nourish",
      use_direct_tools: true,
      avoid_terminal_workarounds: true
    },
    agent_rules: [
      "Call nourish_connection_status before provider-backed tools.",
      "Use nourish_search_food or nourish_lookup_barcode for exact food matching before estimating.",
      "Treat nourish_estimate_meal output as uncertain and preserve confidence in user-facing responses.",
      "Ask for confirmation before nourish_log_intake unless the user explicitly requested meal logging.",
      "Never ask users to paste API keys, raw health exports, provider tokens, or private food logs into chat.",
      "Nutrition summaries are wellness context, not medical advice, diagnosis, treatment, or emergency support.",
      "Preserve source, license, attribution, and share_alike fields when reusing food data."
    ],
    privacy: buildPrivacyAudit()
  };
}
```

- [ ] **Step 3: Add Hermes and privacy tests**

Create `scripts/hermes-agent-manifest-test.mjs`:

```js
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const { buildAgentManifest } = await import("../dist/services/agent-manifest.js");
const manifest = buildAgentManifest("hermes");

assert.equal(manifest.hermes.tool_name_prefix, "mcp_nourish_");
assert.equal(manifest.hermes.use_direct_tools, true);
assert.match(manifest.hermes.reload_after_config_change, /hermes mcp test nourish/);

console.log("hermes manifest ok");
```

Create `scripts/privacy-redaction-test.mjs`:

```js
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

process.env.FDC_API_KEY = "SECRET_SHOULD_NOT_LEAK";
const { buildPrivacyAudit } = await import("../dist/services/privacy-audit.js");
const { buildAgentManifest } = await import("../dist/services/agent-manifest.js");

const output = JSON.stringify({ audit: buildPrivacyAudit(), manifest: buildAgentManifest("codex") });
assert.equal(output.includes("SECRET_SHOULD_NOT_LEAK"), false);
assert.equal(output.includes("raw health exports"), true);

console.log("privacy redaction ok");
```

- [ ] **Step 4: Run metadata tests**

Run:

```bash
node scripts/agent-readiness-test.mjs
node scripts/hermes-agent-manifest-test.mjs
node scripts/privacy-redaction-test.mjs
```

Expected: all PASS.

- [ ] **Step 5: Commit agent metadata**

Run:

```bash
git add src/services/agent-manifest.ts src/services/capabilities.ts src/services/privacy-audit.ts src/services/connection-status.ts scripts/agent-readiness-test.mjs scripts/hermes-agent-manifest-test.mjs scripts/privacy-redaction-test.mjs
git commit -m "feat: add agent readiness metadata"
```

## Task 9: Register MCP Tools, Resources, Prompts, And Transports

**Files:**
- Create: `src/tools/nourish-tools.ts`
- Create: `src/resources/nourish-resources.ts`
- Create: `src/prompts/nourish-prompts.ts`
- Create: `src/index.ts`
- Create: `scripts/smoke-tools.mjs`
- Create: `scripts/smoke-http.mjs`

- [ ] **Step 1: Add failing smoke tests**

Create `scripts/smoke-tools.mjs`:

```js
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const child = spawn("node", ["dist/index.js"], { cwd: root, stdio: ["pipe", "pipe", "pipe"], env: { ...process.env, NOURISH_FIXTURE_MODE: "1", NOURISH_FIXTURE_DIR: join(root, "fixtures") } });
const messages = [];
child.stdout.on("data", (chunk) => messages.push(chunk.toString()));

child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "smoke", version: "0" } } }) + "\n");
child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized", params: {} }) + "\n");
child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }) + "\n");

await new Promise((resolve) => setTimeout(resolve, 1000));
child.kill();
const output = messages.join("");
assert.match(output, /nourish_search_food/);
assert.match(output, /nourish_agent_manifest/);

console.log("stdio tool smoke ok");
```

Create `scripts/smoke-http.mjs`:

```js
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const port = "3321";
const child = spawn("node", ["dist/index.js", "--http"], {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, NOURISH_MCP_PORT: port, NOURISH_FIXTURE_MODE: "1", NOURISH_FIXTURE_DIR: join(root, "fixtures") }
});

await new Promise((resolve) => setTimeout(resolve, 1000));
const health = await fetch(`http://127.0.0.1:${port}/health`).then((res) => res.json());
assert.equal(health.ok, true);
assert.equal(health.name, "nourish-mcp");

child.kill();
console.log("http smoke ok");
```

Run:

```bash
node scripts/smoke-tools.mjs
node scripts/smoke-http.mjs
```

Expected: FAIL because `src/index.ts` is missing.

- [ ] **Step 2: Implement MCP tools**

Create `src/tools/nourish-tools.ts` with tool registration mirroring the existing connector pattern. The first implementation must include all required tool names and can delegate to existing services:

```ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  AgentManifestInputSchema,
  BarcodeLookupInputSchema,
  FoodGetInputSchema,
  FoodSearchInputSchema,
  IntakeDeleteInputSchema,
  IntakeLogInputSchema,
  IntakeUpdateInputSchema,
  ResponseOnlyInputSchema,
  SummaryInputSchema,
  WeeklySummaryInputSchema,
  MealEstimateInputSchema
} from "../schemas/common.js";
import { buildAgentManifest } from "../services/agent-manifest.js";
import { buildCapabilities } from "../services/capabilities.js";
import { buildConnectionStatus } from "../services/connection-status.js";
import { buildPrivacyAudit } from "../services/privacy-audit.js";
import { makeResponse, makeError, bulletList, compactTable } from "../services/format.js";
import { searchUsdaFoods, getUsdaFood } from "../providers/usda.js";
import { lookupOpenFoodFactsBarcode } from "../providers/open-food-facts.js";
import { estimateMeal } from "../services/meal-estimator.js";
import { addIntakeEntry, updateIntakeEntry, deleteIntakeEntry, exportIntakeData } from "../services/intake-store.js";
import { buildDailySummary, buildWeeklySummary } from "../services/summary.js";

export function registerNourishTools(server: McpServer): void {
  server.registerTool("nourish_agent_manifest", { title: "Nourish Agent Manifest", description: "Machine-readable install, runtime, privacy and safety rules for agents.", inputSchema: AgentManifestInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } }, async ({ client, response_format }) => {
    const manifest = buildAgentManifest(client);
    return makeResponse(manifest, response_format, bulletList("Nourish MCP Agent Manifest", { name: manifest.name, version: manifest.version, client, first_tools: manifest.recommended_first_calls.join(", ") }));
  });

  server.registerTool("nourish_capabilities", { title: "Nourish Capabilities", description: "Explain nutrition providers, workflows, local storage and agent usage.", inputSchema: ResponseOnlyInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } }, async ({ response_format }) => {
    const capabilities = buildCapabilities();
    return makeResponse(capabilities, response_format, bulletList("Nourish Capabilities", capabilities as Record<string, unknown>));
  });

  server.registerTool("nourish_connection_status", { title: "Nourish Connection Status", description: "Check local config, provider status and local intake store posture.", inputSchema: ResponseOnlyInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true } }, async ({ response_format }) => {
    const status = await buildConnectionStatus();
    return makeResponse(status, response_format, bulletList("Nourish Connection Status", status));
  });

  server.registerTool("nourish_privacy_audit", { title: "Nourish Privacy Audit", description: "Return local storage, deletion, attribution and safety boundaries.", inputSchema: ResponseOnlyInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } }, async ({ response_format }) => {
    const audit = buildPrivacyAudit();
    return makeResponse(audit, response_format, bulletList("Nourish Privacy Audit", audit));
  });

  server.registerTool("nourish_search_food", { title: "Search Food", description: "Search normalized foods across enabled providers with source and license metadata.", inputSchema: FoodSearchInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true } }, async (params) => {
    try {
      const result = await searchUsdaFoods(params.query, params.limit);
      return makeResponse(result, params.response_format, compactTable("Food Search Results", result.foods.map((food) => ({ name: food.name, source: food.source, calories: food.nutrients_per_100g.calories_kcal, protein: food.nutrients_per_100g.protein_g }))));
    } catch (error) {
      return makeError((error as Error).message);
    }
  });

  server.registerTool("nourish_lookup_barcode", { title: "Lookup Barcode", description: "Resolve packaged food with Open Food Facts and return attribution.", inputSchema: BarcodeLookupInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true } }, async (params) => {
    try {
      const result = await lookupOpenFoodFactsBarcode(params.barcode);
      return makeResponse(result, params.response_format, bulletList("Barcode Lookup", { name: result.food.name, brand: result.food.brand, source: result.food.source, license: result.food.license.name }));
    } catch (error) {
      return makeError((error as Error).message);
    }
  });

  server.registerTool("nourish_get_food", { title: "Get Food", description: "Get one normalized food by source and source id.", inputSchema: FoodGetInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true } }, async (params) => {
    try {
      const food = params.source === "usda" ? await getUsdaFood(params.source_id) : (await lookupOpenFoodFactsBarcode(params.source_id)).food;
      return makeResponse({ food }, params.response_format, bulletList("Food Detail", { name: food.name, source: food.source, calories_per_100g: food.nutrients_per_100g.calories_kcal }));
    } catch (error) {
      return makeError((error as Error).message);
    }
  });

  server.registerTool("nourish_estimate_meal", { title: "Estimate Meal", description: "Estimate calories and macros from natural-language meal text with confidence and warnings.", inputSchema: MealEstimateInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true } }, async (params) => {
    const estimate = await estimateMeal(params);
    return makeResponse(estimate, params.response_format, bulletList("Meal Estimate", { meal_type: estimate.meal_type, items: estimate.items.length, calories: estimate.total_nutrients.calories_kcal, confidence: estimate.confidence }));
  });

  server.registerTool("nourish_log_intake", { title: "Log Intake", description: "Add a local meal/intake entry. Requires explicit user intent.", inputSchema: IntakeLogInputSchema.shape, annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false } }, async (params) => {
    if (!params.explicit_user_intent) return makeError("Refusing to log intake without explicit_user_intent=true.");
    const estimate = params.text ? await estimateMeal({ text: params.text, meal_type: params.meal_type, locale: "en-US" }) : undefined;
    const entry = await addIntakeEntry({ meal_type: params.meal_type, quantity: params.quantity ?? 1, unit: params.unit ?? "meal", nutrients: estimate?.total_nutrients ?? {}, confidence: estimate?.confidence ?? 0.5, source_trace: params.text ? "estimate" : "manual", notes: params.notes, tags: params.tags, wellness_context_refs: [] });
    return makeResponse({ entry }, params.response_format, bulletList("Logged Intake", { id: entry.id, meal_type: entry.meal_type, calories: entry.nutrients.calories_kcal }));
  });

  server.registerTool("nourish_update_intake", { title: "Update Intake", description: "Edit local intake metadata by id.", inputSchema: IntakeUpdateInputSchema.shape, annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false } }, async (params) => {
    try {
      const entry = await updateIntakeEntry(params.id, { meal_type: params.meal_type, quantity: params.quantity, unit: params.unit, timestamp: params.timestamp, notes: params.notes, tags: params.tags });
      return makeResponse({ entry }, params.response_format, bulletList("Updated Intake", { id: entry.id, meal_type: entry.meal_type, quantity: entry.quantity, unit: entry.unit }));
    } catch (error) {
      return makeError((error as Error).message);
    }
  });

  server.registerTool("nourish_delete_intake", { title: "Delete Intake", description: "Delete one local intake entry by precise id.", inputSchema: IntakeDeleteInputSchema.shape, annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false } }, async (params) => {
    const deleted = await deleteIntakeEntry(params.id);
    return makeResponse({ deleted, id: params.id }, params.response_format, bulletList("Delete Intake", { id: params.id, deleted }));
  });

  server.registerTool("nourish_daily_summary", { title: "Daily Nutrition Summary", description: "Return daily calories, macros, meal breakdown, confidence and source coverage.", inputSchema: SummaryInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } }, async (params) => {
    const summary = await buildDailySummary(params.date);
    return makeResponse(summary, params.response_format, bulletList("Daily Nutrition Summary", { date: summary.date, entries: summary.entry_count, calories: summary.total_nutrients.calories_kcal, confidence: summary.confidence }));
  });

  server.registerTool("nourish_weekly_summary", { title: "Weekly Nutrition Summary", description: "Return seven-day nutrition trend summary.", inputSchema: WeeklySummaryInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } }, async (params) => {
    const summary = await buildWeeklySummary(params.start_date);
    return makeResponse(summary, params.response_format, bulletList("Weekly Nutrition Summary", { start_date: summary.start_date, entries: summary.entry_count, calories: summary.total_nutrients.calories_kcal }));
  });

  server.registerTool("nourish_export_data", { title: "Export Nourish Data", description: "Export local intake JSONL for the user.", inputSchema: ResponseOnlyInputSchema.shape, annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } }, async ({ response_format }) => {
    const jsonl = await exportIntakeData();
    return makeResponse({ jsonl }, response_format, `# Nourish Export\n\n\`\`\`jsonl\n${jsonl}\n\`\`\``);
  });
}
```

- [ ] **Step 3: Implement resources and prompts**

Create `src/resources/nourish-resources.ts`:

```ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { buildAgentManifest } from "../services/agent-manifest.js";
import { buildCapabilities } from "../services/capabilities.js";
import { buildPrivacyAudit } from "../services/privacy-audit.js";

export function registerNourishResources(server: McpServer): void {
  server.registerResource("nourish-agent-manifest", "nourish://agent-manifest", { title: "Nourish Agent Manifest", mimeType: "application/json" }, async () => ({
    contents: [{ uri: "nourish://agent-manifest", mimeType: "application/json", text: JSON.stringify(buildAgentManifest("generic"), null, 2) }]
  }));
  server.registerResource("nourish-capabilities", "nourish://capabilities", { title: "Nourish Capabilities", mimeType: "application/json" }, async () => ({
    contents: [{ uri: "nourish://capabilities", mimeType: "application/json", text: JSON.stringify(buildCapabilities(), null, 2) }]
  }));
  server.registerResource("nourish-privacy-audit", "nourish://privacy-audit", { title: "Nourish Privacy Audit", mimeType: "application/json" }, async () => ({
    contents: [{ uri: "nourish://privacy-audit", mimeType: "application/json", text: JSON.stringify(buildPrivacyAudit(), null, 2) }]
  }));
}
```

Create `src/prompts/nourish-prompts.ts`:

```ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerNourishPrompts(server: McpServer): void {
  server.registerPrompt("nourish_daily_review", {
    title: "Nourish Daily Review",
    description: "Review today's nutrition summary with uncertainty and source attribution."
  }, async () => ({
    messages: [
      {
        role: "user",
        content: { type: "text", text: "Call nourish_daily_summary, preserve confidence/source coverage, and give a concise wellness-context summary without medical advice." }
      }
    ]
  }));
}
```

- [ ] **Step 4: Implement entrypoint**

Create `src/index.ts`:

```ts
#!/usr/bin/env node
import cors from "cors";
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { DEFAULT_HOST, DEFAULT_PORT, SERVER_NAME, SERVER_VERSION } from "./constants.js";
import { registerNourishTools } from "./tools/nourish-tools.js";
import { registerNourishResources } from "./resources/nourish-resources.js";
import { registerNourishPrompts } from "./prompts/nourish-prompts.js";

function createServer(): McpServer {
  const server = new McpServer({ name: SERVER_NAME, version: SERVER_VERSION });
  registerNourishTools(server);
  registerNourishResources(server);
  registerNourishPrompts(server);
  return server;
}

async function runStdio(): Promise<void> {
  const server = createServer();
  await server.connect(new StdioServerTransport());
}

async function runHttp(): Promise<void> {
  const app = express();
  const host = process.env.NOURISH_MCP_HOST ?? DEFAULT_HOST;
  const port = Number(process.env.NOURISH_MCP_PORT ?? DEFAULT_PORT);
  const allowedOrigin = process.env.NOURISH_MCP_ALLOWED_ORIGIN ?? `http://${host}:${port}`;
  app.use(express.json({ limit: "1mb" }));
  app.use(cors({ origin: allowedOrigin }));
  app.get("/health", (_req, res) => res.json({ ok: true, name: SERVER_NAME, version: SERVER_VERSION }));
  app.post("/mcp", async (req, res) => {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    res.on("close", () => {
      transport.close().catch(() => undefined);
      server.close().catch(() => undefined);
    });
    try {
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("MCP HTTP request failed:", error);
      if (!res.headersSent) res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
    }
  });
  app.listen(port, host, () => console.error(`${SERVER_NAME} HTTP transport listening on http://${host}:${port}/mcp`));
}

const args = new Set(process.argv.slice(2));
const transport = process.env.NOURISH_MCP_TRANSPORT ?? (args.has("--http") ? "http" : "stdio");
if (transport === "http") await runHttp();
else await runStdio();
```

- [ ] **Step 5: Run smoke tests**

Run:

```bash
node scripts/smoke-tools.mjs
node scripts/smoke-http.mjs
```

Expected: both PASS.

- [ ] **Step 6: Commit MCP server**

Run:

```bash
git add src/tools src/resources src/prompts src/index.ts scripts/smoke-tools.mjs scripts/smoke-http.mjs
git commit -m "feat: expose nourish mcp tools"
```

## Task 10: Implement CLI UX And Documentation

**Files:**
- Create: `src/cli/commands.ts`
- Modify: `src/index.ts`
- Create: `scripts/cli-ux-test.mjs`
- Create: `README.md`
- Create: `SECURITY.md`
- Create: `LICENSE`
- Create: `server.json`

- [ ] **Step 1: Add failing CLI test**

Create `scripts/cli-ux-test.mjs`:

```js
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });

const env = { ...process.env, NOURISH_FIXTURE_MODE: "1", NOURISH_FIXTURE_DIR: join(root, "fixtures") };

const status = execFileSync("node", ["dist/index.js", "status"], { cwd: root, env }).toString();
assert.match(status, /Nourish MCP/);
assert.match(status, /open_food_facts_enabled/);

const search = execFileSync("node", ["dist/index.js", "search", "banana"], { cwd: root, env }).toString();
assert.match(search, /Bananas, raw/);

console.log("cli ux ok");
```

Run:

```bash
node scripts/cli-ux-test.mjs
```

Expected: FAIL because CLI dispatch is missing.

- [ ] **Step 2: Implement CLI commands**

Create `src/cli/commands.ts`:

```ts
import { buildConnectionStatus } from "../services/connection-status.js";
import { searchUsdaFoods } from "../providers/usda.js";
import { lookupOpenFoodFactsBarcode } from "../providers/open-food-facts.js";
import { estimateMeal } from "../services/meal-estimator.js";
import { addIntakeEntry, deleteIntakeEntry, exportIntakeData } from "../services/intake-store.js";
import { buildDailySummary } from "../services/summary.js";

export async function runCliCommand(args: string[]): Promise<number | undefined> {
  const [command, ...rest] = args;
  if (!command || command === "--http") return undefined;
  if (command === "status") {
    console.log("Nourish MCP");
    console.log(JSON.stringify(await buildConnectionStatus(), null, 2));
    return 0;
  }
  if (command === "search") {
    const query = rest.join(" ");
    const result = await searchUsdaFoods(query, 10);
    for (const food of result.foods) console.log(`${food.name}\t${food.source}\t${food.nutrients_per_100g.calories_kcal ?? ""} kcal/100g`);
    return 0;
  }
  if (command === "barcode") {
    const result = await lookupOpenFoodFactsBarcode(rest[0]);
    console.log(JSON.stringify(result.food, null, 2));
    return 0;
  }
  if (command === "log") {
    const text = rest.join(" ");
    const estimate = await estimateMeal({ text, meal_type: "other", locale: "en-US" });
    const entry = await addIntakeEntry({ meal_type: "other", quantity: 1, unit: "meal", nutrients: estimate.total_nutrients, confidence: estimate.confidence, source_trace: "estimate", tags: [], wellness_context_refs: [] });
    console.log(JSON.stringify(entry, null, 2));
    return 0;
  }
  if (command === "today") {
    console.log(JSON.stringify(await buildDailySummary(), null, 2));
    return 0;
  }
  if (command === "export") {
    console.log(await exportIntakeData());
    return 0;
  }
  if (command === "delete") {
    const id = rest[rest.indexOf("--entry") + 1] ?? rest[0];
    console.log(JSON.stringify({ deleted: await deleteIntakeEntry(id), id }, null, 2));
    return 0;
  }
  console.error(`Unknown command: ${command}`);
  return 1;
}
```

Modify `src/index.ts` to call the CLI before starting MCP:

```ts
import { runCliCommand } from "./cli/commands.js";

const args = new Set(process.argv.slice(2));
let cliResult: number | undefined;
try {
  cliResult = await runCliCommand(process.argv.slice(2));
} catch (error) {
  console.error(`Error: ${(error as Error).message}`);
  process.exitCode = 1;
}

if (cliResult !== undefined) {
  process.exitCode = cliResult;
} else if (process.exitCode === undefined) {
  const transport = process.env.NOURISH_MCP_TRANSPORT ?? (args.has("--http") ? "http" : "stdio");
  if (transport === "http") await runHttp();
  else await runStdio();
}
```

- [ ] **Step 3: Add docs and registry metadata**

Create `README.md` with sections: overview, install, CLI commands, MCP client config, provider attribution, privacy, not medical advice, development, tests, Delx Wellness link.

Create `SECURITY.md`:

```markdown
# Security Policy

Do not paste API keys, provider tokens, raw health exports, or private food logs into chat.

Nourish MCP stores personal intake logs locally under `~/.wellness-nourish/` unless `NOURISH_LOCAL_DIR` points elsewhere. Food search is read-only. Use `wellness-nourish export` to inspect local logs and `wellness-nourish delete --entry <id>` to remove precise entries.

Report security issues privately to the maintainer. Do not open public issues containing secrets or private health data.
```

Create `server.json`:

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-07-09/server.schema.json",
  "name": "io.github.davidmosiah/wellness-nourish",
  "description": "Agent-ready MCP server for nutrition search, barcode lookup, meal estimates and local-first intake summaries.",
  "status": "active",
  "repository": {
    "url": "https://github.com/davidmosiah/wellness-nourish",
    "source": "github"
  },
  "version": "0.1.0",
  "packages": [
    {
      "registry": "npm",
      "name": "wellness-nourish",
      "version": "0.1.0"
    }
  ]
}
```

Create `LICENSE` with the standard MIT license text and David Mosiah copyright.

- [ ] **Step 4: Run CLI and docs tests**

Run:

```bash
node scripts/cli-ux-test.mjs
npm test
```

Expected: CLI test PASS and full test suite PASS.

- [ ] **Step 5: Commit CLI and docs**

Run:

```bash
git add src/cli src/index.ts scripts/cli-ux-test.mjs README.md SECURITY.md LICENSE server.json
git commit -m "feat: add nourish cli and public docs"
```

## Task 11: Add CI And Final Agent-Ready Metadata

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `README.md`
- Modify: `/Users/davidmosiah/Desktop/AgentWellnessHub/delx-wellness/docs/provider-status.md`
- Modify: `/Users/davidmosiah/Desktop/AgentWellnessHub/delx-wellness/registry.json`

- [ ] **Step 1: Add CI workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22, 24]
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: ${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test
```

- [ ] **Step 2: Run local full gate**

Run:

```bash
npm test
rg -n "SECRET|TOKEN|PASSWORD|PRIVATE|BEGIN .*KEY" .
```

Expected: `npm test` PASS. Secret scan should not reveal real secrets; test fixture strings such as `SECRET_SHOULD_NOT_LEAK` are acceptable only inside privacy tests.

- [ ] **Step 3: Commit CI**

Run:

```bash
git add .github/workflows/ci.yml README.md
git commit -m "ci: add nourish test gate"
```

- [ ] **Step 4: Update central registry only after local gate passes**

Modify `/Users/davidmosiah/Desktop/AgentWellnessHub/delx-wellness/docs/provider-status.md` to replace the Nutrition Catalog future row with Nourish MCP active or add a separate Nourish row:

```markdown
| Nourish MCP | Active | `agent_ready` | Food lookup, barcode lookup, calories, macros, meal estimates and local intake summaries | USDA FoodData Central is primary; Open Food Facts barcode results carry ODbL attribution and share-alike metadata. |
```

Modify `/Users/davidmosiah/Desktop/AgentWellnessHub/delx-wellness/registry.json` by adding connector:

```json
{
  "id": "nourish",
  "name": "Nourish MCP",
  "status": "active",
  "repository": "https://github.com/davidmosiah/wellness-nourish",
  "package": "wellness-nourish",
  "transport": ["stdio", "streamable_http"],
  "auth_model": "Optional USDA FoodData Central API key; Open Food Facts read-only public data; local intake logs stored under ~/.wellness-nourish/",
  "local_storage": "~/.wellness-nourish/",
  "signals": ["food_search", "barcode_lookup", "meal_estimate", "intake_log", "daily_summary", "weekly_summary", "calories", "macros"],
  "privacy_default": "local_summary",
  "quality": {
    "tier": "agent_ready",
    "full_ci": true,
    "security_policy": true,
    "privacy_audit_tool": true,
    "connection_status_tool": true,
    "agent_manifest": true,
    "http_smoke_test": true,
    "registry_backlink": true,
    "notes": "Agent-ready nutrition MCP with USDA-first data, optional Open Food Facts barcode lookup, local-first intake store and attribution-aware outputs."
  },
  "notes": "Not medical advice. Open Food Facts data carries ODbL attribution/share-alike metadata; no GPL app code is copied."
}
```

- [ ] **Step 5: Run registry sanity checks**

Run:

```bash
node -e "JSON.parse(require('fs').readFileSync('/Users/davidmosiah/Desktop/AgentWellnessHub/delx-wellness/registry.json','utf8')); console.log('registry json ok')"
rg -n "Nourish MCP|wellness-nourish|agent_ready" /Users/davidmosiah/Desktop/AgentWellnessHub/delx-wellness
```

Expected: JSON parse PASS and registry/docs contain Nourish metadata.

- [ ] **Step 6: Commit central registry update separately**

Run:

```bash
cd /Users/davidmosiah/Desktop/AgentWellnessHub/delx-wellness
git add docs/provider-status.md registry.json
git commit -m "docs: add nourish mcp to wellness registry"
```

If `docs/provider-status.md` contains unrelated edits from another thread, inspect the diff and stage only the Nourish lines with `git add -p`.

## Self-Review Notes

Spec coverage:

- Agent-ready manifest/status/privacy/capabilities: Task 8 and Task 9.
- Human CLI: Task 10.
- USDA primary provider: Task 4.
- Open Food Facts optional barcode provider with attribution: Task 5.
- No GPL copying: Task 10 README and SECURITY boundaries, plus source implementation from scratch.
- Local-first intake log: Task 6.
- Meal estimate and daily/weekly summary: Task 7 and Task 9.
- Test/release bar: Tasks 1 through 11.
- Hub integration: Task 11.

Implementation risk:

- Stdio smoke may need newline framing adjustment depending on current MCP SDK transport behavior. If it fails for transport framing only, replace the test with a direct server registration smoke that calls `tools/list` via SDK test transport.
- README and registry should not claim hosted sync, photo recognition, recipe support, or medical guidance.
