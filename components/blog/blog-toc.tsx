"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PreviewRail, type PreviewRailItem } from "@/components/motion/preview-rail";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/toc";

function ProgressRing({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, value)));

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-20"
      />
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 12 12)"
        className="transition-[stroke-dashoffset] duration-200 ease-out"
      />
    </svg>
  );
}

export default function BlogToc({
  items,
  title,
}: {
  items: TocItem[];
  title: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const lastScrollY = useRef(0);
  const reduce = useReducedMotion();

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

      const y = window.scrollY;
      if (y !== lastScrollY.current) {
        setDirection(y > lastScrollY.current ? 1 : -1);
        lastScrollY.current = y;
      }

      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const activeItem = items.find((item) => item.id === activeId);
  const activeLabel = activeItem?.text ?? title;

  // Slide the label with the page: scrolling down flows the title upward,
  // scrolling up brings it back down.
  const labelVariants = reduce
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (dir: number) => ({ y: dir === 1 ? 16 : -16 }),
        center: { y: 0 },
        exit: (dir: number) => ({ y: dir === 1 ? -16 : 16 }),
      };

  if (!items.length) return null;

  return (
    <>
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

      <button
        type="button"
        aria-label="Close table of contents"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={cn(
          "xl:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ease-out motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div className="xl:hidden fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-3">
        <div className="relative w-full max-w-md">
          <div
            id="mobile-toc-panel"
            aria-hidden={!open}
            inert={!open}
            className={cn(
              "absolute bottom-full mb-2 max-h-[60vh] w-full overflow-y-auto rounded-3xl border p-5 shadow-2xl",
              "border-gray-200 bg-white text-neutral-600",
              "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300",
              "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0",
            )}
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
              Table of Contents
            </p>
            <ul className="space-y-1">
              {items.map((item) => {
                const active = item.id === activeId;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active ? "location" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-lg py-1.5 text-[13px] leading-snug transition-colors",
                        item.level >= 4
                          ? "pl-10"
                          : item.level === 3
                            ? "pl-6"
                            : "pl-0",
                        active
                          ? "font-medium text-neutral-900 dark:text-neutral-100"
                          : item.level >= 3
                            ? "text-neutral-500 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300"
                            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100",
                      )}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-toc-panel"
            className={cn(
              "flex w-full items-center gap-3 rounded-full px-5 py-3 text-left shadow-xl transition-transform active:scale-[0.99]",
              "bg-neutral-900 text-neutral-100 dark:bg-neutral-950",
            )}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500"
            />
            <span className="relative block flex-1 overflow-hidden text-[13px]">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.span
                  key={activeItem?.id ?? "__fallback"}
                  custom={direction}
                  variants={labelVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.45, ease: EASE_OUT }
                  }
                  className="block truncate"
                >
                  {activeLabel}
                </motion.span>
              </AnimatePresence>
            </span>
            <ProgressRing
              value={progress}
              className="h-5 w-5 shrink-0 text-neutral-100"
            />
          </button>
        </div>
      </div>
    </>
  );
}
