import { Experience } from "./data";

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
  frontend: string;
  backend: string;
  aiDeveloperTools: string;
  cloudInfrastructure: string;
  databases: string;
  devOps: string;
  systemDesign: string;
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

export interface CertificationItem {
  name: string;
  score: string;
  verificationUrl: string;
}

// Transform Experience data for resume
export const resumeWorkExperience: WorkExperienceItem[] = [
  {
    company: "ArtifexOne",
    title: "Software Engineer Intern",
    location: "Barcelona, Spain (Remote)",
    period: "Jun 2026 - July 2026",
    points: [
      "• Fully owned Taolatt Real Estate CRM, shipping 23 full-stack features from backend APIs to React interfaces while defining engineering standards that scaled the platform.",
      "• Built a reusable React component library with shadcn/ui, React Hook Form, and Zod, supporting scalable state management, filtering, infinite scroll, and multi-select workflows.",
      "• Integrated messaging and booking services, delivering WhatsApp/email workflows with deduplication, idempotent retries, and real-time calendar synchronization via webhooks.",
    ],
  },
  {
    company: "Actrun",
    title: "Backend Engineer Intern",
    location: "Maryland, US (Remote)",
    period: "Feb 2026 - Jun 2026",
    points: [
      "• Built a deterministic attachment pipeline for chat/Slack, hydrating images/PDFs/text directly into LLM context.",
      "• Set up local and staging test suites, plus a dedicated Slack bot for development/testing workflows.",
      "• Fixed intermittent Postgres SSL drops with retry-with-backoff logic, and resolved OAuth/WebSocket issues across X, LinkedIn, and Slack integrations.",
    ],
  },

  {
    company: "EasLegal Partners",
    title: "Full Stack Developer Intern",
    location: "Bengaluru, India (Remote)",
    period: "September 2025-December 2025",
    points: [
      "• Developed production-grade code and a user-friendly interface to enhance user experience",
      "• Designed a robust RESTful API with Express and Prisma ORM, handling complex data relationships for user authentication, document management, and organization workflows.",
      "• Deployed the application on AWS using nginx , EC2 instances, and S3 buckets for optimized performance and scalability.",
    ],
  },
];

export const resumeProjects: ProjectItem[] = [
  {
    title: "Nabhya",
    techStack:
      "(NestJS 11, TypeScript, Supabase, Drizzle ORM, Expo , React Native, TanStack Query, Zustand, Axios, Zod, Razorpay, Resend, Vitest, k6, Biome, Turborepo)",
    points: [
      "• Built Nabhya’s backend to power a trusted NGO–volunteer platform.",
      "• Learned to turn complex product requirements into secure, scalable, and reliable backend systems.",
      "• Created a personalized feed-ranking engine that matches volunteers with relevant opportunities in real time.",
    ],
  },
  {
    title: "Santra",
    techStack:
      "(React 19, TypeScript, Vite, Tailwind CSS, shadcn, Tauri 2, Rust, Tokio, FFmpeg, Poppler, qpdf, Pandoc, ExifTool, test runner, Playwright)",
    points: [
      "• Built a sub-10 MB Windows and Linux desktop app with snappy file conversion and ready-to-use tools using near-zero memory.",
      "• Owned the full product lifecycle—from idea, documentation, design, and prototyping to engineering and production delivery.",
      "• Its a fast, privacy-first workflow that feels nearly weightless while handling real file operations locally.",
    ],
  },
  {
    title: "SilentParcel",
    techStack:
      "(Next.js, TypeScript, Tailwind CSS, Shadcn UI, Github Actions, Supabase, Appwrite)",
    points: [
      "• Built a end-to-end encrypted file sharing application that disappears without a trace.",
      "• Implements AES-256 end-to-end encryption for files and chats, ensuring military-grade security without registration.",
      "• Offers ephemeral anonymous chat rooms with real-time messaging, collaborative code editing, and WebRTC support for up to 10+ languages. Selected as Staff Picked Project of the Day on Peerlist.",
    ],
  },
];

export const technicalSkills: TechnicalSkillsData = {
  languages: "Go, TypeScript, JavaScript, Python",
  frontend: "React.js, Next.js",
  backend:
    "Express.js, NestJS, Django, FastAPI, REST APIs, Authentication (JWT/OAuth), WebSockets",
  aiDeveloperTools:
    "AI Agents, MCP Servers, Agentic Workflows, LLM Integrations, Tool Calling, Context Engineering",
  cloudInfrastructure:
    "AWS (EC2, S3, IAM, Lambda, CloudFront), Docker, Nginx, Linux, Redis, Cloudflare",
  databases: "PostgreSQL, MySQL, MongoDB, SQLite, Prisma, Drizzle ORM",
  devOps: "Docker, Git, GitHub Actions, CI/CD, PM2, Linux, Bash",
  systemDesign:
    "Microservices, Distributed Systems, System Design, Caching, Message Queues (BullMQ), API Design, Scalability, Load Balancing",
};

export const certifications: CertificationItem[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    score: "Score: 898/1000",
    verificationUrl:
      "https://cp.certmetrics.com/amazon/en/public/verify/credential/cbe562c3afff4d9d91f786d5338989fe",
  },
  {
    name: "AWS Certified AI Practitioner",
    score: "Score: 929/1000",
    verificationUrl:
      "https://cp.certmetrics.com/amazon/en/public/verify/credential/82901d854e8a4e9faa41b1ddec6e4cf2",
  },
];

export const volunteerExperience: VolunteerExperienceItem = {
  organization: "GDG VIT",
  title: "OSS Lead",
  location: "Hybrid",
  period: "Sept 2025 - Jun 2026",
  points: [
    "• Managed and hosted a 12-hour hackathon with teams participating from across India.",
    "• Led a diverse team of tech enthusiasts to build and deploy multiple events and workshops that improved technical awareness among students.",
    "• Collaborated with communities including GDG IIIT Kalyani, GDG UMIT, GeeksforGeeks, and SMAAASH to foster stronger bonds while maintaining professionalism.",
  ],
};

export const education: EducationItem = {
  institution: "Vidyalankar Institute of Technology",
  degree: "Bachelor of Technology",
  location: "Mumbai, Maharashtra",
  period: "2023-Present",
};
