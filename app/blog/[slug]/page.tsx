import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/mdx"
import { CustomMDX } from "@/components/mdx";
import BackNavigation from "@/components/back-navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug)

    if (!post) {
      return {
        title: "Post Not Found",
      }
    }

    return {
      title: `${post.title} | Aman Singh`,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} | Aman Singh`,
        description: post.excerpt,
        url: `https://www.avikmukherjee.me/blog/${slug}`,
        images: ["/og-image.jpg"],
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
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Error",
    }
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()

    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug)

    if (!post) {
      notFound()
    }

    return (
      <main className="mb-32 text-gray-900 dark:text-neutral-400">
        <div className="animate-[slideFadeUp_0.4s_ease-out]">
        <BackNavigation href="/blog">back</BackNavigation>
        </div>

        <header className="mt-6 mb-8 animate-[slideFadeUp_0.5s_ease-out]">
          <h1 className="text-gray-900 dark:text-neutral-100 text-xl font-serif font-medium mb-2 leading-tight">{post.title}</h1>
          <p className="text-gray-500 dark:text-neutral-500 text-sm mt-2">{post.date}</p>
        </header>

        <article className="prose prose-neutral max-w-none dark:prose-invert blog-content">
          <CustomMDX source={post.content} />
        </article>
      </main>
    )
  } catch (error) {
    console.error("Error in blog post page:", error)
    return (
      <main className="mb-32 text-gray-900 dark:text-neutral-400">
        <BackNavigation href="/blog">back</BackNavigation>
        <h1 className="text-gray-900 dark:text-neutral-100 text-xl font-medium mb-2">Error</h1>
        <p>There was an error loading this blog post. Please try again later.</p>
      </main>
    )
  }
}

