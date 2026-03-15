export const localeOptions = [
  { id: "zh", label: "中文" },
  { id: "en", label: "EN" }
];

export const uiCopy = {
  zh: {
    htmlLang: "zh-CN",
    documentTitle: "RuMa Runtime",
    metaDescription:
      "RuMa Runtime: 把提示词库、Agent Skill 和执行协议打包成一个可安装、可测试、可自动巡检的运行时。",
    localeLabel: "界面语言",
    heroTitle: "把提示词库、Skill 和执行协议压成一个 Agent 运行时。",
    heroText:
      "不是再造一个 prompt 仓库，而是把模式、语气、安装适配和自巡检 loop 打进同一个项目。",
    heroPrimary: "浏览模式库",
    heroSecondary: "查看自跑循环",
    metrics: {
      operatingModes: "运行模式",
      flavorPacks: "语气包",
      clientAdapters: "客户端适配",
      smokeChecks: "冒烟检查",
      coreCombos: "核心组合"
    },
    surfaceTag: "控制台",
    surfaceTitle: "按模式选能力，按 Flavor 选执行强度。",
    surfaceText: "搜索、筛选、切换语气后，右侧的 prompt 会动态重组，不再是硬编码死文本。",
    searchLabel: "搜索模式",
    searchPlaceholder: "输入 diagnose / ship / json / expert...",
    categoryLabel: "分类",
    flavorLabel: "Flavor",
    composerTag: "快速组合",
    composerTitle: "把 ruma-pro 的组合视图折进当前 runtime。",
    composerRandom: "随机组合",
    composerModeLabel: "模式",
    composerFlavorLabel: "Flavor",
    composerSummary: (mode, flavor, total, combos) =>
      `当前组合是 ${mode} / ${flavor}。全仓共 ${total} 个模式，核心 workflow 组合 ${combos} 个。`,
    composerCopy: "复制当前组合",
    matrixTag: "4 x 4 矩阵",
    matrixTitle: "核心 runtime 模式与四个 flavor 的 16 种组合。",
    matrixNote: "点击任意格子，直接切换右侧 live prompt。",
    libraryTag: "模式库",
    libraryTitle: "可点击、可复制、可安装、可测试。",
    libraryMeta: (visible, total) => `当前显示 ${visible} / ${total} 个模式`,
    livePromptTag: "实时 Prompt",
    previewSummary: (summary, useCase) => `${summary} 适合 ${useCase}。`,
    copyPreview: "复制当前 Prompt",
    installTag: "安装适配",
    installTitle: "同一套 runtime，接进不同 Agent。",
    installLabel: "安装",
    runLabel: "运行",
    benchmarkTag: "对比基准",
    benchmarkTitle: "接入 runtime 前后，Agent 行为差在哪里。",
    benchmarkNote: "不是抽象口号，而是具体动作和交付差异。",
    beforeLabel: "接入前",
    afterLabel: "接入后",
    beforeAria: "接入前行为",
    afterAria: "接入后行为",
    autopilotTag: "Autopilot",
    autopilotTitle: "每 5 分钟巡检一次，不等人来催。",
    autopilotItems: [
      "执行 build + Playwright smoke test",
      "记录日志到 automation/reports",
      "如本机可用，调用 Codex CLI 处理 backlog 中的下一项改进",
      "Windows 计划任务可常驻，不依赖当前终端"
    ],
    coverageTag: "覆盖范围",
    coverageTitle: "不是“我觉得能用”，而是逐个点测。",
    footerText:
      "从 prompt 库进化成 agent operating runtime。模式、Flavor、适配器和自巡检 loop 全部在一个仓里闭环。",
    modalClose: "关闭",
    outputContract: "交付契约",
    modalFlavor: "Flavor",
    modalCopy: "复制这个模式",
    viewDetails: "查看详情",
    copied: "已复制"
  },
  en: {
    htmlLang: "en",
    documentTitle: "RuMa Runtime",
    metaDescription:
      "RuMa Runtime bundles prompt libraries, agent skills, and execution protocols into one installable, testable, self-auditing runtime.",
    localeLabel: "Interface language",
    heroTitle: "Compress prompt libraries, skills, and execution protocols into one agent runtime.",
    heroText:
      "This is not another prompt dump. It packs operating modes, overlays, installer adapters, and an autopilot loop into one project.",
    heroPrimary: "Browse mode library",
    heroSecondary: "View autopilot loop",
    metrics: {
      operatingModes: "Operating Modes",
      flavorPacks: "Flavor Packs",
      clientAdapters: "Client Adapters",
      smokeChecks: "Smoke Checks",
      coreCombos: "Core Combos"
    },
    surfaceTag: "Surface Control",
    surfaceTitle: "Pick capabilities by mode and execution pressure by flavor.",
    surfaceText:
      "Search, filter, and switch overlays; the prompt on the right recomposes live instead of staying hardcoded.",
    searchLabel: "Search modes",
    searchPlaceholder: "Type diagnose / ship / json / expert...",
    categoryLabel: "Category",
    flavorLabel: "Flavor",
    composerTag: "Quick Compose",
    composerTitle: "Fold the useful ruma-pro combo layer into the current runtime.",
    composerRandom: "Random combo",
    composerModeLabel: "Mode",
    composerFlavorLabel: "Flavor",
    composerSummary: (mode, flavor, total, combos) =>
      `Current combo: ${mode} / ${flavor}. ${total} total modes, ${combos} core workflow combinations.`,
    composerCopy: "Copy current combo",
    matrixTag: "4 x 4 Matrix",
    matrixTitle: "Sixteen combinations across the core runtime modes and the four flavors.",
    matrixNote: "Click any tile to swap the live prompt immediately.",
    libraryTag: "Mode Library",
    libraryTitle: "Clickable, copyable, installable, testable.",
    libraryMeta: (visible, total) => `Showing ${visible} of ${total} modes`,
    livePromptTag: "Live Prompt",
    previewSummary: (summary, useCase) => `${summary} Best for ${useCase}.`,
    copyPreview: "Copy current prompt",
    installTag: "Install Adapters",
    installTitle: "One runtime, wired into different agents.",
    installLabel: "Install",
    runLabel: "Run",
    benchmarkTag: "Benchmarks",
    benchmarkTitle: "What changes in agent behavior before and after the runtime.",
    benchmarkNote: "Not slogans: concrete actions and delivery differences.",
    beforeLabel: "Before",
    afterLabel: "After",
    beforeAria: "Behavior before runtime",
    afterAria: "Behavior after runtime",
    autopilotTag: "Autopilot",
    autopilotTitle: "Run a patrol every five minutes without waiting for a human nudge.",
    autopilotItems: [
      "Run build + Playwright smoke tests",
      "Write logs into automation/reports",
      "Call the Codex CLI to take the next bounded backlog item when available",
      "Register as a persistent Windows scheduled task without relying on the current shell"
    ],
    coverageTag: "Coverage",
    coverageTitle: "Not 'it feels usable' but checks point by point.",
    footerText:
      "Turn a prompt repo into an agent operating runtime. Modes, overlays, adapters, and the autopilot loop all live in one repository.",
    modalClose: "Close",
    outputContract: "Output Contract",
    modalFlavor: "Flavor",
    modalCopy: "Copy this mode",
    viewDetails: "View details",
    copied: "Copied"
  }
};

