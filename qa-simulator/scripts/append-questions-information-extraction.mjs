import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "..", "data", "questions.json");

const j = JSON.parse(fs.readFileSync(file, "utf8"));

if (!Array.isArray(j.topicFilters)) j.topicFilters = [];
if (!j.topicFilters.some((t) => t.id === "information_extraction")) {
  j.topicFilters.splice(5, 0, {
    id: "information_extraction",
    label: "Information extraction (documents, audio, video)",
  });
}

for (const q of j.questions) {
  if (q.id === "q033") q.topicKey = "information_extraction";
}

const added = [
  {
    id: "q086",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Multimodal models",
    question: "What is a multimodal model?",
    options: [
      "A model that can only process images.",
      "A model that can work with multiple data types, such as text and images.",
      "A model that generates video only.",
    ],
    correctIndex: 1,
    explanation:
      "Multimodal models can jointly reason over more than one modality (for example text+image).",
  },
  {
    id: "q087",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Programmatic image generation",
    question:
      "How do developers programmatically generate images using Foundry image generation models?",
    options: [
      "Send text prompts through the OpenAI Responses API using a deployed image model.",
      "Only upload images manually in the portal.",
      "Call a speech endpoint with WAV headers.",
    ],
    correctIndex: 0,
    explanation:
      "Image generation is available via API calls, not only through playground UI.",
  },
  {
    id: "q088",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Deployment name usage",
    question:
      "When using OpenAI SDK calls against Foundry, what should usually be passed in the model parameter?",
    options: [
      "The Foundry resource group name.",
      "The deployment name configured in your Foundry resource/project.",
      "The Azure subscription display name.",
    ],
    correctIndex: 1,
    explanation:
      "Client code typically targets deployment names you created, rather than generic catalog labels.",
  },
  {
    id: "q089",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Asynchronous video generation",
    question: "Why is video generation commonly handled as an asynchronous job?",
    options: [
      "REST cannot return JSON.",
      "Video generation is compute-intensive and can take longer to complete.",
      "It requires user clicks every frame.",
    ],
    correctIndex: 1,
    explanation:
      "Long-running generation workloads are often submitted then polled for completion.",
  },
  {
    id: "q090",
    domain: "workloads",
    topicKey: "information_extraction",
    topic: "Content Understanding vs OCR",
    question:
      "What is a key advantage of Azure Content Understanding over basic OCR?",
    options: [
      "It skips preprocessing to be always faster.",
      "It maps extracted content into schema-defined structured fields and relationships.",
      "It only extracts raw text lines with no structure.",
    ],
    correctIndex: 1,
    explanation:
      "OCR reads text; Content Understanding adds schema-aware semantic extraction.",
  },
  {
    id: "q091",
    domain: "foundry_implementation",
    topicKey: "information_extraction",
    topic: "Analyzer role",
    question:
      "In Azure Content Understanding, what is the primary role of an analyzer?",
    options: [
      "Store data in SQL automatically.",
      "Define how content is processed and what structured output schema is returned.",
      "Convert JSON into PDF reports only.",
    ],
    correctIndex: 1,
    explanation:
      "Analyzers encapsulate extraction logic and schema so processing is consistent.",
  },
  {
    id: "q092",
    domain: "foundry_implementation",
    topicKey: "information_extraction",
    topic: "Long-running operations",
    question:
      "After submitting content to Content Understanding via SDK/API, what often happens next?",
    options: [
      "Results always return fully in the same request.",
      "The analyzer retrains itself on your input before responding.",
      "You poll operation status (or poller result) until analysis completes.",
    ],
    correctIndex: 2,
    explanation:
      "Analysis is a long-running operation pattern in many extraction workflows.",
  },
  {
    id: "q093",
    domain: "workloads",
    topicKey: "information_extraction",
    topic: "Schema concept",
    question:
      "A schema in document extraction primarily defines:",
    options: [
      "Which UI theme to use in the portal.",
      "The fields and structure to extract from content.",
      "How many CPUs Azure assigns to your browser.",
    ],
    correctIndex: 1,
    explanation:
      "Schemas specify target fields and nested structures (for example invoice line items).",
  },
  {
    id: "q094",
    domain: "workloads",
    topicKey: "information_extraction",
    topic: "Nested fields",
    question:
      "Why are nested fields valuable in invoice extraction?",
    options: [
      "They let each line item carry subfields like description, quantity, unit price, and line total.",
      "They remove the need for any JSON output.",
      "They force all documents into one flat string.",
    ],
    correctIndex: 0,
    explanation:
      "Nested structures preserve relationships between values for downstream systems.",
  },
  {
    id: "q095",
    domain: "workloads",
    topicKey: "information_extraction",
    topic: "Semantic mapping",
    question:
      "Semantic schema mapping means Content Understanding can often extract a field even when:",
    options: [
      "Labels differ (for example Invoice # vs Invoice No.) or are missing.",
      "The document is encrypted with unknown keys.",
      "The endpoint URL is invalid.",
    ],
    correctIndex: 0,
    explanation:
      "The analyzer maps meaning to schema fields, not only exact label text.",
  },
  {
    id: "q096",
    domain: "workloads",
    topicKey: "information_extraction",
    topic: "Audio extraction",
    question:
      "Which output is typical when analyzing call recordings with a content analyzer?",
    options: [
      "Only image segmentation masks.",
      "Transcript plus schema-based insights such as caller, summary, and requested actions.",
      "A compiled executable binary.",
    ],
    correctIndex: 1,
    explanation:
      "Audio analyzers can produce transcript text and extracted structured fields.",
  },
  {
    id: "q097",
    domain: "workloads",
    topicKey: "information_extraction",
    topic: "Video extraction",
    question:
      "For video meeting analysis, a practical schema could include:",
    options: [
      "Location, in-person attendees, remote attendees, total attendees.",
      "Only SQL query plans.",
      "CPU fan speed and battery cycle count.",
    ],
    correctIndex: 0,
    explanation:
      "Video analyzers can return structured attendance and scene-level fields over time.",
  },
  {
    id: "q098",
    domain: "foundry_implementation",
    topicKey: "information_extraction",
    topic: "Prebuilt analyzers",
    question:
      "In sample code, `prebuilt-audioSearch` or `prebuilt-videoSearch` refers to:",
    options: [
      "Prebuilt analyzer IDs used by Content Understanding for specific media extraction tasks.",
      "Windows audio driver package names.",
      "Names of browser tabs.",
    ],
    correctIndex: 0,
    explanation:
      "Prebuilt analyzer identifiers select the extraction behavior for audio/video inputs.",
  },
  {
    id: "q099",
    domain: "foundry_implementation",
    topicKey: "information_extraction",
    topic: "Output format",
    question: "Why is JSON output important in extraction workflows?",
    options: [
      "It is structured and easy for downstream automation, search, and storage pipelines.",
      "It can only be read by humans, not systems.",
      "It prevents all validation.",
    ],
    correctIndex: 0,
    explanation:
      "JSON integrates cleanly with application code and data systems.",
  },
  {
    id: "q100",
    domain: "foundry_implementation",
    topicKey: "information_extraction",
    topic: "Portal validation",
    question:
      "Before writing production code, using the Foundry portal for analyzer testing helps because:",
    options: [
      "You can validate schema fields and outputs quickly on sample files.",
      "It permanently replaces SDK/API usage.",
      "It disables authentication requirements.",
    ],
    correctIndex: 0,
    explanation:
      "Portal testing speeds iteration and confirms analyzer behavior before automation.",
  },
  {
    id: "q101",
    domain: "workloads",
    topicKey: "information_extraction",
    topic: "Cross-modal extraction",
    question:
      "Azure Content Understanding for information extraction may combine which capabilities?",
    options: [
      "OCR, speech recognition, language understanding, and multimodal AI depending on input type.",
      "Only keyboard scan codes.",
      "Only file compression algorithms.",
    ],
    correctIndex: 0,
    explanation:
      "Different analyzers apply suitable AI techniques for document, audio, and video content.",
  },
  {
    id: "q102",
    domain: "workloads",
    topicKey: "information_extraction",
    topic: "Voicemail schema",
    question:
      "For voicemail automation, which schema field set is most appropriate?",
    options: [
      "Caller, message summary, requested actions, callback number, alternative contact details.",
      "GPU voltage, SSD size, CPU architecture.",
      "Only sentiment with no caller details.",
    ],
    correctIndex: 0,
    explanation:
      "A targeted schema captures actionable details that operations teams can use directly.",
  },
  {
    id: "q103",
    domain: "concepts_responsibilities",
    topicKey: "concepts_governance",
    topic: "Why automate extraction",
    question:
      "Why do organizations automate data extraction from forms, invoices, calls, and meetings?",
    options: [
      "To reduce manual delays/errors and improve consistency and scale.",
      "To avoid using structured outputs.",
      "To prevent any integration with downstream systems.",
    ],
    correctIndex: 0,
    explanation:
      "Automation improves speed, reliability, and operational throughput.",
  },
  {
    id: "q104",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Image generation endpoint usage",
    question:
      "When generating images via code, which API behavior is expected?",
    options: [
      "Send prompt payloads to the deployed image model endpoint through supported API/SDK calls.",
      "Use text-to-speech SDK exclusively.",
      "Only copy prompts into markdown files.",
    ],
    correctIndex: 0,
    explanation:
      "Programmatic generation uses endpoint calls with payloads and returns image outputs/URLs per API.",
  },
  {
    id: "q105",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Vision prep strategy",
    question:
      "For AI-901 scenario questions on vision and extraction, the best prep style is to:",
    options: [
      "Match requirements to capability (classification, detection, multimodal, schema extraction) instead of memorizing only names.",
      "Memorize model names only without understanding use-cases.",
      "Skip practice on JSON outputs.",
    ],
    correctIndex: 0,
    explanation:
      "AI-901 favors scenario-based selection of appropriate services and techniques.",
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
j.meta.lastExpanded =
  "Computer vision + AI-powered information extraction (documents/audio/video)";

fs.writeFileSync(file, JSON.stringify(j, null, 2) + "\n");
console.log("Appended", appended, "questions. Total:", j.questions.length);
