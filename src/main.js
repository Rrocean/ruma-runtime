import "./styles.css";
import { adapterSnippets, benchmarks, categories, flavors, modes, qaChecks } from "./data/library.js";

const state = {
  activeCategory: "all",
  activeFlavor: "high-agency",
  search: "",
  activeAdapter: "codex",
  activeModeId: modes[0].id
};

const app = document.querySelector("#app");

const composePrompt = (mode, flavor) =>
  `${flavor.intro}\n\n${mode.prompt}\n\n## 交付契约\n${mode.outputContract}\n\n${flavor.outro}`;

const getFilteredModes = () =>
  modes.filter((mode) => {
    const categoryMatch = state.activeCategory === "all" || mode.category === state.activeCategory;
    const searchMatch =
      state.search.trim() === "" ||
      `${mode.title} ${mode.summary} ${mode.useCase}`.toLowerCase().includes(state.search.trim().toLowerCase());
    return categoryMatch && searchMatch;
  });

const getActiveFlavor = () => flavors.find((flavor) => flavor.id === state.activeFlavor);
const getActiveMode = () => modes.find((mode) => mode.id === state.activeModeId) ?? modes[0];
const getActiveAdapter = () => adapterSnippets.find((adapter) => adapter.id === state.activeAdapter);

const renderShell = () => {
  app.innerHTML = `
    <div class="site-shell">
      <div class="ambient ambient-a"></div>
      <div class="ambient ambient-b"></div>
      <header class="hero">
        <div class="hero-copy">
          <span class="eyebrow">RuMa Runtime</span>
          <h1>把提示词库、Skill 和执行协议压成一个 Agent 运行时。</h1>
          <p class="hero-text">
            不是再造一个 prompt 仓库，而是把 <strong>模式</strong>、<strong>语气</strong>、
            <strong>安装适配</strong> 和 <strong>自巡检 loop</strong> 打进同一个项目。
          </p>
          <div class="hero-actions">
            <a class="hero-button hero-button-primary" href="#library">浏览模式库</a>
            <a class="hero-button hero-button-secondary" href="#autopilot">查看自跑循环</a>
          </div>
        </div>
        <aside class="hero-panel">
          <div class="metric-card">
            <span class="metric-label">Operating Modes</span>
            <strong>${modes.length}</strong>
          </div>
          <div class="metric-card">
            <span class="metric-label">Flavor Packs</span>
            <strong>${flavors.length}</strong>
          </div>
          <div class="metric-card">
            <span class="metric-label">Client Adapters</span>
            <strong>${adapterSnippets.length}</strong>
          </div>
          <div class="metric-card">
            <span class="metric-label">Smoke Checks</span>
            <strong>${qaChecks.length}</strong>
          </div>
        </aside>
      </header>

      <main class="page-body">
        <section class="control-surface">
          <div class="surface-copy">
            <span class="section-tag">Surface Control</span>
            <h2>按模式选能力，按 Flavor 选执行强度。</h2>
            <p>搜索、筛选、切换语气后，右侧的 prompt 会动态重组，不再是硬编码死文本。</p>
          </div>
          <div class="surface-controls">
            <label class="search-card">
              <span>搜索模式</span>
              <input id="searchInput" type="search" placeholder="输入 diagnose / ship / json / expert..." />
            </label>
            <div class="control-block">
              <div class="control-label">分类</div>
              <div id="categoryChips" class="chip-row"></div>
            </div>
            <div class="control-block">
              <div class="control-label">Flavor</div>
              <div id="flavorChips" class="flavor-grid"></div>
            </div>
          </div>
        </section>

        <section id="library" class="library-section">
          <div class="section-head">
            <div>
              <span class="section-tag">Mode Library</span>
              <h2>可点击、可复制、可安装、可测试。</h2>
            </div>
            <div class="section-note" id="libraryMeta"></div>
          </div>
          <div id="modeGrid" class="mode-grid"></div>
        </section>

        <section class="detail-strip">
          <article class="preview-panel">
            <div class="section-head">
              <div>
                <span class="section-tag">Live Prompt</span>
                <h2 id="previewTitle"></h2>
              </div>
              <button id="copyPreviewButton" class="ghost-button" type="button">复制当前 Prompt</button>
            </div>
            <p id="previewSummary" class="preview-summary"></p>
            <div class="prompt-frame">
              <pre id="previewPrompt"></pre>
            </div>
          </article>

          <article class="adapter-panel">
            <div class="section-head">
              <div>
                <span class="section-tag">Install Adapters</span>
                <h2>同一套 runtime，接进不同 Agent。</h2>
              </div>
            </div>
            <div id="adapterTabs" class="adapter-tabs"></div>
            <div class="adapter-copy">
              <p id="adapterDescription"></p>
              <div class="code-stack">
                <div>
                  <h3>Install</h3>
                  <pre id="adapterInstall"></pre>
                </div>
                <div>
                  <h3>Run</h3>
                  <pre id="adapterRuntime"></pre>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section id="benchmarks" class="benchmark-section">
          <div class="section-head">
            <div>
              <span class="section-tag">Benchmarks</span>
              <h2>接入 runtime 前后，Agent 行为差在哪里。</h2>
            </div>
            <div class="section-note">不是抽象口号，而是具体动作和交付差异。</div>
          </div>
          <div id="benchmarkGrid" class="benchmark-grid"></div>
        </section>

        <section id="autopilot" class="ops-grid">
          <article class="ops-card">
            <span class="section-tag">Autopilot</span>
            <h2>每 5 分钟巡检一次，不等人来催。</h2>
            <ul class="ops-list">
              <li>执行 build + Playwright smoke test</li>
              <li>记录日志到 automation/reports</li>
              <li>如本机可用，调用 Codex CLI 处理 backlog 中的下一项改进</li>
              <li>Windows 计划任务可常驻，不依赖当前终端</li>
            </ul>
            <div class="prompt-frame">
              <pre>npm run autopilot:register
npm run autopilot:once
npm run qa:loop</pre>
            </div>
          </article>

          <article class="ops-card">
            <span class="section-tag">Coverage</span>
            <h2>不是“我觉得能用”，而是逐个点测。</h2>
            <ul class="ops-list">${qaChecks.map((item) => `<li>${item}</li>`).join("")}</ul>
          </article>
        </section>
      </main>

      <footer class="footer">
        <div>
          <span class="section-tag">RuMa Runtime</span>
          <p>从 prompt 库进化成 agent operating runtime。模式、Flavor、适配器和自巡检 loop 全部在一个仓里闭环。</p>
        </div>
        <button id="footerCopyButton" class="ghost-button" type="button">复制当前 Prompt</button>
      </footer>
    </div>

    <div id="modeModal" class="modal-shell" hidden>
      <div class="modal-backdrop" data-close-modal="true"></div>
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button id="closeModalButton" class="modal-close" type="button" aria-label="关闭">×</button>
        <div class="modal-head">
          <span id="modalUseCase" class="section-tag"></span>
          <h3 id="modalTitle"></h3>
          <p id="modalSummary"></p>
        </div>
        <div class="modal-body">
          <div class="modal-meta">
            <div>
              <span class="meta-label">Output Contract</span>
              <strong id="modalContract"></strong>
            </div>
            <div>
              <span class="meta-label">Flavor</span>
              <strong id="modalFlavor"></strong>
            </div>
          </div>
          <div class="prompt-frame">
            <pre id="modalPrompt"></pre>
          </div>
          <button id="modalCopyButton" class="hero-button hero-button-primary" type="button">复制这个模式</button>
        </div>
      </div>
    </div>
  `;
};

