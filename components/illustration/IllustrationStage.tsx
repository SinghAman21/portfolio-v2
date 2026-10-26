"use client";

import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import type { IllustrationStyle, RendererProps } from "./types";

class ArtworkBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <div className="ie-art-fallback" role="status"><span>This renderer couldn’t load.</span><button type="button" onClick={() => window.location.reload()}>Reload artwork</button></div>;
    return this.props.children;
  }
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function IllustrationStage({ style, variant = "stage", reducedMotion = true }: { style: IllustrationStyle; variant?: RendererProps["variant"]; reducedMotion?: boolean }) {
  const Renderer = style.renderer;
  return <div className={`ie-art ie-art--${variant}`}>
    <ArtworkBoundary key={style.id}>
      <Suspense fallback={<div className="ie-art-fallback" role="status"><span className="ie-loading-mark"/>Loading {style.name.toLowerCase()}…</div>}>
        <Renderer subject="workspace" variant={variant} reducedMotion={reducedMotion}/>
      </Suspense>
    </ArtworkBoundary>
  </div>;
}

export function LazyPreview({ style }: { style: IllustrationStyle }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "240px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className="ie-preview">{visible ? <IllustrationStage style={style} variant="preview"/> : <div className="ie-preview-placeholder" aria-hidden="true">{String(style.number).padStart(2,"0")}</div>}</div>;
}
