# AI-901 Prep

Study materials and a local Q&A practice simulator for Exam AI-901: Microsoft Azure AI Fundamentals (see [Microsoft Learn - Exam AI-901](https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-901/)).

Exam skills change over time. Always verify objectives in the [AI-901 study guide](https://aka.ms/AI901-StudyGuide).

---

## What is in this repository

| Part | Purpose |
|------|---------|
| Markdown study units | Notes under `AI concepts for developers and technology professionals/` and `Get started with AI applications and agents on Azure/` (Azure AI, NLP, generative AI, speech, computer vision, information extraction, responsible AI). |
| Exam orientation | [AI-901-Exam-Prep.md](AI-901-Exam-Prep.md) - links, domain weights, strategy. |
| Readiness checklist | [AI-901-Readiness-Checklist.md](AI-901-Readiness-Checklist.md) - tasks aligned with the study guide. |
| Module recaps and interview Q&A | Per-module `Module-summary-and-interview-QA.md` files generated under both study tracks. |
| Q&A Simulator | [qa-simulator/](qa-simulator/) - loads [qa-simulator/data/questions.json](qa-simulator/data/questions.json) in the browser. No backend. |

The simulator is practice material only. It is not a copy of the real exam or Microsoft's official practice test.

---

## Environment setup

**Needed**

- A modern browser (Chrome, Edge, Firefox, or Safari).
- Optional: [Node.js](https://nodejs.org/) if you use `npx` to serve files.

**Not needed to run the app locally**

- Docker, databases, or an Azure subscription.

**Why use a local server?** The app uses `fetch()` to load `questions.json`. Opening `index.html` as a `file://` URL usually fails in browsers. Serve the `qa-simulator` folder over `http://localhost` instead.

---

## How to start the Q&A application

1. Open a terminal.
2. Change directory to `qa-simulator` inside this repo.
3. Run a static server (example port 5500).

**Windows (PowerShell)**

```powershell
Set-Location .\qa-simulator
npx --yes serve -p 5500
```

**macOS / Linux**

```bash
cd qa-simulator
npx --yes serve -p 5500
```

4. Open http://localhost:5500 in your browser.

**Alternative** (Python 3, from `qa-simulator`):

```bash
python -m http.server 5500
```

---

## How to stop the Q&A application

Press **Ctrl+C** in the terminal where the server is running, or close that terminal window.

---

## Q&A Simulator features

| Feature | Description |
|---------|-------------|
| Exam domain filter | Domain 1, Domain 2, cross-cutting workloads, or all. |
| Topic area filter | e.g. Responsible AI, NLP and generative AI, speech, computer vision, Foundry/APIs. Works with domain filter; UI shows matching question count. |
| Session length | Choose how many questions to include (up to the match count). |
| Study mode | Immediate feedback and explanations. |
| Exam mode | No explanations until the end; optional timer. |
| Score | Approximate 0-1000 style score with 700 passing hint (practice only). |
| Progress | Session history and per-topic stats in browser local storage; compare to previous session; Clear saved history on the start screen. |

Use **New session** after a run to start again (reloads the page).

---

## How you can benefit

- Prepare for AI-901 using notes plus repeated practice.
- Reinforce "when to use what" for Azure AI concepts.
- Fork the repo and add rows to `questions.json` (same shape as existing entries) or extend the markdown notes.
- Use alongside official Microsoft Learn modules and the exam sandbox (link in `AI-901-Exam-Prep.md`).

---

## Repository layout

```
AI-901-Prep/
  README.md
  AI-901-Exam-Prep.md
  AI-901-Readiness-Checklist.md
  AI concepts for developers and technology professionals/
  Get started with AI applications and agents on Azure/
  qa-simulator/
    index.html
    css/styles.css
    js/app.js
    data/questions.json
  scripts/
```

---

## Troubleshooting

| Problem | Try this |
|---------|----------|
| Blank page or cannot load questions.json | Serve `qa-simulator` over HTTP, not file:// |
| Port in use | Use another port, e.g. `npx --yes serve -p 5501` |
| Progress lost | Stored per browser; private mode or clearing site data removes it |
| README shows boxes or garbage text | The file must be **UTF-8**. In VS Code: click the encoding on the status bar, then **Save with Encoding** and pick UTF-8. Or run: `node scripts/convert-readme-to-utf8.mjs` from the repo root. |

---

## Attribution

Respect Microsoft Learn licensing when adding content. Exam rules and scheduling come from Microsoft's certification site.

Last reviewed: 2026-04-23.
