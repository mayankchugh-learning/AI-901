import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "..", "data", "questions.json");

const j = JSON.parse(fs.readFileSync(file, "utf8"));

const topicKeyById = {
  q001: "nlp_generative",
  q002: "foundry_azure",
  q003: "speech",
  q004: "nlp_generative",
  q005: "nlp_generative",
  q006: "nlp_generative",
  q007: "nlp_generative",
  q008: "nlp_generative",
  q009: "nlp_generative",
  q010: "nlp_generative",
  q011: "responsible_ai",
  q012: "responsible_ai",
  q013: "responsible_ai",
  q014: "responsible_ai",
  q015: "responsible_ai",
  q016: "responsible_ai",
  q017: "computer_vision",
  q018: "nlp_generative",
  q019: "concepts_governance",
  q020: "concepts_governance",
  q021: "foundry_azure",
  q022: "foundry_azure",
  q023: "foundry_azure",
  q024: "foundry_azure",
  q025: "foundry_azure",
  q026: "foundry_azure",
  q027: "foundry_azure",
  q028: "speech",
  q029: "speech",
  q030: "computer_vision",
  q031: "responsible_ai",
  q032: "foundry_azure",
  q033: "nlp_generative",
  q034: "responsible_ai",
  q035: "foundry_azure",
  q036: "nlp_generative",
  q037: "responsible_ai",
  q038: "foundry_azure",
  q039: "nlp_generative",
  q040: "responsible_ai",
  q041: "foundry_azure",
  q042: "speech",
  q043: "responsible_ai",
  q044: "foundry_azure",
  q045: "computer_vision",
};

j.topicFilters = [
  { id: "all", label: "All topic areas" },
  { id: "responsible_ai", label: "Responsible AI" },
  { id: "nlp_generative", label: "NLP & generative AI" },
  { id: "speech", label: "Speech (recognition & synthesis)" },
  { id: "computer_vision", label: "Computer vision & multimodal" },
  { id: "foundry_azure", label: "Foundry, APIs & app integration" },
  { id: "concepts_governance", label: "AI concepts, workloads & governance" },
];

for (const q of j.questions) {
  q.topicKey = topicKeyById[q.id];
}

