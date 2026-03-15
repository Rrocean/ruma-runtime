import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const defaults = {
  codex: process.env.CODEX_HOME ? resolve(process.env.CODEX_HOME) : resolve(homedir(), ".codex"),
  claude: process.env.CLAUDE_HOME ? resolve(process.env.CLAUDE_HOME) : resolve(homedir(), ".claude"),
  openclaw: process.env.OPENCLAW_HOME ? resolve(process.env.OPENCLAW_HOME) : resolve(homedir(), ".openclaw")
};

const installMaps = {
  codex: [
    {
      from: resolve(root, "adapters", "codex", "ruma-runtime", "SKILL.md"),
      to: ({ home }) => resolve(home, "skills", "ruma-runtime", "SKILL.md")
    },
    {
      from: resolve(root, "commands", "ruma-runtime.md"),
      to: ({ home }) => resolve(home, "prompts", "ruma-runtime.md")
    }
  ],
  claude: [
    {
      from: resolve(root, "adapters", "claude", "ruma-runtime", "SKILL.md"),
      to: ({ home }) => resolve(home, "skills", "ruma-runtime", "SKILL.md")
    }
  ],
  openclaw: [
    {
      from: resolve(root, "adapters", "openclaw", "ruma-runtime", "SKILL.md"),
      to: ({ home }) => resolve(home, "skills", "ruma-runtime", "SKILL.md")
    }
  ]
};

const ensureSource = (file) => {
  if (!existsSync(file)) {
    throw new Error(`Missing source file: ${file}`);
  }
};

export const installAgentSkill = ({ target, home, logger = console.log } = {}) => {
  if (!installMaps[target]) {
    throw new Error(`Unsupported install target: ${target}`);
  }

  const targetHome = home ?? defaults[target];
  const files = installMaps[target].map((entry) => ({
    from: entry.from,
    to: entry.to({ home: targetHome })
  }));

  for (const file of files) {
    ensureSource(file.from);
    mkdirSync(dirname(file.to), { recursive: true });
    copyFileSync(file.from, file.to);
    logger(`Installed ${file.to}`);
  }

  logger(`${target} install complete from ${root} to ${targetHome}`);
  return { target, home: targetHome, files, root };
};

export const installAllAgentSkills = ({ homes = {}, logger = console.log } = {}) =>
  ["codex", "claude", "openclaw"].map((target) =>
    installAgentSkill({
      target,
      home: homes[target],
      logger
    })
  );

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const target = process.argv[2] ?? "all";

  if (target === "all") {
    installAllAgentSkills();
  } else {
    installAgentSkill({ target });
  }
}
