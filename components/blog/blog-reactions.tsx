"use client";

import { useEffect, useRef, useState } from "react";
import {
  ThumbsUp,
  Lightbulb,
  Flame,
  Brain,
  Bookmark,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactionBurst from "@/components/blog/reaction-burst";
import {
  REACTIONS,
  emptyCounts,
  type ReactionCounts,
  type ReactionType,
} from "@/lib/reactions";

const ICONS: Record<ReactionType, LucideIcon> = {
  like: ThumbsUp,
  insightful: Lightbulb,
  fire: Flame,
  mind_blown: Brain,
  bookmarked: Bookmark,
};

// A click is only turned into a request once per this window per reaction.
// Extra clicks inside the window are ignored so we don't spam the API.
const THROTTLE_MS = 300;

export default function BlogReactions({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<ReactionCounts>(emptyCounts());
  const [reacted, setReacted] = useState<Set<ReactionType>>(new Set());
  const [mounted, setMounted] = useState(false);
  // Per-reaction counter; bumping it fires that reaction's burst animation.
  const [bursts, setBursts] = useState<Record<ReactionType, number>>({
    like: 0,
    insightful: 0,
    fire: 0,
    mind_blown: 0,
    bookmarked: 0,
  });
  // Timestamp of the last captured click per reaction (leading-edge throttle).
  const lastFired = useRef<Partial<Record<ReactionType, number>>>({});

  // Reveal the rail right after mount so it eases in within 500ms, regardless
  // of how long the counts fetch takes.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reactions?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data || data.error) return;
        setCounts(data.counts);
        setReacted(new Set<ReactionType>(data.reacted ?? []));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function toggle(reaction: ReactionType) {
    // Throttle: capture at most one click per THROTTLE_MS window. The button
    // stays fully interactive; extra clicks in the window are simply dropped.
    const now = Date.now();
    if (now - (lastFired.current[reaction] ?? 0) < THROTTLE_MS) return;
    lastFired.current[reaction] = now;

    // Optimistic update.
    const wasActive = reacted.has(reaction);
    // Celebrate only when turning a reaction ON.
    if (!wasActive) {
      setBursts((prev) => ({ ...prev, [reaction]: prev[reaction] + 1 }));
    }
    setReacted((prev) => {
      const next = new Set(prev);
      if (wasActive) next.delete(reaction);
      else next.add(reaction);
      return next;
    });
    setCounts((prev) => ({
      ...prev,
      [reaction]: Math.max(0, prev[reaction] + (wasActive ? -1 : 1)),
    }));

    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, reaction }),
      });
      const data = await res.json();
      if (data && !data.error) {
        setCounts(data.counts);
        setReacted((prev) => {
          const next = new Set(prev);
          if (data.active) next.add(reaction);
          else next.delete(reaction);
          return next;
        });
      }
    } catch {
      // Roll back the optimistic change on failure.
      setReacted((prev) => {
        const next = new Set(prev);
        if (wasActive) next.add(reaction);
        else next.delete(reaction);
        return next;
      });
      setCounts((prev) => ({
        ...prev,
        [reaction]: Math.max(0, prev[reaction] + (wasActive ? 1 : -1)),
      }));
    }
  }

  // Keyboard shortcuts 1..5. A ref keeps the latest toggle without re-binding.
  const toggleRef = useRef(toggle);
  toggleRef.current = toggle;
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      ) {
        return;
      }
      const idx = Number(e.key);
      if (Number.isInteger(idx) && idx >= 1 && idx <= REACTIONS.length) {
        e.preventDefault();
        toggleRef.current(REACTIONS[idx - 1].type);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function row(type: ReactionType, label: string, key: number) {
    const active = reacted.has(type);
    const Icon = ICONS[type];
    return (
      <button
        key={type}
        onClick={() => toggle(type)}
        aria-pressed={active}
        aria-label={`${label} (press ${key})`}
        title={`${label} — press ${key}`}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-colors",
          active
            ? "border-gray-300 bg-gray-100 text-gray-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
        )}
      >
        <kbd
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded border font-mono text-[10px] leading-none",
            "border-gray-200 bg-gray-50 text-gray-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-500"
          )}
        >
          {key}
        </kbd>
        <span className="relative shrink-0">
          <Icon
            className={cn("h-4 w-4", active && "fill-current")}
            strokeWidth={1.75}
          />
          <ReactionBurst type={type} triggerKey={bursts[type]} />
        </span>
        <span className="flex-1 text-left text-xs">{label}</span>
        <span className="text-xs tabular-nums text-gray-400 dark:text-neutral-500">
          {counts[type]}
        </span>
      </button>
    );
  }

  function pill(type: ReactionType, label: string) {
    const active = reacted.has(type);
    const Icon = ICONS[type];
    return (
      <button
        key={type}
        onClick={() => toggle(type)}
        aria-pressed={active}
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
          active
            ? "border-gray-300 bg-gray-100 text-gray-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
        )}
      >
        <span className="relative">
          <Icon
            className={cn("h-4 w-4", active && "fill-current")}
            strokeWidth={1.75}
          />
          <ReactionBurst type={type} triggerKey={bursts[type]} />
        </span>
        <span>{label}</span>
        <span className="tabular-nums text-gray-400 dark:text-neutral-500">
          {counts[type]}
        </span>
      </button>
    );
  }

  return (
    <>
      {/* Desktop: sticky labelled rail floating in the right gutter. Eases in
          within 500ms of mount. */}
      <aside
        aria-label="Reactions"
        className={cn(
          "hidden xl:flex fixed right-10 top-1/2 -translate-y-1/2 z-40 w-44 flex-col gap-1.5",
          "transition-all duration-500 ease-out",
          mounted ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
        )}
      >
        {REACTIONS.map(({ type, label }, i) => row(type, label, i + 1))}
      </aside>

      {/* Mobile / narrow screens: inline labelled pills under the article. */}
      <div className="xl:hidden mt-16 pt-8 border-t border-gray-200 dark:border-neutral-800">
        <p className="text-xs text-gray-500 dark:text-neutral-500 mb-3">
          Found this useful?
        </p>
        <div className="flex flex-wrap gap-2">
          {REACTIONS.map(({ type, label }) => pill(type, label))}
        </div>
      </div>
    </>
  );
}
