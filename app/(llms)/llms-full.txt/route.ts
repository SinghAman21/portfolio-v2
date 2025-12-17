import { getAllPosts } from "@/lib/mdx";
import { projects, Experience } from "@/lib/data";

const baseUrl = "https://useraman.me";
const displayName = "Aman Singh";

const aboutText = `## About

I’ve always been curious about how technology works and love taking things apart to understand what’s happening behind the scenes. That curiosity led me to programming during my junior college years, where I started experimenting with PHP and JavaScript and quickly got hooked on development.

Previously shipped features at EaslegalPartners, GDG, and other startups. I enjoy working in different environments — from intimate 3-person teams to larger organizations — and take pride in delivering quality software that makes a difference.

Currently exploring new domains in technology while staying focused on building user-friendly applications that address real-world problems.

### Personal Information

- Name: Aman Singh
- Display Name: ${displayName}
- Website: ${baseUrl}

### Social Links

- [GitHub](https://github.com/SinghAman21)
- [Twitter/X](https://x.com/useraman21)
- [LinkedIn](https://www.linkedin.com/in/aman-singh21)
- [Peerlist](https://peerlist.io/singhaman21)

### Tech Stack

- Next.js
- React
- TypeScript
- Node.js
- Tailwind CSS
- Go
- Python
- AWS
`;

const experienceText = `## Experience

${Experience.map((item) => {
  const companyLink = item.companySite ? `[${item.company}](${item.companySite})` : item.company;
  const description = item.description ? `\n\n${item.description.map((desc) => `- ${desc}`).join("\n")}` : "";
  return `### ${item.title} | ${companyLink}\n\nDuration: ${item.year}${description}`;
}).join("\n\n")}
`;

const projectsText = `## Projects

${projects.map((item) => {
  const demoUrl = item.demoUrl ? `\n\nDemo URL: ${item.demoUrl}` : "";
  const githubUrl = item.githubUrl ? `\n\nGitHub URL: ${item.githubUrl}` : "";
  const description = item.description ? `\n\n${item.description.trim()}` : "";
  return `### ${item.title} (${item.year})${demoUrl}${githubUrl}${description}`;
}).join("\n\n")}
`;

async function getBlogContent() {
  const allPosts = await getAllPosts();
  const text = await Promise.all(
    allPosts.map(
      async (item) => {
        const dateStr = item.date ? new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Unknown";
        return `---\ntitle: "${item.title}"\ndescription: "${item.excerpt}"\nlast_updated: "${dateStr}"\nsource: "${baseUrl}/blog/${item.slug}"\n---\n\n${item.content}`;
      }
    )
  );
  return text.join("\n\n");
}

async function getContent() {
  return `<SYSTEM>This document contains comprehensive information about ${displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${displayName}'s background, skills, and expertise as a Software Engineer.</SYSTEM>

# AmanSingh.me

> A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as a Software Engineer.

${aboutText}
${experienceText}
${projectsText}

## Blog

${await getBlogContent()}`;
}

export const dynamic = "force-static";

export async function GET() {
  return new Response(await getContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}