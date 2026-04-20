(function () {
  "use strict";

  const STORAGE_KEY = "ai901_qa_sim_v1";

  const state = {
    data: null,
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

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function saveStateStats(correct, total) {
    const prev = loadState() || { attempts: 0, totalCorrect: 0, totalQuestions: 0 };
    const next = {
      attempts: prev.attempts + 1,
      totalCorrect: prev.totalCorrect + correct,
      totalQuestions: prev.totalQuestions + total,
      lastAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    return next;
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getFilteredQuestions(domainId) {
    const all = state.data.questions;
    if (!domainId || domainId === "all") return all.slice();
    return all.filter((q) => q.domain === domainId);
  }

  function buildOptionPermutation(question) {
    const n = question.options.length;
    const order = shuffleArray(
      Array.from({ length: n }, (_, i) => i)
    );
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
    ["screen-start", "screen-quiz", "screen-results"].forEach((sid) => {
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
    return d
      .map(
        (x) =>
          `<span class="badge ${map[x.id] || ""}" title="${escapeAttr(x.label)}">${escapeHtml(x.shortLabel)} · ${escapeHtml(x.weight)}</span>`
      )
      .join(" ");
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

  function scaledScore(correct, total) {
    if (!total) return 0;
    return Math.round((correct / total) * 1000);
  }

  function formatCumulativeLine(stats) {
    if (!stats || !stats.attempts) return "";
    const avg =
      stats.totalQuestions > 0
        ? Math.round((stats.totalCorrect / stats.totalQuestions) * 1000)
        : 0;
    return `All-time practice: ${stats.attempts} session(s), approximate rolling ${avg} / 1000 (by items).`;
  }

  function finishQuiz(timedOut) {
    stopTimer();
    const { correct, total, answered } = scoreSession();
    const score = scaledScore(correct, total);
    const pass = score >= 700;

    saveStateStats(correct, total);

    showScreen("screen-results");
    els.resultsTimed.classList.toggle("hidden", !timedOut);
    els.resultsScore.innerHTML = `${score}<span> / 1000</span>`;
    els.resultsDetail.innerHTML = `
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
  }

  function startQuiz() {
    const domain = els.domainFilter.value;
    const mode = els.modeRadioStudy.checked ? "study" : "exam";
    const count = Math.min(
      parseInt(els.questionCount.value, 10) || 20,
      getFilteredQuestions(domain).length
    );

    let pool = getFilteredQuestions(domain);
    pool = shuffleArray(pool).slice(0, count);

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

  async function init() {
    els.screenStart = $("screen-start");
    els.screenQuiz = $("screen-quiz");
    els.screenResults = $("screen-results");
    els.domainFilter = $("domain-filter");
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

    const res = await fetch("data/questions.json", { cache: "no-store" });
    if (!res.ok) {
      document.body.innerHTML =
        '<main class="panel"><p>Could not load <code>data/questions.json</code>. Open this app via a local web server (see comment in index.html).</p></main>';
      return;
    }
    state.data = await res.json();

    els.domainBadges.innerHTML = renderDomainBadges();

    const maxQ = state.data.questions.length;
    els.questionCount.max = maxQ;
    els.questionCount.value = Math.min(20, maxQ);

    const msg = formatCumulativeLine(loadState());
    if (msg && els.cumulative) els.cumulative.textContent = msg;

    els.startBtn.addEventListener("click", startQuiz);
    els.prevBtn.addEventListener("click", onPrev);
    els.nextBtn.addEventListener("click", onNext);

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
