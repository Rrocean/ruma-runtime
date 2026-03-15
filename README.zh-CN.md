# RuMa Runtime

中文 | [English](./README.md)

![License](https://img.shields.io/badge/license-MIT-111111.svg)
![Clients](https://img.shields.io/badge/clients-Codex%20%7C%20Claude%20Code%20%7C%20OpenClaw-1f6feb.svg)
![Testing](https://img.shields.io/badge/tested-Playwright%20smoke%20coverage-0f766e.svg)

RuMa Runtime 不是再做一个提示词仓库，而是把提示词、skill、执行协议和验证闭环压成一个可安装的 Agent Runtime。

它同时包含：

- `diagnose`、`recover`、`ship`、`audit` 这类运行模式
- `neutral`、`high-agency`、`hardline`、`pua` 这类执行风格
- `Codex / Claude Code / OpenClaw` 三端一键安装
- 一个可浏览、可筛选、可复制的 Web 门面
- 本地 QA 与 autopilot 循环

整体风格参考了两个方向：

- [`tanweai/pua`](https://github.com/tanweai/pua) 的多客户端安装与产品化目录
- [`puaclaw/PUAClaw`](https://github.com/puaclaw/PUAClaw) 的内容库、参考资料和 GitHub 呈现方式

## 快速开始

```bash
npm install
npm run dev
```

## 一键安装到 Agent

```bash
npm run install:codex
npm run install:claude
npm run install:openclaw
npm run install:all
```

默认安装位置：

- Codex: `~/.codex/skills/ruma-runtime/SKILL.md` 和 `~/.codex/prompts/ruma-runtime.md`
- Claude Code: `~/.claude/skills/ruma-runtime/SKILL.md`
- OpenClaw: `~/.openclaw/skills/ruma-runtime/SKILL.md`

## 验证

```bash
npm run build
npm run test
npm run check
```

Playwright 冒烟覆盖包括：

- 全部模式卡片渲染
- 全部 modal 打开
- Flavor 和 Adapter 切换
- 复制按钮行为
- 移动端布局
- 三端安装脚本复制结果

## 自治循环

```bash
npm run autopilot:register
npm run autopilot:once
npm run qa:loop
```

Windows 计划任务会按 5 分钟节奏巡检，写报告到 `automation/reports`，并在本机 `codex` CLI 可用时执行一次有边界的 backlog 自改。

## 仓库结构

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

## 参考内容

- [`references/runtime-playbook.md`](./references/runtime-playbook.md)
- [`references/failure-patterns.md`](./references/failure-patterns.md)

## 许可

[MIT](./LICENSE)
