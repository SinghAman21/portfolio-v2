import type { WorkspaceApp } from "./types";

export const appRegistry: WorkspaceApp[] = [
  { id: "desktop", name: "Workspace", description: "The room behind the work.", command: "home" },
  { id: "design-inspo", name: "Design Inspo", description: "27 ways to see the same workspace.", command: "open design-inspo" },
  { id: "files", name: "Files", description: "Projects, writing, and useful resources.", command: "open files" },
  { id: "notes", name: "Notes", description: "Small principles for difficult problems.", command: "open notes" },
  { id: "tools", name: "Tools", description: "My editor, AI collaborators, and prototyping tools.", command: "open tools" },
  { id: "settings", name: "Settings", description: "Appearance, power, and keyboard shortcuts.", command: "open settings" },
];

export const wallNotes = [
  { id: "understand", title: "Understand before solving.", body: "Write down the real problem, the desired outcome, and the constraints. A clear question is a useful first artifact." },
  { id: "break-down", title: "Break complexity down.", body: "Find the smallest decision you can make with confidence. A sequence of small decisions is easier to inspect than one large assumption." },
  { id: "experiment", title: "Experiment. Then observe.", body: "Make a small prototype, isolate the risky assumption, and look at what happens. Let the result change the next step." },
  { id: "test", title: "Test assumptions.", body: "Check both the happy path and the edge that could change the outcome. The test is useful when it can prove the idea wrong." },
  { id: "document", title: "Document decisions.", body: "Leave the reasoning next to the implementation. Future-you should not have to reconstruct the conversation." },
  { id: "iterate", title: "Improve through iteration.", body: "Ship a useful increment, listen, and refine it. Better starting points accumulate." },
];

export const workspaceTools = [
  { name: "Zed", category: "Development", purpose: "My everyday editor for writing and navigating code.", url: "https://zed.dev" },
  { name: "Codex", category: "AI", purpose: "Implementation, investigation, and help getting unstuck.", url: "https://chatgpt.com/codex" },
  { name: "OpenCode", category: "AI", purpose: "A terminal interface for building with AI models.", url: "https://opencode.ai" },
  { name: "Claude", category: "AI", purpose: "Thinking through context, exploring approaches, and reviewing ideas.", url: "https://claude.ai" },
  { name: "Excalidraw", category: "Drawing", purpose: "Workflow sketches, architecture diagrams, and explaining things visually.", url: "https://excalidraw.com" },
  { name: "v0", category: "Prototyping", purpose: "Getting an interface idea into a quick, testable form.", url: "https://v0.dev" },
  { name: "Lovable", category: "Prototyping", purpose: "Turning rough product concepts into clickable experiments.", url: "https://lovable.dev" },
  { name: "ChatGPT", category: "Creative", purpose: "Logo exploration, writing, and visual direction.", url: "https://chatgpt.com" },
];
