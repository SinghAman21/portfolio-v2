"use client";

import { BatteryCharging, Folder, Palette, Power, StickyNote, X } from "lucide-react";
import { wallNotes } from "./appRegistry";
import type { WorkspaceActions, WorkspaceState } from "./types";

const notePositions = [
  { left: "69%", top: "10.7%", width: "3.4%", height: "4.2%" },
  { left: "66.6%", top: "24.1%", width: "3.5%", height: "4.3%" },
  { left: "79.1%", top: "20.6%", width: "3.7%", height: "6.3%" },
  { left: "74.6%", top: "33.3%", width: "2.5%", height: "5.2%" },
];

export default function WorkspaceDesktop({ state, actions }: { state: WorkspaceState; actions: WorkspaceActions }) {
  const note = wallNotes.find(n => n.id === state.noteId);
  return <div className="os-desktop" aria-label="Illustrated workspace desktop">
    <div className="os-scene-canvas">
      {/* The local artwork and live vector layer share the same 8:5 framing. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="os-scene-image" src="/illustration/workspace-desktop.webp" alt="A detailed technical ink drawing of a sunlit room with a wooden desk, ergonomic chair, open laptop, window, books, wall notes and phone." width="1536" height="960" fetchPriority="high" decoding="async"/>
      <svg className="os-charging-layer" viewBox="0 0 1600 1000" fill="none" aria-hidden="true">
        <defs><pattern id="os-socket-hatch" width="5" height="5" patternUnits="userSpaceOnUse"><path d="m0 5 5-5" stroke="#51432e" strokeWidth=".5" opacity=".5"/></pattern></defs>
        <g stroke="#3b3226" strokeWidth="1.5">
          <path d="M1393 420C1402 491 1248 570 991 548" stroke="#decbae" strokeWidth="5"/><path d="M1393 420C1402 491 1248 570 991 548" strokeWidth="1.8"/>
          <path d="M1438 420C1495 545 1200 599 1123 548" stroke="#decbae" strokeWidth="5"/><path d="M1438 420C1495 545 1200 599 1123 548" strokeWidth="1.8"/>
          <rect x="1382" y="387" width="81" height="48" rx="2" fill="#dfc9a4"/>
          <rect x="1385" y="390" width="75" height="42" rx="1" fill="url(#os-socket-hatch)"/>
          <path d="M1390 397h18v23h-18zm37 0h18v23h-18z" fill="#c6b08d"/>
          <path d="M1393 420v5m45-5v5" strokeWidth="3"/>
          <rect x="1351" y="388" width="23" height="42" rx="2" fill="#e7d7ba"/>
          <path d={state.powered ? "M1356 397h13v21h-13z" : "M1356 394h13v21h-13z"} fill={state.powered ? "#a8ad80" : "#b6a58b"}/>
          <path d={state.powered ? "M1356 397l13 3" : "M1356 415l13-3"} strokeWidth="2"/>
          <circle cx="1362" cy="422" r="1.6" fill={state.powered ? "#7c9564" : "#8b7860"} stroke="none"/>
        </g>
        <g className={`os-device-charge ${state.powered ? "is-powered" : ""}`}><rect x="1114" y="480" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1"/><path d="M1127 482v2" stroke="currentColor"/><path d="m1120 479-3 5h3l-1 4 4-6h-3z" fill="currentColor"/></g>
      </svg>
      <button id="workspace-laptop-screen" type="button" className="os-laptop-screen" onClick={() => actions.openApp("design-inspo")} aria-label="Enter design-inspo through the laptop screen">
        <span className="os-screen-menubar">aman@workspace <span>~</span></span><span className="os-screen-symbol">✳</span><span className="os-screen-app">design-inspo</span><span className="os-screen-subtitle">27 visual languages</span><span className="os-screen-prompt">click to enter <span>↵</span></span><span className={`os-screen-battery ${state.powered ? "is-powered" : ""}`}><BatteryCharging size={9}/>{state.powered ? "charging" : "battery"}</span><span className="os-screen-caption">enter the laptop ↗</span>
      </button>
      <button type="button" className="os-socket-switch" role="switch" aria-checked={state.powered} aria-label={`Wall socket ${state.powered ? "on" : "off"}. Toggle laptop and phone charging.`} onClick={() => actions.update({ powered: !state.powered })}><span className="os-hotspot-caption">power {state.powered ? "on" : "off"}</span></button>
      {notePositions.map((position, index) => <button type="button" key={index} className="os-note-hotspot" style={position} aria-label={`Read wall note: ${wallNotes[index].title}`} onClick={() => actions.update({ noteId: wallNotes[index].id })}><span className="os-hotspot-caption">{wallNotes[index].title}</span></button>)}
      <button type="button" className="os-phone-hotspot" aria-label={`Phone ${state.powered ? "charging" : "connected, not charging"}. View device details.`} onClick={() => actions.openApp("settings")}><span className="os-hotspot-caption">mobile / {state.powered ? "charging" : "connected"}</span></button>
    </div>
    <div className="os-desktop-shortcuts" aria-label="Desktop shortcuts"><button type="button" onClick={() => actions.openApp("design-inspo")}><span className="os-shortcut-icon os-shortcut-design"><Palette size={26} strokeWidth={1.3}/></span><span>design-inspo</span></button><button type="button" onClick={() => { actions.update({ fileFolder: "projects" }); actions.openApp("files"); }}><span className="os-shortcut-icon"><Folder size={28} strokeWidth={1.3}/></span><span>projects</span></button><button type="button" onClick={() => actions.openApp("notes")}><span className="os-shortcut-icon"><StickyNote size={26} strokeWidth={1.3}/></span><span>field-notes</span></button></div>
    <div className="os-desktop-label"><p>Aman’s workspace<span> / 01</span></p><span>A quiet room. A few useful tools. An open laptop.</span></div>
    <button type="button" className="os-mobile-enter" onClick={() => actions.openApp("design-inspo")}><Palette size={16}/>Enter design-inspo <span>↗</span></button>
    <div className="os-desktop-status"><span><span className={state.powered ? "os-powered-dot" : "os-off-dot"}/>{state.powered ? "devices charging" : "connected · not charging"}</span><span>click the screen to step inside</span></div>
    <div className="os-mobile-utilities"><button type="button" onClick={() => actions.update({ powered: !state.powered })}><Power size={14}/>{state.powered ? "Power on" : "Power off"}</button><button type="button" onClick={() => actions.update({ noteId: wallNotes[0].id })}><StickyNote size={14}/>Wall notes</button></div>
    {note && <div className="os-note-backdrop" onClick={event => { if (event.target === event.currentTarget) actions.update({ noteId: null }); }}><aside className="os-wall-note" role="dialog" aria-labelledby="os-note-title"><button type="button" autoFocus aria-label="Close wall note" onClick={() => actions.update({ noteId: null })}><X size={16}/></button><span>from the wall / a reminder</span><h2 id="os-note-title">{note.title}</h2><p>{note.body}</p><div className="os-note-pages">{wallNotes.map((n, index) => <button type="button" key={n.id} aria-label={`Note ${index + 1}: ${n.title}`} aria-pressed={n.id === note.id} onClick={() => actions.update({ noteId: n.id })}>{index + 1}</button>)}</div></aside></div>}
  </div>;
}
