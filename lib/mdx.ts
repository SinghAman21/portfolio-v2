import fs from "fs"
import path from "path"
import matter from "gray-matter"


const postsDirectory = path.join(process.cwd(), "content/blog")

export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

// Recursively get all markdown files inside a directory and its subdirectories
function getAllMarkdownFiles(dir: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      getAllMarkdownFiles(fullPath, files)
    } else if (entry.isFile() && fullPath.endsWith(".mdx")) {
      files.push(fullPath)
    }
  }

  return files
}

// Remove remark-html processing since we're using MDX components
export async function getAllPosts(): Promise<Post[]> {
  const filePaths = getAllMarkdownFiles(postsDirectory)

  const allPostsData = await Promise.all(
    filePaths.map(async (fullPath) => {
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const matterResult = matter(fileContents)

      // Generate slug based on relative path from postsDirectory
      const relativePath = path.relative(postsDirectory, fullPath)
      const slug = relativePath.replace(/\.mdx$/, "").replace(/\\/g, "/")

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.publishDate,
        excerpt: matterResult.data.description || "",
        content: matterResult.content, // Keep as raw MDX content
      }
    })
  )

  // Sort by real date (latest first). The `date` values are human strings like
  // "21 Oct 2025" / "13 July 2026", so parse them instead of comparing as text.
  return allPostsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

// getAllPosts() is sorted newest -> oldest. "prev" is the older post you'd read
// next going back in time; "next" is the newer one.
export async function getAdjacentPosts(
  slug: string,
): Promise<{ prev: Post | null; next: Post | null }> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) return { prev: null, next: null };

  return {
    next: index > 0 ? posts[index - 1] : null,
    prev: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePaths = getAllMarkdownFiles(postsDirectory)
    const targetPath = filePaths.find((fullPath) => {
      const relativePath = path.relative(postsDirectory, fullPath)
      const currentSlug = relativePath.replace(/\.mdx$/, "").replace(/\\/g, "/")
      return currentSlug === slug
    })

    if (!targetPath) return null

    const fileContents = fs.readFileSync(targetPath, "utf8")
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.publishDate,
      excerpt: matterResult.data.description || "",
      content: matterResult.content, // Keep as raw MDX content
    }
  } catch (error) {
    console.error("Error getting post by slug:", error)
    return null
  }
}