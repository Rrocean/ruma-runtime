# RuMa Runtime

[中文](./README.zh-CN.md) | English

![License](https://img.shields.io/badge/license-MIT-111111.svg)
![Clients](https://img.shields.io/badge/clients-Codex%20%7C%20Claude%20Code%20%7C%20OpenClaw-1f6feb.svg)
![Testing](https://img.shields.io/badge/tested-Playwright%20smoke%20coverage-0f766e.svg)

RuMa Runtime turns a prompt gallery into an agent operating runtime.

It combines:

- reusable operating modes such as `diagnose`, `recover`, `ship`, and `audit`
- execution overlays such as `neutral`, `high-agency`, `hardline`, and `pua`
- one-command installers for `Codex`, `Claude Code`, and `OpenClaw`
- a browsable web surface for selecting modes and copying live prompt compositions
- local QA and autopilot loops for repeated verification

The repo structure takes cues from two directions:

- the productized multi-client installation style of [`tanweai/pua`](https://github.com/tanweai/pua)
- the content-library and reference-driven style of [`puaclaw/PUAClaw`](https://github.com/puaclaw/PUAClaw)

## Quick Start

```bash
npm install
npm run dev
```

## Install Into Agents

```bash
npm run install:codex
npm run install:claude
npm run install:openclaw
npm run install:all
```

Installed locations:

- Codex: `~/.codex/skills/ruma-runtime/SKILL.md` and `~/.codex/prompts/ruma-runtime.md`
- Claude Code: `~/.claude/skills/ruma-runtime/SKILL.md`
- OpenClaw: `~/.openclaw/skills/ruma-runtime/SKILL.md`

## Verify

```bash
npm run build
npm run test
npm run check
```

The Playwright suite covers:

- rendering every mode card
- opening every modal
- flavor and adapter switching
- copy-to-clipboard flows
- mobile layout coverage
- installer copy behavior for all supported clients

## Autopilot

```bash
npm run autopilot:register
npm run autopilot:once
npm run qa:loop
```

The Windows autopilot loop runs build and smoke tests, writes reports to `automation/reports`, and can trigger one bounded backlog improvement when a local `codex` CLI is available.

## Repo Layout

```text
adapters/
  claude/ruma-runtime/SKILL.md
  codex/ruma-runtime/SKILL.md
  openclaw/ruma-runtime/SKILL.md
  cursor/ruma-runtime.mdc
commands/
  ruma-runtime.md
references/
  failure-patterns.md
  runtime-playbook.md
scripts/
  install-agent-skill.mjs
  install-codex-skill.mjs
  autopilot-once.ps1
src/
  data/library.js
tests/
  app.spec.js
```

## References

- [`references/runtime-playbook.md`](./references/runtime-playbook.md)
- [`references/failure-patterns.md`](./references/failure-patterns.md)

## License

[MIT](./LICENSE)
