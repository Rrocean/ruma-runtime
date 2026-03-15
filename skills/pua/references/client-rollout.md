# Client Rollout

## 支持矩阵

| Client | 目标路径 | 额外入口 |
| --- | --- | --- |
| Codex | `~/.codex/skills/pua/` | `~/.codex/prompts/pua.md` |
| Claude Code | `~/.claude/skills/pua/` | 无 |
| OpenClaw | `~/.openclaw/skills/pua/` | 无 |

## 仓库内安装命令

```text
npm run install:pua:codex
npm run install:pua:claude
npm run install:pua:openclaw
npm run install:pua:all
```

## 同步要求

- 同步整个 `skills/pua` 目录，而不是只同步 `SKILL.md`。
- 只要改了主 skill 或 references，就重新安装到三端。
- Codex 额外同步 `/pua` prompt 入口。

## 安装后冒烟检查

- `SKILL.md` 存在。
- `references/` 存在且至少包含执行协议和失败模式。
- Codex 的 `prompts/pua.md` 存在。
- 可以显式调用 `/pua` 或在卡壳场景自动触发。
