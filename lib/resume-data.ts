import { Experience } from './data';

export interface WorkExperienceItem {
  company: string;
  title: string;
  location: string;
  period: string;
  points: string[];
}

export interface ProjectItem {
  title: string;
  techStack: string;
  points: string[];
}

export interface TechnicalSkillsData {
  languages: string;
  frameworks: string;
  cloudPlatforms: string;
  runtimes: string;
  ormDatabase: string;
  tools: string;
  softSkills: string;
}

export interface VolunteerExperienceItem {
  organization: string;
  title: string;
  location: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
}

// Transform Experience data for resume
export const resumeWorkExperience: WorkExperienceItem[] = [
  {
    company: "EasLegal Partners",
    title: "Full Stack Developer Intern",
    location: "Remote",
    period: "September 2025-December 2025",
    points: [
      "• Represent v0 in the community and engage with developers to showcase AI-powered application development.",
      "• Contribute to improving the Platform Experience for users by providing feedback and suggestions on new features.",
      "• Help other developers by answering their questions and providing guidance on building applications with v0.",
    ],
  },
];

export const resumeProjects: ProjectItem[] = [
  {
    title: "SilentParcel",
    techStack: "(Next.js, TypeScript, Tailwind CSS, Zustand, Liveblocks, React Flow, AI SDK, Groq)",
    points: [
      "• Built a privacy-first visual workspace for designing, simulating, and sharing system architectures with drag-and-drop cloud components and real-time collaboration.",
      "• Implemented local-first storage with Zustand, enabling diagrams and simulation data to run entirely in the browser without external servers.",
      "• Integrated Liveblocks for real-time collaboration with shared cursors, presence, and AI assistant with Create and Understand modes. Selected as Staff Picked Project of the Day on Peerlist.",
    ],
  },
  {
    title: "Graphex",
    techStack: "(Next.js, TypeScript, Tailwind CSS, Prism React Renderer, Puppeteer, html2canvas-pro, MediaRecorder API)",
    points: [
      "• Developed a minimalist tool for creating beautiful screenshots of code, images, and websites with syntax highlighting, custom themes, and flexible styling options.",
      "• Built an image editor with animation timeline support, enabling users to add smooth animations and export as PNG images or WebM videos.",
      "• Implemented Puppeteer integration for high-quality website screenshots and integrated MediaRecorder API for video export functionality. Featured in top 5 projects on Peerlist.",
    ],
  },
  {
    title: "template-boss",
    techStack: "(Next.js, Remotion, GitHub API, Canvas API, v0)",
    points: [
      "• Built a personalized GitHub activity summary tool that visualizes your year in code with beautiful animated summaries, similar to Spotify Wrapped.",
      "• Integrated GitHub API to fetch user contributions, repositories, and coding statistics, then rendered them using Remotion for smooth animations.",
      "• Implemented Canvas API for dynamic visualizations and used v0 for rapid prototyping and development.",
    ],
  },
  {
    title: "SVG Preview (vs-code/cursor extension)",
    techStack: "(NextJS, TailwindCSS, Zustand, TanstackQuery, Clerk, MongoDB, Gemini, Polar)",
    points: [
      "• Built a scalable and responsive SaaS application with Next.js, React, TypeScript, Drizzle ORM, and Tailwind CSS, featuring AI-powered form generation and a drag-and-drop builder, used by 30+ users.",
      "• Implemented Clerk auth and Polar billing with secure routes, subscriptions, portals, and webhook syncing.",
      "• Built a scalable and responsive web application with Drizzle ORM, Tailwind CSS, and dynamic AI-based form generation used by 50 users.",
    ],
  },
];

export const technicalSkills: TechnicalSkillsData = {
  languages: "JavaScript, Python, Go",
  frameworks: "Express.js, React.js, Next.js, Vite, Playwright",
  cloudPlatforms: "AWS, Linux",
  runtimes: "NodeJS, Bun, pnpm",
  ormDatabase: "Prisma, Drizzle, Mongoose, PostgreSQL, MySQL, SQLite, MongoDB",
  tools: "Docker, Git",
  softSkills: "Leadership, Event Management, Writing, Public Speaking, Time Management",
};

export const volunteerExperience: VolunteerExperienceItem = {
  organization: "GDG VIT",
  title: "OSS Lead",
  location: "Hybrid",
  period: "2025 – Present",
  points: [
    "• Collaborated with various teams to conduct over 10+ events, engaging over 300+ students which directly contributed to an increment in technical awareness by 30%.",
  ],
};

export const education: EducationItem = {
  institution: "VIDYALANKAR INSTITUTE OF TECHNOLOGY",
  degree: "Bachelor of Technology",
  location: "Mumbai, Maharashtra",
  period: "2023-Present",
};
