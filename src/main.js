import "./styles.css";
import {
  adapterSnippets as sourceAdapters,
  benchmarks as sourceBenchmarks,
  categories as sourceCategories,
  flavors as sourceFlavors,
  modes as sourceModes,
  qaChecks as sourceQaChecks,
  workflowMatrix
} from "./data/library.js";
import { englishContent, localeOptions, uiCopy } from "./data/locales.js";

const LOCALE_STORAGE_KEY = "ruma-runtime-locale";

const getInitialLocale = () => {
  try {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (storedLocale === "zh" || storedLocale === "en") {
      return storedLocale;
    }
  } catch {
    // Ignore storage failures and fall back to the default locale.
  }

  return "zh";
};

const state = {
  activeCategory: "all",
  activeFlavor: "high-agency",
  search: "",
  activeAdapter: "codex",
  activeModeId: sourceModes[0].id,
  activeLocale: getInitialLocale(),
  isModalOpen: false,
  eventsBound: false
};

const app = document.querySelector("#app");

const getCopy = () => uiCopy[state.activeLocale];
const getEnglishOverride = (section, id) => (state.activeLocale === "en" ? englishContent[section]?.[id] : null);

const getDisplayCategory = (category) => ({
  ...category,
  name: getEnglishOverride("categories", category.id) ?? category.name
});

const getDisplayFlavor = (flavor) => ({
  ...flavor,
  ...(getEnglishOverride("flavors", flavor.id) ?? {})
});

const getDisplayMode = (mode) => ({
  ...mode,
  ...(getEnglishOverride("modes", mode.id) ?? {})
});

const getDisplayAdapter = (adapter) => ({
  ...adapter,
  ...(getEnglishOverride("adapters", adapter.id) ?? {})
});

const getDisplayBenchmark = (benchmark) => ({
  ...benchmark,
  ...(getEnglishOverride("benchmarks", benchmark.id) ?? {})
});

const getDisplayQaChecks = () => (state.activeLocale === "en" ? englishContent.qaChecks : sourceQaChecks);

const composePrompt = (mode, flavor) =>
  `${flavor.intro}\n\n${mode.prompt}\n\n## 交付契约\n${mode.outputContract}\n\n${flavor.outro}`;

const getFilteredModes = () =>
  sourceModes.filter((mode) => {
    const categoryMatch = state.activeCategory === "all" || mode.category === state.activeCategory;
    const displayMode = getDisplayMode(mode);
    const searchHaystack = [
      mode.title,
      mode.summary,
      mode.useCase,
      displayMode.summary,
      displayMode.useCase,
      displayMode.outputContract
    ]
      .join(" ")
      .toLowerCase();
    const searchMatch =
      state.search.trim() === "" || searchHaystack.includes(state.search.trim().toLowerCase());

    return categoryMatch && searchMatch;
  });

const getSourceFlavor = () => sourceFlavors.find((flavor) => flavor.id === state.activeFlavor) ?? sourceFlavors[0];
const getSourceMode = () => sourceModes.find((mode) => mode.id === state.activeModeId) ?? sourceModes[0];
const getSourceAdapter = () => sourceAdapters.find((adapter) => adapter.id === state.activeAdapter) ?? sourceAdapters[0];

const syncDocumentMeta = () => {
  const copy = getCopy();
  document.documentElement.lang = copy.htmlLang;
  document.title = copy.documentTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", copy.metaDescription);
  }
};

