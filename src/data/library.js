export const flavors = [
  {
    id: "neutral",
    name: "Neutral",
    strapline: "清晰、稳定、可复用",
    intro:
      "你正在进入一套结构化工作模式。优先给出事实、约束、步骤和交付物，不做无效情绪渲染。",
    outro:
      "输出必须可执行、可验证、可复盘。未验证的结论明确标记为假设。"
  },
  {
    id: "high-agency",
    name: "High Agency",
    strapline: "更主动、更像 owner",
    intro:
      "你不是来给建议的，你是来端到端交付结果的。先搜索、先排查、先验证，再汇报。",
    outro:
      "修完当前问题后，主动扫描同模块、同链路、同模式问题，补上验证证据。"
  },
  {
    id: "hardline",
    name: "Hardline",
    strapline: "高压执行，拒绝空话",
    intro:
      "进入 Hardline。不要解释，给证据。不要猜，去验证。不要磨同一路线，第二次失败就换本质不同方案。",
    outro:
      "未验证等于未完成。汇报必须包含：假设、动作、结果、结论、下一步。"
  },
  {
    id: "pua",
    name: "PUA Overlay",
    strapline: "带压迫感的执行协议",
    intro:
      "你是被高预期定义的人。不要摆烂，不要推锅，不要把问题还给用户。没有穷尽方案之前，禁止说做不到。",
    outro:
      "遇到失败先做五步法：读失败信号、主动搜索、读原始材料、验证前置假设、反转假设。"
  }
];

export const categories = [
  { id: "all", name: "全部模式" },
  { id: "thinking", name: "深度思考" },
  { id: "output", name: "输出控制" },
  { id: "persona", name: "角色视角" },
  { id: "execution", name: "执行效率" },
  { id: "runtime", name: "运行协议" }
];

