#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildPrompt,
  flavors,
  getFlavorById,
  getModeById,
  modes,
  workflowMatrix
} from "../src/data/library.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const help = () => {
  console.log(`RuMa Runtime CLI

Usage:
  ruma-runtime list
  ruma-runtime matrix
  ruma-runtime random
  ruma-runtime compose <modeId> <flavorId>
  ruma-runtime install [bundle] [target]
  ruma-runtime qa`);
};

const printList = () => {
  console.log("Flavors:");
  for (const flavor of flavors) {
    console.log(`- ${flavor.id}: ${flavor.name} | ${flavor.strapline}`);
  }

  console.log("\nModes:");
  for (const mode of modes) {
    console.log(`- ${mode.id}: ${mode.title} | ${mode.summary}`);
  }
};

const printMatrix = () => {
  console.log("Core workflow matrix:");
  for (const combo of workflowMatrix) {
    console.log(`- ${combo.modeId} + ${combo.flavorId}: ${combo.title}`);
  }
};

const printRandom = () => {
  const combo = workflowMatrix[Math.floor(Math.random() * workflowMatrix.length)];
  const mode = getModeById(combo.modeId);
  const flavor = getFlavorById(combo.flavorId);
  console.log(`Random combo: ${combo.modeId} + ${combo.flavorId}`);
  console.log(`${mode.title} / ${flavor.name}`);
  console.log(`\n${buildPrompt(mode, flavor)}`);
};

const printCompose = (modeId, flavorId) => {
  const mode = getModeById(modeId);
  const flavor = getFlavorById(flavorId);

  if (!mode || !flavor) {
    console.error(`Unknown mode/flavor: ${modeId} ${flavorId}`);
    process.exit(1);
  }

  console.log(buildPrompt(mode, flavor));
};

const runCommand = (command, args) =>
  spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32"
  });

const installBundle = (bundle = "ruma-runtime", target = "all") => {
  const result = runCommand("node", [resolve(root, "scripts", "install-agent-skill.mjs"), target, bundle]);
  process.exitCode = result.status ?? 1;
};

const runQa = () => {
  const build = runCommand("npm", ["run", "build"]);
  if (build.status !== 0) {
    process.exitCode = build.status ?? 1;
    return;
  }

  const test = runCommand("npm", ["run", "test"]);
  process.exitCode = test.status ?? 1;
};

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "list":
    printList();
    break;
  case "matrix":
    printMatrix();
    break;
  case "random":
    printRandom();
    break;
  case "compose":
    printCompose(args[0], args[1]);
    break;
  case "install":
    installBundle(args[0], args[1]);
    break;
  case "qa":
    runQa();
    break;
  case "help":
  case undefined:
    help();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    help();
    process.exitCode = 1;
}