const renderShell = () => {
  const copy = getCopy();

  app.innerHTML = `
    <div class="site-shell">
      <div class="ambient ambient-a"></div>
      <div class="ambient ambient-b"></div>
      <header class="hero">
        <div class="hero-copy">
          <div class="hero-topline">
            <span class="eyebrow">RuMa Runtime</span>
            <div id="localeSwitch" class="locale-switch" role="group" aria-label="${copy.localeLabel}">
              <span class="locale-label">${copy.localeLabel}</span>
              ${localeOptions
                .map(
                  (locale) => `
                    <button
                      class="locale-button ${locale.id === state.activeLocale ? "locale-button-active" : ""}"
                      data-locale="${locale.id}"
                      type="button"
                      aria-pressed="${locale.id === state.activeLocale}"
                    >
                      ${locale.label}
                    </button>
                  `
                )
                .join("")}
            </div>
          </div>
          <h1>${copy.heroTitle}</h1>
          <p class="hero-text">${copy.heroText}</p>
          <div class="hero-actions">
            <a class="hero-button hero-button-primary" href="#library">${copy.heroPrimary}</a>
            <a class="hero-button hero-button-secondary" href="#autopilot">${copy.heroSecondary}</a>
          </div>
        </div>
        <aside class="hero-panel">
          <div class="metric-card">
            <span class="metric-label">${copy.metrics.operatingModes}</span>
            <strong>${sourceModes.length}</strong>
          </div>
          <div class="metric-card">
            <span class="metric-label">${copy.metrics.flavorPacks}</span>
            <strong>${sourceFlavors.length}</strong>
          </div>
          <div class="metric-card">
            <span class="metric-label">${copy.metrics.clientAdapters}</span>
            <strong>${sourceAdapters.length}</strong>
          </div>
          <div class="metric-card">
            <span class="metric-label">${copy.metrics.smokeChecks}</span>
            <strong>${sourceQaChecks.length}</strong>
          </div>
          <div class="metric-card">
            <span class="metric-label">${copy.metrics.coreCombos}</span>
            <strong>${workflowMatrix.length}</strong>
          </div>
        </aside>
      </header>

      <main class="page-body">
        <section class="control-surface">
          <div class="surface-copy">
            <span class="section-tag">${copy.surfaceTag}</span>
            <h2>${copy.surfaceTitle}</h2>
            <p>${copy.surfaceText}</p>
          </div>
          <div class="surface-controls">
            <label class="search-card">
              <span>${copy.searchLabel}</span>
              <input id="searchInput" type="search" placeholder="${copy.searchPlaceholder}" value="${state.search}" />
            </label>
            <div class="control-block">
              <div class="control-label">${copy.categoryLabel}</div>
              <div id="categoryChips" class="chip-row"></div>
            </div>
            <div class="control-block">
              <div class="control-label">${copy.flavorLabel}</div>
              <div id="flavorChips" class="flavor-grid"></div>
            </div>
          </div>
        </section>

        <section class="composer-strip">
          <article class="composer-panel">
            <div class="section-head">
              <div>
                <span class="section-tag">${copy.composerTag}</span>
                <h2>${copy.composerTitle}</h2>
              </div>
              <button id="randomComboButton" class="ghost-button" type="button">${copy.composerRandom}</button>
            </div>
            <div class="composer-form">
              <label class="select-card">
                <span>${copy.composerModeLabel}</span>
                <select id="composerModeSelect"></select>
              </label>
              <label class="select-card">
                <span>${copy.composerFlavorLabel}</span>
                <select id="composerFlavorSelect"></select>
              </label>
            </div>
            <p id="composerSummary" class="preview-summary"></p>
            <div class="prompt-frame">
              <pre id="composerCommand"></pre>
            </div>
            <button id="copyComposerButton" class="hero-button hero-button-primary" type="button">${copy.composerCopy}</button>
          </article>

          <article class="matrix-panel">
            <div class="section-head">
              <div>
                <span class="section-tag">${copy.matrixTag}</span>
                <h2>${copy.matrixTitle}</h2>
              </div>
              <div class="section-note">${copy.matrixNote}</div>
            </div>
            <div id="matrixGrid" class="matrix-grid"></div>
          </article>
        </section>

        <section id="library" class="library-section">
          <div class="section-head">
            <div>
              <span class="section-tag">${copy.libraryTag}</span>
              <h2>${copy.libraryTitle}</h2>
            </div>
            <div class="section-note" id="libraryMeta"></div>
          </div>
          <div id="modeGrid" class="mode-grid"></div>
        </section>

        <section class="detail-strip">
          <article class="preview-panel">
            <div class="section-head">
              <div>
                <span class="section-tag">${copy.livePromptTag}</span>
                <h2 id="previewTitle"></h2>
              </div>
              <button id="copyPreviewButton" class="ghost-button" type="button">${copy.copyPreview}</button>
            </div>
            <p id="previewSummary" class="preview-summary"></p>
            <div class="prompt-frame">
              <pre id="previewPrompt"></pre>
            </div>
          </article>

          <article class="adapter-panel">
            <div class="section-head">
              <div>
                <span class="section-tag">${copy.installTag}</span>
                <h2>${copy.installTitle}</h2>
              </div>
            </div>
            <div id="adapterTabs" class="adapter-tabs"></div>
            <div class="adapter-copy">
              <p id="adapterDescription"></p>
              <div class="code-stack">
                <div>
                  <h3>${copy.installLabel}</h3>
                  <pre id="adapterInstall"></pre>
                </div>
                <div>
                  <h3>${copy.runLabel}</h3>
                  <pre id="adapterRuntime"></pre>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section id="benchmarks" class="benchmark-section">
          <div class="section-head">
            <div>
              <span class="section-tag">${copy.benchmarkTag}</span>
              <h2>${copy.benchmarkTitle}</h2>
            </div>
            <div class="section-note">${copy.benchmarkNote}</div>
          </div>
          <div id="benchmarkGrid" class="benchmark-grid"></div>
        </section>

        <section id="autopilot" class="ops-grid">
          <article class="ops-card">
            <span class="section-tag">${copy.autopilotTag}</span>
            <h2>${copy.autopilotTitle}</h2>
            <ul class="ops-list">
              ${copy.autopilotItems.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <div class="prompt-frame">
              <pre>npm run autopilot:register
npm run autopilot:once
npm run qa:loop</pre>
            </div>
          </article>

          <article class="ops-card">
            <span class="section-tag">${copy.coverageTag}</span>
            <h2>${copy.coverageTitle}</h2>
            <ul class="ops-list">${getDisplayQaChecks().map((item) => `<li>${item}</li>`).join("")}</ul>
          </article>
        </section>
      </main>

      <footer class="footer">
        <div>
          <span class="section-tag">RuMa Runtime</span>
          <p>${copy.footerText}</p>
        </div>
        <button id="footerCopyButton" class="ghost-button" type="button">${copy.copyPreview}</button>
      </footer>
    </div>

    <div id="modeModal" class="modal-shell" hidden>
      <div class="modal-backdrop" data-close-modal="true"></div>
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button id="closeModalButton" class="modal-close" type="button" aria-label="${copy.modalClose}">×</button>
        <div class="modal-head">
          <span id="modalUseCase" class="section-tag"></span>
          <h3 id="modalTitle"></h3>
          <p id="modalSummary"></p>
        </div>
        <div class="modal-body">
          <div class="modal-meta">
            <div>
              <span class="meta-label">${copy.outputContract}</span>
              <strong id="modalContract"></strong>
            </div>
            <div>
              <span class="meta-label">${copy.modalFlavor}</span>
              <strong id="modalFlavor"></strong>
            </div>
          </div>
          <div class="prompt-frame">
            <pre id="modalPrompt"></pre>
          </div>
          <button id="modalCopyButton" class="hero-button hero-button-primary" type="button">${copy.modalCopy}</button>
        </div>
      </div>
    </div>
  `;
};

