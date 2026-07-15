import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type NavPost = {
  slug: string;
  title: string;
} | null;

function NavCard({
  post,
  direction,
}: {
  post: NavPost;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  const label = isNext ? "Read next" : "Read previous";

  if (!post) {
    // Empty placeholder keeps the other card aligned to its side.
    return <div className="hidden sm:block flex-1" aria-hidden />;
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex-1 rounded-xl border p-4 transition-colors",
        "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
        "dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-900",
        isNext ? "text-right" : "text-left",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-xs text-gray-500 dark:text-neutral-500",
          isNext && "justify-end",
        )}
      >
        {!isNext && <ArrowLeft className="h-3.5 w-3.5" />}
        {label}
        {isNext && <ArrowRight className="h-3.5 w-3.5" />}
      </span>
      <span className="mt-1.5 block text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
        {post.title}
      </span>
    </Link>
  );
}

export default function BlogPostNav({
  prev,
  next,
}: {
  prev: NavPost;
  next: NavPost;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="More posts"
      className="mt-16 flex flex-col gap-3 border-t border-gray-200 pt-8 sm:flex-row dark:border-neutral-800"
    >
      <NavCard post={prev} direction="prev" />
      <NavCard post={next} direction="next" />
    </nav>
  );
}
