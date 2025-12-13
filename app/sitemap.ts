import { getAllPosts } from "@/lib/mdx";
import { getAllExperimentSlugs } from "@/lib/experiments-data";
import type { MetadataRoute } from "next";

// Use the deployed site origin so sitemap URLs match the host serving the file
export const baseUrl = "https://avikmukherjee.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const experimentSlugs = getAllExperimentSlugs();

  const blogs = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const experiments = experimentSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/experiments/${slug}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/experiments/${slug}.md`,
      lastModified: new Date(),
    },
  ]);

  const routes = ["", "/blog", "/projects", "/experience", "/experiments", "/resume", "/rss", "/about", "/vcard"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogs, ...experiments];
}