const renderCategoryChips = () => {
  document.querySelector("#categoryChips").innerHTML = sourceCategories
    .map((category) => getDisplayCategory(category))
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
  document.querySelector("#flavorChips").innerHTML = sourceFlavors
    .map((flavor) => getDisplayFlavor(flavor))
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
  const copy = getCopy();
  const filteredModes = getFilteredModes();

  document.querySelector("#libraryMeta").textContent = copy.libraryMeta(filteredModes.length, sourceModes.length);
  document.querySelector("#modeGrid").innerHTML = filteredModes
    .map((mode) => {
      const displayMode = getDisplayMode(mode);
      const categoryName =
        getDisplayCategory(sourceCategories.find((item) => item.id === mode.category) ?? { id: mode.category, name: mode.category }).name;

      return `
        <button class="mode-card" data-mode="${mode.id}" type="button">
          <div class="mode-topline">
            <span class="mode-icon">${mode.icon}</span>
            <span class="mode-category">${categoryName}</span>
          </div>
          <h3>${mode.title}</h3>
          <p>${displayMode.summary}</p>
          <div class="mode-meta">
            <span>${displayMode.useCase}</span>
            <strong>${copy.viewDetails}</strong>
          </div>
        </button>
      `;
    })
    .join("");
};

const renderComposer = () => {
  const copy = getCopy();
  const sourceMode = getSourceMode();
  const sourceFlavor = getSourceFlavor();

  document.querySelector("#composerModeSelect").innerHTML = sourceModes
    .map((mode) => `<option value="${mode.id}" ${mode.id === sourceMode.id ? "selected" : ""}>${mode.title}</option>`)
    .join("");

  document.querySelector("#composerFlavorSelect").innerHTML = sourceFlavors
    .map((flavor) => {
      const displayFlavor = getDisplayFlavor(flavor);
      return `<option value="${flavor.id}" ${flavor.id === sourceFlavor.id ? "selected" : ""}>${displayFlavor.name}</option>`;
    })
    .join("");

  const displayFlavor = getDisplayFlavor(sourceFlavor);
  document.querySelector("#composerSummary").textContent = copy.composerSummary(
    sourceMode.title,
    displayFlavor.name,
    sourceModes.length,
    workflowMatrix.length
  );
  document.querySelector("#composerCommand").textContent = `node ./bin/ruma-runtime.mjs compose ${sourceMode.id} ${sourceFlavor.id}
node ./bin/ruma-runtime.mjs random
node ./bin/ruma-runtime.mjs matrix`;
};

