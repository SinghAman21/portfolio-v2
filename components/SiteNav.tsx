"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import CornerMarkers from "@/components/CornerMarkers";

const LINKS = [
  { href: "/", label: "home" },
  { href: "/experience", label: "experience" },
  { href: "/blog", label: "blog" },
  { href: "/resume", label: "resume" },
];

const IST_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function SiteNav() {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(IST_FORMATTER.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const activeHref = "/";

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 animate-[slideFadeUp_0.3s_ease-out]">
      <nav
        aria-label="Primary"
        onMouseLeave={() => setHoveredHref(null)}
        className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] sm:gap-x-5"
      >
        {LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname?.startsWith(`${link.href}/`);
          const markerActive = (hoveredHref ?? activeHref) === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setHoveredHref(link.href)}
              className={cn(
                "group relative py-0.5 transition-colors duration-200",
                active
                  ? "text-gray-900 dark:text-neutral-100"
                  : "text-gray-500 dark:text-neutral-500 hover:text-gray-900 dark:hover:text-neutral-200",
              )}
            >
              <CornerMarkers variant={markerActive ? "static" : "animated"} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <time
        className={cn(
          "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] leading-none tabular-nums",
          "sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]",
          "border-gray-200 bg-gray-100/60 text-gray-500",
          "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400",
        )}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400"
        />
        <span suppressHydrationWarning>
          {time ? `${time} ist` : "--:--:-- ist"}
        </span>
      </time>
    </div>
  );
}