const renderCategoryChips = () => {
  document.querySelector("#categoryChips").innerHTML = categories
    .map(
      (category) => `
        <button
          class="chip ${category.id === state.activeCategory ? "chip-active" : ""}"
          data-category="${category.id}"
          type="button"
        >
          ${category.name}
        </button>
      `
    )
    .join("");
};

const renderFlavorChips = () => {
  document.querySelector("#flavorChips").innerHTML = flavors
    .map(
      (flavor) => `
        <button
          class="flavor-card ${flavor.id === state.activeFlavor ? "flavor-active" : ""}"
          data-flavor="${flavor.id}"
          type="button"
        >
          <span>${flavor.name}</span>
          <small>${flavor.strapline}</small>
        </button>
      `
    )
    .join("");
};

const renderModeGrid = () => {
  const filteredModes = getFilteredModes();
  document.querySelector("#libraryMeta").textContent = `当前显示 ${filteredModes.length} / ${modes.length} 个模式`;
  document.querySelector("#modeGrid").innerHTML = filteredModes
    .map(
      (mode) => `
        <button class="mode-card" data-mode="${mode.id}" type="button">
          <div class="mode-topline">
            <span class="mode-icon">${mode.icon}</span>
            <span class="mode-category">${categories.find((item) => item.id === mode.category)?.name ?? mode.category}</span>
          </div>
          <h3>${mode.title}</h3>
          <p>${mode.summary}</p>
          <div class="mode-meta">
            <span>${mode.useCase}</span>
            <strong>查看详情</strong>
          </div>
        </button>
      `
    )
    .join("");
};

const renderPreview = () => {
  const mode = getActiveMode();
  const flavor = getActiveFlavor();
  document.querySelector("#previewTitle").textContent = `${mode.title} / ${flavor.name}`;
  document.querySelector("#previewSummary").textContent = `${mode.summary} 适合 ${mode.useCase}。`;
  document.querySelector("#previewPrompt").textContent = composePrompt(mode, flavor);
};

