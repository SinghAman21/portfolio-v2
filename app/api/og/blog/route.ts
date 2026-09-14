import { notFound } from "next/navigation";

import { getPostBySlug } from "@/lib/mdx";
import { createPortfolioOgImage } from "@/lib/og-image";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return createPortfolioOgImage({
    title: post.title,
    // subtitle: "Aman Singh · Blog",
    footer: "technical notes and build logs",
  });
}
