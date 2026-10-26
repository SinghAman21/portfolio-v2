import type { ComponentType, LazyExoticComponent } from "react";

export type StyleGroup = "A" | "B" | "C" | "D" | "E";
export type RendererProps = {
  subject: "workspace";
  variant: "preview" | "stage" | "focus";
  width?: number;
  height?: number;
  reducedMotion: boolean;
};
export type IllustrationStyle = {
  id: string;
  number: number;
  name: string;
  group: StyleGroup;
  description: string;
  characteristics: readonly string[];
  useCases: readonly string[];
  rationale: string;
  limitations: string;
  implementation: string;
  renderer: LazyExoticComponent<ComponentType<RendererProps>>;
  capabilities: { medium: "vector" | "asset"; motion: boolean };
};
