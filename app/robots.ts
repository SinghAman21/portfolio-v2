import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseURL = "https://singhaman.me";
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/blog",
        "/projects",
        "/experience",
        "/resume",
        "/rss",
        "/about",
      ],
      disallow: [],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
