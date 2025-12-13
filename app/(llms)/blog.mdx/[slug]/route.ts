import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Return the MDX content as-is for LLM consumption
  return new Response(post.content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}