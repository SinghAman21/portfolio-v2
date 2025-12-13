---
title: "Animated Counter"
description: "A smooth animated number counter with spring physics. Perfect for dashboards, stats displays, and gamification elements."
year: "2025"
---

# Animated Counter

A smooth animated number counter with spring physics. Perfect for dashboards, stats displays, and gamification elements.

## Features

- Spring-based animation physics
- Customizable duration and easing
- Supports formatting (commas, decimals)
- Accessible with reduced motion support

## Dependencies

motion

## Component Code

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  formatOptions?: Intl.NumberFormatOptions;
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  className = "",
  formatOptions = {},
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    new Intl.NumberFormat("en-US", formatOptions).format(Math.round(latest))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          springValue.set(value);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, isInView, springValue]);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [value, isInView, springValue]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}


```


