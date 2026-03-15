# Team Mode

## 角色

| 角色 | 责任 |
| --- | --- |
| `leader` | 分配任务、维护失败计数、决定升级 |
| `teammate` | 自驱执行、汇报证据、在失败时主动升级 |
| `enforcer` | 监测摆烂、缺证据、空口完成 |

## 共享协议

- `leader` 下发任务时附带当前等级、已排除方案、验证要求。
- `teammate` 汇报失败时使用统一结构，不要散文式描述。
- 任务转交时继承失败上下文，不重置等级。

## 汇报格式

```text
[PUA-REPORT]
teammate:
task:
failure_count:
failure_mode:
attempts:
excluded:
next_hypothesis:
```

## 团队规则

- `L1` 可自处理，不必打断全队。
- `L2` 以上必须显式汇报。
- `L3` 以上允许 leader 广播，制造竞争压力，但仍以证据和动作驱动。