const renderAdapters = () => {
  document.querySelector("#adapterTabs").innerHTML = adapterSnippets
    .map(
      (adapter) => `
        <button
          class="chip ${adapter.id === state.activeAdapter ? "chip-active" : ""}"
          data-adapter="${adapter.id}"
          type="button"
        >
          ${adapter.name}
        </button>
      `
    )
    .join("");

  const adapter = getActiveAdapter();
  document.querySelector("#adapterDescription").textContent = adapter.description;
  document.querySelector("#adapterInstall").textContent = adapter.install;
  document.querySelector("#adapterRuntime").textContent = adapter.runtime;
};

const renderBenchmarks = () => {
  document.querySelector("#benchmarkGrid").innerHTML = benchmarks
    .map(
      (benchmark) => `
        <article class="benchmark-card" data-benchmark="${benchmark.id}">
          <div class="benchmark-head">
            <span class="benchmark-kicker">${benchmark.scenario}</span>
            <h3>${benchmark.title}</h3>
          </div>
          <div class="benchmark-columns">
            <section class="benchmark-column benchmark-before" aria-label="Before runtime behavior">
              <span class="benchmark-label">Before</span>
              <ul class="benchmark-list">
                ${benchmark.before.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </section>
            <section class="benchmark-column benchmark-after" aria-label="After runtime behavior">
              <span class="benchmark-label">After</span>
              <ul class="benchmark-list">
                ${benchmark.after.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </section>
          </div>
          <p class="benchmark-outcome">${benchmark.outcome}</p>
        </article>
      `
    )
    .join("");
};

const setCopyLabel = (button, nextText) => {
  const original = button.dataset.originalLabel ?? button.textContent;
  button.dataset.originalLabel = original;
  button.textContent = nextText;
  window.clearTimeout(button._copyTimer);
  button._copyTimer = window.setTimeout(() => {
    button.textContent = original;
  }, 1200);
};

const copyText = async (text, trigger) => {
  await navigator.clipboard.writeText(text);
  setCopyLabel(trigger, "已复制");
};

const openModal = (modeId) => {
  state.activeModeId = modeId;
  const mode = getActiveMode();
  const flavor = getActiveFlavor();
  renderPreview();
  document.body.classList.add("modal-open");
  document.querySelector("#modeModal").hidden = false;
  document.querySelector("#modalUseCase").textContent = mode.useCase;
  document.querySelector("#modalTitle").textContent = mode.title;
  document.querySelector("#modalSummary").textContent = mode.summary;
  document.querySelector("#modalContract").textContent = mode.outputContract;
  document.querySelector("#modalFlavor").textContent = flavor.name;
  document.querySelector("#modalPrompt").textContent = composePrompt(mode, flavor);
};

const closeModal = () => {
  document.body.classList.remove("modal-open");
  document.querySelector("#modeModal").hidden = true;
};

const bindEvents = () => {
  document.querySelector("#searchInput").addEventListener("input", (event) => {
    state.search = event.target.value;
    renderModeGrid();
  });

  app.addEventListener("click", async (event) => {
    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      state.activeCategory = categoryButton.dataset.category;
      renderCategoryChips();
      renderModeGrid();
      return;
    }

    const flavorButton = event.target.closest("[data-flavor]");
    if (flavorButton) {
      state.activeFlavor = flavorButton.dataset.flavor;
      renderFlavorChips();
      renderPreview();
      if (!document.querySelector("#modeModal").hidden) {
        openModal(state.activeModeId);
      }
      return;
    }

    const adapterButton = event.target.closest("[data-adapter]");
    if (adapterButton) {
      state.activeAdapter = adapterButton.dataset.adapter;
      renderAdapters();
      return;
    }

    const modeButton = event.target.closest("[data-mode]");
    if (modeButton) {
      openModal(modeButton.dataset.mode);
      return;
    }

    if (event.target.closest("[data-close-modal]") || event.target.closest("#closeModalButton")) {
      closeModal();
      return;
    }

    if (event.target.closest("#copyPreviewButton") || event.target.closest("#footerCopyButton")) {
      await copyText(composePrompt(getActiveMode(), getActiveFlavor()), event.target.closest("button"));
      return;
    }

    if (event.target.closest("#modalCopyButton")) {
      await copyText(composePrompt(getActiveMode(), getActiveFlavor()), event.target.closest("button"));
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.querySelector("#modeModal").hidden) {
      closeModal();
    }

    if (event.key === "/" && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
      event.preventDefault();
      document.querySelector("#searchInput").focus();
    }
  });
};

const boot = () => {
  renderShell();
  renderCategoryChips();
  renderFlavorChips();
  renderModeGrid();
  renderPreview();
  renderAdapters();
  renderBenchmarks();
  bindEvents();
};

boot();
