"use client";

import { useEffect, useMemo, useState } from "react";
import { PreviewRail, type PreviewRailItem } from "@/components/motion/preview-rail";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/toc";

export default function BlogToc({
  items,
  title,
}: {
  items: TocItem[];
  title: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const railItems = useMemo<PreviewRailItem[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        label: item.text,
        href: `#${item.id}`,
      })),
    [items],
  );

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headings.length) return;

    // The active heading is the last one whose top has scrolled past a fixed
    // line below the header. Recomputed on scroll so it always tracks position.
    const OFFSET = 120;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = headings[0].id;

      for (const el of headings) {
        if (el.getBoundingClientRect().top - OFFSET <= 0) current = el.id;
        else break;
      }

      // Near the very bottom, force the last heading active so the final
      // section can be reached even if its top never crosses the line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = headings[headings.length - 1].id;

      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <aside
      aria-label="Table of contents"
      className="hidden xl:block fixed left-4 2xl:left-16 top-1/2 -translate-y-1/2 z-40 w-80"
    >
      <PreviewRail
        items={railItems}
        orientation="vertical"
        activeId={activeId ?? undefined}
        onActiveChange={setActiveId}
        className="min-h-0"
        renderPreview={(item) => (
          <div
            className={cn(
              "rounded-2xl border p-4 shadow-sm",
              "border-gray-200 bg-white/80 backdrop-blur",
              "dark:border-neutral-800 dark:bg-neutral-900/70",
            )}
          >
            {item.id === railItems[0]?.id ? (
              <p className="mb-1 text-[11px] uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {title}
              </p>
            ) : null}
            <p className="text-[13px] leading-snug text-gray-900 dark:text-neutral-100">
              {item.label}
            </p>
          </div>
        )}
      />
    </aside>
  );
}
