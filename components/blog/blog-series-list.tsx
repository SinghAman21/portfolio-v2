import BlogItem from '@/components/blog/blog-item';
import { getAllPosts } from '@/lib/mdx';

interface Props {
  category: string;
}

// Pull the leading number out of a slug like "shopify/5-custom-..." so the
// series reads in author-intended order (1 → N) rather than newest-first.
function seriesIndex(slug: string): number {
  const leaf = slug.split('/')[1] ?? '';
  const n = parseInt(leaf, 10);
  return Number.isNaN(n) ? Number.MAX_SAFE_INTEGER : n;
}

export default async function BlogSeriesList({ category }: Props) {
  const posts = await getAllPosts();
  const seriesPosts = posts
    .filter((post) => post.slug.startsWith(`${category}/`))
    .sort((a, b) => seriesIndex(a.slug) - seriesIndex(b.slug));

  return (
    <ul className="m-auto flex flex-col gap-1">
      {seriesPosts.map((post, index) => (
        <li
          key={post.slug}
          className="animate-[slideFadeUp_0.6s_ease-out]"
          style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'both' }}
        >
          <BlogItem title={post.title} date={post.date} slug={post.slug} />
        </li>
      ))}
    </ul>
  );
}
