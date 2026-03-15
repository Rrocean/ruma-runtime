import { expect, test } from "@playwright/test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { adapterSnippets, benchmarks, categories, flavors, modes } from "../src/data/library.js";
import {
  installAgentSkill,
  installAllAgentSkills,
  installAllForBundle,
  installSkillBundle
} from "../scripts/install-agent-skill.mjs";
import { installCodexSkill } from "../scripts/install-codex-skill.mjs";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.__copied = [];
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async (text) => {
          window.__copied.push(text);
        }
      },
      configurable: true
    });
  });

  await page.goto("/");
});

test("renders every mode and opens each modal", async ({ page }) => {
  await expect(page.locator("text=RuMa Runtime")).toHaveCount(2);
  await expect(page.locator(".mode-card")).toHaveCount(modes.length);

  for (const [index, mode] of modes.entries()) {
    await page.locator(`[data-mode="${mode.id}"]`).click();
    await expect(page.locator("#modalTitle")).toHaveText(mode.title);
    await expect(page.locator("#modalPrompt")).toContainText(mode.outputContract.split(" / ")[0]);

    await page.locator("#modalCopyButton").dispatchEvent("click");
    const copied = await page.evaluate(() => window.__copied.at(-1));
    expect(copied).toContain(mode.title === "Chain of Thought" ? "思维链推理" : "## 交付契约");

    if (index % 2 === 0) {
      await page.keyboard.press("Escape");
    } else {
      await page.locator(".modal-backdrop").dispatchEvent("click");
    }

    await expect(page.locator("#modeModal")).toBeHidden();
  }
});

test("filters by category, flavor and adapter", async ({ page }) => {
  await page.locator(`[data-category="runtime"]`).click();
  await expect(page.locator(".mode-card")).toHaveCount(
    modes.filter((mode) => mode.category === "runtime").length
  );

  await page.locator("#searchInput").fill("ship");
  await expect(page.locator(".mode-card")).toHaveCount(1);
  await expect(page.locator(`[data-mode="ship"]`)).toBeVisible();

  await page.locator(`[data-flavor="hardline"]`).click();
  await expect(page.locator("#previewTitle")).toContainText("Hardline");
  await expect(page.locator("#previewPrompt")).toContainText("进入 Hardline");

  await page.locator(`[data-adapter="codex"]`).click();
  await expect(page.locator("#adapterInstall")).toContainText("npm run install:codex");

  await page.locator(`[data-adapter="openclaw"]`).click();
  await expect(page.locator("#adapterInstall")).toContainText("npm run install:openclaw");
  await expect(page.locator("#adapterRuntime")).toContainText("OpenClaw");

  await page.locator(`[data-adapter="ops"]`).click();
  await expect(page.locator("#adapterInstall")).toContainText("npx playwright install chromium");
  await expect(page.locator("#adapterRuntime")).toContainText("autopilot-loop.ps1");

  await page.locator("#copyPreviewButton").click();
  const copied = await page.evaluate(() => window.__copied.at(-1));
  expect(copied).toContain("进入 Hardline");
});

test("mobile viewport keeps controls usable", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only check");
  await page.locator("#searchInput").fill("json");
  await expect(page.locator(".mode-card")).toHaveCount(1);
  await page.locator(`[data-flavor="neutral"]`).click();
  await page.locator(`[data-mode="json-format"]`).click();
  await expect(page.locator("#modalTitle")).toHaveText("JSON Strict");
});

test("category metadata stays in sync", async ({ page }) => {
  for (const category of categories.filter((item) => item.id !== "all")) {
    await page.locator(`[data-category="${category.id}"]`).click();
    const expected = modes.filter((mode) => mode.category === category.id).length;
    await expect(page.locator(".mode-card")).toHaveCount(expected);
  }

  await page.locator(`[data-category="all"]`).click();
  for (const flavor of flavors) {
    await page.locator(`[data-flavor="${flavor.id}"]`).click();
    await expect(page.locator("#previewTitle")).toContainText(flavor.name);
  }

  for (const adapter of adapterSnippets) {
    await page.locator(`[data-adapter="${adapter.id}"]`).click();
    await expect(page.locator("#adapterDescription")).toContainText(adapter.description);
  }
});

