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
    techStack: "(Next.js, TypeScript, Tailwind CSS, Prisma, Github OAuth, Shadcn UI, DodoPayments)",
    points: [
      "• Integrates with GitHub via secure OAuth, enabling seamless connection of your account using GraphQL API without sharing credentials.",
      "• Implemented an automated notification system with email (Resend API) and browser push notifications (Web Push API/VAPID), scheduled via GitHub Actions cron jobs, with timezone-aware delivery and user preference management.",
      "• Architected a scalable backend with RESTful API routes, server-side rendering, scheduled cron jobs for daily reminders, and a subscription-based billing system with free trial management, deployed to production.",
    ],
  },
  {
    title: "template-boss",
    techStack: "(JavaScript, Node.js, npm)",
    points: [
      "• Acts as a starter-kit system: you choose a template and get a preconfigured setup instead of wiring tooling from scratch",
      "• Automated boilerplate generation for JavaScript/TypeScript projects, reducing initial setup time and promoting standardized configurations across teams.",
      "• Built Template Boss, an npm-based template CLI providing production-ready JS/TS starter templates to accelerate project setup and enforce consistent tooling.",
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
