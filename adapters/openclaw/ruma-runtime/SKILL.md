---
name: ruma-runtime
description: "OpenClaw runtime skill for diagnose, recover, ship and audit workflows with neutral, high-agency, hardline and pua overlays. Use when the agent is stuck, repeating the same fix, preparing to blame the environment, or needs a structured verification-first delivery loop."
license: MIT
---

# RuMa Runtime

Run the current task in one of four modes and keep the output evidence-first.

## Modes

1. `diagnose`: Read the failure signal, search the exact problem, inspect original context, verify assumptions, and propose materially different next steps.
2. `recover`: Break stalled work into the smallest action that can recover new information.
3. `ship`: Treat unverified work as incomplete. Run build, test, curl, or the real happy path before claiming success.
4. `audit`: Inspect platform limits, dependency edges, environment differences, and rollout risks in one pass.

## Overlays

- `neutral`: Clear structure, minimal drama.
- `high-agency`: Expand the blast radius check after the first fix.
- `hardline`: No speculation without evidence. No status without proof.
- `pua`: Add pressure language, but keep the actual mechanism grounded in actions and verification.

## Operating Rules

- Search, inspect, and execute before asking the user for missing context.
- Switch to a materially different approach after the second failure on the same path.
- Report with facts, actions, results, conclusion, and next step.
- After fixing one issue, scan the same file, module, and flow for similar defects.