test("renders dedicated benchmark comparisons with before and after behaviors", async ({ page }) => {
  await expect(page.locator("#benchmarks")).toBeVisible();
  await expect(page.locator(".benchmark-card")).toHaveCount(benchmarks.length);

  for (const benchmark of benchmarks) {
    const card = page.locator(`[data-benchmark="${benchmark.id}"]`);
    await expect(card).toContainText(benchmark.title);
    await expect(card.locator(".benchmark-before")).toContainText(benchmark.before[0]);
    await expect(card.locator(".benchmark-after")).toContainText(benchmark.after[0]);
    await expect(card.locator(".benchmark-outcome")).toContainText(benchmark.outcome);
  }
});

test("writes smoke screenshots into automation reports", async ({ page }, testInfo) => {
  const screenshotDir = resolve(process.cwd(), "automation", "reports", "screenshots");
  const screenshotPath = resolve(screenshotDir, `${testInfo.project.name}-home.png`);

  mkdirSync(screenshotDir, { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: true });

  expect(existsSync(screenshotPath)).toBeTruthy();
  expect(statSync(screenshotPath).size).toBeGreaterThan(0);
});

test("codex install script copies the local skill into CODEX_HOME", async () => {
  const tempRoot = resolve(process.cwd(), "test-results");
  mkdirSync(tempRoot, { recursive: true });

  const codexHome = mkdtempSync(resolve(tempRoot, "codex-home-"));

  try {
    installCodexSkill({ codexHome, logger: () => {} });

    const installedSkill = resolve(codexHome, "skills", "ruma-runtime", "SKILL.md");
    const installedPrompt = resolve(codexHome, "prompts", "ruma-runtime.md");
    expect(existsSync(installedSkill)).toBeTruthy();
    expect(existsSync(installedPrompt)).toBeTruthy();
    expect(readFileSync(installedSkill, "utf8")).toBe(
      readFileSync(resolve(process.cwd(), "adapters", "codex", "ruma-runtime", "SKILL.md"), "utf8")
    );
    expect(readFileSync(installedPrompt, "utf8")).toBe(
      readFileSync(resolve(process.cwd(), "commands", "ruma-runtime.md"), "utf8")
    );
  } finally {
    rmSync(codexHome, { recursive: true, force: true });
  }
});

test("generic installer copies the local skill into Claude Code and OpenClaw homes", async () => {
  const tempRoot = resolve(process.cwd(), "test-results");
  mkdirSync(tempRoot, { recursive: true });

  const claudeHome = mkdtempSync(resolve(tempRoot, "claude-home-"));
  const openclawHome = mkdtempSync(resolve(tempRoot, "openclaw-home-"));

  try {
    installAgentSkill({ target: "claude", home: claudeHome, logger: () => {} });
    installAgentSkill({ target: "openclaw", home: openclawHome, logger: () => {} });

    const installedClaudeSkill = resolve(claudeHome, "skills", "ruma-runtime", "SKILL.md");
    const installedOpenClawSkill = resolve(openclawHome, "skills", "ruma-runtime", "SKILL.md");
    expect(existsSync(installedClaudeSkill)).toBeTruthy();
    expect(existsSync(installedOpenClawSkill)).toBeTruthy();
    expect(readFileSync(installedClaudeSkill, "utf8")).toBe(
      readFileSync(resolve(process.cwd(), "adapters", "claude", "ruma-runtime", "SKILL.md"), "utf8")
    );
    expect(readFileSync(installedOpenClawSkill, "utf8")).toBe(
      readFileSync(resolve(process.cwd(), "adapters", "openclaw", "ruma-runtime", "SKILL.md"), "utf8")
    );
  } finally {
    rmSync(claudeHome, { recursive: true, force: true });
    rmSync(openclawHome, { recursive: true, force: true });
  }
});

