import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/mdx";
import { extractToc } from "@/lib/toc";
import { CustomMDX } from "@/components/mdx";
import BackNavigation from "@/components/back-navigation";
import BlogReactions from "@/components/blog/blog-reactions";
import BlogToc from "@/components/blog/blog-toc";
import BlogPostNav from "@/components/blog/blog-post-nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  try {
    const slugPath = slug.join("/");
    const post = await getPostBySlug(slugPath);

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    return {
      title: `${post.title} | Aman Singh`,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} | Aman Singh`,
        description: post.excerpt,
        url: `https://singhaman.me/blog/${slugPath}`,
        images: ["/og-image.webp"],
        siteName: "Aman Singh",
        locale: "en_US",
        type: "article",
      },
      twitter: {
        title: `${post.title} | Aman Singh`,
        card: "summary_large_image",
        images: ["/og-image.jpg"],
        description: post.excerpt,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();

    return posts.map((post) => ({
      slug: post.slug.split("/"),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  try {
    const slugPath = slug.join("/");
    const post = await getPostBySlug(slugPath);

    if (!post) {
      notFound();
    }

    const toc = extractToc(post.content);
    const { prev, next } = await getAdjacentPosts(slugPath);

    return (
      <main className="mb-32 text-gray-900 dark:text-neutral-400">
        <BlogToc items={toc} title={post.title} />

        <BackNavigation href="/blog">back</BackNavigation>

        <header className="mt-6 mb-8">
          <h1 className="text-gray-900 dark:text-neutral-100 text-xl font-medium mb-2">
            {post.title}
          </h1>
          <p className="text-gray-500 dark:text-neutral-500 text-sm">
            {post.date}
          </p>
        </header>

        <article className="prose prose-neutral max-w-none dark:prose-invert">
          <CustomMDX source={post.content} />
        </article>

        <BlogReactions slug={slugPath} />

        <BlogPostNav prev={prev} next={next} />
      </main>
    );
  } catch (error) {
    console.error("Error in blog post page:", error);
    return (
      <main className="mb-32 text-gray-900 dark:text-neutral-400">
        <BackNavigation href="/blog">back</BackNavigation>
        <h1 className="text-gray-900 dark:text-neutral-100 text-xl font-medium mb-2">
          Error
        </h1>
        <p>
          There was an error loading this blog post. Please try again later.
        </p>
      </main>
    );
  }
}
