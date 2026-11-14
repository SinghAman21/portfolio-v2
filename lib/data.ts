import { title } from "process";

export const projects = [
  {
    title: "Kiranachat",
    year: "2026",
    description: `> Built a WhatsApp-first, multi-shop grocery platform with a Go backend, admin dashboard, and custom payment module I designed from scratch.
> The standout feature is per-shop payment orchestration supporting manual UPI and Razorpay with encrypted credentials, signed webhooks, and audit trails.`,
    demoUrl: "https://kiranachat.vercel.app",
  },
  {
    title: "Santra",
    year: "2026",
    description: `> Built a sub-10 MB Windows and Linux desktop app with snappy file conversion and ready-to-use tools using near-zero memory.
> Owned the full product lifecycle—from idea, documentation, design, and prototyping to engineering and production delivery.
> Its a fast, privacy-first workflow that feels nearly weightless while handling real file operations locally.`,
    demoUrl: "https://santra.singhaman.me",
    githubUrl: "https://github.com/SinghAman21/santra"
  },
  {
    title: "Nabhya",
    year: "2026",
    description: `> Built Nabhya’s backend to power a trusted NGO–volunteer platform.
> Learned to turn complex product requirements into secure, scalable, and reliable backend systems.
> Created a personalized feed-ranking engine that matches volunteers with relevant opportunities in real time.`,
    demoUrl: "https://nabhya.social",
  },
  {
    title: "CI Warden",
    year: "2026",
    description: `> Built CIWarden to reduce wasted CI compute by making GitHub Actions runs observable, controllable, and priority-aware.
> I added queue controls, selective PR verification, failure analysis, and replay checks so teams spend runner time where it matters.
> The payoff: fewer redundant runs, faster feedback, and a CI system that actively fights compute waste instead of quietly funding it.`,
  },
  {
    title: "Mentionbase",
    year: "2026",
    description: `> Built MentionBase to turn scattered X posts into a searchable, structured knowledge base.
> Learned to design fault-tolerant, event-driven systems that handle retries, concurrency, and data integrity without drama.
> Simple mention becomes a durable ingestion command that resolves and routes the referenced post automatically.`,
  },
  {
    title: "Feedback Protocol",
    year: "2026",
    description: `> Built a discoverable HTTP/JSON system that turns AI-agent API failures into structured, triage-ready evidence.
> Learned to engineer protocol contracts, secure ingestion, privacy-aware scrubbing, and cautious agent behavior end to end.
> Its sharpest trick: deterministic clustering collapses noisy, differently worded failures into one signal—without pretending volume equals truth.`,
    githubUrl: "https://github.com/SinghAman21/feedback_protocol"
  },
  {
    title: "Rushout",
    year: "2026",
    description: `> Built Rushout with Colyseus: a browser-based 2D party game supporting fast, chaotic online rooms and local multiplayer.
> Learned to build authoritative real-time gameplay with 60Hz server simulation, compact input packets, client prediction, and server acknowledgements.
> The standout: remote players stay smooth through snapshot interpolation while predicted movement hides network delay across 13-player arenas.`,
    demoUrl: "https://rushout.singhaman.me",
    githubUrl: "https://github.com/SinghAman21/rushout"
  },
  {
    title: "Distributed Order System",
    year: "2026",
    description: `> Building a distributed order system to learn how real services coordinate under failure, not just happy-path demos.
> Using Kafka, an outbox, retries, idempotency, and observability to keep orders reliable across payment, inventory, and notifications.
> The goal: make every order traceable, recoverable, and production-ready when dependencies inevitably break.`,
    githubUrl: "https://github.com/SinghAman21/distributed-order-system"
  },
  {
    title: "OpenPort",
    year: "2026",
    description: `> I built for devs, a keyboard-first cockpit for inspecting and managing local ports and processes.
> I learned to turn OS-level chaos into a reliable, cross-platform workflow with safe automation and clear state.
> Its standout feature is a live terminal UI that combines port discovery, process control, aliases, blueprints, health checks, and history in one cockpit.`,
    demoUrl: "https://openport.singhaman.me",
    githubUrl: "https://github.com/SinghAman21/openport"
  },
  {
    title: "Web Analytics",
    year: "2026",
    description: `> Built a full-stack web analytics platform that turns raw website activity into clean, interactive insights.
> Learned how to design event pipelines, session tracking, visitor identity, authentication, and data-driven dashboards.
> Its unique feature is a plug-and-play tracker that creates shareable public analytics dashboards from a single site ID.`,
demoUrl: "https://pulsev0.vercel.app/",
  },
  {
    title: "PeakMark",
    year: "2026",
    description: `> A minimalist badge generator and remixer where developers can create and customize beautiful badges for their projects to grab eyes as much as possible.
> Built with better-t-stack and React Query.`,
    demoUrl: "https://peakmark.vercel.app",
    githubUrl: "https://github.com/SinghAman21/peakmark",
  },
  {
    title: "cull",
    year: "2026",
    description: `> A CLI tool to help you clean up your npm packages by removing unused dependencies from your file system.
> It analyzes your files with the regrex patterns to identify files that are not being used and removes them, helping you maintain a lean and efficient device.`,
    demoUrl: "https://www.npmjs.com/package/cull",
    githubUrl: "https://github.com/SinghAman21/cull",
  },
  {
    title: "FormFuzz",
    year: "2026",
    description: `> FormFuzz is an automated google form filler that uses AI to generate realistic responses based on the form questions.
> Built with Google App Script, Node.js, and Gemini API, it streamlines the process of filling out lengthy forms by providing accurate and contextually relevant answers or generate a dummy data for surveys.`,
    demoUrl: "https://formfuzz.vercel.app",
    githubUrl: "https://github.com/SinghAman21/formfuzz",
  },
  {
    title: "SilentParcel",
    year: "2025",
    description: `> End-to-end encrypted file sharing that disappears without a trace.
> No accounts, no tracking, no compromises.
> Written in NextJS and backed by supabase and appwrite for database and bucket storage.`,
    demoUrl: "https://silentparcel.com",
    githubUrl: "https://github.com/SinghAman21/silentparcel",
  },
  {
    title: "Graphex",
    year: "2025",
    description: `> Create your own design follow and create beautiful contribution graphs.
> Build a healthy habit of contributing daily.
> Built with NextJS, Tailwind CSS, and Github OAuth.`,
    demoUrl: "https://graphex.me",
    // githubUrl: "https://github.com/SinghAman21/",
  },

  {
    title: "template-boss",
    year: "2025",
    description: `> Bunch of ready to use templates to skip the hectic setting up dev environment.
> Scaffold your next project with a single command.
> Built with JavaScript and Node.js.`,
    demoUrl: "https://www.npmjs.com/package/template-boss",
    githubUrl: "https://github.com/SinghAman21/template-boss",
  },




];

