"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_STYLE, styleRegistry } from "@/components/illustration/styleRegistry";
import { appRegistry } from "./appRegistry";
import type { WorkspaceState } from "./types";

const STORAGE_KEY = "aman-workspace:v1";
export const initialWorkspaceState: WorkspaceState = {
  app: "desktop", styleId: DEFAULT_STYLE, comparisonId: "flat-vector", comparing: false,
  search: "", group: "all", galleryOpen: true, terminalOpen: false, powered: true,
  noteId: null, fileFolder: "home", dark: false,
};

export function sanitizeState(value: unknown): WorkspaceState {
  if (!value || typeof value !== "object") return { ...initialWorkspaceState };
  const s = value as Partial<WorkspaceState>;
  const result = { ...initialWorkspaceState };
  if (appRegistry.some(a => a.id === s.app)) result.app = s.app!;
  if (styleRegistry.some(a => a.id === s.styleId)) result.styleId = s.styleId!;
  if (styleRegistry.some(a => a.id === s.comparisonId)) result.comparisonId = s.comparisonId!;
  if (typeof s.search === "string") result.search = s.search.slice(0, 200);
  if (["all", "A", "B", "C", "D", "E"].includes(s.group ?? "")) result.group = s.group!;
  for (const key of ["galleryOpen", "terminalOpen", "powered", "comparing", "dark"] as const) {
    if (typeof s[key] === "boolean") result[key] = s[key];
  }
  if (typeof s.fileFolder === "string") result.fileFolder = s.fileFolder;
  if (typeof s.noteId === "string" || s.noteId === null) result.noteId = s.noteId;
  return result;
}

export function stateFromUrl(url: URL, saved: WorkspaceState): WorkspaceState {
  if (!url.searchParams.has("app") && !url.searchParams.has("style")) return { ...saved, app: "desktop" };
  const patch: Partial<WorkspaceState> = { ...saved, app: "desktop" };
  const app = url.searchParams.get("app");
  if (appRegistry.some(a => a.id === app)) patch.app = app as WorkspaceState["app"];
  const style = url.searchParams.get("style");
  const entry = styleRegistry.find(s => s.id === style || String(s.number) === style);
  if (entry) { patch.styleId = entry.id; if (!app) patch.app = "design-inspo"; }
  patch.search = url.searchParams.get("q") ?? "";
  patch.group = (url.searchParams.get("group") ?? "all") as WorkspaceState["group"];
  patch.comparing = url.searchParams.get("compare") === "1";
  patch.comparisonId = url.searchParams.get("with") ?? saved.comparisonId;
  return sanitizeState(patch);
}

export function urlForState(current: URL, state: WorkspaceState): URL {
  const url = new URL(current);
  for (const key of ["app", "style", "q", "group", "compare", "with"]) url.searchParams.delete(key);
  if (state.app !== "desktop") url.searchParams.set("app", state.app);
  if (state.app === "design-inspo") {
    url.searchParams.set("style", String(styleRegistry.find(s => s.id === state.styleId)?.number ?? 3));
    if (state.search) url.searchParams.set("q", state.search);
    if (state.group !== "all") url.searchParams.set("group", state.group);
    if (state.comparing) { url.searchParams.set("compare", "1"); url.searchParams.set("with", state.comparisonId); }
  }
  return url;
}

export function useWorkspaceState() {
  const [state, setState] = useState(initialWorkspaceState);
  const [ready, setReady] = useState(false);
  const current = useRef(state);
  useEffect(() => {
    let saved = initialWorkspaceState;
    try { saved = sanitizeState(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null")); } catch { /* Browser storage can be unavailable. */ }
    const next = stateFromUrl(new URL(window.location.href), saved);
    current.current = next; setState(next); setReady(true);
    const onPop = () => {
      const next = stateFromUrl(new URL(window.location.href), current.current);
      current.current = next; setState(next);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const update = useCallback((patch: Partial<WorkspaceState>, mode: "push" | "replace" = "replace") => {
    const next = sanitizeState({ ...current.current, ...patch });
    current.current = next; setState(next);
    const url = urlForState(new URL(window.location.href), next);
    if (url.href !== window.location.href) window.history[mode === "push" ? "pushState" : "replaceState"](null, "", url);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* State still works in memory. */ }
  }, [state, ready]);

  return { state, update, ready };
}
