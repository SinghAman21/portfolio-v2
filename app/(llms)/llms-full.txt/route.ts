import { getAllPosts } from "@/lib/mdx";
import { projects, Experience } from "@/lib/data";
import { experiments } from "@/lib/experiments-data";
import { getAllExperimentMDX } from "@/lib/experiments-mdx";

const baseUrl = "https://useraman.me";
const displayName = "Aman Singh";

const aboutText = `## About

I started my programming journey in my 3rd year of college, beginning with Python and Java before diving deep into the JavaScript ecosystem. What began as building simple websites evolved into creating products that solve real-world problems.

Previously shipped features at DataFoundry AI, Dank, and other startups. I enjoy working in different environments — from intimate 3-person teams to larger organizations — and take pride in delivering quality software that makes a difference.

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

async function getExperimentsContent() {
  const allExperiments = await getAllExperimentMDX();
  const text = allExperiments.map((item) => {
    return `---\ntitle: "${item.title}"\ndescription: "${item.description}"\nyear: "${item.year}"\nsource: "${baseUrl}/experiments/${item.slug}.md"\n---\n\n${item.content}`;
  });
  return text.join("\n\n");
}

async function getContent() {
  return `<SYSTEM>This document contains comprehensive information about ${displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, experiments, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${displayName}'s background, skills, and expertise as a Software Engineer.</SYSTEM>

# avikmukherjee.me

> A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as a Software Engineer.

${aboutText}
${experienceText}
${projectsText}

## Experiments

${await getExperimentsContent()}

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