test("install all copies every supported client artifact", async () => {
  const tempRoot = resolve(process.cwd(), "test-results");
  mkdirSync(tempRoot, { recursive: true });

  const codexHome = mkdtempSync(resolve(tempRoot, "codex-all-"));
  const claudeHome = mkdtempSync(resolve(tempRoot, "claude-all-"));
  const openclawHome = mkdtempSync(resolve(tempRoot, "openclaw-all-"));

  try {
    installAllAgentSkills({
      homes: {
        codex: codexHome,
        claude: claudeHome,
        openclaw: openclawHome
      },
      logger: () => {}
    });

    expect(existsSync(resolve(codexHome, "skills", "ruma-runtime", "SKILL.md"))).toBeTruthy();
    expect(existsSync(resolve(codexHome, "prompts", "ruma-runtime.md"))).toBeTruthy();
    expect(existsSync(resolve(claudeHome, "skills", "ruma-runtime", "SKILL.md"))).toBeTruthy();
    expect(existsSync(resolve(openclawHome, "skills", "ruma-runtime", "SKILL.md"))).toBeTruthy();
  } finally {
    rmSync(codexHome, { recursive: true, force: true });
    rmSync(claudeHome, { recursive: true, force: true });
    rmSync(openclawHome, { recursive: true, force: true });
  }
});

test("pua installer copies the recursive skill bundle and prompt into Codex", async () => {
  const tempRoot = resolve(process.cwd(), "test-results");
  mkdirSync(tempRoot, { recursive: true });

  const codexHome = mkdtempSync(resolve(tempRoot, "codex-pua-"));

  try {
    installSkillBundle({ bundle: "pua", target: "codex", home: codexHome, logger: () => {} });

    const installedSkill = resolve(codexHome, "skills", "pua", "SKILL.md");
    const installedPrompt = resolve(codexHome, "prompts", "pua.md");
    const installedReference = resolve(codexHome, "skills", "pua", "references", "execution-protocol.md");
    const installedAgentMeta = resolve(codexHome, "skills", "pua", "agents", "openai.yaml");

    expect(existsSync(installedSkill)).toBeTruthy();
    expect(existsSync(installedPrompt)).toBeTruthy();
    expect(existsSync(installedReference)).toBeTruthy();
    expect(existsSync(installedAgentMeta)).toBeTruthy();
    expect(readFileSync(installedSkill, "utf8")).toBe(
      readFileSync(resolve(process.cwd(), "skills", "pua", "SKILL.md"), "utf8")
    );
    expect(readFileSync(installedPrompt, "utf8")).toBe(
      readFileSync(resolve(process.cwd(), "commands", "pua.md"), "utf8")
    );
  } finally {
    rmSync(codexHome, { recursive: true, force: true });
  }
});

test("installing the pua bundle to all clients preserves references", async () => {
  const tempRoot = resolve(process.cwd(), "test-results");
  mkdirSync(tempRoot, { recursive: true });

  const codexHome = mkdtempSync(resolve(tempRoot, "codex-pua-all-"));
  const claudeHome = mkdtempSync(resolve(tempRoot, "claude-pua-all-"));
  const openclawHome = mkdtempSync(resolve(tempRoot, "openclaw-pua-all-"));

  try {
    installAllForBundle({
      bundle: "pua",
      homes: {
        codex: codexHome,
        claude: claudeHome,
        openclaw: openclawHome
      },
      logger: () => {}
    });

    expect(existsSync(resolve(codexHome, "skills", "pua", "references", "failure-patterns.md"))).toBeTruthy();
    expect(existsSync(resolve(codexHome, "prompts", "pua.md"))).toBeTruthy();
    expect(existsSync(resolve(claudeHome, "skills", "pua", "references", "execution-protocol.md"))).toBeTruthy();
    expect(existsSync(resolve(openclawHome, "skills", "pua", "references", "human-simulation.md"))).toBeTruthy();
  } finally {
    rmSync(codexHome, { recursive: true, force: true });
    rmSync(claudeHome, { recursive: true, force: true });
    rmSync(openclawHome, { recursive: true, force: true });
  }
});
