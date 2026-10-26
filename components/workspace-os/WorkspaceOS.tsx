"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/components/illustration/IllustrationStage";
import { DEFAULT_STYLE, findStyle } from "@/components/illustration/styleRegistry";
import { appRegistry } from "./appRegistry";
import { DesktopDock, SystemTopBar } from "./SystemChrome";
import WorkspaceDesktop from "./WorkspaceDesktop";
import ApplicationShell from "./ApplicationShell";
import DesignInspo from "./DesignInspo";
import { FilesApp, NotesApp, SettingsApp, ToolsApp } from "./UtilityApps";
import Terminal from "./Terminal";
import { useWorkspaceState } from "./useWorkspaceState";
import type { AppId, WorkspaceActions } from "./types";
import "@/components/illustration/explorer.css";
import "./workspace-os.css";

export default function WorkspaceOS() {
  const { state, update, ready } = useWorkspaceState();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "entering" | "leaving">("idle");
  const [origin, setOrigin] = useState({ top: "40%", right: "35%", bottom: "45%", left: "50%", x: "57%", y: "49%" });
  const workArea = useRef<HTMLDivElement>(null);
  const appRoot = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef(state);
  latest.current = state;

  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const cancelTransition = () => { if (timer.current) clearTimeout(timer.current); setPhase("idle"); };
    window.addEventListener("popstate", cancelTransition);
    return () => { document.body.style.overflow = old; if (timer.current) clearTimeout(timer.current); window.removeEventListener("popstate", cancelTransition); };
  }, []);

  const openApp = useCallback((app: AppId) => {
    if (timer.current) clearTimeout(timer.current);
    if (app === latest.current.app) { setPhase("idle"); return; }
    if (reducedMotion) { update({ app, noteId: null }, "push"); setPhase("idle"); return; }
    if (app === "desktop") {
      setPhase("leaving");
      timer.current = setTimeout(() => { update({ app: "desktop", noteId: null }, "push"); setPhase("idle"); }, 680);
      return;
    }
    if (latest.current.app === "desktop") {
      const screen = document.getElementById("workspace-laptop-screen")?.getBoundingClientRect();
      const area = workArea.current?.getBoundingClientRect();
      if (screen && area) {
        const percent = (value: number, total: number) => `${Math.max(0, Math.min(100, value / total * 100))}%`;
        setOrigin({ top: percent(screen.top - area.top, area.height), left: percent(screen.left - area.left, area.width), right: percent(area.right - screen.right, area.width), bottom: percent(area.bottom - screen.bottom, area.height), x: percent(screen.left + screen.width / 2 - area.left, area.width), y: percent(screen.top + screen.height / 2 - area.top, area.height) });
      }
      setPhase("entering");
      timer.current = setTimeout(() => setPhase("idle"), 720);
    } else setPhase("idle");
    update({ app, noteId: null }, "push");
  }, [reducedMotion, update]);

  const selectStyle = useCallback((id: string) => { openApp("design-inspo"); update({ styleId: id }); }, [openApp, update]);
  const toggleTerminal = useCallback(() => update({ terminalOpen: !latest.current.terminalOpen }), [update]);
  const actions: WorkspaceActions = { openApp, update, selectStyle, toggleTerminal };

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && (event.code === "Backquote" || event.key === "`")) {
        event.preventDefault();
        document.querySelector<HTMLDialogElement>(".workspace-os dialog[open]")?.close();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", shortcut, true);
    return () => window.removeEventListener("keydown", shortcut, true);
  }, [toggleTerminal]);

  const previousApp = useRef(state.app);
  useEffect(() => {
    if (state.app !== "desktop" && !state.terminalOpen) appRoot.current?.focus({ preventScroll: true });
    if (state.app === "desktop" && previousApp.current !== "desktop" && !state.terminalOpen) document.getElementById("workspace-laptop-screen")?.focus({ preventScroll: true });
    previousApp.current = state.app;
  }, [state.app, state.terminalOpen]);

  const vars = { "--open-top": origin.top, "--open-right": origin.right, "--open-bottom": origin.bottom, "--open-left": origin.left, "--camera-x": origin.x, "--camera-y": origin.y } as CSSProperties;
  const isAway = state.app !== "desktop" && phase !== "leaving";

  return <div className="workspace-os" data-theme={state.dark ? "dark" : "light"} data-ready={ready} style={vars} onKeyDown={event => {
    event.stopPropagation();
    if (event.defaultPrevented) return;
    if ((event.ctrlKey || event.metaKey) && event.code === "Backquote") { event.preventDefault(); toggleTerminal(); return; }
    const target = event.target as HTMLElement;
    if (event.key === "Escape" && !target.closest("dialog[open]")) {
      event.preventDefault();
      if (latest.current.terminalOpen) update({ terminalOpen: false });
      else if (latest.current.noteId) update({ noteId: null });
      else openApp("desktop");
    }
  }}>
    <SystemTopBar app={state.app} powered={state.powered} openApp={openApp} toggleTerminal={toggleTerminal}/>
    <DesktopDock app={state.app} terminalOpen={state.terminalOpen} openApp={openApp} toggleTerminal={toggleTerminal}/>
    <div className="os-work-area" ref={workArea}>
      <div className={`os-desktop-layer ${isAway ? "is-away" : ""}`} inert={state.app !== "desktop" || phase !== "idle" ? true : undefined} aria-hidden={state.app !== "desktop"}><WorkspaceDesktop state={state} actions={actions}/></div>
      {state.app !== "desktop" && <div ref={appRoot} tabIndex={-1} className={`os-application-layer os-phase-${phase}`}>
        <ApplicationShell title={state.app} subtitle={state.app === "design-inspo" ? `${String(findStyle(state.styleId).number).padStart(2, "0")} / ${findStyle(state.styleId).name}` : appRegistry.find(a => a.id === state.app)?.description} onHome={() => openApp("desktop")}>
          {state.app === "design-inspo" && <DesignInspo state={state} update={update} reducedMotion={reducedMotion}/>}
          {state.app === "files" && <FilesApp folder={state.fileFolder} setFolder={fileFolder => update({ fileFolder })} openApp={openApp}/>}
          {state.app === "notes" && <NotesApp/>}
          {state.app === "tools" && <ToolsApp/>}
          {state.app === "settings" && <SettingsApp state={state} update={update} reset={() => update({ styleId: DEFAULT_STYLE, comparisonId: "flat-vector", search: "", group: "all", comparing: false, galleryOpen: true, dark: false })}/>}
        </ApplicationShell>
      </div>}
      <Terminal visible={state.terminalOpen} context={{ state, openApp, selectStyle, update: patch => { if (patch.app && patch.app !== latest.current.app) openApp(patch.app); update(patch); } }} onClose={() => update({ terminalOpen: false })}/>
    </div>
  </div>;
}
