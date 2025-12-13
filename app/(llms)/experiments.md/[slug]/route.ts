import { notFound } from "next/navigation";
import { getAllExperimentSlugs } from "@/lib/experiments-data";
import { getExperimentMDXBySlug } from "@/lib/experiments-mdx";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = getAllExperimentSlugs();
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const experimentMDX = await getExperimentMDXBySlug(slug);

  if (!experimentMDX) {
    notFound();
  }

  // Return the MDX content as-is for LLM consumption
  return new Response(experimentMDX.content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}

