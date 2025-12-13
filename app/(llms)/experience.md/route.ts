import { Experience } from "@/lib/data";

const content = `# Experience

${Experience.map((item) => {
  const companyLink = item.companySite ? `[${item.company}](${item.companySite})` : item.company;
  const description = item.description ? `\n\n${item.description.map((desc) => `- ${desc}`).join("\n")}` : "";
  return `## ${item.title} | ${companyLink}\n\nDuration: ${item.year}${description}`;
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