const added = [
  {
    id: "q046",
    domain: "workloads",
    topicKey: "speech",
    topic: "Speech recognition — pre-processing",
    question: "What activity happens during the pre-processing stage of speech recognition?",
    options: [
      "The audio is converted to a proprietary video format only.",
      "Background noise is intentionally added to the audio signal.",
      "Feature vectors are extracted from the audio waveform for modeling.",
    ],
    correctIndex: 2,
    explanation:
      "Pre-processing turns raw audio into compact features (for example spectral features) suitable for acoustic modeling.",
  },
  {
    id: "q047",
    domain: "workloads",
    topicKey: "speech",
    topic: "Speech — phonemes",
    question: "What are phonemes?",
    options: [
      "Artifacts removed from the signal only for music playback.",
      "The smallest unit of sound in speech.",
      "AI models that generate images from text.",
    ],
    correctIndex: 1,
    explanation:
      "Phonemes are the minimal speech sounds used when mapping text to pronunciation in synthesis and recognition pipelines.",
  },
  {
    id: "q048",
    domain: "workloads",
    topicKey: "speech",
    topic: "Speech synthesis — prosody",
    question: "Why is it important to generate prosody in speech synthesis?",
    options: [
      "Prosody maximizes the volume of the audio output only.",
      "Prosody translates speech to the listener’s native language automatically.",
      "Prosody helps ensure natural pronunciation, rhythm, and speech cadence.",
    ],
    correctIndex: 2,
    explanation:
      "Prosody controls stress, intonation, and timing so synthesized speech sounds natural, not robotic.",
  },
  {
    id: "q049",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Image classification",
    question:
      "A checkout camera assigns one label to an entire photo of a single piece of fruit (apple vs. banana). Which task is this?",
    options: [
      "Semantic segmentation",
      "Image classification",
      "Object detection with multiple bounding boxes",
    ],
    correctIndex: 1,
    explanation:
      "Image classification predicts a single label for the whole image based on its main subject.",
  },
  {
    id: "q050",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Object detection",
    question:
      "You need to find several products in one photo and know where each item appears. Which approach matches this goal?",
    options: [
      "Image classification only",
      "Object detection (for example with bounding boxes)",
      "Tokenization of the image file name",
    ],
    correctIndex: 1,
    explanation:
      "Object detection locates multiple objects and their regions, not just one label for the entire image.",
  },
  {
    id: "q051",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Semantic segmentation",
    question: "Semantic segmentation differs from basic object detection because it typically:",
    options: [
      "Classifies each pixel by the object or class it belongs to",
      "Outputs only a single label for the entire image",
      "Converts speech to text",
    ],
    correctIndex: 0,
    explanation:
      "Segmentation assigns a class per pixel, yielding precise masks of object regions.",
  },
  {
    id: "q052",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Convolutional neural networks",
    question: "In a typical CNN for image classification, convolutional layers primarily:",
    options: [
      "Replace the need for any training data.",
      "Apply filters to build feature maps that capture visual patterns before prediction.",
      "Encrypt images for storage only.",
    ],
    correctIndex: 1,
    explanation:
      "CNNs stack convolutions to extract hierarchical features (edges, textures, parts) summarized as feature maps.",
  },
  {
    id: "q053",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Vision transformers (ViT)",
    question: "In a vision transformer (ViT), images are often processed by:",
    options: [
      "Splitting the image into patches and embedding each patch for attention-based modeling.",
      "Ignoring spatial structure entirely without embeddings.",
      "Using only TF-IDF on filenames.",
    ],
    correctIndex: 0,
    explanation:
      "ViT models treat image patches like tokens, applying transformer attention over patch embeddings.",
  },
  {
    id: "q054",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Multimodal models",
    question:
      "When vision and language encoders are trained so images and text share a joint representation, models can:",
    options: [
      "Only classify images without any text output.",
      "Relate visual features to language (for example captions or tags) in a shared embedding space.",
      "Remove the need for any training data.",
    ],
    correctIndex: 1,
    explanation:
      "Multimodal models align image and text embeddings, enabling captioning, tagging, and cross-modal search.",
  },
  {
    id: "q055",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Image generation (diffusion)",
    question:
      "Many modern image-generation models use diffusion: they start from noise and iteratively:",
    options: [
      "Remove noise and refine structure until the image matches the prompt-driven signal.",
      "Increase noise until the image disappears.",
      "Convert the image to MFCCs only.",
    ],
    correctIndex: 0,
    explanation:
      "Diffusion models denoise step by step, conditioning on the prompt to synthesize a coherent image.",
  },
  {
    id: "q056",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Contextual image analysis",
    question:
      "Multimodal computer vision models that interpret relationships between objects and descriptive text are an example of:",
    options: [
      "Contextual or semantic image analysis beyond a single class label",
      "Pure speech synthesis",
      "Disk defragmentation",
    ],
    correctIndex: 0,
    explanation:
      "Contextual analysis ties visual content to language for richer understanding (scenes, activities, descriptions).",
  },
  {
    id: "q057",
    domain: "workloads",
    topicKey: "computer_vision",
    topic: "Images & processing",
    question:
      "Digitizing sound for speech often uses thousands of samples per second (for example 16 kHz). For vision, an image is digitized as:",
    options: [
      "A grid of pixels with numeric color or intensity values per channel.",
      "A single number with no spatial layout.",
      "Only a text caption with no raster data.",
    ],
    correctIndex: 0,
    explanation:
      "Images are discrete grids of pixels; many vision pipelines preprocess (resize, normalize) before model input.",
  },
  {
    id: "q058",
    domain: "concepts_responsibilities",
    topicKey: "concepts_governance",
    topic: "Computer vision — definition",
    question: "Computer vision typically refers to AI that:",
    options: [
      "Processes visual input such as images, video, or camera streams to extract meaning.",
      "Only generates MIDI music files.",
      "Only stores blobs in cold storage without analysis.",
    ],
    correctIndex: 0,
    explanation:
      "Computer vision covers tasks like classification, detection, segmentation, and multimodal understanding of visual data.",
  },
];

const existingIds = new Set(j.questions.map((q) => q.id));
for (const q of added) {
  if (!existingIds.has(q.id)) j.questions.push(q);
}

fs.writeFileSync(file, JSON.stringify(j, null, 2) + "\n");
console.log("Wrote", j.questions.length, "questions");
