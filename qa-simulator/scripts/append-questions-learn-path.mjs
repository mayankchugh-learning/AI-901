import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "..", "data", "questions.json");

const added = [
  {
    id: "q059",
    domain: "concepts_responsibilities",
    topicKey: "concepts_governance",
    topic: "AI and machine learning",
    question:
      "Which statement best describes the relationship between artificial intelligence (AI) and machine learning (ML)?",
    options: [
      "ML is only for generative images; AI is only for chatbots.",
      "AI and ML mean exactly the same thing in all documentation.",
      "AI is the broader goal of intelligent behavior; ML is a data-driven approach that learns patterns from data to help achieve that goal.",
    ],
    correctIndex: 2,
    explanation:
      "ML is one major approach under the AI umbrella; other approaches include rules-based systems, search, and more.",
  },
  {
    id: "q060",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Microsoft Foundry and Azure",
    question: "How does Microsoft Foundry relate to Azure at a high level?",
    options: [
      "Foundry replaces every Azure service and does not use Azure resources.",
      "Foundry is built on Azure and relies on Azure for compute, networking, identity, security, and hosting.",
      "Foundry runs only on a developer laptop and never uses the cloud.",
    ],
    correctIndex: 1,
    explanation:
      "Foundry is a platform experience on top of Azure; projects and resources are Azure-backed.",
  },
  {
    id: "q061",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Endpoints and keys",
    question:
      "In a typical Azure AI setup, which pairing is most accurate for calling a deployed model?",
    options: [
      "The key is a URL; the endpoint is a secret stored only in email.",
      "The endpoint is the service URL you call; the key (often stored as a secret) authenticates requests to that endpoint.",
      "Endpoints are optional if you have a subscription name only.",
    ],
    correctIndex: 1,
    explanation:
      "Client code sends HTTPS requests to the endpoint and presents credentials such as an API key or token.",
  },
  {
    id: "q062",
    domain: "concepts_responsibilities",
    topicKey: "concepts_governance",
    topic: "Client applications",
    question:
      "In Microsoft Learn-style descriptions, what is a client application in a Foundry or Azure AI solution?",
    options: [
      "The physical GPU cluster that trains foundation models from scratch.",
      "A program users interact with (web, mobile, desktop) that sends requests to an API and shows results.",
      "A database that permanently stores all model weights on the user device.",
    ],
    correctIndex: 1,
    explanation:
      "The client is the app experience; models and services run behind secured endpoints.",
  },
  {
    id: "q063",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Foundry resource vs project",
    question:
      "Which statement best distinguishes a Foundry resource from a Foundry project?",
    options: [
      "They are identical; the words are interchangeable.",
      "A Foundry resource provides platform capabilities in Azure; a project is a workspace inside it for apps, agents, data, and settings.",
      "Projects host the Azure subscription; resources only store PDFs.",
    ],
    correctIndex: 1,
    explanation:
      "You may have one resource for a team and multiple projects for separate use cases.",
  },
  {
    id: "q064",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Model catalog",
    question: "What best describes Foundry's model catalog?",
    options: [
      "A list of only one vendor's models with no filtering.",
      "A central place to discover, compare, and try many models from multiple providers, often with playgrounds and governance.",
      "A tool that removes the need for any Azure subscription.",
    ],
    correctIndex: 1,
    explanation:
      "The catalog helps you browse and evaluate models before you deploy or call them from code.",
  },
  {
    id: "q065",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Foundation models",
    question: "In Foundry documentation, a foundation model is best described as:",
    options: [
      "A tiny model that cannot run until you train it from zero on your data only.",
      "A large pretrained model with broad capabilities that you can use or customize for many tasks.",
      "A spreadsheet used to compare CPU prices.",
    ],
    correctIndex: 1,
    explanation:
      "Foundation models are pretrained for general language or multimodal tasks and can be adapted for specific needs.",
  },
  {
    id: "q066",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Model Playground",
    question:
      "What is a primary benefit of using the Model Playground before writing production code?",
    options: [
      "It removes the need for authentication forever.",
      "You can try prompts, compare behavior, and capture settings you can reuse when coding against an API.",
      "It automatically writes all unit tests for your repository.",
    ],
    correctIndex: 1,
    explanation:
      "Playgrounds support interactive experimentation and reduce surprises when you move to SDK or REST calls.",
  },
  {
    id: "q067",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Publishing an agent",
    question:
      "What is a typical outcome of publishing an agent in Microsoft Foundry?",
    options: [
      "The agent becomes a managed resource with a stable endpoint for integration without sharing your whole project source in the UI.",
      "Publishing deletes all models in the subscription.",
      "Publishing makes inference free regardless of tokens or attached services.",
    ],
    correctIndex: 0,
    explanation:
      "Publishing exposes a controlled way for apps to call the agent configuration you defined.",
  },
  {
    id: "q068",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Calling a published agent",
    question:
      "Conceptually, when client code calls a published Foundry agent instead of a raw model deployment alone, it usually:",
    options: [
      "Bypasses all authentication.",
      "References the agent (for example as an agent reference) so orchestration, tools, and configuration you published are used.",
      "Only works if the user disables HTTPS.",
    ],
    correctIndex: 1,
    explanation:
      "Agents bundle prompts, tools, and routing; the client targets the agent rather than only a bare model name.",
  },
  {
    id: "q069",
    domain: "workloads",
    topicKey: "nlp_generative",
    topic: "Deterministic text analysis",
    question:
      "You need the same text input to yield structured, deterministic results using established language APIs. Which approach fits best?",
    options: [
      "Azure Language (structured language APIs), which return predictable schema-oriented output for supported tasks.",
      "Only a random number generator.",
      "Only a generic chat completion with no parameters.",
    ],
    correctIndex: 0,
    explanation:
      "Purpose-built language services are designed for consistent structured outputs; generative chat can vary more with temperature and phrasing.",
  },
  {
    id: "q070",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Azure Language client",
    question: "What is the main role of the client object in the Azure Language SDK?",
    options: [
      "It stores the entire user interface layout XML.",
      "It is the programming object your app uses to call the Azure Language service endpoints.",
      "It permanently caches all raw documents on the public internet.",
    ],
    correctIndex: 1,
    explanation:
      "Clients encapsulate configuration and methods for service calls, similar to other Azure SDK patterns.",
  },
  {
    id: "q071",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Azure Language MCP server",
    question:
      "What is the main purpose of the Azure Language MCP server in agent scenarios?",
    options: [
      "To expose Azure Language capabilities to agents through the Model Context Protocol (MCP).",
      "To replace every generative model in Foundry with static HTML.",
      "To design website CSS automatically.",
    ],
    correctIndex: 0,
    explanation:
      "MCP connects tools and data sources to agents in a standard way; here it surfaces language features as tools.",
  },
  {
    id: "q072",
    domain: "workloads",
    topicKey: "speech",
    topic: "Speech-to-Text SDK",
    question:
      "Why would a developer use the Azure Speech-to-Text SDK instead of only using the Foundry playground for speech recognition?",
    options: [
      "The SDK is required to upload all audio to social media.",
      "The SDK lets you embed speech recognition directly in application code with full control over audio capture and flow.",
      "The SDK removes the need for any Azure Speech models.",
    ],
    correctIndex: 1,
    explanation:
      "Playgrounds help you experiment; SDKs integrate recognition into real apps and services.",
  },
  {
    id: "q073",
    domain: "workloads",
    topicKey: "speech",
    topic: "Text-to-Speech SDK",
    question:
      "What does the Azure Text-to-Speech SDK primarily help developers with?",
    options: [
      "Only manual writing of WAV headers with no networking.",
      "Authentication, network communication, and generating audio from text via the speech service.",
      "Permanent archival of all synthesized audio in a specific folder only.",
    ],
    correctIndex: 1,
    explanation:
      "SDKs wrap REST calls, auth, and streaming so apps can synthesize speech reliably.",
  },
  {
    id: "q074",
    domain: "workloads",
    topicKey: "speech",
    topic: "Voice Live / voice agents",
    question:
      "In Microsoft Learn materials, what does the Voice Live Python SDK (azure-ai-voicelive) help enable?",
    options: [
      "A real-time voice pipeline that streams audio and handles spoken responses and conversational timing.",
      "Replacing microphones and speakers on the user's hardware.",
      "Long-term storage of every recording in a public bucket by default.",
    ],
    correctIndex: 0,
    explanation:
      "Voice Live focuses on low-latency, interactive voice experiences integrated with agents.",
  },
  {
    id: "q075",
    domain: "workloads",
    topicKey: "speech",
    topic: "Speech-to-speech pipeline",
    question:
      "A speech-to-speech experience for an agent typically chains which stages?",
    options: [
      "Speech-to-text, reasoning or language processing, then text-to-speech.",
      "Only optical character recognition on video files.",
      "Image classification, then disk formatting.",
    ],
    correctIndex: 0,
    explanation:
      "Audio is transcribed, processed by models or agents, then spoken back as audio.",
  },
  {
    id: "q076",
    domain: "workloads",
    topicKey: "speech",
    topic: "Azure Speech Voice Live",
    question:
      "What does Azure Speech Voice Live aim to simplify for developers building voice agents?",
    options: [
      "Combining real-time speech input and spoken output without wiring every low-level piece yourself.",
      "Removing all need for generative or language models.",
      "Hosting static websites without HTTPS.",
    ],
    correctIndex: 0,
    explanation:
      "Voice Live bundles capabilities for conversational voice so you focus on scenario and agent logic.",
  },
  {
    id: "q077",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Foundry IQ",
    question: "Foundry IQ is described as helping agents by:",
    options: [
      "Replacing Azure entirely with a USB drive.",
      "Providing a permission-aware knowledge layer that indexes and retrieves organizational data with grounding and citations.",
      "Disabling all logging for compliance.",
    ],
    correctIndex: 1,
    explanation:
      "Foundry IQ connects trusted data sources so agents answer with relevant, authorized content.",
  },
  {
    id: "q078",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "SDKs and REST",
    question:
      "Most developers call Foundry or Azure AI services using:",
    options: [
      "Only fax machines.",
      "HTTPS REST APIs, often through language SDKs that build requests for you.",
      "UDP broadcasts without authentication.",
    ],
    correctIndex: 1,
    explanation:
      "REST defines the contract; SDKs reduce boilerplate and handle auth patterns safely.",
  },
  {
    id: "q079",
    domain: "workloads",
    topicKey: "nlp_generative",
    topic: "Text analysis approaches in Foundry",
    question:
      "In Foundry, text analysis can combine general-purpose language models with purpose-built language services. Purpose-built language APIs are especially useful when you need:",
    options: [
      "Structured, task-specific outputs for scenarios like entity recognition with predictable schemas.",
      "To delete all training data automatically.",
      "To avoid HTTPS entirely.",
    ],
    correctIndex: 0,
    explanation:
      "General models are flexible; specialized language services excel at consistent structured extraction for supported tasks.",
  },
  {
    id: "q080",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Foundry Tools",
    question:
      "Foundry Tools in Microsoft Learn content refers to integrating capabilities such as:",
    options: [
      "Speech, vision, language, and document intelligence as building blocks for applications and agents.",
      "Only spreadsheet macros.",
      "Physical robotics firmware only.",
    ],
    correctIndex: 0,
    explanation:
      "Tools are Azure AI services you attach to solutions for perception, language, and documents.",
  },
  {
    id: "q081",
    domain: "workloads",
    topicKey: "speech",
    topic: "Voice mode for agents",
    question:
      "Enabling Voice mode for a Foundry agent in the playground primarily:",
    options: [
      "Embeds Azure Speech Voice Live style configuration in the agent so clients need less custom speech wiring.",
      "Removes all security requirements.",
      "Disables text chat permanently.",
    ],
    correctIndex: 0,
    explanation:
      "Voice mode connects speech to the agent definition you already built.",
  },
  {
    id: "q082",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "REST request shape",
    question:
      "A typical REST call to an Azure AI endpoint includes:",
    options: [
      "Headers (for example content type and authorization) and a JSON body with the prompt or payload.",
      "Only a filename with no HTTP verb.",
      "FTP credentials only.",
    ],
    correctIndex: 0,
    explanation:
      "REST uses verbs, URLs, headers, and JSON bodies; responses are also usually JSON.",
  },
  {
    id: "q083",
    domain: "workloads",
    topicKey: "nlp_generative",
    topic: "Key phrase extraction",
    question:
      "Key phrase extraction from unstructured text is commonly used to:",
    options: [
      "Surface main concepts for search, tagging, or routing.",
      "Encrypt the hard drive.",
      "Replace tokenization in all NLP systems globally.",
    ],
    correctIndex: 0,
    explanation:
      "Key phrases summarize what the text is about at a glance.",
  },
  {
    id: "q084",
    domain: "concepts_responsibilities",
    topicKey: "responsible_ai",
    topic: "Governance in Foundry",
    question:
      "Microsoft Foundry documentation emphasizes governance features such as Responsible AI and content safety alongside deployments because:",
    options: [
      "Production AI needs policy, monitoring, and safeguards—not only raw accuracy.",
      "Governance disables all models automatically.",
      "Azure forbids any logging.",
    ],
    correctIndex: 0,
    explanation:
      "Enterprise AI platforms combine capability with controls for misuse, fairness, and compliance.",
  },
  {
    id: "q085",
    domain: "foundry_implementation",
    topicKey: "foundry_azure",
    topic: "Project-level endpoints",
    question:
      "In Foundry, project-level endpoints are used to work with:",
    options: [
      "Resources and assets scoped to your Foundry project.",
      "Only DNS records for unrelated websites.",
      "Local floppy disk drives.",
    ],
    correctIndex: 0,
    explanation:
      "Project endpoints target project APIs and configuration; model endpoints target inference for deployments.",
  },
];

const j = JSON.parse(fs.readFileSync(file, "utf8"));
const existing = new Set(j.questions.map((q) => q.id));
let n = 0;
for (const q of added) {
  if (!existing.has(q.id)) {
    j.questions.push(q);
    existing.add(q.id);
    n++;
  }
}
j.meta = j.meta || {};
j.meta.questionCount = j.questions.length;
j.meta.lastExpanded = "Get started with AI applications and agents on Azure (Learn-style notes)";

fs.writeFileSync(file, JSON.stringify(j, null, 2) + "\n");
console.log("Appended", n, "questions; total", j.questions.length);
