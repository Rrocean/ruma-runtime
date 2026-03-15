# Runtime Playbook

## Diagnose

Use `diagnose` when the agent is stuck on a concrete failure.

Required loop:

1. Quote the exact failure signal.
2. Search the exact error or behavior.
3. Read the original material, not a summary.
4. List assumptions and verify each one.
5. Propose at least three materially different next moves.

## Recover

Use `recover` when the task is stalled but the root cause is unclear.

Recovery loop:

1. Decide whether the problem is direction, method, context, or assumption.
2. Pick the smallest action that can produce new information.
3. Expand only one ring at a time.
4. Re-check the task after each action.

## Ship

Use `ship` before claiming anything is done.

Checklist:

- Run build, test, curl, or the real user path.
- Inspect adjacent code for repeated defects.
- Call out uncovered edge cases.
- State remaining risks explicitly.

## Audit

Use `audit` when platform constraints are likely to matter.

Audit targets:

- runtime and filesystem limits
- package and native dependency constraints
- build-time versus run-time differences
- network, permissions, and deployment assumptions