export const Experience = [
  {
    title: "Software Engineer Intern",
    year: "Jun 2026 - July 2026",
    company: "Artifexone",
    description: [
      "Fully owned Taolatt Real Estate CRM, shipping 23 full-stack features from backend APIs to React interfaces while defining engineering standards that scaled the platform.",
      "Built a reusable React component library with shadcn/ui, React Hook Form, and Zod, supporting scalable state management, filtering, infinite scroll, and multi-select workflows.",
      "Integrated messaging and booking services, delivering WhatsApp/email workflows with deduplication, idempotent retries, and real-time calendar synchronization via webhooks.",
    ],
    companySite: "https://artifexone.com",
  },
  {
    title: "Backend Engineer Intern",
    year: "March 2026 - Jun 2026",
    company: "Actrun",
    description: [
      "Built a deterministic attachment pipeline for chat/Slack, hydrating images/PDFs/text directly into LLM context.",
      "Set up local and staging test suites, plus a dedicated Slack bot for development/testing workflows.",
      "Fixed intermittent Postgres SSL drops with retry-with-backoff logic, and resolved OAuth/WebSocket issues across X, LinkedIn, and Slack integrations.",
    ],
    companySite: "https://actrun.ai",
  },
  {
    title: "Full Stack Developer Intern",
    year: "September 2025 - December 2025",
    company: "Eas Legal Partners",
    description: [
      "Developed production-grade code and a user-friendly interface to enhance user experience",
      "Designed a robust RESTful API with Express and Prisma ORM, handling complex data relationships for user authentication, document management, and organization workflows.",
      "Deployed the application on AWS using nginx , EC2 instances, and S3 buckets for optimized performance and scalability.",
    ],
    companySite: "https://www.easlegalspartners.com",
  },
  {
    title: "Cloud Security Research Intern",
    year: "December 2025 - February 2026",
    company: "Vidyalankar Institute of Technology",
    description: [
      "Reverse-engineered vulnerable AWS infra (public RDS/S3, plaintext creds); Terraform-hardened to private subnets, ALB TLS, KMS encryption, Secrets Manager—100% attack sim mitigation.",
      "Built prod-grade Node.js+PostgreSQL AWS stack: custom IAM (prefix-specific S3/KMS), EB/RDS isolation, GuardDuty+CloudTrail logging, <5min reproducible deployments.",
      "Simulated SQLi/priv-esc attacks; validated via tf plan, CW alarms, Config rules—achieving compliant, drift-proof infrastructure.",
    ],
    companySite: "https://vit.edu.in",
  },
  {
    title: "OSS LEAD",
    year: "July 2025 – Present",
    company: "GDG",
    description: [
      "Organized workshops, hackathons and events to foster learning and growth among students.",
      "Led tech talks, mentoring sessions, and community involvement to promote knowledge exchange and strong communication skills among developers, boosting team efficiency and open-source contributions.",
      "Worked with organizations to execute events effectively.",
    ],
    companySite:
      "https://gdg.community.dev/gdg-on-campus-vidyalankar-institute-of-technology-mumbai-india/",
  },
  {
    title: "Freelance Developer",
    year: "December 2025",
    company: "Stealth Startup",
    description: [
      "Developed an MVP for an education platform in an early-stage startup, enabling streamlined user engagement and functionality.",
      "Implemented Role-Based Access Control (RBAC) to enhance security and user management for students, teachers, and administrators.",
      "Designed a comprehensive platform allowing teachers to manage classes, students to track progress, and integrated a read-only audit log to monitor all user actions.",
    ],
    companySite: "",
  },
  {
    title: "Developer",
    year: "February 2026",
    company: "Artyalps - Hand Crafts",
    description: [
      "Engineered a production-ready eCommerce web app using React, TypeScript, Vite, and Tailwind CSS, with modular component architecture and reusable UI patterns for scalable front-end development.",
      "Developed a custom e-commerce platform for a small handcrafted business, enabling seamless online sales and inventory management.",
      "Implemented media and order workflows (including custom-order image uploads, gallery handling, and admin/order modules) with Cloudinary integration and structured state/context management.",
    ],
    companySite: "https://artyalps.vercel.app/",
  },
];