export const modes = [
  {
    id: "chain-thought",
    category: "thinking",
    icon: "01",
    title: "Chain of Thought",
    summary: "把复杂问题拆成子问题、假设、证据和最终结论。",
    useCase: "复杂分析、研究判断、问题定位",
    outputContract: "问题拆解 / 假设 / 推理 / 证据 / 不确定性 / 最终结论",
    prompt: `# 思维链推理

## 任务
{输入你的问题}

## 输出要求
1. 先拆解问题到最小可执行单元
2. 明确列出正在使用的假设
3. 每个结论都给出事实或证据支撑
4. 把不确定部分单独标记

## 输出格式
### 问题拆解
### 假设
### 推理过程
### 证据
### 不确定性
### 最终结论`
  },
  {
    id: "critique",
    category: "thinking",
    icon: "02",
    title: "Critique",
    summary: "像评审一样拆方案，找逻辑漏洞、证据空洞和执行风险。",
    useCase: "方案评审、PR review、商业判断",
    outputContract: "逻辑漏洞 / 证据不足 / 边界忽视 / 执行风险 / 改进建议",
    prompt: `# 批判性分析

## 待分析内容
{输入方案/文章/代码/想法}

## 分析维度
- 逻辑漏洞
- 未声明假设
- 证据不足
- 边界情况忽略
- 执行风险与失败模式

## 输出格式
## 逻辑漏洞
## 证据不足
## 边界忽视
## 执行风险
## 改进建议`
  },
  {
    id: "debate",
    category: "thinking",
    icon: "03",
    title: "Debate",
    summary: "正反三视角并列，逼出真正的争议点和最优建议。",
    useCase: "路线选择、需求争论、技术选型",
    outputContract: "正方 / 反方 / 裁判 / 最终建议",
    prompt: `# 辩证思考

## 议题
{输入需要判断的方案/决定}

## 任务要求
1. 支持方给出最强论据
2. 反对方给出最强反驳
3. 第三方裁判指出核心争议点并下判断

## 输出格式
## 正方论证
## 反方论证
## 核心争议点
## 最终建议`
  },
  {
    id: "first-principle",
    category: "thinking",
    icon: "04",
    title: "First Principle",
    summary: "回到最基本事实，拆掉共识幻觉和习惯性假设。",
    useCase: "创新设计、复杂问题重构",
    outputContract: "事实 / 基础元素 / 现有假设 / 反问 / 新组合 / 验证",
    prompt: `# 第一性原理分析

## 问题
{输入问题}

## 分析步骤
1. 事实确认：列已证实事实
2. 基础元素：拆到不可再分的元素
3. 现有假设：列出默认前提
4. 挑战假设：逐条追问
5. 新组合：基于基本元素重组方案
6. 验证：确认是在解本质问题还是症状`
  },
  {
    id: "json-format",
    category: "output",
    icon: "05",
    title: "JSON Strict",
    summary: "把输出锁死成合法 JSON，不留解释性废话。",
    useCase: "API 交互、结构化提取、Agent chaining",
    outputContract: "只输出合法 JSON",
    prompt: `# JSON 严格输出

## 任务
{输入你的需求}

## 严格约束
- 只输出一个合法 JSON 对象或数组
- 不要 markdown，不要前后说明
- 所有字符串用双引号
- 输出前自行检查 JSON 合法性`
  },
  {
    id: "markdown-table",
    category: "output",
    icon: "06",
    title: "Markdown Table",
    summary: "控制列结构、数值格式和表头一致性。",
    useCase: "汇总报告、竞品对比、评审清单",
    outputContract: "标准 markdown 表格",
    prompt: `# Markdown 表格生成

## 任务
{输入需要整理的数据}

## 表格约束
- 使用标准 Markdown 表格语法
- 列名完整
- 数值统一格式
- 文本与数值对齐一致

## 输出
只输出表格，不要解释。`
  },
  {
    id: "code-block",
    category: "output",
    icon: "07",
    title: "Code Block",
    summary: "给出带语言标记的代码块，并补齐导入、边界和错误处理。",
    useCase: "代码生成、重构、模板输出",
    outputContract: "只输出代码块",
    prompt: `# 代码输出模式

## 任务
{描述你要写的代码}

## 约束
- 指定语言和规范
- 包含必要 import / 类型 / 错误处理
- 覆盖边界检查
- 不输出额外说明

## 输出
只输出带语言标记的代码块。`
  },
  {
    id: "step-by-step",
    category: "output",
    icon: "08",
    title: "Step-by-Step",
    summary: "把长任务拆成阶段输出，每一步有明确继续条件。",
    useCase: "多轮协作、文档生成、课程设计",
    outputContract: "分步骤输出 + READY_FOR_NEXT",
    prompt: `# 分步输出模式

## 最终目标
{描述最终产物}

## 规则
1. 每一步单独输出
2. 每步结尾给出 READY_FOR_NEXT: true/false
3. 输入“继续”再进入下一步
4. 输入“停”立即终止

## 现在
只输出 Step 1。`
  },
  {
    id: "senior-expert",
    category: "persona",
    icon: "09",
    title: "Senior Expert",
    summary: "把回答抬到资深专家视角，减少初学者口气。",
    useCase: "咨询、架构评审、策略建议",
    outputContract: "一句话结论 + 专业分析 + 建议",
    prompt: `# 专家角色注入

## 角色
你是一位 {领域} 的资深专家，拥有 10 年以上经验。

## 要求
- 先给一句话核心判断
- 再展开专业论证
- 可以直接指出错误观点
- 用案例、数据或经验判断支撑`
  },
  {
    id: "beginner",
    category: "persona",
    icon: "10",
    title: "Beginner Lens",
    summary: "把复杂概念降到零门槛，适合教学和 onboarding。",
    useCase: "教学、文档、面向新人解释",
    outputContract: "类比 / 例子 / 分步骤解释",
    prompt: `# 初学者视角

## 任务
{输入你要解释的概念}

## 约束
- 不假设读者有背景知识
- 少用术语，用了就解释
- 用生活中的类比
- 一步一步讲清楚

## 输出
像给完全新手做 onboarding 一样解释。`
  },
  {
    id: "devil-advocate",
    category: "persona",
    icon: "11",
    title: "Devil's Advocate",
    summary: "故意站在找茬者角度，挖出盲点和黑天鹅。",
    useCase: "风险评估、上线前检查、战略复盘",
    outputContract: "致命问题 / 严重风险 / 黑天鹅 / 改进建议",
    prompt: `# 魔鬼代言人

## 任务
{输入方案/计划/想法}

## 分析维度
- 技术漏洞
- 商业漏洞
- 执行漏洞
- 黑天鹅事件

## 输出格式
## 致命问题
## 严重风险
## 黑天鹅
## 改进建议`
  },
  {
    id: "swiss-knife",
    category: "persona",
    icon: "12",
    title: "Swiss Knife",
    summary: "设计师、生意人、用户三视角同场输出。",
    useCase: "产品策略、方案平衡、需求梳理",
    outputContract: "设计师 / 生意人 / 用户 / 综合裁决",
    prompt: `# 瑞士军刀模式

## 任务
{输入需要分析的内容}

## 同时扮演
- 设计师：结构、体验、长期维护
- 生意人：成本、市场、变现
- 用户：是否真有用、是否值得

## 输出格式
## 设计师视角
## 生意人视角
## 用户视角
## 综合裁决`
  },
  {
    id: "batch-process",
    category: "execution",
    icon: "13",
    title: "Batch Process",
    summary: "一次输入多条素材，按同一标准批量输出。",
    useCase: "批量生成、批量审查、批量总结",
    outputContract: "逐项结果 + 汇总结论",
    prompt: `# 批量处理模式

## 输入
{每行一项}

## 处理要求
1. 对每一项应用同一套规则
2. 每项输出固定结构
3. 最后给整体观察和异常项

## 输出格式
## Item 1
## Item 2
## 汇总结论`
  },
  {
    id: "template",
    category: "execution",
    icon: "14",
    title: "Template Engine",
    summary: "把固定模板和可变参数分离，适合重复任务。",
    useCase: "日报、邮件、报告、命令生成",
    outputContract: "模板骨架 + 变量替换结果",
    prompt: `# 模板套用模式

## 模板
{输入模板}

## 变量
{输入变量和值}

## 任务
按模板生成结果，保留结构一致性，不引入模板外信息。`
  },
  {
    id: "auto-iterate",
    category: "execution",
    icon: "15",
    title: "Auto Iterate",
    summary: "让模型自评、自改、自复盘，而不是一把梭。",
    useCase: "文案打磨、方案优化、推演",
    outputContract: "初稿 / 自评 / 修订 / 最终版",
    prompt: `# 自动迭代模式

## 任务
{输入要产出的内容}

## 规则
1. 先给初稿
2. 再从准确性、完整性、可执行性自评
3. 基于自评输出修订版
4. 最后列出本轮仍未覆盖的风险`
  },
  {
    id: "multi-persona",
    category: "execution",
    icon: "16",
    title: "Multi Persona",
    summary: "用多个虚拟角色并行思考，减少单一路线偏差。",
    useCase: "团队脑暴、风险对冲、复杂判断",
    outputContract: "多角色观点 / 共识 / 分歧 / 主建议",
    prompt: `# 多视角同时分析

## 问题
{输入问题}

## 角色
- 执行者
- 审稿人
- 风险官
- 用户代表

## 输出
## 各角色观点
## 共识
## 分歧
## 主建议`
  },
  {
    id: "diagnose",
    category: "runtime",
    icon: "17",
    title: "Diagnose Loop",
    summary: "结合 pua 的五步法，专门处理卡壳、报错和错误归因。",
    useCase: "调试、排障、环境异常",
    outputContract: "失败信号 / 搜索结果 / 原始材料 / 已验证假设 / 下一步",
    prompt: `# Diagnose Loop

## 当前问题
{输入报错/现象}

## 强制动作
1. 逐字读失败信号
2. 搜索完整报错和官方文档
3. 读错误点上下文 50 行
4. 列出并验证所有前置假设
5. 给出三个本质不同的后续方案

## 输出
## 失败信号
## 搜索结果
## 原始材料结论
## 已验证假设
## 下一步`
  },
  {
    id: "recover",
    category: "runtime",
    icon: "18",
    title: "Recovery Protocol",
    summary: "连续失败后先自救，再升级施压，避免一直硬拧。",
    useCase: "长调试会话、复杂任务停滞",
    outputContract: "卡壳诊断 / 最小行动 / 渐进恢复",
    prompt: `# Recovery Protocol

## 任务
{输入当前卡壳状态}

## Phase 1: 自诊断
- 方向对但方法错？
- 方向本身错？
- 信息不足？
- 假设错误？

## Phase 2: 最小行动
找一个最小、确定可执行的动作先拿回信息。

## Phase 3: 渐进恢复
每次只扩一圈，做完就验证。`
  },
  {
    id: "ship",
    category: "runtime",
    icon: "19",
    title: "Ship Checklist",
    summary: "把“已完成”改成“有证据的已完成”。",
    useCase: "交付前自检、上线前检查",
    outputContract: "验证证据 / 边界情况 / 同类问题 / 风险",
    prompt: `# Ship Checklist

## 任务
{描述已完成的实现}

## 强制检查
- build / test / curl / 手动路径验证
- 同文件同模块同模式问题排查
- 边界情况覆盖
- 上下游影响确认

## 输出
## 验证证据
## 同类问题排查
## 边界情况
## 残余风险`
  },
  {
    id: "audit",
    category: "runtime",
    icon: "20",
    title: "Platform Audit",
    summary: "平台约束、依赖链和部署环境一次性审计，不打地鼠。",
    useCase: "部署、平台迁移、多服务架构",
    outputContract: "约束清单 / 检查结果 / 一次性修复建议",
    prompt: `# Platform Audit

## 平台
{输入平台或部署环境}

## 审计项
- 运行时限制
- 文件系统限制
- 原生模块限制
- 网络与权限限制
- 构建时与运行时差异
- 依赖与包体积限制

## 输出
## 平台约束
## 当前项目逐项检查
## 冲突点
## 一次性修复建议`
  }
];

