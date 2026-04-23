import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "..", "data", "questions.json");

const j = JSON.parse(fs.readFileSync(file, "utf8"));

if (!Array.isArray(j.topicFilters)) j.topicFilters = [];
if (!j.topicFilters.some((t) => t.id === "interview_perspective")) {
  j.topicFilters.push({
    id: "interview_perspective",
    label: "Interview perspective (scenario Q&A)",
  });
}

const added = [
  {
    id: "q106",
    domain: "concepts_responsibilities",
    topicKey: "interview_perspective",
    topic: "Interview - AI vs ML",
    question: "In an interview, how would you explain AI vs ML in one line?",
    options: [
      "AI is the goal of intelligent systems; ML is a data-driven approach used to achieve parts of that goal.",
      "ML is broader than AI and contains all AI methods.",
      "They are always exact synonyms.",
    ],
    correctIndex: 0,
    explanation: "A concise distinction is expected in fundamentals interviews.",
  },
  {
    id: "q107",
    domain: "foundry_implementation",
    topicKey: "interview_perspective",
    topic: "Interview - Foundry architecture",
    question: "Best interview answer for app architecture using Foundry is:",
    options: [
      "Client app -> secure endpoint -> model/agent -> response, with monitoring and governance.",
      "Client app -> local TXT file -> no endpoint.",
      "Browser cache -> training cluster every request.",
    ],
    correctIndex: 0,
    explanation: "Interviewers look for clear request flow plus security and operations.",
  },
  {
    id: "q108",
    domain: "foundry_implementation",
    topicKey: "interview_perspective",
    topic: "Interview - secret handling",
    question: "If asked how you manage API keys in production, strongest answer is:",
    options: [
      "Use environment variables/secret stores, least privilege, and avoid committing secrets.",
      "Hardcode keys in source for convenience.",
      "Share keys in screenshots during demos.",
    ],
    correctIndex: 0,
    explanation: "Security hygiene is a common interview check.",
  },
  {
    id: "q109",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - NLP feature choice",
    question: "For deterministic extraction of entities in operations, what do you recommend?",
    options: [
      "Purpose-built language APIs with structured outputs.",
      "Only unconstrained chat prompts with no schema.",
      "Image-only segmentation models.",
    ],
    correctIndex: 0,
    explanation: "Structured APIs are preferred where reliability and consistency matter.",
  },
  {
    id: "q110",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - embeddings",
    question: "A practical interview use-case for embeddings is:",
    options: [
      "Semantic similarity search and retrieval.",
      "Replacing endpoint authentication.",
      "Generating WAV files from text.",
    ],
    correctIndex: 0,
    explanation: "Embeddings are commonly used for semantic matching and retrieval tasks.",
  },
  {
    id: "q111",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - prompt engineering",
    question: "Which prompt strategy usually improves output consistency?",
    options: [
      "Clear role/task instructions with format constraints and examples.",
      "Very short vague prompts only.",
      "No system instruction and random formatting.",
    ],
    correctIndex: 0,
    explanation: "Good prompt structure is a practical interview topic.",
  },
  {
    id: "q112",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - speech pipeline",
    question: "How would you describe speech-to-speech architecture?",
    options: [
      "Speech-to-text -> reasoning/agent logic -> text-to-speech.",
      "Only text-to-speech with no input.",
      "OCR -> segmentation -> classifier.",
    ],
    correctIndex: 0,
    explanation: "This concise pipeline answer is expected in fundamentals conversations.",
  },
  {
    id: "q113",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - speech quality",
    question: "Key factors you mention for speech quality are:",
    options: [
      "Noise handling, microphone quality, latency, and prosody.",
      "Only font size and color theme.",
      "No concern for interruptions.",
    ],
    correctIndex: 0,
    explanation: "Quality discussion should include both model and UX/runtime factors.",
  },
  {
    id: "q114",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - vision task selection",
    question: "If asked 'classification vs detection', best answer is:",
    options: [
      "Classification labels whole image; detection finds and localizes objects.",
      "They are exactly the same task.",
      "Detection only works for text documents.",
    ],
    correctIndex: 0,
    explanation: "Task distinction is a frequent interview prompt.",
  },
  {
    id: "q115",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - multimodal value",
    question: "Why are multimodal models useful in applications?",
    options: [
      "They reason across inputs like text and images for richer tasks such as captioning and grounded Q&A.",
      "They remove all need for security controls.",
      "They only generate spreadsheets.",
    ],
    correctIndex: 0,
    explanation: "Multimodal reasoning and use-case mapping is a strong interview point.",
  },
  {
    id: "q116",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - information extraction",
    question: "OCR vs Content Understanding in one strong sentence:",
    options: [
      "OCR reads text; content understanding maps semantics into schema-based structured fields.",
      "Content understanding is always only OCR.",
      "OCR returns complete business JSON with relationships by default.",
    ],
    correctIndex: 0,
    explanation: "Interviewers want this distinction clearly and quickly.",
  },
  {
    id: "q117",
    domain: "foundry_implementation",
    topicKey: "interview_perspective",
    topic: "Interview - analyzer concept",
    question: "How would you explain an analyzer to a hiring panel?",
    options: [
      "A reusable extraction unit that applies schema logic consistently and returns structured output.",
      "A local text editor plugin.",
      "A database backup policy only.",
    ],
    correctIndex: 0,
    explanation: "This shows understanding of repeatable extraction workflows.",
  },
  {
    id: "q118",
    domain: "foundry_implementation",
    topicKey: "interview_perspective",
    topic: "Interview - async operations",
    question: "Why mention polling in extraction/video generation designs?",
    options: [
      "Because long-running operations often complete asynchronously and clients should check status/results.",
      "Because REST cannot return responses.",
      "Because synchronous APIs are never used in cloud systems.",
    ],
    correctIndex: 0,
    explanation: "Operational patterns matter in practical interviews.",
  },
  {
    id: "q119",
    domain: "concepts_responsibilities",
    topicKey: "interview_perspective",
    topic: "Interview - Responsible AI",
    question: "Best concise answer for Responsible AI in production is:",
    options: [
      "Apply fairness, safety, privacy, transparency, and accountability with governance and monitoring.",
      "Accuracy is the only required principle.",
      "Responsible AI is only a legal team task.",
    ],
    correctIndex: 0,
    explanation: "Demonstrates you understand technical and governance dimensions.",
  },
  {
    id: "q120",
    domain: "concepts_responsibilities",
    topicKey: "interview_perspective",
    topic: "Interview - bias mitigation",
    question: "A strong bias-mitigation answer includes:",
    options: [
      "Data review, subgroup evaluation, monitoring, and human oversight for high-impact decisions.",
      "Ignore measurement once deployed.",
      "Disable logs and alerts.",
    ],
    correctIndex: 0,
    explanation: "Bias handling is lifecycle work, not one-time tuning.",
  },
  {
    id: "q121",
    domain: "foundry_implementation",
    topicKey: "interview_perspective",
    topic: "Interview - model selection tradeoff",
    question: "How should you justify model choice in interviews?",
    options: [
      "Balance quality, latency, cost, modality fit, and safety requirements for the scenario.",
      "Always pick largest model regardless of constraints.",
      "Pick whichever model name sounds newest.",
    ],
    correctIndex: 0,
    explanation: "Tradeoff reasoning is often scored higher than memorization.",
  },
  {
    id: "q122",
    domain: "foundry_implementation",
    topicKey: "interview_perspective",
    topic: "Interview - evaluation",
    question: "A practical evaluation approach for an AI app is:",
    options: [
      "Define representative test cases, track metrics, and iterate prompts/models with guardrails.",
      "Run one demo prompt and ship.",
      "Avoid collecting feedback.",
    ],
    correctIndex: 0,
    explanation: "Interviewers expect repeatable evaluation methods.",
  },
  {
    id: "q123",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - retrieval use-case",
    question: "When is retrieval + grounding especially useful?",
    options: [
      "When answers must be based on trusted enterprise content with citations/traceability.",
      "When you want maximum hallucination.",
      "When no data source exists.",
    ],
    correctIndex: 0,
    explanation: "Grounding reduces unsupported responses in enterprise contexts.",
  },
  {
    id: "q124",
    domain: "foundry_implementation",
    topicKey: "interview_perspective",
    topic: "Interview - endpoint operations",
    question: "What operational metrics should you mention for endpoints?",
    options: [
      "Latency, error rates, throughput, cost usage, and safety events.",
      "Only terminal font settings.",
      "No monitoring is needed once live.",
    ],
    correctIndex: 0,
    explanation: "Shows production readiness mindset.",
  },
  {
    id: "q125",
    domain: "concepts_responsibilities",
    topicKey: "interview_perspective",
    topic: "Interview - AI project framing",
    question: "Best way to frame an AI project in interview discussion:",
    options: [
      "Business problem -> workload selection -> architecture -> evaluation -> governance -> rollout.",
      "Start with tools and hope for use-cases later.",
      "Skip business metrics and focus only on model names.",
    ],
    correctIndex: 0,
    explanation: "Structured problem framing is a key interview differentiator.",
  },
  {
    id: "q126",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - document automation",
    question: "For invoice automation, strongest technical story is:",
    options: [
      "Use schema-driven extraction with nested line items and JSON output for downstream systems.",
      "Only run OCR and manually map fields every time.",
      "Store invoices as images with no extraction.",
    ],
    correctIndex: 0,
    explanation: "Highlights scalable automation design.",
  },
  {
    id: "q127",
    domain: "workloads",
    topicKey: "interview_perspective",
    topic: "Interview - voice agent design",
    question: "In voice-agent design, you should explicitly account for:",
    options: [
      "Turn-taking, interruptions, low latency, and fallback when confidence is low.",
      "Only output voice selection color.",
      "Removing user controls.",
    ],
    correctIndex: 0,
    explanation: "Real-time conversation quality requires these controls.",
  },
  {
    id: "q128",
    domain: "foundry_implementation",
    topicKey: "interview_perspective",
    topic: "Interview - publish vs playground",
    question: "Why publish an agent instead of using playground only?",
    options: [
      "Publishing provides managed integration endpoints and controlled reuse beyond manual testing UI.",
      "Playground is the only production interface.",
      "Publishing removes all costs.",
    ],
    correctIndex: 0,
    explanation: "Playground is for experimentation; published assets enable app integration.",
  },
  {
    id: "q129",
    domain: "concepts_responsibilities",
    topicKey: "interview_perspective",
    topic: "Interview - final AI-901 readiness",
    question: "What is the strongest AI-901 prep strategy statement?",
    options: [
      "Practice scenario-based service selection, review weak topics iteratively, and validate against official study guide objectives.",
      "Memorize one summary and skip hands-on drills.",
      "Ignore Responsible AI because it is rarely asked.",
    ],
    correctIndex: 0,
    explanation: "Exam and interviews both reward applied, scenario-driven understanding.",
  },
];

const existing = new Set(j.questions.map((q) => q.id));
let appended = 0;
for (const q of added) {
  if (!existing.has(q.id)) {
    j.questions.push(q);
    appended += 1;
  }
}

j.meta = j.meta || {};
j.meta.questionCount = j.questions.length;
j.meta.lastExpanded = "Integrated interview perspective track";

fs.writeFileSync(file, JSON.stringify(j, null, 2) + "\n");
console.log("Appended", appended, "interview questions. Total:", j.questions.length);
