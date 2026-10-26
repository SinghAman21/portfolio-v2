import { useState } from "react";
import type { RendererProps } from "../types";

export function AssetArtwork({ src, label, ...p }: RendererProps & { src: string; label: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="ie-art-fallback" role="status"><span>Artwork couldn’t load.</span><button type="button" onClick={() => setFailed(false)}>Try again</button></div>;
  // Native images let gallery assets defer their own decoding and loading.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={`${label}: a creative developer workspace with a desk, laptop, chair, window, books and charging phone.`} width={p.width ?? 1536} height={p.height ?? 1024} loading={p.variant === "preview" ? "lazy" : "eager"} decoding="async" onError={() => setFailed(true)} className="ie-asset"/>;
}
