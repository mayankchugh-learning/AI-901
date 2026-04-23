import fs from "fs";

const modules = [
  {
    path: "C:/githunb/AI-901-Prep/AI concepts for developers and technology professionals/1- Get started with AI in Azure/Module-summary-and-interview-QA.md",
    title: "Get started with AI in Azure (Concepts)",
    overview:
      "This module introduces core AI terms, relationship between AI and ML, and how Azure and Microsoft Foundry support AI app development.",
    takeaways: [
      "AI is the broad goal; ML is a data-driven method used within AI.",
      "Foundry runs on Azure resources and uses Azure security, identity, and networking.",
      "Client apps call deployed model endpoints using HTTPS APIs.",
      "Keys/secrets and endpoints serve different roles: identity vs location.",
      "Playgrounds help validate prompts before coding SDK-based clients.",
    ],
    qa: [
      ["What is the difference between AI and ML?", "AI is the broad field; ML is a technique where systems learn patterns from data to perform AI tasks."],
      ["Why do teams use Foundry before writing production code?", "To compare models, test prompts, and capture working settings that reduce implementation risk."],
      ["Why should secrets not be hardcoded?", "Hardcoded secrets can leak through source control and expose paid or sensitive resources."],
      ["What is a client application in this context?", "A user-facing app (web/mobile/desktop) that sends requests to model/service endpoints and displays results."],
      ["What does an endpoint represent?", "The network URL entry point where your app calls an AI service or deployment."],
      ["How do keys and endpoints work together?", "The endpoint is where you call; the key or token proves your app is authorized."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/AI concepts for developers and technology professionals/2- Introduction to natural language processing concepts/Module-summary-and-interview-QA.md",
    title: "Introduction to natural language processing concepts",
    overview:
      "This module covers tokenization, statistical text methods, semantic embeddings, and common NLP scenarios.",
    takeaways: [
      "Tokenization breaks text into machine-processable units.",
      "TF-IDF helps rank term importance in document collections.",
      "Embeddings represent semantics in vector space.",
      "Entity extraction and sentiment analysis are frequent NLP workloads.",
      "NLP models can produce both structured extraction and open-ended generation.",
    ],
    qa: [
      ["Why is tokenization needed?", "Models operate on tokens, not raw paragraphs; tokenization creates those units."],
      ["When is TF-IDF useful?", "When you need keyword importance per document within a larger corpus."],
      ["What are embeddings used for?", "Similarity search, semantic retrieval, clustering, and context-aware reasoning."],
      ["How does sentiment differ from entity extraction?", "Sentiment scores opinion polarity; entity extraction identifies typed items such as names and dates."],
      ["Why might structured NLP APIs be preferred over free-form generation?", "They provide deterministic schema-based outputs for operational workflows."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/AI concepts for developers and technology professionals/3- Introduction to generative AI and agents/Module-summary-and-interview-QA.md",
    title: "Introduction to generative AI and agents",
    overview:
      "This module introduces LLMs, prompts, system instructions, embeddings, attention, and agent-style task execution.",
    takeaways: [
      "LLMs generate new content from prompts.",
      "Prompt quality strongly affects output quality and consistency.",
      "System prompts define boundaries and behavior.",
      "Agents orchestrate tools and actions toward user goals.",
      "Embeddings and attention are core transformer building blocks.",
    ],
    qa: [
      ["What is a system prompt?", "A high-priority instruction layer that sets model behavior and constraints."],
      ["What is an AI agent?", "A software entity that plans and executes tasks, often using tools, on behalf of users."],
      ["Why use few-shot examples in prompts?", "They demonstrate desired format/logic and improve output reliability."],
      ["What does attention do?", "It helps the model weigh relationships between tokens in context."],
      ["How do agents differ from direct model calls?", "Agents add orchestration, memory/tool use, and workflow-level decisions."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/AI concepts for developers and technology professionals/4- Introduction to AI speech concepts/Module-summary-and-interview-QA.md",
    title: "Introduction to AI speech concepts",
    overview:
      "This module explains speech recognition, synthesis, feature extraction, and conversational voice experiences.",
    takeaways: [
      "Speech recognition converts speech to text.",
      "Speech synthesis converts text to natural speech.",
      "Feature extraction (for example MFCC-like representations) supports recognition.",
      "Prosody improves naturalness in synthesized speech.",
      "Voice systems should support accessibility needs.",
    ],
    qa: [
      ["What is speech-to-text used for?", "Captions, command interfaces, call transcription, and voice analytics."],
      ["Why is prosody important?", "It adds natural rhythm, stress, and intonation, improving comprehension."],
      ["What affects speech recognition quality?", "Microphone quality, noise level, accent variation, and model configuration."],
      ["How does text-to-speech fit accessibility?", "It enables audio output for users who prefer or require spoken interfaces."],
      ["What is speech-to-speech?", "A pipeline combining STT, reasoning/translation, and TTS in one conversational flow."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/AI concepts for developers and technology professionals/5- Introduction to computer vision concepts/Module-summary-and-interview-QA.md",
    title: "Introduction to computer vision concepts",
    overview:
      "This module covers image classification, object detection, segmentation, CNNs, vision transformers, multimodal models, and image generation.",
    takeaways: [
      "Classification assigns labels to whole images.",
      "Detection locates objects with regions (for example bounding boxes).",
      "Segmentation classifies pixels for precise boundaries.",
      "CNNs and ViTs are major vision model families.",
      "Multimodal models connect visual and language representations.",
    ],
    qa: [
      ["How does object detection differ from classification?", "Detection identifies what and where; classification identifies what overall."],
      ["When is segmentation preferred?", "When precise boundaries or pixel-level masks are required."],
      ["Why are multimodal models important?", "They enable tasks like image captioning and text-image reasoning."],
      ["What is a common image generation approach?", "Diffusion-style iterative denoising conditioned on prompts."],
      ["Why test in playground before coding?", "To validate model behavior and prompt strategy quickly."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/AI concepts for developers and technology professionals/6- Introduction to AI-powered information extraction concepts/Module-summary-and-interview-QA.md",
    title: "Introduction to AI-powered information extraction concepts",
    overview:
      "This module focuses on extracting structured data from documents, audio, and video using schema-based analysis.",
    takeaways: [
      "Basic OCR extracts text; content understanding maps to meaning and schema.",
      "Schemas define what fields to extract and how results are structured.",
      "Analyzers apply extraction logic consistently across inputs.",
      "Results are typically JSON and suited for automation pipelines.",
      "Extraction can span documents, calls, and meetings.",
    ],
    qa: [
      ["What is the main value of schema-driven extraction?", "Consistent, machine-consumable structured output aligned to business fields."],
      ["Why use analyzers?", "To reuse extraction logic and enforce predictable output structure."],
      ["What is a nested field example?", "Invoice line items containing description, quantity, unit price, and totals."],
      ["Why is JSON output useful?", "It is easy to parse and integrate with search, storage, and workflows."],
      ["How does this exceed OCR?", "It captures relationships and semantic meaning, not only plain text."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/Get started with AI applications and agents on Azure/1- Get started with AI in Azure/Module-summary-and-interview-QA.md",
    title: "Get started with AI in Azure (Applied)",
    overview:
      "Applied introduction to Azure AI app flow: choose model, test in playground, secure endpoint usage, then integrate in client applications.",
    takeaways: [
      "Foundry projects organize AI assets and workflows.",
      "Endpoints expose deployed capabilities through APIs.",
      "Authentication uses keys/tokens and should follow secure secret storage.",
      "Playground experimentation reduces integration errors.",
      "Client apps present model output to users through product features.",
    ],
    qa: [
      ["What is the safest pattern for keys?", "Store in environment variables/secret stores, not in source files."],
      ["Why validate prompts before production?", "To reduce latency/cost surprises and improve output quality."],
      ["What does deployment mean here?", "Making a model accessible through a managed endpoint for inference."],
      ["How does this map to interview system design?", "Explain client -> endpoint -> model -> response with auth and monitoring."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/Get started with AI applications and agents on Azure/2- Get started with generative AI and agents in Azure/Module-summary-and-interview-QA.md",
    title: "Get started with generative AI and agents in Azure",
    overview:
      "Hands-on view of model catalog selection, playground iteration, and building/publishing agents for application use.",
    takeaways: [
      "Model catalog supports comparison across providers and model families.",
      "Foundation models are large pretrained models with broad abilities.",
      "Publishing agents enables stable integration points for applications.",
      "Agent references can invoke configured behavior and tooling.",
      "Prompt and model choices should be validated with realistic scenarios.",
    ],
    qa: [
      ["How do you choose between models?", "Compare capability, latency, cost, modality, and safety requirements."],
      ["What is the practical value of publishing an agent?", "You get a manageable endpoint/configuration boundary for reuse and integration."],
      ["What should you test before shipping an agent?", "Prompt robustness, fallback behavior, safety handling, and monitoring traces."],
      ["Why not call the largest model always?", "Cost/latency tradeoffs and over-capability can hurt practical performance."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/Get started with AI applications and agents on Azure/3- Get started with text analysis in Azure/Module-summary-and-interview-QA.md",
    title: "Get started with text analysis in Azure",
    overview:
      "Practical text-analysis patterns: when to use Azure Language service APIs, clients, and MCP exposure for agent workflows.",
    takeaways: [
      "Language services provide structured outputs for specific tasks.",
      "SDK clients simplify endpoint calls and auth handling.",
      "MCP servers expose language capabilities to agents as tools.",
      "Deterministic outputs are useful in operational pipelines.",
      "Generative and structured approaches can be combined.",
    ],
    qa: [
      ["When prefer Azure Language over free-form LLM prompts?", "When you need predictable schema outputs for production automation."],
      ["What does a client object do?", "It is your app handle for calling service operations with configured auth/endpoint."],
      ["Why use MCP in agent systems?", "To standardize tool connectivity and reduce custom adapter code."],
      ["How would you explain deterministic output in an interview?", "Same input/task configuration should return stable structured fields suitable for downstream logic."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/Get started with AI applications and agents on Azure/4- Get started with speech in Azure/Module-summary-and-interview-QA.md",
    title: "Get started with speech in Azure",
    overview:
      "Applied speech module: integrating STT/TTS in code, and using Voice Live for real-time speech-to-speech agent experiences.",
    takeaways: [
      "Speech SDKs embed voice features directly in applications.",
      "Voice Live supports low-latency conversational interactions.",
      "Speech-to-speech chains STT, reasoning, and TTS.",
      "Agent voice mode can reduce client-side complexity.",
      "Interruptions and streaming are key conversational requirements.",
    ],
    qa: [
      ["Why use SDKs over only playground?", "SDKs are for production integration, lifecycle control, and custom UX."],
      ["What makes voice interaction feel natural?", "Low latency, interruption handling, and good prosody/turn-taking behavior."],
      ["What package might be used for Voice Live in Python?", "The azure-ai-voicelive SDK package."],
      ["What is a common pitfall in voice apps?", "Ignoring noisy environments, fallback behavior, and accessibility options."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/Get started with AI applications and agents on Azure/5- Get started with computer vision in Azure/Module-summary-and-interview-QA.md",
    title: "Get started with computer vision in Azure",
    overview:
      "Applied computer-vision module including multimodal reasoning, image generation API usage, and async video generation behavior.",
    takeaways: [
      "Multimodal models can combine image and text understanding.",
      "Image generation is available programmatically via API/SDK calls.",
      "Requests should target deployment names configured in Foundry.",
      "Video generation can be asynchronous due to higher compute cost.",
      "Model selection must fit task modality and performance needs.",
    ],
    qa: [
      ["What is multimodal in interview terms?", "A model that can reason across multiple input/output types like text and images."],
      ["Why async for video generation?", "Long-running jobs are queued/polled because rendering is resource intensive."],
      ["What value is passed as model in many SDK calls?", "The deployment name you configured in your resource."],
      ["How would you productionize image generation?", "Use endpoint auth, moderation/safety checks, retries, logging, and async handling where required."],
    ],
  },
  {
    path: "C:/githunb/AI-901-Prep/Get started with AI applications and agents on Azure/6- Get started with AI-powered information extraction in Azure/Module-summary-and-interview-QA.md",
    title: "Get started with AI-powered information extraction in Azure",
    overview:
      "Applied extraction workflows for documents, audio, and video using schema-based analyzers and long-running analysis patterns.",
    takeaways: [
      "Content Understanding extracts structured fields, not just text.",
      "Schemas define expected business fields and nested structures.",
      "Analyzers enforce consistent extraction behavior.",
      "SDK operations often use begin/poll/result asynchronous patterns.",
      "Audio/video analyzers can produce transcripts and actionable insights.",
    ],
    qa: [
      ["What is analyzer polling and why needed?", "Analysis may be long-running; clients poll until completed results are available."],
      ["How does extraction from calls help operations?", "It creates structured summaries/actions/callback data without manual review of full recordings."],
      ["Why include nested schema fields?", "To preserve relationships, e.g., line item attributes inside invoices."],
      ["How do you explain OCR vs content understanding in interviews?", "OCR reads text; content understanding maps semantics into defined schema fields."],
      ["What should be validated before coding automation?", "Analyzer output quality in portal tests, field coverage, and confidence thresholds."],
    ],
  },
];

function buildDoc(m) {
  const lines = [];
  lines.push(`# ${m.title}`);
  lines.push("");
  lines.push("## Quick summary");
  lines.push("");
  lines.push(m.overview);
  lines.push("");
  lines.push("## Key takeaways");
  lines.push("");
  for (const k of m.takeaways) lines.push(`- ${k}`);
  lines.push("");
  lines.push("## Predictive interview Q&A");
  lines.push("");
  m.qa.forEach((pair, i) => {
    lines.push(`### Q${i + 1}. ${pair[0]}`);
    lines.push("");
    lines.push(`**Answer:** ${pair[1]}`);
    lines.push("");
  });
  lines.push("## How to use this page");
  lines.push("");
  lines.push("- Review the key takeaways before practice tests.");
  lines.push("- Answer the interview questions aloud without looking first.");
  lines.push("- Link gaps to the module exercises and your Q&A simulator weak-topic mode.");
  lines.push("");
  return lines.join("\n");
}

for (const m of modules) {
  fs.writeFileSync(m.path, buildDoc(m), "utf8");
  console.log("Wrote:", m.path);
}

console.log("Completed", modules.length, "module summary pages.");
