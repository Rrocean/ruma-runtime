import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { installAgentSkill } from "./install-agent-skill.mjs";

export const installCodexSkill = ({ codexHome, logger = console.log } = {}) =>
  installAgentSkill({
    bundle: "ruma-runtime",
    target: "codex",
    home: codexHome,
    logger
  });

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  installCodexSkill();
}
