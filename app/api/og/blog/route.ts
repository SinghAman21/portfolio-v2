import { notFound } from "next/navigation";

import { getPostBySlug } from "@/lib/mdx";
import { createBlogsOgImage } from "@/lib/blog-og-image";

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

  return createBlogsOgImage({
    title: post.title,
    subtitle: "",
    footer: "technical notes and build logs",
  });
}