const renderPreview = () => {
  const copy = getCopy();
  const sourceMode = getSourceMode();
  const displayMode = getDisplayMode(sourceMode);
  const displayFlavor = getDisplayFlavor(getSourceFlavor());

  document.querySelector("#previewTitle").textContent = `${sourceMode.title} / ${displayFlavor.name}`;
  document.querySelector("#previewSummary").textContent = copy.previewSummary(displayMode.summary, displayMode.useCase);
  document.querySelector("#previewPrompt").textContent = composePrompt(sourceMode, getSourceFlavor());
};

const renderAdapters = () => {
  document.querySelector("#adapterTabs").innerHTML = sourceAdapters
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

  const adapter = getDisplayAdapter(getSourceAdapter());
  document.querySelector("#adapterDescription").textContent = adapter.description;
  document.querySelector("#adapterInstall").textContent = adapter.install;
  document.querySelector("#adapterRuntime").textContent = adapter.runtime;
};

const renderBenchmarks = () => {
  const copy = getCopy();

  document.querySelector("#benchmarkGrid").innerHTML = sourceBenchmarks
    .map((benchmark) => {
      const displayBenchmark = getDisplayBenchmark(benchmark);

      return `
        <article class="benchmark-card" data-benchmark="${benchmark.id}">
          <div class="benchmark-head">
            <span class="benchmark-kicker">${displayBenchmark.scenario}</span>
            <h3>${displayBenchmark.title}</h3>
          </div>
          <div class="benchmark-columns">
            <section class="benchmark-column benchmark-before" aria-label="${copy.beforeAria}">
              <span class="benchmark-label">${copy.beforeLabel}</span>
              <ul class="benchmark-list">
                ${displayBenchmark.before.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </section>
            <section class="benchmark-column benchmark-after" aria-label="${copy.afterAria}">
              <span class="benchmark-label">${copy.afterLabel}</span>
              <ul class="benchmark-list">
                ${displayBenchmark.after.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </section>
          </div>
          <p class="benchmark-outcome">${displayBenchmark.outcome}</p>
        </article>
      `;
    })
    .join("");
};

const renderMatrix = () => {
  document.querySelector("#matrixGrid").innerHTML = workflowMatrix
    .map((combo) => {
      const mode = sourceModes.find((item) => item.id === combo.modeId);
      const flavor = getDisplayFlavor(sourceFlavors.find((item) => item.id === combo.flavorId));
      const selected = combo.modeId === state.activeModeId && combo.flavorId === state.activeFlavor;

      return `
        <button
          class="matrix-card ${selected ? "matrix-card-active" : ""}"
          data-matrix-mode="${combo.modeId}"
          data-matrix-flavor="${combo.flavorId}"
          type="button"
        >
          <span class="matrix-mode">${mode.title}</span>
          <strong class="matrix-flavor">${flavor.name}</strong>
          <small>${combo.summary}</small>
        </button>
      `;
    })
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
  setCopyLabel(trigger, getCopy().copied);
};

