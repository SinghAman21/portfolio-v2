"use client";

import { useEffect, useRef, useState } from "react";
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
  const activeRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headings.length) return;

    // Track which headings are currently on screen; the topmost one wins.
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size > 0) {
          const [topId] = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
          setActiveId(topId);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active row scrolled into view within the (scrollable) TOC card.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  if (!items.length) return null;

  const minLevel = Math.min(...items.map((i) => i.level));

  return (
    <aside
      aria-label="Table of contents"
      className="hidden xl:block fixed left-4 2xl:left-16 top-1/2 -translate-y-1/2 z-40 w-56"
    >
      <nav
        className={cn(
          "max-h-[70vh] overflow-y-auto rounded-2xl border p-5",
          "border-gray-200 bg-white/80 backdrop-blur",
          "dark:border-neutral-800 dark:bg-neutral-900/70",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <p className="mb-3 text-sm font-medium leading-snug text-blue-600 dark:text-blue-400">
          {title}
        </p>

        <ul className="space-y-2 text-[13px]">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li
                key={item.id}
                ref={active ? activeRef : null}
                style={{ paddingLeft: `${(item.level - minLevel) * 14}px` }}
              >
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "block leading-snug transition-colors",
                    active
                      ? "text-gray-900 dark:text-neutral-100"
                      : "text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-300",
                  )}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
