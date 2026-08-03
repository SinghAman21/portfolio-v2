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

// Transform Experience data for resume
export const resumeWorkExperience: WorkExperienceItem[] = [
  {
    company: "Artifexone",
    title: "Software Engineer Intern",
    location: "Remote",
    period: "Jun 2026 - Present",
    points: [
      "• Lead Product Engineer for Taolatt Real Estate CRM, shipping 23 full-stack features from backend APIs to React interfaces while defining engineering standards that scaled the platform.",
      "• Built a reusable React component library with shadcn/ui, React Hook Form, and Zod, supporting scalable state management, filtering, infinite scroll, and multi-select workflows.",
      "• Integrated messaging and booking services, delivering WhatsApp/email workflows with deduplication, idempotent retries, and real-time calendar synchronization via webhooks.",
    ],
  },
  {
    company: "Actrun",
    title: "Backend Engineer Intern",
    location: "Remote",
    period: "Feb 2026 - Jun 2026",
    points: [
      "• Built a deterministic attachment pipeline for chat/Slack, hydrating images/PDFs/text directly into LLM context.",
      "• Set up local and staging test suites, plus a dedicated Slack bot for development/testing workflows.",
      "• Fixed intermittent Postgres SSL drops with retry-with-backoff logic, and resolved OAuth/WebSocket issues across X, LinkedIn, and Slack integrations.",
    ],
  },
  {
    company: "Vidyalankar Institute of Technology",
    title: "Cloud Security Research Intern",
    location: "Mumbai, Maharashtra",
    period: "December 2025 - February 2026",
    points: [
      "• Reverse-engineered vulnerable AWS infra (public RDS/S3, plaintext creds); Terraform-hardened to private subnets, ALB TLS, KMS encryption, Secrets Manager—100% attack sim mitigation.",
      "• Built prod-grade Node.js+PostgreSQL AWS stack: custom IAM (prefix-specific S3/KMS), EB/RDS isolation, GuardDuty+CloudTrail logging, <5min reproducible deployments.",
      "• Simulated SQLi/priv-esc attacks; validated via tf plan, CW alarms, Config rules—achieving compliant, drift-proof infrastructure.",
    ],
  },
  {
    company: "EasLegal Partners",
    title: "Full Stack Developer Intern",
    location: "Remote",
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
    title: "SilentParcel",
    techStack:
      "(Next.js, TypeScript, Tailwind CSS, Shadcn UI, Github Actions, Supabase, Appwrite)",
    points: [
      "• Built a end-to-end encrypted file sharing application that disappears without a trace.",
      "• Implements AES-256 end-to-end encryption for files and chats, ensuring military-grade security without registration.",
      "• Offers ephemeral anonymous chat rooms with real-time messaging, collaborative code editing, and WebRTC support for up to 10+ languages. Selected as Staff Picked Project of the Day on Peerlist.",
    ],
  },
  {
    title: "Graphex",
    techStack:
      "(Next.js, TypeScript, Tailwind CSS, tRPC, Prisma, Github OAuth, Shadcn UI, Resend, DodoPayments)",
    points: [
      "• Integrates with GitHub via secure OAuth, enabling seamless connection of your account using GraphQL API without sharing credentials.",
      "• Implemented an automated notification system with email and browser push notifications (Web Push API/VAPID), scheduled via cron jobs, with timezone-aware delivery management.",
      "• Architected a scalable backend with tRPC type-safe API routes, server-side rendering, scheduled cron jobs for daily reminders, and a subscription-based billing system with free trial management, deployed to production.",
    ],
  },
  {
    title: "PeakMark",
    techStack:
      "(Next.js, React Query, Turbo Repo, S3, Vercel Deployment, tRPC, TypeScript)",
    points: [
      "• Built a web application for creating and exporting SVG badges for Project Showcase and READMEs using Next.js 16, tRPC, and TypeScript. Features include a real-time preview, 6+ badge presets, and a dynamic icon picker.",
      "• Created a high-performance monorepo with Turborepo, incorporating an isolated API layer, database, and shared packages. Used tRPC for type-safe communication and optimized the build pipeline. Deployed on Vercel with analytics.",
      "• Implemented query-based badge generation for shareable URLs and one-click exports, allowing segment-level customization. Developed a preset gallery for rapid iteration.",
    ],
  },
  {
    title: "SVG Preview (vs-code/cursor extension)",
    techStack: "(TypeScript, VS Code API)",
    points: [
      "• Built SVG Preview, a browser-based tool to instantly render and inspect SVG files directly from local uploads or pasted SVG code, improving designer–developer collaboration.",
      "• Implemented a responsive, minimal UI with live preview so developers can quickly iterate on SVG icons, logos, and illustrations without opening heavy design tools.",
      "• Published SVG Preview as a VS Code extension on the official Marketplace and Cursor extension directory, enabling millions of developers to instantly render and inspect SVGs within their IDE.",
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
