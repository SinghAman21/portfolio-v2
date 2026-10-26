"use client";

import { useEffect, useRef, useState } from "react";
import { BatteryCharging, Battery, Command, Folder, Home, LayoutGrid, Palette, Settings2, StickyNote, TerminalSquare, Wifi, WifiOff } from "lucide-react";
import { appRegistry } from "./appRegistry";
import type { AppId } from "./types";

const icons = { desktop: Home, "design-inspo": Palette, files: Folder, notes: StickyNote, tools: LayoutGrid, settings: Settings2 };
const clockFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
const dateFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", weekday: "short" });

export function SystemTopBar({ app, powered, openApp, toggleTerminal }: { app: AppId; powered: boolean; openApp: (id: AppId) => void; toggleTerminal: () => void }) {
  const [now, setNow] = useState<Date | null>(null);
  const [online, setOnline] = useState(true);
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const update = () => setNow(new Date()); update(); const timer = window.setInterval(update, 1000);
    const status = () => setOnline(navigator.onLine); status();
    window.addEventListener("online", status); window.addEventListener("offline", status);
    const outside = (e: PointerEvent) => { if (menu.current && !menu.current.contains(e.target as Node)) menu.current.open = false; };
    window.addEventListener("pointerdown", outside);
    return () => { window.clearInterval(timer); window.removeEventListener("online", status); window.removeEventListener("offline", status); window.removeEventListener("pointerdown", outside); };
  }, []);
  return <header className="os-topbar"><div className="os-system-left"><details ref={menu} className="os-system-menu" onKeyDown={e => { if (e.key === "Escape" && menu.current) menu.current.open = false; }}><summary aria-label="Open system menu"><Command size={13}/><span>aman</span></summary><nav aria-label="System menu">{appRegistry.map(a => <button key={a.id} type="button" onClick={() => { openApp(a.id); if (menu.current) menu.current.open = false; }}>{a.name}</button>)}<a href="/portfolio">Portfolio ↗</a><a href="/reach">Get in touch ↗</a></nav></details><span className="os-system-app">{app === "desktop" ? "workspace" : app}</span></div><button type="button" className="os-clock" onClick={() => openApp("settings")} aria-label="Time in India; open settings"><time suppressHydrationWarning>{now ? `${dateFormat.format(now)}  ·  ${clockFormat.format(now)} IST` : "Local workspace · IST"}</time></button><div className="os-system-status"><button type="button" onClick={toggleTerminal} title="Terminal · Ctrl + `" aria-label="Toggle terminal"><TerminalSquare size={13}/></button><span title={online ? "Browser reports a network connection" : "Browser is offline"}>{online ? <Wifi size={13}/> : <WifiOff size={13}/>}</span><button type="button" onClick={() => openApp("settings")} title={`Simulated charging: ${powered ? "on" : "off"}`} aria-label="Open power settings">{powered ? <BatteryCharging size={16}/> : <Battery size={16}/>}</button></div></header>;
}

export function DesktopDock({ app, terminalOpen, openApp, toggleTerminal }: { app: AppId; terminalOpen: boolean; openApp: (app: AppId) => void; toggleTerminal: () => void }) {
  const order = ["desktop", "design-inspo", "terminal", "files", "notes", "tools", "settings"] as const;
  return <nav className="os-dock" aria-label="Application dock">{order.map(id => {
    const isTerminal = id === "terminal";
    const entry = appRegistry.find(a => a.id === id);
    const Icon = isTerminal ? TerminalSquare : icons[id];
    const active = isTerminal ? terminalOpen : id === app;
    return <button key={id} type="button" className={`os-dock-button os-dock-${id} ${active ? "is-active" : ""}`} aria-label={entry?.name ?? "Terminal"} aria-pressed={active} onClick={() => isTerminal ? toggleTerminal() : openApp(id)}><span className="os-dock-icon"><Icon size={21} strokeWidth={1.5}/></span><span className="os-dock-tooltip">{entry?.name ?? "Terminal"}</span><span className="os-dock-indicator"/></button>;
  })}<span className="os-dock-divider"/><a className="os-dock-button" href="/portfolio" aria-label="Open classic portfolio"><span className="os-dock-icon os-portfolio-icon">a.</span><span className="os-dock-tooltip">Portfolio ↗</span></a></nav>;
}
