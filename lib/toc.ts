export type TocItem = {
  level: number;
  text: string;
  id: string;
};

// Must stay identical to the heading slugify used in components/mdx.tsx so the
// TOC anchor links resolve to the rendered heading ids.
export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with and
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

// Parse markdown headings (## .. ####) out of raw MDX, skipping fenced code
// blocks so shell comments like `# do a thing` aren't mistaken for headings.
export function extractToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  let inFence = false;

  for (const rawLine of content.split("\n")) {
    const line = rawLine;
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,4})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim();
    items.push({ level, text, id: slugify(text) });
  }

  return items;
}