export const englishContent = {
  categories: {
    all: "All Modes",
    thinking: "Thinking",
    output: "Output Control",
    persona: "Persona",
    execution: "Execution",
    runtime: "Runtime"
  },
  flavors: {
    neutral: {
      strapline: "Clear, steady, reusable"
    },
    "high-agency": {
      strapline: "More proactive, more like an owner"
    },
    hardline: {
      strapline: "High-pressure execution, zero filler"
    },
    pua: {
      strapline: "A pressure-heavy execution protocol"
    }
  },
  modes: {
    "chain-thought": {
      summary: "Break a complex problem into subproblems, assumptions, evidence, and a final conclusion.",
      useCase: "complex analysis, research judgment, issue diagnosis",
      outputContract: "problem breakdown / assumptions / reasoning / evidence / uncertainty / final conclusion"
    },
    critique: {
      summary: "Dissect a plan like a reviewer and surface logic holes, weak evidence, and execution risk.",
      useCase: "design review, PR review, business judgment",
      outputContract: "logic gaps / weak evidence / ignored boundaries / execution risks / improvement suggestions"
    },
    debate: {
      summary: "Place the strongest pro and con cases side by side and force the real decision point.",
      useCase: "route selection, requirement disputes, technical choices",
      outputContract: "pro / con / judge / final recommendation"
    },
    "first-principle": {
      summary: "Return to basic facts and strip away consensus theater and habitual assumptions.",
      useCase: "innovative design, reframing complex problems",
      outputContract: "facts / building blocks / current assumptions / pushback / recombination / verification"
    },
    "json-format": {
      summary: "Lock the output to valid JSON with no explanatory filler.",
      useCase: "API interaction, structured extraction, agent chaining",
      outputContract: "valid JSON only"
    },
    "markdown-table": {
      summary: "Control column structure, numeric formatting, and header consistency.",
      useCase: "summary reports, competitor comparisons, review checklists",
      outputContract: "standard markdown table"
    },
    "code-block": {
      summary: "Return a language-tagged code block with imports, edges, and error handling included.",
      useCase: "code generation, refactoring, template output",
      outputContract: "code block only"
    },
    "step-by-step": {
      summary: "Split long work into staged outputs with explicit continue conditions.",
      useCase: "multi-turn collaboration, document generation, course design",
      outputContract: "stepwise output + READY_FOR_NEXT"
    },
    "senior-expert": {
      summary: "Raise the answer to a seasoned expert voice instead of a beginner tone.",
      useCase: "consulting, architecture review, strategy advice",
      outputContract: "one-line judgment + professional analysis + recommendation"
    },
    beginner: {
      summary: "Lower a complex concept to zero-friction onboarding language.",
      useCase: "teaching, documentation, explaining things to newcomers",
      outputContract: "analogy / example / step-by-step explanation"
    },
    "devil-advocate": {
      summary: "Deliberately argue from the nitpicker's angle to expose blind spots and black swans.",
      useCase: "risk assessment, pre-launch checks, strategy retrospectives",
      outputContract: "fatal issues / major risks / black swans / improvement suggestions"
    },
    "swiss-knife": {
      summary: "Produce designer, operator, and user views in one pass.",
      useCase: "product strategy, trade-off balancing, requirement framing",
      outputContract: "designer / business / user / final judgment"
    },
    "batch-process": {
      summary: "Take multiple inputs and process them against one consistent standard.",
      useCase: "batch generation, batch review, batch summarization",
      outputContract: "per-item result + overall conclusion"
    },
    template: {
      summary: "Separate the fixed template from the variable inputs for repeated work.",
      useCase: "daily updates, email, reports, command generation",
      outputContract: "template skeleton + substituted result"
    },
    "auto-iterate": {
      summary: "Force the model to self-review, revise, and reflect instead of one-shotting.",
      useCase: "copy polishing, plan optimization, scenario testing",
      outputContract: "draft / self-critique / revision / final version"
    },
    "multi-persona": {
      summary: "Run multiple virtual roles in parallel to reduce single-track bias.",
      useCase: "team brainstorming, risk hedging, complex judgment",
      outputContract: "multi-role viewpoints / consensus / disagreement / lead recommendation"
    },
    diagnose: {
      summary: "Use the pua five-step method to handle stalls, errors, and misdiagnosis.",
      useCase: "debugging, troubleshooting, environment failures",
      outputContract: "failure signal / search results / source material / verified assumptions / next step"
    },
    recover: {
      summary: "Recover first after repeated failures, then re-apply pressure instead of wrenching harder.",
      useCase: "long debugging sessions, stalled complex work",
      outputContract: "stuck diagnosis / smallest action / progressive recovery"
    },
    ship: {
      summary: "Redefine done as done-with-evidence.",
      useCase: "pre-delivery self-check, pre-release review",
      outputContract: "verification evidence / edge cases / similar issues / risks"
    },
    audit: {
      summary: "Audit platform constraints, dependency chains, and deployment environments in one pass.",
      useCase: "deployment, platform migration, multi-service architecture",
      outputContract: "constraint list / check results / one-shot fixes"
    }
  },
  adapters: {
    codex: {
      description: "Install both the runtime and the pua bundle into local Codex.",
      runtime: `/ruma-runtime
/pua
npm install
npm run dev
npm run check`
    },
    claude: {
      description: "Sync the runtime and pua bundle into Claude Code's skills directory.",
      runtime: `Explicitly invoke ruma-runtime or pua inside Claude Code
Trigger them automatically when you hit stalls, self-checks, or verification work`
    },
    openclaw: {
      description: "Sync the runtime and pua bundle directly into OpenClaw's skills layout.",
      runtime: `After OpenClaw boots, call ruma-runtime or pua for failure recovery, delivery verification, and environment audits`
    },
    cursor: {
      description: "Inject the runtime protocol through a rules file.",
      runtime: `Trigger diagnose / ship / audit flows inside Cursor Agent`
    },
    ops: {
      description: "Local five-minute patrols, self-tests, self-installation, and self-written reports.",
      runtime: `powershell -ExecutionPolicy Bypass -File ./scripts/autopilot-loop.ps1`
    }
  },
  qaChecks: [
    "Render every mode card on desktop",
    "Keep mobile layout and search filtering usable",
    "Open every mode card and verify modal content",
    "Write copy actions into the clipboard",
    "Update the generated prompt when the flavor changes",
    "Switch install tabs and show the correct snippets",
    "Close the modal with Esc and backdrop clicks",
    "Copy Codex / Claude Code / OpenClaw installers into the right directories",
    "Sync the pua skill references, agent metadata, and prompt during install"
  ],
  benchmarks: {
    "diagnose-loop": {
      scenario: "When debugging fails",
      title: "Diagnose Loop turns blame-based debugging into evidence-based debugging",
      before: [
        "See an error and immediately guess that the environment is broken without reading the full signal.",
        "Repeat the same fix path over and over without validating assumptions.",
        "Report only fuzzy guesses, leaving the user without a concrete next move."
      ],
      after: [
        "Read the full error, nearby context, and official material before judging anything.",
        "Validate prerequisite assumptions one by one and switch to a materially different path on the second failure.",
        "Output the failure signal, verified conclusions, candidate paths, and the next move."
      ],
      outcome:
        "Outcome: instead of 'maybe the environment is broken', you know what failed, why it failed, and how to fix it."
    },
    "ship-checklist": {
      scenario: "Before delivery",
      title: "Ship Checklist changes done from a feeling into evidence",
      before: [
        "Declare completion right after editing code without a shared build or test proof point.",
        "Only stare at the touched line and skip nearby risks in the same module or flow.",
        "Leave residual risks unmarked, which raises the handoff cost."
      ],
      after: [
        "Run build, test, and key manual path verification before delivery.",
        "Check for similar issues in the same file, module, and execution pattern after each fix.",
        "Write verification evidence, edge cases, and residual risk into the report."
      ],
      outcome:
        "Outcome: instead of 'it should be fine', you can immediately see what is verified and what risk remains."
    },
    "recovery-protocol": {
      scenario: "When a session stays stuck",
      title: "Recovery Protocol turns brute-force sessions into progressive recovery",
      before: [
        "Keep micro-tuning the same path while getting very little new information.",
        "Push the problem back to the user as soon as the session feels rough, without self-recovery first.",
        "Lack a smallest-action tactic, so the task keeps sprawling."
      ],
      after: [
        "First decide whether the method is wrong, the direction is wrong, information is missing, or assumptions are wrong.",
        "Prefer the smallest deterministic action that recovers information, then expand one ring at a time.",
        "Keep a recovery rhythm every round so the session stops drifting."
      ],
      outcome:
        "Outcome: the session shifts from low-yield churn into steady convergence, and the user sees a recovery path instead of emotional noise."
    }
  }
};
