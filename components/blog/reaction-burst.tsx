"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { ReactionType } from "@/lib/reactions";

// Each reaction gets its own "personality": palette, spread direction, shape,
// and travel distance. Kept small and tasteful to match the minimal theme.
type Shape = "dot" | "spark" | "ember" | "ray";

type BurstSpec = {
  count: number;
  colors: string[];
  mode: "up" | "radial" | "cone";
  shape: Shape;
  distance: [number, number];
  size: [number, number];
  duration: number;
  spin?: boolean;
  ring?: string; // optional expanding ring color
};

const SPECS: Record<ReactionType, BurstSpec> = {
  // 👍 gentle upward pop, cool + neutral
  like: {
    count: 8,
    colors: ["#60a5fa", "#93c5fd", "#a3a3a3"],
    mode: "cone",
    shape: "dot",
    distance: [16, 30],
    size: [3, 5],
    duration: 0.7,
    ring: "#93c5fd",
  },
  // 💡 radiating rays of light, warm yellow
  insightful: {
    count: 10,
    colors: ["#fde047", "#facc15", "#fbbf24"],
    mode: "radial",
    shape: "ray",
    distance: [14, 26],
    size: [2, 3],
    duration: 0.6,
    ring: "#fde047",
  },
  // 🔥 embers drifting up, warm reds/oranges, flickering
  fire: {
    count: 12,
    colors: ["#f97316", "#ef4444", "#fbbf24", "#dc2626"],
    mode: "up",
    shape: "ember",
    distance: [22, 42],
    size: [2, 5],
    duration: 0.9,
  },
  // 🤯 big vivid explosion in all directions, spinning stars
  mind_blown: {
    count: 16,
    colors: ["#a855f7", "#ec4899", "#22d3ee", "#facc15", "#34d399"],
    mode: "radial",
    shape: "spark",
    distance: [26, 48],
    size: [3, 6],
    duration: 0.8,
    spin: true,
    ring: "#c084fc",
  },
  // 🔖 calm, satisfying settle in teal/green with a soft ring
  bookmarked: {
    count: 8,
    colors: ["#2dd4bf", "#10b981", "#5eead4"],
    mode: "cone",
    shape: "dot",
    distance: [14, 26],
    size: [3, 5],
    duration: 0.7,
    ring: "#5eead4",
  },
};

type Particle = {
  dx: number;
  dy: number;
  color: string;
  size: number;
  shape: Shape;
  rotate: number;
};

function makeParticles(spec: BurstSpec): Particle[] {
  const rand = (min: number, max: number) => min + Math.random() * (max - min);
  return Array.from({ length: spec.count }, (_, i) => {
    const dist = rand(spec.distance[0], spec.distance[1]);
    let angle: number;
    if (spec.mode === "radial") {
      angle = (i / spec.count) * Math.PI * 2 + rand(-0.3, 0.3);
    } else if (spec.mode === "up") {
      // mostly upward, slight spread
      angle = -Math.PI / 2 + rand(-0.7, 0.7);
    } else {
      // cone: upward fan
      angle = -Math.PI / 2 + rand(-1, 1);
    }
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      color: spec.colors[Math.floor(Math.random() * spec.colors.length)],
      size: rand(spec.size[0], spec.size[1]),
      shape: spec.shape,
      rotate: spec.spin ? rand(90, 360) : 0,
    };
  });
}

function shapeStyle(p: Particle): React.CSSProperties {
  switch (p.shape) {
    case "ray":
      return {
        width: 1.5,
        height: p.size * 3,
        background: p.color,
        borderRadius: 1,
      };
    case "ember":
      return {
        width: p.size,
        height: p.size,
        background: p.color,
        borderRadius: "50%",
        boxShadow: `0 0 ${p.size}px ${p.color}`,
      };
    case "spark":
      return {
        width: p.size,
        height: p.size,
        background: p.color,
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      };
    default:
      return {
        width: p.size,
        height: p.size,
        background: p.color,
        borderRadius: "50%",
      };
  }
}

/**
 * Renders a one-shot particle burst centered on its parent (which must be
 * `position: relative`). Fires whenever `triggerKey` increments.
 */
export default function ReactionBurst({
  type,
  triggerKey,
}: {
  type: ReactionType;
  triggerKey: number;
}) {
  const spec = SPECS[type];
  const [bursts, setBursts] = useState<{ id: number; particles: Particle[] }[]>(
    []
  );
  const prev = useRef(0);

  useEffect(() => {
    if (triggerKey === prev.current || triggerKey === 0) {
      prev.current = triggerKey;
      return;
    }
    prev.current = triggerKey;

    // Respect reduced-motion preference.
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const id = triggerKey;
    setBursts((b) => [...b, { id, particles: makeParticles(spec) }]);
    const t = setTimeout(
      () => setBursts((b) => b.filter((x) => x.id !== id)),
      spec.duration * 1000 + 150
    );
    return () => clearTimeout(t);
  }, [triggerKey, spec]);

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-50 h-0 w-0"
    >
      {bursts.map((burst) => (
        <span key={burst.id}>
          {spec.ring && (
            <motion.span
              className="absolute rounded-full"
              style={{
                left: 0,
                top: 0,
                width: 14,
                height: 14,
                marginLeft: -7,
                marginTop: -7,
                border: `1.5px solid ${spec.ring}`,
              }}
              initial={{ scale: 0.3, opacity: 0.7 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: spec.duration * 0.7, ease: "easeOut" }}
            />
          )}
          {burst.particles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{ left: 0, top: 0, ...shapeStyle(p) }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{
                x: p.dx,
                y: p.dy,
                opacity: 0,
                scale: 0.4,
                rotate: p.rotate,
              }}
              transition={{ duration: spec.duration, ease: "easeOut" }}
            />
          ))}
        </span>
      ))}
    </span>
  );
}
