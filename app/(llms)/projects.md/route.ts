import { projects } from "@/lib/data";

const content = `# Projects

${projects.map((item) => {
  const demoUrl = item.demoUrl ? `\n\nDemo URL: ${item.demoUrl}` : "";
  const githubUrl = item.githubUrl ? `\n\nGitHub URL: ${item.githubUrl}` : "";
  const description = item.description ? `\n\n${item.description.trim()}` : "";
  return `## ${item.title} (${item.year})${demoUrl}${githubUrl}${description}`;
}).join("\n\n")}
`;

export const dynamic = "force-static";

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}