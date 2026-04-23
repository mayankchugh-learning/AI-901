import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outFile = path.join(root, "qa-simulator", "data", "study-content.json");

const pages = [
  {
    id: "ac-1",
    section: "AI concepts for developers and technology professionals",
    module: "1- Get started with AI in Azure",
    path: "AI concepts for developers and technology professionals/1- Get started with AI in Azure/Module-summary-and-interview-QA.md",
  },
  {
    id: "ac-2",
    section: "AI concepts for developers and technology professionals",
    module: "2- Introduction to natural language processing concepts",
    path: "AI concepts for developers and technology professionals/2- Introduction to natural language processing concepts/Module-summary-and-interview-QA.md",
  },
  {
    id: "ac-3",
    section: "AI concepts for developers and technology professionals",
    module: "3- Introduction to generative AI and agents",
    path: "AI concepts for developers and technology professionals/3- Introduction to generative AI and agents/Module-summary-and-interview-QA.md",
  },
  {
    id: "ac-4",
    section: "AI concepts for developers and technology professionals",
    module: "4- Introduction to AI speech concepts",
    path: "AI concepts for developers and technology professionals/4- Introduction to AI speech concepts/Module-summary-and-interview-QA.md",
  },
  {
    id: "ac-5",
    section: "AI concepts for developers and technology professionals",
    module: "5- Introduction to computer vision concepts",
    path: "AI concepts for developers and technology professionals/5- Introduction to computer vision concepts/Module-summary-and-interview-QA.md",
  },
  {
    id: "ac-6",
    section: "AI concepts for developers and technology professionals",
    module: "6- Introduction to AI-powered information extraction concepts",
    path: "AI concepts for developers and technology professionals/6- Introduction to AI-powered information extraction concepts/Module-summary-and-interview-QA.md",
  },
  {
    id: "gs-1",
    section: "Get started with AI applications and agents on Azure",
    module: "1- Get started with AI in Azure",
    path: "Get started with AI applications and agents on Azure/1- Get started with AI in Azure/Module-summary-and-interview-QA.md",
  },
  {
    id: "gs-2",
    section: "Get started with AI applications and agents on Azure",
    module: "2- Get started with generative AI and agents in Azure",
    path: "Get started with AI applications and agents on Azure/2- Get started with generative AI and agents in Azure/Module-summary-and-interview-QA.md",
  },
  {
    id: "gs-3",
    section: "Get started with AI applications and agents on Azure",
    module: "3- Get started with text analysis in Azure",
    path: "Get started with AI applications and agents on Azure/3- Get started with text analysis in Azure/Module-summary-and-interview-QA.md",
  },
  {
    id: "gs-4",
    section: "Get started with AI applications and agents on Azure",
    module: "4- Get started with speech in Azure",
    path: "Get started with AI applications and agents on Azure/4- Get started with speech in Azure/Module-summary-and-interview-QA.md",
  },
  {
    id: "gs-5",
    section: "Get started with AI applications and agents on Azure",
    module: "5- Get started with computer vision in Azure",
    path: "Get started with AI applications and agents on Azure/5- Get started with computer vision in Azure/Module-summary-and-interview-QA.md",
  },
  {
    id: "gs-6",
    section: "Get started with AI applications and agents on Azure",
    module: "6- Get started with AI-powered information extraction in Azure",
    path: "Get started with AI applications and agents on Azure/6- Get started with AI-powered information extraction in Azure/Module-summary-and-interview-QA.md",
  },
];

const result = {
  meta: {
    title: "AI-901 study pages",
    generatedAt: new Date().toISOString(),
  },
  pages: pages.map((p) => {
    const abs = path.join(root, p.path);
    const content = fs.existsSync(abs)
      ? fs.readFileSync(abs, "utf8")
      : `# Missing page\n\nCould not find: ${p.path}`;
    return { ...p, content };
  }),
};

fs.writeFileSync(outFile, JSON.stringify(result, null, 2) + "\n", "utf8");
console.log("Wrote study-content.json with pages:", result.pages.length);
