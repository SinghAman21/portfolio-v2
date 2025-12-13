import BlogItem from '@/components/blog/blog-item';
import { getAllPosts } from '@/lib/mdx';

interface Props {
  length?: number;
}

export default async function BlogList({ length }: Props) {
  const posts = await getAllPosts();

  return (
    <ul className="m-auto flex flex-col gap-1">
      {posts.slice(0, length ?? posts.length).map((post, index) => (
        <li
          key={post.slug}
          className="animate-[slideFadeUp_0.6s_ease-out]"
          style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'both' }}
        >
        <BlogItem
            title={post.title}
            date={post.date}
            slug={post.slug}
        />
        </li>
      ))}
    </ul>
  );
}