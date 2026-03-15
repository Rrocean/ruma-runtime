import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const reportsDir = resolve(root, "automation", "reports");

mkdirSync(reportsDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const reportFile = resolve(reportsDir, `qa-${timestamp}.md`);

const run = (command, args) =>
  spawnSync(`${command} ${args.join(" ")}`, {
    cwd: root,
    encoding: "utf8",
    shell: true
  });

const steps = [
  { label: "build", command: "npm", args: ["run", "build"] },
  { label: "test", command: "npm", args: ["run", "test"] }
];

const sections = [`# QA Sweep ${new Date().toISOString()}`, ""];
let hasFailure = false;

for (const step of steps) {
  const result = run(step.command, step.args);
  if (result.status !== 0 || result.error) {
    hasFailure = true;
  }

  sections.push(`## ${step.label}`);
  sections.push("");
  sections.push(`Exit code: ${result.status ?? "null"}`);
  sections.push("");
  sections.push("```text");
  if (result.error) {
    sections.push(String(result.error));
  }
  sections.push((result.stdout || "") + (result.stderr || ""));
  sections.push("```");
  sections.push("");
}

sections.push(hasFailure ? "Status: FAIL" : "Status: PASS");
writeFileSync(reportFile, sections.join("\n"), "utf8");

if (hasFailure) {
  process.exitCode = 1;
}
