import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseURL = "https://www.useraman.me";
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/blog", "/projects", "/experience", "/resume", "/rss", "/about"],
            disallow: [],
        },
        sitemap: `${baseURL}/sitemap.xml`
    }
}