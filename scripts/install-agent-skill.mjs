import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const defaults = {
  codex: process.env.CODEX_HOME ? resolve(process.env.CODEX_HOME) : resolve(homedir(), ".codex"),
  claude: process.env.CLAUDE_HOME ? resolve(process.env.CLAUDE_HOME) : resolve(homedir(), ".claude"),
  openclaw: process.env.OPENCLAW_HOME ? resolve(process.env.OPENCLAW_HOME) : resolve(homedir(), ".openclaw")
};

const bundleMaps = {
  "ruma-runtime": {
    codex: [
      {
        kind: "file",
        from: resolve(root, "adapters", "codex", "ruma-runtime", "SKILL.md"),
        to: ({ home }) => resolve(home, "skills", "ruma-runtime", "SKILL.md")
      },
      {
        kind: "file",
        from: resolve(root, "commands", "ruma-runtime.md"),
        to: ({ home }) => resolve(home, "prompts", "ruma-runtime.md")
      }
    ],
    claude: [
      {
        kind: "file",
        from: resolve(root, "adapters", "claude", "ruma-runtime", "SKILL.md"),
        to: ({ home }) => resolve(home, "skills", "ruma-runtime", "SKILL.md")
      }
    ],
    openclaw: [
      {
        kind: "file",
        from: resolve(root, "adapters", "openclaw", "ruma-runtime", "SKILL.md"),
        to: ({ home }) => resolve(home, "skills", "ruma-runtime", "SKILL.md")
      }
    ]
  },
  pua: {
    codex: [
      {
        kind: "dir",
        from: resolve(root, "skills", "pua"),
        to: ({ home }) => resolve(home, "skills", "pua")
      },
      {
        kind: "file",
        from: resolve(root, "commands", "pua.md"),
        to: ({ home }) => resolve(home, "prompts", "pua.md")
      }
    ],
    claude: [
      {
        kind: "dir",
        from: resolve(root, "skills", "pua"),
        to: ({ home }) => resolve(home, "skills", "pua")
      }
    ],
    openclaw: [
      {
        kind: "dir",
        from: resolve(root, "skills", "pua"),
        to: ({ home }) => resolve(home, "skills", "pua")
      }
    ]
  }
};

const ensureSource = (file) => {
  if (!existsSync(file)) {
    throw new Error(`Missing source file: ${file}`);
  }
};

const copyInstallEntry = ({ kind, from, to }) => {
  ensureSource(from);
  mkdirSync(dirname(to), { recursive: true });

  if (kind === "dir") {
    rmSync(to, { recursive: true, force: true });
    cpSync(from, to, { recursive: true, force: true });
    return;
  }

  copyFileSync(from, to);
};

export const listSkillBundles = () => Object.keys(bundleMaps);

export const installSkillBundle = ({ bundle = "ruma-runtime", target, home, logger = console.log } = {}) => {
  const bundleMap = bundleMaps[bundle];
  if (!bundleMap) {
    throw new Error(`Unsupported skill bundle: ${bundle}`);
  }

  if (!bundleMap[target]) {
    throw new Error(`Unsupported install target: ${target}`);
  }

  const targetHome = home ?? defaults[target];
  const files = bundleMap[target].map((entry) => ({
    kind: entry.kind,
    from: entry.from,
    to: entry.to({ home: targetHome })
  }));

  for (const file of files) {
    copyInstallEntry(file);
    logger(`Installed ${file.to}`);
  }

  logger(`${bundle} install complete for ${target} from ${root} to ${targetHome}`);
  return { bundle, target, home: targetHome, files, root };
};

export const installAllForBundle = ({ bundle = "ruma-runtime", homes = {}, logger = console.log } = {}) =>
  ["codex", "claude", "openclaw"].map((target) =>
    installSkillBundle({
      bundle,
      target,
      home: homes[target],
      logger
    })
  );

export const installAgentSkill = ({ target, home, logger = console.log, bundle = "ruma-runtime" } = {}) =>
  installSkillBundle({
    bundle,
    target,
    home,
    logger
  });

export const installAllAgentSkills = ({ homes = {}, logger = console.log, bundle = "ruma-runtime" } = {}) =>
  installAllForBundle({
    bundle,
    homes,
    logger
  });

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const target = process.argv[2] ?? "all";
  const bundle = process.argv[3] ?? "ruma-runtime";

  if (target === "all") {
    installAllForBundle({ bundle });
  } else {
    installSkillBundle({ target, bundle });
  }
}
