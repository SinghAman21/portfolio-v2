import Link from "next/link";

import BackNavigation from "@/components/back-navigation";

export default function BlogPostNotFound() {
  return (
    <main className="mb-32 text-gray-900 dark:text-neutral-400">
      <BackNavigation href="/blog">back</BackNavigation>

      <section className="mt-6 max-w-2xl animate-[slideFadeUp_0.4s_ease-out]">
        <p className="text-sm text-gray-500 dark:text-neutral-500">404</p>
        <h1 className="mt-2 text-gray-900 dark:text-neutral-100 text-xl font-serif font-medium leading-tight">
          Post not published yet
        </h1>
        <p className="mt-4 leading-relaxed">
          This article is probably part of a series roadmap, but it is not live
          yet. I publish posts progressively, so some planned links may point
          here until the draft is ready.
        </p>
        <p className="mt-3 leading-relaxed">
          You can go back to the blog index and pick something already
          published.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="text-gray-900 dark:text-neutral-100 underline underline-offset-4 decoration-gray-400 dark:decoration-neutral-600 hover:decoration-gray-900 dark:hover:decoration-neutral-100"
          >
            Browse published posts
          </Link>
          <Link
            href="/blog/devops"
            className="text-gray-600 dark:text-neutral-500 underline underline-offset-4 decoration-gray-300 dark:decoration-neutral-700 hover:text-gray-900 dark:hover:text-neutral-100"
          >
            View the DevOps series plan
          </Link>
        </div>
      </section>
    </main>
  );
}
