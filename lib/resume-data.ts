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
      "• Developed production-grade code and a user-friendly interface to enhance user experience",
      "• Designed a robust RESTful API with Express and Prisma ORM, handling complex data relationships for user authentication, document management, and organization workflows.",
      "• Deployed the application on AWS using nginx , EC2 instances, and S3 buckets for optimized performance and scalability.",
    ],
  },
];

export const resumeProjects: ProjectItem[] = [
  {
    title: "SilentParcel",
    techStack: "(Next.js, TypeScript, Tailwind CSS, Shadcn UI, Github Actions, Supabase, Appwrite)",
    points: [
      "• Built a end-to-end encrypted file sharing application that disappears without a trace.",
      "• Implements AES-256 end-to-end encryption for files and chats, ensuring military-grade security without registration.",
      "• Offers ephemeral anonymous chat rooms with real-time messaging, collaborative code editing, and WebRTC support for up to 10+ languages. Selected as Staff Picked Project of the Day on Peerlist.",
    ],
  },
  {
    title: "Graphex",
    techStack: "(Next.js, TypeScript, Tailwind CSS, tRPC, Prisma, Github OAuth, Shadcn UI, DodoPayments)",
    points: [
      "• Integrates with GitHub via secure OAuth, enabling seamless connection of your account using GraphQL API without sharing credentials.",
      "• Implemented an automated notification system with email (Resend API) and browser push notifications (Web Push API/VAPID), scheduled via GitHub Actions cron jobs, with timezone-aware delivery and user preference management.",
      "• Architected a scalable backend with RESTful API routes, server-side rendering, scheduled cron jobs for daily reminders, and a subscription-based billing system with free trial management, deployed to production.",
    ],
  },
  {
    title: "PeakMark",
    techStack: "(Next.js, Node.js, React Query, Turbo Repo, S3)",
    points: [
      "• Built a web application for creating and exporting SVG badges for GitHub READMEs using Next.js 16, tRPC, and TypeScript. Features include a real-time preview, 6+ badge presets, and a dynamic icon picker.",
      "• Created a high-performance monorepo with Turborepo, incorporating an isolated API layer, database, and shared packages. Used tRPC for type-safe communication and optimized the build pipeline. Deployed on Vercel with analytics.",
      "• Implemented query-based badge generation for shareable URLs and one-click exports, allowing segment-level customization. Developed a preset gallery for rapid iteration and dynamic SVG rendering with custom colors, icons, and text positioning.",
    ],
  },
  {
    title: "SVG Preview (vs-code/cursor extension)",
    techStack: "(TypeScript, vs-code api)",
    points: [
      "• Built SVG Preview, a browser-based tool to instantly render and inspect SVG files directly from local uploads or pasted SVG code, improving designer–developer collaboration.",
      "• Implemented a responsive, minimal UI with live preview so developers can quickly iterate on SVG icons, logos, and illustrations without opening heavy design tools.",
      "• Published SVG Preview as a VS Code extension on the official Marketplace and Cursor extension directory, enabling millions of developers to instantly render and inspect SVGs within their IDE.",
    ],
  },
];

export const technicalSkills: TechnicalSkillsData = {
  languages: "JavaScript, Python, Go",
  frameworks: "Express.js, React.js, Next.js, Vite",
  cloudPlatforms: "AWS, Linux",
  runtimes: "NodeJS, Bun, pnpm",
  ormDatabase: "Prisma, Drizzle, Mongoose, PostgreSQL, MySQL, SQLite, MongoDB",
  tools: "Docker, Git",
  softSkills: "Leadership, Collaborativity, Adaptability, Event Management, Problem Solving, Public Speaking, Time Management",
};

export const volunteerExperience: VolunteerExperienceItem = {
  organization: "GDG VIT",
  title: "OSS Lead",
  location: "Hybrid",
  period: "2025 – Present",
  points: [
    "• Collaborated with diverse teams to conduct many events and workshops where i was directly engaging students and contributing to an increment in technical awareness.",
  ],
};

export const education: EducationItem = {
  institution: "Vidyalankar Institute of Technology",
  degree: "Bachelor of Technology",
  location: "Mumbai, Maharashtra",
  period: "2023-Present",
};
