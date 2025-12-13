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
    company: "Vercel (V0)",
    title: "V0 Ambassador",
    location: "Remote",
    period: "December 2025-Present",
    points: [
      "• Represent v0 in the community and engage with developers to showcase AI-powered application development.",
      "• Contribute to improving the Platform Experience for users by providing feedback and suggestions on new features.",
      "• Help other developers by answering their questions and providing guidance on building applications with v0.",
    ],
  },
  {
    company: "SuperAlign AI",
    title: "Software Engineer",
    location: "Hyderabad",
    period: "August 2025-Present",
    points: [
      "• Built a Chrome Extension to capture and analyze user interactions with multiple AI platforms (e.g., ChatGPT, Claude, Gemini, Perplexity).",
      "• Implemented real-time request interception and blocking, preventing sensitive data from being sent and alerting users through custom popups.",
      "• Collaborated across frontend, backend, and security teams to integrate captured insights into analytics workflows and improve monitoring accuracy.",
    ],
  },
  {
    company: "SuperAlign AI",
    title: "Software Engineer Intern",
    location: "Remote",
    period: "April 2025-August 2025",
    points: [
      "• Developed responsive frontend interfaces using Next.js, ensuring high design fidelity and performance.",
      "• Built a scalable backend with HonoJS and DrizzleORM, enabling structured API routes and efficient database interactions.",
      "• Built a Python WebScrapper using Craw4AI for scrapping web pages and converting them in a markdown report.",
    ],
  },
  {
    company: "DataFoundry AI",
    title: "Trainee Engineer",
    location: "Remote",
    period: "Sept 2024 – March 2025",
    points: [
      "• Created a JavaScript script that allows automatic conversion of CSV data into RDF triples along with nodes.",
      "• Implemented Azure Data Factory pipelines to dynamically process data from the Database, implementing parameterized queries, Azure Blob Storage and real-time monitoring to ensure efficient workflows.",
      "• Worked with the Frontend team where my responsibility was to implement Role-Based-Access-Control (RBAC) by designing frontend-logic for access management.",
    ],
  },
  {
    company: "Dank",
    title: "Mobile Developer Intern",
    location: "Remote",
    period: "Nov 2023 – Feb 2024",
    points: [
      "• Led the development of core features using React Native with Expo accounting for over 60% of the application, and significantly improving its functionality and performance metrics.",
      "• Collaborated with cross-functional teams to integrate new API's, reducing application page load times by 40% and enhancing overall application performance.",
    ],
  },
  {
    company: "Auctopus Technology",
    title: "Frontend Developer Intern",
    location: "Remote",
    period: "June 2023 – Aug 2023",
    points: [
      "• Implemented Redux state management which resulted in 20% increase in application efficiency.",
      "• Collaborated with cross-functional teams to integrate new API's, reducing application page load times by 40% and enhancing overall application performance.",
      "• Implemented Cypress for automated application testing resulting in 50% reduction in manual testing, thus improving reliability.",
    ],
  },
];

export const resumeProjects: ProjectItem[] = [
  {
    title: "ARCHFLOW",
    techStack: "(Next.js, TypeScript, Tailwind CSS, Zustand, Liveblocks, React Flow, AI SDK, Groq)",
    points: [
      "• Built a privacy-first visual workspace for designing, simulating, and sharing system architectures with drag-and-drop cloud components and real-time collaboration.",
      "• Implemented local-first storage with Zustand, enabling diagrams and simulation data to run entirely in the browser without external servers.",
      "• Integrated Liveblocks for real-time collaboration with shared cursors, presence, and AI assistant with Create and Understand modes. Selected as Staff Picked Project of the Day on Peerlist.",
    ],
  },
  {
    title: "SNIPPET",
    techStack: "(Next.js, TypeScript, Tailwind CSS, Prism React Renderer, Puppeteer, html2canvas-pro, MediaRecorder API)",
    points: [
      "• Developed a minimalist tool for creating beautiful screenshots of code, images, and websites with syntax highlighting, custom themes, and flexible styling options.",
      "• Built an image editor with animation timeline support, enabling users to add smooth animations and export as PNG images or WebM videos.",
      "• Implemented Puppeteer integration for high-quality website screenshots and integrated MediaRecorder API for video export functionality. Featured in top 5 projects on Peerlist.",
    ],
  },
  {
    title: "GIT WRAPPED",
    techStack: "(Next.js, Remotion, GitHub API, Canvas API, v0)",
    points: [
      "• Built a personalized GitHub activity summary tool that visualizes your year in code with beautiful animated summaries, similar to Spotify Wrapped.",
      "• Integrated GitHub API to fetch user contributions, repositories, and coding statistics, then rendered them using Remotion for smooth animations.",
      "• Implemented Canvas API for dynamic visualizations and used v0 for rapid prototyping and development.",
    ],
  },
  {
    title: "FROMCRAFTAI",
    techStack: "(NextJS, TailwindCSS, Zustand, TanstackQuery, Clerk, MongoDB, Gemini, Polar)",
    points: [
      "• Built a scalable and responsive SaaS application with Next.js, React, TypeScript, Drizzle ORM, and Tailwind CSS, featuring AI-powered form generation and a drag-and-drop builder, used by 30+ users.",
      "• Implemented Clerk auth and Polar billing with secure routes, subscriptions, portals, and webhook syncing.",
      "• Built a scalable and responsive web application with Drizzle ORM, Tailwind CSS, and dynamic AI-based form generation used by 50 users.",
    ],
  },
  {
    title: "WEBTRACKER",
    techStack: "(NextJS, Postgres, DrizzleORM, Tracking Script, Recharts)",
    points: [
      "• Built a privacy-focused web analytics platform providing device analytics, traffic source analysis, and performance metrics.",
      "• Designed and implemented an intuitive dashboard with live charts and global audience visualizations using Recharts.",
      "• Built a lightweight custom tracking script for seamless integration across JavaScript and Next.js projects, optimizing performance and preserving user privacy used by 40+ users.",
    ],
  },
  {
    title: "Pulse Ping",
    techStack: "(NextJS, Go, PostgreSQL, Redis, Resend, Google OAuth)",
    points: [
      "• Developed a full-stack server monitoring platform with a Next.js frontend and Go backend, featuring Google OAuth authentication and JWT-based secure sessions.",
      "• Implemented real-time server health checks (every 5 minutes) with Redis workers and automated email notifications via Resend for downtime alerts.",
      "• Designed a scalable backend using Gin, GORM, PostgreSQL, and Docker for containerized deployment.",
    ],
  },
];

export const technicalSkills: TechnicalSkillsData = {
  languages: "JavaScript, Python, Go",
  frameworks: "Express.js, React.js, Next.js, React Native, Redux, Vite, Playwright, Cypress, Jest, Gin",
  cloudPlatforms: "Azure, Linux, OSx",
  runtimes: "NodeJS, Bun",
  ormDatabase: "Prisma, Drizzle, Mongoose, PostgreSQL, MySQL, SQLite, MongoDB",
  tools: "Docker, Git",
  softSkills: "Leadership, Event Management, Writing, Public Speaking, Time Management",
};

export const volunteerExperience: VolunteerExperienceItem = {
  organization: "GDG MAKAUT",
  title: "Community Lead",
  location: "Remote",
  period: "2023 – 2024",
  points: [
    "• Collaborated with various teams to conduct over 10+ events, engaging over 300+ students which directly contributed to an increment in technical awareness by 30%.",
  ],
};

export const education: EducationItem = {
  institution: "MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY",
  degree: "Bachelor of Engineering",
  location: "Kalyani, WB",
  period: "2021-2025",
};
