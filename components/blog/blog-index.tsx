import BlogItem from '@/components/blog/blog-item';
import BlogFolderItem from '@/components/blog/blog-folder-item';
import { getAllPosts } from '@/lib/mdx';

// Series folders shown at the top of /blog, in reading order.
const SERIES = [
  { slug: 'shopify', name: 'shopify' },
  { slug: 'devops', name: 'devops' },
  { slug: 'monitoring', name: 'monitoring' },
];

export default async function BlogIndex() {
  const posts = await getAllPosts();

  const folders = SERIES.map((s) => ({
    ...s,
    count: posts.filter((p) => p.slug.startsWith(`${s.slug}/`)).length,
  })).filter((f) => f.count > 0);

  // Standalone posts: anything not living inside a series folder.
  const loose = posts.filter((p) => !p.slug.includes('/'));

  return (
    <div className="m-auto flex flex-col gap-6">
      <ul className="flex flex-col gap-1">
        {folders.map((f, index) => (
          <li
            key={f.slug}
            className="animate-[slideFadeUp_0.6s_ease-out]"
            style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'both' }}
          >
            <BlogFolderItem slug={f.slug} name={f.name} count={f.count} href={`/blog/${f.slug}`} />
          </li>
        ))}
      </ul>

      {loose.length > 0 && (
        <ul className="flex flex-col gap-1">
          {loose.map((post, index) => (
            <li
              key={post.slug}
              className="animate-[slideFadeUp_0.6s_ease-out]"
              style={{
                animationDelay: `${(folders.length + index + 1) * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <BlogItem title={post.title} date={post.date} slug={post.slug} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
