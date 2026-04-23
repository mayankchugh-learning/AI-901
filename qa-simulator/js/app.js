(function () {
  "use strict";

  const STORAGE_KEY = "ai901_qa_sim_v2";
  const LEGACY_KEY = "ai901_qa_sim_v1";

  const state = {
    data: null,
    studyData: null,
    session: [],
    index: 0,
    mode: "study",
    examMinutes: 45,
    timerId: null,
    deadline: null,
    answers: {},
    shuffledOptions: {},
    startedAt: null,
  };

  const els = {};

  function $(id) {
    return document.getElementById(id);
  }

  function defaultStore() {
    return {
      version: 2,
      sessions: [],
      lifetime: { attempts: 0, totalCorrect: 0, totalQuestions: 0 },
      topicStats: {},
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function saveState(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }

  function migrateLegacy() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return;
    try {
      const v1 = JSON.parse(raw);
      const s = defaultStore();
      if (v1.totalQuestions != null) {
        s.lifetime.attempts = v1.attempts || 0;
        s.lifetime.totalCorrect = v1.totalCorrect || 0;
        s.lifetime.totalQuestions = v1.totalQuestions || 0;
      }
      saveState(s);
    } catch {
      /* ignore */
    }
  }

  function scaledScore(correct, total) {
    if (!total) return 0;
    return Math.round((correct / total) * 1000);
  }

  function buildBreakdown() {
    const out = {};
    for (const q of state.session) {
      const k = q.topicKey || "unknown";
      if (!out[k]) out[k] = { correct: 0, total: 0 };
      out[k].total += 1;
      const a = state.answers[q.id];
      if (a !== undefined && a === mapCorrectIndex(q)) out[k].correct += 1;
    }
    return out;
  }

  function appendSession(record) {
    const s = loadState() || defaultStore();
    s.sessions = s.sessions || [];
    s.sessions.push(record);
    if (s.sessions.length > 100) s.sessions = s.sessions.slice(-100);

    s.lifetime = s.lifetime || { attempts: 0, totalCorrect: 0, totalQuestions: 0 };
    s.lifetime.attempts += 1;
    s.lifetime.totalCorrect += record.correct;
    s.lifetime.totalQuestions += record.total;

    s.topicStats = s.topicStats || {};
    for (const [k, v] of Object.entries(record.breakdown || {})) {
      if (!s.topicStats[k]) s.topicStats[k] = { correct: 0, total: 0 };
      s.topicStats[k].correct += v.correct;
      s.topicStats[k].total += v.total;
    }
    saveState(s);
    return s;
  }

  function clearHistory() {
    if (!confirm("Clear all saved practice history on this device?")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_KEY);
    } catch {
      /* ignore */
    }
    renderProgress();
    const msg = formatCumulativeLine(loadState());
    if (els.cumulative) els.cumulative.textContent = msg || "";
  }

  function formatCumulativeLine(st) {
    if (!st || !st.lifetime || !st.lifetime.attempts) return "";
    const L = st.lifetime;
    const avg =
      L.totalQuestions > 0 ? Math.round((L.totalCorrect / L.totalQuestions) * 1000) : 0;
    return `Lifetime: ${L.attempts} session(s), rolling ~${avg} / 1000 (by items answered).`;
  }

  function topicLabel(topicId) {
    const t = (state.data && state.data.topicFilters) || [];
    const f = t.find((x) => x.id === topicId);
    return f ? f.label : topicId;
  }

  function renderProgress() {
    if (!els.progressPanel) return;
    const st = loadState();
    if (!st || !st.lifetime || !st.lifetime.attempts) {
      els.progressPanel.innerHTML =
        "<p class=\"progress-empty\">Complete a quiz to see trends, recent scores, and per-topic accuracy.</p>";
      if (els.weakTopicCard) els.weakTopicCard.classList.add("hidden");
      return;
    }

    const sessions = st.sessions || [];
    const last = sessions.length ? sessions[sessions.length - 1] : null;
    const prev = sessions.length > 1 ? sessions[sessions.length - 2] : null;

    let compare = "";
    if (last && prev) {
      const delta = last.score - prev.score;
      const dir =
        delta > 0 ? "improved" : delta < 0 ? "lower than" : "same as";
      const arrow = delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
      compare = `<p class="progress-compare">${arrow} Last session (<strong>${last.score}</strong> / 1000) is <strong>${dir}</strong> your previous (<strong>${prev.score}</strong> / 1000)${delta !== 0 ? ` — <span class="delta">${delta > 0 ? "+" : ""}${delta}</span> points` : ""}.</p>`;
    } else if (last) {
      compare = `<p class="progress-compare">Last session score: <strong>${last.score}</strong> / 1000 (${last.correct}/${last.total} correct).</p>`;
    }

    const recent = sessions.slice(-8).reverse();
    const rows = recent
      .map((sess) => {
        const d = new Date(sess.at);
        const ds = isNaN(d.getTime())
          ? sess.at
          : d.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
        return `<tr><td>${escapeHtml(ds)}</td><td>${sess.score}</td><td>${sess.correct}/${sess.total}</td><td>${escapeHtml(sess.mode)}</td><td>${escapeHtml(domainLabel(sess.domainFilter || "all"))}</td><td>${escapeHtml(topicLabel(sess.topicFilter || "all"))}</td></tr>`;
      })
      .join("");

    const topicRows = Object.entries(st.topicStats || {})
      .filter(([id]) => id !== "unknown")
      .map(([id, v]) => {
        const pct = v.total ? Math.round((v.correct / v.total) * 100) : 0;
        const approx = scaledScore(v.correct, v.total);
        return `<tr><td>${escapeHtml(topicLabel(id))}</td><td>${v.correct}/${v.total}</td><td>${pct}% (~${approx}/1000)</td></tr>`;
      })
      .join("");

    els.progressPanel.innerHTML = `
      ${compare}
      <div class="progress-section">
        <h3 class="progress-h3">Recent sessions</h3>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>When</th><th>Score</th><th>Correct</th><th>Mode</th><th>Domain</th><th>Topic filter</th></tr></thead>
            <tbody>${rows || "<tr><td colspan=\"6\">No session rows</td></tr>"}</tbody>
          </table>
        </div>
      </div>
      ${
        topicRows
          ? `<div class="progress-section">
        <h3 class="progress-h3">Accuracy by topic area (lifetime)</h3>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Topic area</th><th>Items</th><th>Approx.</th></tr></thead>
            <tbody>${topicRows}</tbody>
          </table>
        </div>
      </div>`
          : ""
      }
    `;

    renderWeakTopicHint(st);
  }

  function findWeakestTopic(stats) {
    const entries = Object.entries((stats && stats.topicStats) || {})
      .filter(([id, v]) => id !== "unknown" && v.total >= 4)
      .map(([id, v]) => ({
        id,
        total: v.total,
        correct: v.correct,
        pct: v.total ? v.correct / v.total : 0,
      }))
      .sort((a, b) => a.pct - b.pct || b.total - a.total);
    return entries.length ? entries[0] : null;
  }

  function renderWeakTopicHint(stats) {
    if (!els.weakTopicCard || !els.weakTopicText) return;
    const weak = findWeakestTopic(stats);
    if (!weak) {
      els.weakTopicCard.classList.add("hidden");
      return;
    }
    const pct = Math.round(weak.pct * 100);
    els.weakTopicCard.classList.remove("hidden");
    els.weakTopicText.textContent = `Smart focus: weakest area is ${topicLabel(
      weak.id
    )} at ${pct}% (${weak.correct}/${weak.total}).`;
    els.weakTopicCard.dataset.topic = weak.id;
  }

  function practiceWeakestTopic() {
    const st = loadState();
    const weak = findWeakestTopic(st);
    if (!weak) return;
    els.topicFilter.value = weak.id;
    els.domainFilter.value = "all";
    updateFilterCount();
    const max = parseInt(els.questionCount.max, 10) || 10;
    els.questionCount.value = String(Math.min(12, max));
    if (els.modeRadioStudy) els.modeRadioStudy.checked = true;
    if (els.examMinutes) els.examMinutes.disabled = true;
    startQuiz();
  }

  function domainLabel(domainId) {
    if (!domainId || domainId === "all") return "All";
    const d = (state.data && state.data.domains) || [];
    const x = d.find((z) => z.id === domainId);
    return x ? x.shortLabel : domainId;
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getFilteredQuestions(domainId, topicKey) {
    let list = state.data.questions.slice();
    if (domainId && domainId !== "all") list = list.filter((q) => q.domain === domainId);
    if (topicKey && topicKey !== "all") list = list.filter((q) => (q.topicKey || "") === topicKey);
    return list;
  }

  function updateFilterCount() {
    const n = getFilteredQuestions(els.domainFilter.value, els.topicFilter.value).length;
    if (els.filterCount) els.filterCount.textContent = String(n);
    const max = Math.max(1, n);
    els.questionCount.max = max;
    const cur = parseInt(els.questionCount.value, 10) || 20;
    if (cur > max) els.questionCount.value = max;
    if (els.startBtn) els.startBtn.disabled = n === 0;
  }

  function buildOptionPermutation(question) {
    const n = question.options.length;
    const order = shuffleArray(Array.from({ length: n }, (_, i) => i));
    state.shuffledOptions[question.id] = order;
  }

  function mapCorrectIndex(question) {
    const order = state.shuffledOptions[question.id];
    const orig = question.correctIndex;
    return order.indexOf(orig);
  }

  function formatTime(ms) {
    if (ms <= 0) return "0:00";
    const s = Math.ceil(ms / 1000);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateTimerDisplay() {
    if (!els.timerWrap || state.mode !== "exam") return;
    const left = state.deadline - Date.now();
    els.timerEl.textContent = formatTime(left);
    els.timerEl.classList.remove("warn", "danger");
    if (left < 120000 && left > 60000) els.timerEl.classList.add("warn");
    if (left <= 60000) els.timerEl.classList.add("danger");
    if (left <= 0) {
      stopTimer();
      finishQuiz(true);
    }
  }

  function startTimer() {
    stopTimer();
    if (state.mode !== "exam") {
      els.timerWrap.classList.add("hidden");
      return;
    }
    els.timerWrap.classList.remove("hidden");
    const mins = Math.max(1, parseInt(els.examMinutes.value, 10) || 45);
    state.examMinutes = mins;
    state.deadline = Date.now() + mins * 60 * 1000;
    updateTimerDisplay();
    state.timerId = setInterval(updateTimerDisplay, 500);
  }

  function showScreen(id) {
    ["screen-start", "screen-quiz", "screen-results", "screen-study"].forEach((sid) => {
      const el = $(sid);
      if (el) el.classList.toggle("hidden", sid !== id);
    });
  }

  function renderDomainBadges() {
    const d = state.data.domains;
    const map = {
      concepts_responsibilities: "domain-1",
      foundry_implementation: "domain-2",
      workloads: "domain-3",
    };
    const row = d
      .map(
        (x) =>
          `<span class="badge ${map[x.id] || ""}" title="${escapeAttr(x.label)}">${escapeHtml(x.shortLabel)} · ${escapeHtml(x.weight)}</span>`
      )
      .join(" ");
    const n = state.data.questions.length;
    const bank = `<span class="badge" title="Total items in data/questions.json">${escapeHtml(String(n))} questions in bank</span>`;
    return row + " " + bank;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function currentQuestion() {
    return state.session[state.index];
  }

  function renderQuestion() {
    const q = currentQuestion();
    if (!q) return;

    const total = state.session.length;
    const n = state.index + 1;
    els.progressFill.style.width = total ? (n / total) * 100 + "%" : "0%";
    els.qCounter.textContent = `Question ${n} of ${total}`;

    const domainMeta = state.data.domains.find((d) => d.id === q.domain);
    els.qTopic.textContent = q.topic + (domainMeta ? " · " + domainMeta.shortLabel : "");

    els.qText.textContent = q.question;

    if (!state.shuffledOptions[q.id]) buildOptionPermutation(q);
    const order = state.shuffledOptions[q.id];
    els.options.innerHTML = order
      .map((origIdx, btnIdx) => {
        const text = q.options[origIdx];
        return `<button type="button" class="option-btn" data-mapped-index="${btnIdx}" data-orig="${origIdx}">${escapeHtml(text)}</button>`;
      })
      .join("");

    const saved = state.answers[q.id];
    els.feedback.classList.add("hidden");
    els.feedback.innerHTML = "";
    els.nextBtn.classList.add("hidden");

    const buttons = els.options.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", onOptionClick);
    });

    if (state.mode === "study" && saved !== undefined) {
      revealStudy(saved);
    }
    if (state.mode === "exam" && saved !== undefined) {
      lockExamSelection(saved);
    }

    els.prevBtn.disabled = state.index === 0;
    const atEnd = state.index === total - 1;
    els.nextBtn.textContent = atEnd ? "View results" : "Next";
  }

  function lockExamSelection(mappedIndex) {
    const buttons = els.options.querySelectorAll(".option-btn");
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === mappedIndex) btn.classList.add("selected");
    });
  }

  function onOptionClick(e) {
    const btn = e.currentTarget;
    const mappedIndex = parseInt(btn.getAttribute("data-mapped-index"), 10);
    const q = currentQuestion();
    state.answers[q.id] = mappedIndex;

    if (state.mode === "study") {
      revealStudy(mappedIndex);
    } else {
      const buttons = els.options.querySelectorAll(".option-btn");
      buttons.forEach((b) => {
        b.disabled = true;
        b.classList.remove("selected");
      });
      btn.classList.add("selected");
      els.nextBtn.classList.remove("hidden");
    }
  }

  function revealStudy(mappedIndex) {
    const q = currentQuestion();
    const correctMapped = mapCorrectIndex(q);
    const buttons = els.options.querySelectorAll(".option-btn");
    buttons.forEach((b) => {
      b.disabled = true;
      b.classList.remove("selected", "correct", "incorrect");
    });
    buttons[mappedIndex].classList.add("selected");
    if (mappedIndex === correctMapped) {
      buttons[mappedIndex].classList.add("correct");
    } else {
      buttons[mappedIndex].classList.add("incorrect");
      buttons[correctMapped].classList.add("correct");
    }

    const ok = mappedIndex === correctMapped;
    els.feedback.classList.remove("hidden");
    els.feedback.classList.toggle("correct-box", ok);
    els.feedback.classList.toggle("wrong-box", !ok);
    els.feedback.innerHTML =
      `<h3>${ok ? "Correct" : "Incorrect"}</h3><p>${escapeHtml(q.explanation)}</p>`;
    els.nextBtn.classList.remove("hidden");
  }

  function scoreSession() {
    let correct = 0;
    for (const q of state.session) {
      const ans = state.answers[q.id];
      if (ans === undefined) continue;
      if (ans === mapCorrectIndex(q)) correct += 1;
    }
    const answered = Object.keys(state.answers).length;
    return { correct, total: state.session.length, answered };
  }

  function finishQuiz(timedOut) {
    stopTimer();
    const { correct, total, answered } = scoreSession();
    const score = scaledScore(correct, total);
    const pass = score >= 700;

    const breakdown = buildBreakdown();
    const sessionRecord = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      at: new Date().toISOString(),
      mode: state.mode,
      domainFilter: els.domainFilter.value,
      topicFilter: els.topicFilter.value,
      score,
      correct,
      total,
      answered,
      timedOut: !!timedOut,
      breakdown,
    };
    appendSession(sessionRecord);

    showScreen("screen-results");
    els.resultsTimed.classList.toggle("hidden", !timedOut);
    els.resultsScore.innerHTML = `${score}<span> / 1000</span>`;

    const st = loadState();
    const sessions = (st && st.sessions) || [];
    let sessionCompare = "";
    if (sessions.length >= 2) {
      const cur = sessions[sessions.length - 1];
      const prevS = sessions[sessions.length - 2];
      const d = cur.score - prevS.score;
      if (d !== 0) {
        sessionCompare = `<p class="session-compare">${d > 0 ? "↑" : "↓"} vs your previous session this device: <strong>${d > 0 ? "+" : ""}${d}</strong> points (${prevS.score} → ${cur.score}).</p>`;
      } else {
        sessionCompare = `<p class="session-compare">Same approximate score as your previous session (${cur.score} / 1000).</p>`;
      }
    }

    els.resultsDetail.innerHTML = `
      ${sessionCompare}
      <div class="stat-grid">
        <div class="stat-card"><dt>Correct</dt><dd>${correct}</dd></div>
        <div class="stat-card"><dt>Questions</dt><dd>${total}</dd></div>
        <div class="stat-card"><dt>Answered</dt><dd>${answered}</dd></div>
        <div class="stat-card"><dt>Passing hint</dt><dd>${pass ? "≥700" : "&lt;700"}</dd></div>
      </div>
      <p class="pass-hint">Microsoft uses a scaled score (often reported out of 1000) with a typical passing score of <strong>700</strong>. This app maps your percent correct to a 0–1000 scale for practice only.</p>
    `;

    const msg = formatCumulativeLine(loadState());
    if (msg) {
      if (els.cumulative) els.cumulative.textContent = msg;
      if (els.cumulativeEnd) els.cumulativeEnd.textContent = msg;
    }
    renderProgress();
  }

  function startQuiz() {
    const domain = els.domainFilter.value;
    const topicKey = els.topicFilter.value;
    const mode = els.modeRadioStudy.checked ? "study" : "exam";
    const poolAll = getFilteredQuestions(domain, topicKey);
    const count = Math.min(parseInt(els.questionCount.value, 10) || 20, poolAll.length);

    let pool = shuffleArray(poolAll).slice(0, count);

    state.session = pool;
    state.index = 0;
    state.mode = mode;
    state.answers = {};
    state.shuffledOptions = {};
    state.startedAt = Date.now();

    pool.forEach((q) => buildOptionPermutation(q));

    showScreen("screen-quiz");
    renderQuestion();

    if (mode === "exam") {
      startTimer();
    } else {
      stopTimer();
      els.timerWrap.classList.add("hidden");
    }
  }

  function onNext() {
    const q = currentQuestion();
    if (state.mode === "study" && state.answers[q.id] === undefined) return;

    if (state.index >= state.session.length - 1) {
      finishQuiz(false);
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  function onPrev() {
    if (state.index <= 0) return;
    state.index -= 1;
    renderQuestion();
  }

  function populateTopicFilter() {
    const tf = state.data.topicFilters || [{ id: "all", label: "All topic areas" }];
    els.topicFilter.innerHTML = tf
      .map((t) => `<option value="${escapeHtml(t.id)}">${escapeHtml(t.label)}</option>`)
      .join("");
  }

  function toggleAppMode() {
    const mode = els.appMode ? els.appMode.value : "quiz";
    const study = mode === "study";
    if (els.quizConfig) els.quizConfig.classList.toggle("hidden", study);
    if (els.studyConfig) els.studyConfig.classList.toggle("hidden", !study);
  }

  function getStudyPagesBySection(section) {
    const pages = (state.studyData && state.studyData.pages) || [];
    if (!section || section === "all") return pages.slice();
    return pages.filter((p) => p.section === section);
  }

  function populateStudySections() {
    const pages = (state.studyData && state.studyData.pages) || [];
    const sections = Array.from(new Set(pages.map((p) => p.section)));
    els.studySection.innerHTML = [
      `<option value="all">All sections</option>`,
      ...sections.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`),
    ].join("");
  }

  function populateStudyPages() {
    const section = els.studySection.value;
    const pages = getStudyPagesBySection(section);
    els.studyPage.innerHTML = pages
      .map((p) => `<option value="${escapeHtml(p.id)}">${escapeHtml(p.module)} (${escapeHtml(p.section)})</option>`)
      .join("");
    if (els.btnOpenStudy) els.btnOpenStudy.disabled = pages.length === 0;
  }

  function openStudyPage() {
    const id = els.studyPage.value;
    const pages = (state.studyData && state.studyData.pages) || [];
    const page = pages.find((p) => p.id === id);
    if (!page) return;
    if (els.studyCurrentMeta) {
      els.studyCurrentMeta.textContent = `${page.section} · ${page.module}`;
    }
    if (els.studyContent) {
      els.studyContent.textContent = page.content || "No content found.";
    }
    showScreen("screen-study");
  }

  async function init() {
    migrateLegacy();

    els.screenStart = $("screen-start");
    els.screenQuiz = $("screen-quiz");
    els.screenResults = $("screen-results");
    els.screenStudy = $("screen-study");
    els.appMode = $("app-mode");
    els.quizConfig = $("quiz-config");
    els.studyConfig = $("study-config");
    els.studySection = $("study-section");
    els.studyPage = $("study-page");
    els.btnOpenStudy = $("btn-open-study");
    els.studyCurrentMeta = $("study-current-meta");
    els.studyContent = $("study-content");
    els.btnBackStart = $("btn-back-start");
    els.domainFilter = $("domain-filter");
    els.topicFilter = $("topic-filter");
    els.filterCount = $("filter-count");
    els.questionCount = $("question-count");
    els.modeRadioStudy = $("mode-study");
    els.modeRadioExam = $("mode-exam");
    els.examMinutes = $("exam-minutes");
    els.startBtn = $("btn-start");
    els.prevBtn = $("btn-prev");
    els.nextBtn = $("btn-next");
    els.timerWrap = $("timer-wrap");
    els.timerEl = $("timer");
    els.progressFill = $("progress-fill");
    els.qCounter = $("q-counter");
    els.qTopic = $("q-topic");
    els.qText = $("q-text");
    els.options = $("options");
    els.feedback = $("feedback");
    els.resultsScore = $("results-score");
    els.resultsDetail = $("results-detail");
    els.resultsTimed = $("results-timed");
    els.cumulative = $("cumulative-stats");
    els.cumulativeEnd = $("cumulative-stats-end");
    els.domainBadges = $("domain-badges");
    els.progressPanel = $("progress-panel");
    els.btnClearHistory = $("btn-clear-history");
    els.weakTopicCard = $("weak-topic-card");
    els.weakTopicText = $("weak-topic-text");
    els.btnWeakTopic = $("btn-weak-topic");

    const res = await fetch("data/questions.json", { cache: "no-store" });
    if (!res.ok) {
      document.body.innerHTML =
        '<main class="panel"><p>Could not load <code>data/questions.json</code>. Open this app via a local web server (see comment in index.html).</p></main>';
      return;
    }
    state.data = await res.json();

    const studyRes = await fetch("data/study-content.json", { cache: "no-store" });
    if (studyRes.ok) {
      state.studyData = await studyRes.json();
    } else {
      state.studyData = { pages: [] };
    }

    els.domainBadges.innerHTML = renderDomainBadges();
    populateTopicFilter();
    populateStudySections();
    populateStudyPages();
    toggleAppMode();

    const maxQ = state.data.questions.length;
    els.questionCount.max = maxQ;
    els.questionCount.value = Math.min(20, maxQ);

    updateFilterCount();

    const msg = formatCumulativeLine(loadState());
    if (msg && els.cumulative) els.cumulative.textContent = msg;

    renderProgress();

    els.startBtn.addEventListener("click", startQuiz);
    els.prevBtn.addEventListener("click", onPrev);
    els.nextBtn.addEventListener("click", onNext);
    if (els.btnClearHistory) els.btnClearHistory.addEventListener("click", clearHistory);
    if (els.btnWeakTopic) els.btnWeakTopic.addEventListener("click", practiceWeakestTopic);
    if (els.appMode) els.appMode.addEventListener("change", toggleAppMode);
    if (els.studySection) els.studySection.addEventListener("change", populateStudyPages);
    if (els.btnOpenStudy) els.btnOpenStudy.addEventListener("click", openStudyPage);
    if (els.btnBackStart)
      els.btnBackStart.addEventListener("click", () => showScreen("screen-start"));

    els.domainFilter.addEventListener("change", updateFilterCount);
    els.topicFilter.addEventListener("change", updateFilterCount);

    els.modeRadioExam.addEventListener("change", () => {
      els.examMinutes.disabled = !els.modeRadioExam.checked;
    });
    els.modeRadioStudy.addEventListener("change", () => {
      els.examMinutes.disabled = true;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
