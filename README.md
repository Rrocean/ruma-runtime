<p align="center">
  <img src="./assets/ruma-banner.svg" alt="RuMa Runtime banner" width="100%" />
</p>

<p align="center">
  <strong>RuMa = 辱骂式高压执行 overlay。</strong><br />
  把 <code>diagnose / recover / ship / audit</code> 四套运行模式，打包成一个能装进 <code>Codex</code>、<code>Claude Code</code>、<code>OpenClaw</code> 的 Agent Runtime。
</p>

<p align="center">
  <strong>简体中文</strong> · <a href="./README.en.md">English</a>
</p>

<p align="center">
  <a href="https://github.com/Rrocean/ruma-runtime/stargazers"><img src="https://img.shields.io/github/stars/Rrocean/ruma-runtime?style=flat-square" alt="GitHub stars" /></a>
  <a href="https://github.com/Rrocean/ruma-runtime/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Rrocean/ruma-runtime?style=flat-square" alt="License" /></a>
  <a href="https://github.com/Rrocean/ruma-runtime/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/Rrocean/ruma-runtime/ci.yml?branch=main&style=flat-square&label=ci" alt="CI" /></a>
  <img src="https://img.shields.io/badge/clients-Codex%20%7C%20Claude%20Code%20%7C%20OpenClaw-1f6feb?style=flat-square" alt="Clients" />
  <img src="https://img.shields.io/badge/tested-Playwright%20smoke%20coverage-0f766e?style=flat-square" alt="Playwright" />
</p>

> [!IMPORTANT]
> 这个项目不是单纯“骂 AI”。它把 `RuMa / hardline / high-agency` 这些压力层，和 `diagnose / recover / ship / audit` 这些动作协议绑在一起，让 agent 在卡壳、甩锅、空口完成之前，先进入 evidence-first 工作模式。

> [!TIP]
> GitHub 风格上参考了 [tanweai/pua](https://github.com/tanweai/pua) 的多客户端安装和产品化目录，也参考了 [puaclaw/PUAClaw](https://github.com/puaclaw/PUAClaw) 的内容索引和梗味表达。

## 它解决什么问题

| 失败模式 | 旧行为 | RuMa Runtime 期望行为 |
| --- | --- | --- |
| 重复同一路线 | 一直微调参数或局部 patch | 第二次失败就换本质不同方案 |
| 环境甩锅 | “可能是权限/环境问题” | 先给日志、版本、文档或命令证据 |
| 空口完成 | 说“改好了”但没跑验证 | 先 build / test / curl / happy path |
| 被动等待 | 先问用户，再决定查什么 | 先搜、先读、先执行，再问最小必要问题 |

## 你会得到什么

- 四个运行模式：`diagnose`、`recover`、`ship`、`audit`
- 四个风格层：`neutral`、`high-agency`、`hardline`、`RuMa / PUA`
- 三端安装：`Codex`、`Claude Code`、`OpenClaw`
- 独立的 `pua` skill 包：主 `SKILL.md` + references + `/pua` prompt 入口
- 一个可浏览模式库的 Web 门面
- `Playwright` 冒烟测试和本地 autopilot loop

## 客户端支持

| Client | 安装结果 | 入口文件 |
| --- | --- | --- |
| Codex | `ruma-runtime` + `pua` skill + prompt | `adapters/codex/ruma-runtime/SKILL.md` + `skills/pua/` + `commands/*.md` |
| Claude Code | `ruma-runtime` + `pua` skill | `adapters/claude/ruma-runtime/SKILL.md` + `skills/pua/` |
| OpenClaw | `ruma-runtime` + `pua` skill | `adapters/openclaw/ruma-runtime/SKILL.md` + `skills/pua/` |

## 安装

### 1. 本地一键安装

```bash
npm install
npm run install:all
npm run install:pua:all
```

也可以分客户端安装：

```bash
npm run install:codex
npm run install:claude
npm run install:openclaw
npm run install:pua:codex
npm run install:pua:claude
npm run install:pua:openclaw
```

### 2. 手动安装

#### Codex

```bash
mkdir -p ~/.codex/skills/ruma-runtime ~/.codex/prompts
curl -L https://raw.githubusercontent.com/Rrocean/ruma-runtime/main/adapters/codex/ruma-runtime/SKILL.md -o ~/.codex/skills/ruma-runtime/SKILL.md
curl -L https://raw.githubusercontent.com/Rrocean/ruma-runtime/main/commands/ruma-runtime.md -o ~/.codex/prompts/ruma-runtime.md
```

#### Claude Code

```bash
mkdir -p ~/.claude/skills/ruma-runtime
curl -L https://raw.githubusercontent.com/Rrocean/ruma-runtime/main/adapters/claude/ruma-runtime/SKILL.md -o ~/.claude/skills/ruma-runtime/SKILL.md
```

#### OpenClaw

```bash
mkdir -p ~/.openclaw/skills/ruma-runtime
curl -L https://raw.githubusercontent.com/Rrocean/ruma-runtime/main/adapters/openclaw/ruma-runtime/SKILL.md -o ~/.openclaw/skills/ruma-runtime/SKILL.md
```

## Before / After

| 场景 | Before | After |
| --- | --- | --- |
| 调试失败 | 看到报错先猜环境问题 | 先读报错、搜原文、验假设，再换路线 |
| 交付前自检 | 改完就说完成 | build / test / happy path 证据齐全再汇报 |
| 长会话卡壳 | 一路硬拧到失控 | 先 recover，再按最小行动逐圈恢复 |

更细的内容见：

- [runtime-playbook.md](./references/runtime-playbook.md)
- [failure-patterns.md](./references/failure-patterns.md)

## 仓库结构

```text
assets/
  ruma-banner.svg
adapters/
  claude/ruma-runtime/SKILL.md
  codex/ruma-runtime/SKILL.md
  openclaw/ruma-runtime/SKILL.md
  cursor/ruma-runtime.mdc
commands/
  pua.md
  ruma-runtime.md
skills/
  pua/
    SKILL.md
    references/
    agents/openai.yaml
references/
  runtime-playbook.md
  failure-patterns.md
scripts/
  install-agent-skill.mjs
  autopilot-once.ps1
src/
  main.js
  data/library.js
tests/
  app.spec.js
```

## 本地开发

```bash
npm install
npm run dev
```

## 验证

```bash
npm run build
npm run test
npm run check
```

当前冒烟覆盖包括：

- 模式卡片和 modal 全量点击
- flavor / adapter 切换
- benchmark 展示
- 移动端布局
- `Codex / Claude Code / OpenClaw` 安装脚本复制行为
- `pua` skill 的 references、agents 元数据和 prompt 同步行为

## 自主巡检

```bash
npm run autopilot:register
npm run autopilot:once
npm run qa:loop
```

autopilot 会：

- 跑 `build + Playwright smoke`
- 跑 `runtime + pua` 安装同步
- 写报告到 `automation/reports`
- 在本机 `codex` CLI 可用时，从 backlog 挑一个边界清晰的改进项

## License

[MIT](./LICENSE)
