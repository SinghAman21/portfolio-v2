import { getAllPosts } from "@/lib/mdx";
import { experiments } from "@/lib/experiments-data";

const baseUrl = "https://useraman.me";

export const dynamic = "force-static";

export async function GET() {
  const allPosts = await getAllPosts();

  const content = `# useraman.me

> A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as a Software Engineer.

- [About](${baseUrl}/about.md): A quick intro to me, my tech stack, and how to connect.
- [Experience](${baseUrl}/experience.md): Highlights from my career and key roles I've taken on.
- [Projects](${baseUrl}/projects.md): Selected projects that show my skills and creativity.

## Experiments

${experiments.map((item) => `- [${item.title}](${baseUrl}/experiments/${item.slug}.md): ${item.description}`).join("\n")}

## Blog

${allPosts.map((item) => `- [${item.title}](${baseUrl}/blog/${item.slug}.mdx): ${item.excerpt}`).join("\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}