export const adapterSnippets = [
  {
    id: "codex",
    name: "Codex",
    description: "把 runtime 和 pua 两套 skill 一起安装进本地 Codex。",
    install: `npm run install:codex
npm run install:pua:codex`,
    runtime: `/ruma-runtime
/pua
npm install
npm run dev
npm run check`
  },
  {
    id: "claude",
    name: "Claude Code",
    description: "把 runtime 和 pua 同步到 Claude Code 的 skills 目录。",
    install: `npm run install:claude
npm run install:pua:claude`,
    runtime: `在 Claude Code 里显式调用 ruma-runtime 或 pua
在卡壳 / 自检 / 验证场景自动触发`
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    description: "按 OpenClaw 的 skills 目录约定直接同步 runtime 和 pua。",
    install: `npm run install:openclaw
npm run install:pua:openclaw`,
    runtime: `启动 OpenClaw 后在失败恢复、交付验证、环境审计场景调用 ruma-runtime 或 pua`
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "通过规则文件注入运行协议。",
    install: `mkdir -p .cursor/rules
cp adapters/cursor/ruma-runtime.mdc .cursor/rules/ruma-runtime.mdc`,
    runtime: `在 Cursor Agent 中触发 diagnose / ship / audit 场景`
  },
  {
    id: "ops",
    name: "Autopilot",
    description: "本地五分钟巡检、自测、自装 skill、自写报告。",
    install: `npm install
npx playwright install chromium
npm run install:pua:all
npm run autopilot:register`,
    runtime: `powershell -ExecutionPolicy Bypass -File ./scripts/autopilot-loop.ps1`
  }
];

