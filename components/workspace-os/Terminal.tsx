"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, TerminalSquare, X } from "lucide-react";
import { appRegistry } from "./appRegistry";
import { commandRegistry, executeCommand, type CommandContext } from "./commandRegistry";

type OutputLine = { text: string; kind: "command" | "output" };
const HISTORY_KEY = "aman-workspace:terminal-history:v1";
const OUTPUT_KEY = "aman-workspace:terminal-output:v1";
const welcome: OutputLine[] = [
  { text: "Workspace terminal / a small command hub", kind: "output" },
  { text: "Type help to explore. Ctrl + ` to show or hide.", kind: "output" },
];

export default function Terminal({ visible, context, onClose }: {
  visible: boolean; context: Omit<CommandContext, "history">; onClose: () => void;
}) {
  const [lines, setLines] = useState<OutputLine[]>(welcome);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [height, setHeight] = useState(300);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const draft = useRef("");
  const drag = useRef({ y: 0, height: 300 });

  useEffect(() => {
    try {
      const savedHistory: unknown = JSON.parse(sessionStorage.getItem(HISTORY_KEY) ?? "[]");
      if (Array.isArray(savedHistory)) setHistory(savedHistory.filter((v): v is string => typeof v === "string").slice(-100));
      const savedOutput: unknown = JSON.parse(sessionStorage.getItem(OUTPUT_KEY) ?? "null");
      if (Array.isArray(savedOutput)) setLines(savedOutput.filter((v): v is OutputLine => !!v && typeof v === "object" && typeof v.text === "string" && ["command", "output"].includes(v.kind)).slice(-500));
    } catch { /* Session storage is optional. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history)); sessionStorage.setItem(OUTPUT_KEY, JSON.stringify(lines)); } catch { /* Continue in memory. */ }
  }, [history, lines, ready]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => { if (previous?.isConnected) previous.focus(); };
  }, [visible]);
  useEffect(() => { if (visible) outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight }); }, [lines, visible]);

  function submit() {
    const command = input.trim();
    if (!command) return;
    const nextHistory = [...history, command].slice(-100);
    const result = executeCommand(command, { ...context, history: nextHistory });
    setHistory(nextHistory); setHistoryIndex(-1); setInput(""); draft.current = "";
    setLines(previous => result.clear ? [] : [...previous, { text: command, kind: "command" as const }, ...(result.lines ?? []).map(text => ({ text, kind: "output" as const }))].slice(-500));
  }
  function resize(value: number) { setHeight(Math.max(180, Math.min(1000, window.innerHeight - 110, value))); }

  return <section className="os-terminal" hidden={!visible} style={{ height }} aria-label="Workspace terminal">
    <div className="os-terminal-resizer" role="separator" aria-orientation="horizontal" aria-label="Resize terminal height" aria-valuenow={height} aria-valuemin={180} aria-valuemax={1000} tabIndex={0}
      onPointerDown={event => { drag.current = { y: event.clientY, height }; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) resize(drag.current.height + drag.current.y - event.clientY); }}
      onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onKeyDown={event => { if (event.key === "ArrowUp" || event.key === "ArrowDown") { event.preventDefault(); resize(height + (event.key === "ArrowUp" ? 25 : -25)); } }}/>
    <header className="os-window-bar"><span><TerminalSquare size={13}/> aman@workspace <span className="os-terminal-scope">— app commands</span></span><div><button type="button" onClick={onClose} aria-label="Minimize terminal"><Minus size={15}/></button><button type="button" onClick={onClose} aria-label="Close terminal"><X size={15}/></button></div></header>
    <div className="os-terminal-output" ref={outputRef} role="log" aria-live="polite" aria-label="Command output" tabIndex={0}>
      {lines.map((line, i) => <div key={i} className={line.kind === "command" ? "os-terminal-command" : ""}>{line.kind === "command" && <span aria-hidden="true">❯ </span>}{line.text || "\u00a0"}</div>)}
    </div>
    <form className="os-terminal-input" onSubmit={event => { event.preventDefault(); submit(); }}>
      <span aria-hidden="true">❯</span><label className="ie-sr-only" htmlFor="workspace-command">Terminal command</label>
      <input ref={inputRef} id="workspace-command" autoComplete="off" autoCapitalize="none" spellCheck={false} value={input} placeholder="help" onChange={event => setInput(event.target.value)} onKeyDown={event => {
        if (event.key === "Escape") { event.preventDefault(); onClose(); }
        if (event.ctrlKey && event.key.toLowerCase() === "l") { event.preventDefault(); setLines([]); }
        if (event.key === "ArrowUp") {
          event.preventDefault(); if (!history.length) return;
          if (historyIndex === -1) draft.current = input;
          const next = Math.min(history.length - 1, historyIndex + 1); setHistoryIndex(next); setInput(history[history.length - 1 - next]);
        }
        if (event.key === "ArrowDown") {
          event.preventDefault(); const next = Math.max(-1, historyIndex - 1); setHistoryIndex(next); setInput(next === -1 ? draft.current : history[history.length - 1 - next]);
        }
        if (event.key === "Tab") {
          event.preventDefault();
          const choices = input.startsWith("open ") ? appRegistry.map(a => `open ${a.id}`) : commandRegistry.map(c => c.name);
          const matches = choices.filter(c => c.startsWith(input));
          if (matches.length === 1) setInput(matches[0] + " ");
          else if (matches.length > 1) setLines(previous => [...previous, { text: matches.join("  "), kind: "output" }]);
        }
      }}/><button type="submit" aria-label="Run terminal command">↵</button>
    </form>
  </section>;
}
