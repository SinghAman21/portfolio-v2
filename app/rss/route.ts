import { getAllPosts } from "@/lib/mdx";
import type { Post } from "@/lib/mdx";
import { Experience, projects } from "@/lib/data";

function toRfc822Date(dateString: string): string {
  // Try native parse first
  let parsed = new Date(dateString);
  if (isNaN(parsed.getTime())) {
    // Fix common misspelling in content: "Feburary" -> "February"
    // why not just parse the correct month instead?
    const fixed = dateString.replace(/Feburary/gi, "February");
    parsed = new Date(fixed);
  }
  if (isNaN(parsed.getTime())) {
    // Fallback to now if still invalid
    parsed = new Date();
  }
  return parsed.toUTCString();
}

function escapeCdata(text: string): string {
  return text.replaceAll("]]>", "]]&gt;");
}

function getYearDate(value: string | undefined): string {
  if (!value) return new Date().toUTCString();
  const match = value.match(/(\d{4})/);
  if (match) {
    return new Date(parseInt(match[1], 10), 0, 1).toUTCString();
  }
  return new Date().toUTCString();
}

function generateRSSFeed(posts: Post[], blogUrl: string, portfolioUrl: string): string {
  const blogItems = posts
    .map((post) => {
      const postUrl = `${blogUrl}/${post.slug}`;
      const title = escapeCdata(post.title ?? "Untitled");
      const description = escapeCdata(post.excerpt ?? "");
      const pubDate = toRfc822Date(post.date ?? "");

      return `
        <item>
            <title><![CDATA[${title}]]></title>
            <link>${postUrl}</link>
            <guid>${postUrl}</guid>
            <pubDate>${pubDate}</pubDate>
            <description><![CDATA[<p>${description}</p>]]></description>
        </item>`;
    })
    .join("");

  const portfolioHost = new URL(portfolioUrl).host;

  const projectItems = projects
    .map((project) => {
      const linkHost = project.demoUrl ? new URL(project.demoUrl).host : "";
      // Keep links on the same host as the portfolio to avoid sitemap/RSS host mismatch errors
      const link =
        linkHost && linkHost === portfolioHost
          ? project.demoUrl!
          : `${portfolioUrl}/projects`;
      const title = escapeCdata(project.title ?? "Untitled project");
      const description = escapeCdata(project.description ?? "");
      const pubDate = getYearDate(project.year);

      return `
        <item>
            <title><![CDATA[${title}]]></title>
            <link>${link}</link>
            <guid>${link}</guid>
            <pubDate>${pubDate}</pubDate>
            <description><![CDATA[<p>${description}</p>]]></description>
        </item>`;
    })
    .join("");

  const experienceItems = Experience.map((exp) => {
    const linkHost = exp.companySite ? new URL(exp.companySite).host : "";
    const link =
      linkHost && linkHost === portfolioHost
        ? exp.companySite!
        : `${portfolioUrl}/experience`;
    const title = escapeCdata(`${exp.title} at ${exp.company}`);
    const description = escapeCdata(Array.isArray(exp.description) ? exp.description.join(" ") : exp.description ?? "");
    const pubDate = getYearDate(exp.year);

    return `
        <item>
            <title><![CDATA[${title}]]></title>
            <link>${link}</link>
            <guid>${link}</guid>
            <pubDate>${pubDate}</pubDate>
            <description><![CDATA[<p>${description}</p>]]></description>
        </item>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[Aman Singh – Portfolio Feed]]></title>
    <link>${portfolioUrl}</link>
    <description><![CDATA[Projects, blog posts, and updates from Aman Singh.]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${projectItems}
    ${experienceItems}
    ${blogItems}
  </channel>
</rss>`;
}

const baseUrl = "https://useraman.me";

export const GET = async () => {
  const posts = await getAllPosts();
  const blogUrl = `${baseUrl}/blog`;
  const rss = generateRSSFeed(posts, blogUrl, baseUrl);

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
};