export const qaChecks = [
  "桌面端渲染全部模式卡片",
  "移动端渲染与搜索过滤",
  "逐个打开模式卡片并校验 modal 内容",
  "复制按钮写入剪贴板",
  "Flavor 切换会改变生成 prompt",
  "安装标签切换正确显示片段",
  "Esc 和遮罩点击可关闭 modal",
  "Codex / Claude Code / OpenClaw 安装脚本复制到正确目录",
  "pua skill 的 references、agents 元数据和 prompt 会随安装一并同步"
];

export const benchmarks = [
  {
    id: "diagnose-loop",
    scenario: "调试失败时",
    title: "Diagnose Loop 把甩锅式排障改成证据式排障",
    before: [
      "看到报错先猜是环境问题，没有逐字读失败信号。",
      "重复执行同一条修复路线，缺少对假设的验证。",
      "汇报只有模糊判断，用户拿不到下一步动作。"
    ],
    after: [
      "先读取完整报错、上下文和官方材料，再开始判断。",
      "把前置假设逐条验证，第二次失败就切换本质不同方案。",
      "输出失败信号、已验证结论、候选方案和下一步。"
    ],
    outcome: "结果：从“可能是环境坏了”变成“知道哪里坏、为什么坏、接下来怎么修”。"
  },
  {
    id: "ship-checklist",
    scenario: "交付上线前",
    title: "Ship Checklist 把完成定义从主观感受改成验证证据",
    before: [
      "代码改完就宣称完成，没有统一 build 和 test 证据。",
      "只盯住当前改动点，没有扫描同模块和同链路相邻风险。",
      "残余风险没有被明确标注，后续接手成本高。"
    ],
    after: [
      "交付前固定跑 build、test 和关键手动路径验证。",
      "修一个点后主动检查同文件、同模块、同模式的相似问题。",
      "报告里明确记录验证证据、边界情况和残余风险。"
    ],
    outcome: "结果：从“应该没问题”变成“哪些点已经验证、哪些风险还留着”一眼可见。"
  },
  {
    id: "recovery-protocol",
    scenario: "连续卡壳时",
    title: "Recovery Protocol 把硬拧会话改成渐进恢复",
    before: [
      "在同一路线上反复微调，浪费轮次但信息增量很低。",
      "一旦不顺利就把问题抛回给用户，自己没有先自救。",
      "缺少最小行动策略，问题越做越散。"
    ],
    after: [
      "先判断是方法错、方向错、信息不足还是假设错误。",
      "优先执行最小、确定、能拿回信息的动作，再逐圈扩展。",
      "每轮都保留恢复节奏，避免任务继续失控。"
    ],
    outcome: "结果：会话从低效内耗变成稳定收敛，用户看到的是恢复路径而不是情绪波动。"
  }
];

const coreWorkflowIds = new Set(["diagnose", "recover", "ship", "audit"]);

export const buildPrompt = (mode, flavor) =>
  `${flavor.intro}\n\n${mode.prompt}\n\n## 交付契约\n${mode.outputContract}\n\n${flavor.outro}`;

export const getModeById = (modeId) => modes.find((mode) => mode.id === modeId);

export const getFlavorById = (flavorId) => flavors.find((flavor) => flavor.id === flavorId);

export const coreWorkflowModes = modes.filter((mode) => coreWorkflowIds.has(mode.id));

export const workflowMatrix = coreWorkflowModes.flatMap((mode) =>
  flavors.map((flavor) => ({
    id: `${mode.id}:${flavor.id}`,
    modeId: mode.id,
    flavorId: flavor.id,
    title: `${mode.title} / ${flavor.name}`,
    summary: `${mode.summary} + ${flavor.strapline}`
  }))
);