const openModal = (modeId) => {
  state.activeModeId = modeId;
  state.isModalOpen = true;

  const sourceMode = getSourceMode();
  const displayMode = getDisplayMode(sourceMode);
  const displayFlavor = getDisplayFlavor(getSourceFlavor());

  renderPreview();
  document.body.classList.add("modal-open");
  document.querySelector("#modeModal").hidden = false;
  document.querySelector("#modalUseCase").textContent = displayMode.useCase;
  document.querySelector("#modalTitle").textContent = sourceMode.title;
  document.querySelector("#modalSummary").textContent = displayMode.summary;
  document.querySelector("#modalContract").textContent = displayMode.outputContract;
  document.querySelector("#modalFlavor").textContent = displayFlavor.name;
  document.querySelector("#modalPrompt").textContent = composePrompt(sourceMode, getSourceFlavor());
};

const closeModal = () => {
  state.isModalOpen = false;
  document.body.classList.remove("modal-open");
  document.querySelector("#modeModal").hidden = true;
};

const renderApp = () => {
  syncDocumentMeta();
  renderShell();
  renderCategoryChips();
  renderFlavorChips();
  renderComposer();
  renderModeGrid();
  renderPreview();
  renderAdapters();
  renderBenchmarks();
  renderMatrix();

  if (state.isModalOpen) {
    openModal(state.activeModeId);
  } else {
    document.body.classList.remove("modal-open");
  }
};

const bindEvents = () => {
  if (state.eventsBound) {
    return;
  }

  state.eventsBound = true;

  app.addEventListener("input", (event) => {
    if (event.target.id !== "searchInput") {
      return;
    }

    state.search = event.target.value;
    renderModeGrid();
  });

  app.addEventListener("click", async (event) => {
    const localeButton = event.target.closest("[data-locale]");
    if (localeButton) {
      const nextLocale = localeButton.dataset.locale;
      if (nextLocale !== state.activeLocale && uiCopy[nextLocale]) {
        state.activeLocale = nextLocale;

        try {
          window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
        } catch {
          // Ignore storage failures and continue rendering the selected locale.
        }

        renderApp();
      }
      return;
    }

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
      renderComposer();
      renderPreview();
      renderMatrix();
      if (state.isModalOpen) {
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

    const matrixButton = event.target.closest("[data-matrix-mode]");
    if (matrixButton) {
      state.activeModeId = matrixButton.dataset.matrixMode;
      state.activeFlavor = matrixButton.dataset.matrixFlavor;
      renderFlavorChips();
      renderComposer();
      renderPreview();
      renderMatrix();
      return;
    }

    if (event.target.closest("[data-close-modal]") || event.target.closest("#closeModalButton")) {
      closeModal();
      return;
    }

    if (
      event.target.closest("#copyPreviewButton") ||
      event.target.closest("#footerCopyButton") ||
      event.target.closest("#copyComposerButton")
    ) {
      await copyText(composePrompt(getSourceMode(), getSourceFlavor()), event.target.closest("button"));
      return;
    }

    if (event.target.closest("#randomComboButton")) {
      const combo = workflowMatrix[Math.floor(Math.random() * workflowMatrix.length)];
      state.activeModeId = combo.modeId;
      state.activeFlavor = combo.flavorId;
      renderFlavorChips();
      renderComposer();
      renderPreview();
      renderMatrix();
      return;
    }

    if (event.target.closest("#modalCopyButton")) {
      await copyText(composePrompt(getSourceMode(), getSourceFlavor()), event.target.closest("button"));
    }
  });

  app.addEventListener("change", (event) => {
    if (event.target.id === "composerModeSelect") {
      state.activeModeId = event.target.value;
      renderComposer();
      renderPreview();
      renderMatrix();
      return;
    }

    if (event.target.id === "composerFlavorSelect") {
      state.activeFlavor = event.target.value;
      renderFlavorChips();
      renderComposer();
      renderPreview();
      renderMatrix();
      if (state.isModalOpen) {
        openModal(state.activeModeId);
      }
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
  renderApp();
  bindEvents();
};

boot();
