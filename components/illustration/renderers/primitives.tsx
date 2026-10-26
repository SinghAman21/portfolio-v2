import { useId, type ReactNode } from "react";
import type { RendererProps } from "../types";

export function Canvas({ children, background = "#f4eddf", label, ...props }: RendererProps & { children: ReactNode; background?: string; label: string }) {
  return <svg viewBox="0 0 800 560" width={props.width ?? "100%"} height={props.height ?? "100%"} role="img" aria-label={`${label}: a creative developer workspace`} preserveAspectRatio="xMidYMid meet"><rect width="800" height="560" fill={background}/>{children}</svg>;
}
export function useDrawingId(prefix: string) { return `${prefix}-${useId().replace(/:/g, "")}`; }
export function Hatch({ id, color = "#373126", spacing = 7, cross = false }: { id: string; color?: string; spacing?: number; cross?: boolean }) {
  return <pattern id={id} width={spacing} height={spacing} patternUnits="userSpaceOnUse"><path d={`M-1 1 ${spacing + 1} ${spacing + 1}M-1 ${1-spacing} ${spacing+1} 1${cross ? `M-1 ${spacing-1} ${spacing+1} -1` : ""}`} stroke={color} strokeWidth="0.7" fill="none"/></pattern>;
}
export function BookSpines({ x, y, colors = ["#d89671", "#b4bba5", "#dbc9a7"] }: { x: number; y: number; colors?: string[] }) {
  return <g>{colors.map((c, i) => <rect key={i} x={x + i * 4} y={y - i * 13} width={85 - i * 8} height="12" fill={c} stroke="currentColor" strokeWidth="1.5"/>)}</g>;
}
