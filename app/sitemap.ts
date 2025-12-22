import { getAllPosts } from "@/lib/mdx";
import type { MetadataRoute } from "next";

// Use the deployed site origin so sitemap URLs match the host serving the file
export const baseUrl = "https://www.useraman.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogs = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const routes = ["", "/blog", "/projects", "/experience", "/resume", "/rss", "/about", "/vcard"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogs];
}
