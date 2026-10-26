"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import {
  ArrowRight,
  BatteryCharging,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Code2,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  Laptop,
  Lightbulb,
  LockKeyhole,
  Maximize2,
  MonitorUp,
  MousePointer2,
  NotebookPen,
  Power,
  Search,
  Sparkles,
  StickyNote,
  TerminalSquare,
  X,
} from "lucide-react";

type Panel = "explorer" | "socket" | "note" | "device" | null;
type ExplorerTab = "files" | "formats" | "tools" | "approach";

const folders = [
  { name: "Projects", icon: FolderOpen, detail: "Things that have a clear shape, an audience, and a reason to exist.", contents: ["portfolio-v2", "santara", "product experiments"] },
  { name: "Problem Solving", icon: CircleHelp, detail: "Notes that help turn a hard or vague problem into a sequence of smaller decisions.", contents: ["debugging notes", "architecture sketches", "decision logs"] },
  { name: "Research and References", icon: Search, detail: "Useful links, documentation, papers, and examples worth returning to.", contents: ["library notes", "API references", "design references"] },
  { name: "Notes and Documentation", icon: NotebookPen, detail: "Writing that keeps the context around after the original conversation is gone.", contents: ["technical notes", "project READMEs", "explaining things"] },
  { name: "Learning and Experiments", icon: Lightbulb, detail: "Small, low-stakes tests for new tools, ideas, and ways of working.", contents: ["playground", "benchmarks", "failed experiments"] },
  { name: "Tools and Resources", icon: WrenchIcon, detail: "The software and services that make the rest of the workspace move.", contents: ["AI tools", "developer tools", "hosting"] },
  { name: "Personal Projects", icon: Sparkles, detail: "Work that exists because it is interesting, useful, or both.", contents: ["side projects", "visual experiments", "ideas"] },
  { name: "Archive", icon: LockKeyhole, detail: "Older work kept for the lessons, not just the outcome.", contents: ["shipped", "paused", "retired"] },
];

const formats = [
  { extension: ".py", label: "Python", icon: FileCode2, purpose: "Automation, scripting, and computational problem-solving.", example: "scripts/verify.py" },
  { extension: ".ipynb", label: "Jupyter notebook", icon: FileCode2, purpose: "Experimentation, iterative analysis, and documenting results.", example: "research/exploration.ipynb" },
  { extension: ".md", label: "Markdown", icon: FileText, purpose: "Structured notes, explanations, and technical documentation.", example: "notes/decision-log.md" },
  { extension: ".pdf", label: "PDF", icon: BookOpen, purpose: "Reading, reference material, and finalized documents.", example: "references/brief.pdf" },
  { extension: ".csv", label: "CSV", icon: FileSpreadsheet, purpose: "Structured data and lightweight data exchange.", example: "data/observations.csv" },
  { extension: ".xlsx", label: "Excel workbook", icon: FileSpreadsheet, purpose: "Tabular analysis, reporting, and quick operational models.", example: "analysis/report.xlsx" },
  { extension: ".pptx", label: "Presentation", icon: MonitorUp, purpose: "Communicating ideas, findings, and solutions.", example: "share/architecture.pptx" },
  { extension: ".txt", label: "Text file", icon: FileText, purpose: "Quick notes and simple records with almost no ceremony.", example: "scratch/idea.txt" },
];

const tools = [
  { label: "Zed", category: "coding and development", detail: "A fast, focused editor for moving from a plan to working code.", icon: Code2 },
  { label: "Codex", category: "AI pair", detail: "A second brain for implementation, investigation, and getting unstuck.", icon: Sparkles },
  { label: "OpenCode", category: "AI pair", detail: "A flexible terminal-shaped way to explore and build with models.", icon: TerminalSquare },
  { label: "Claude", category: "AI pair", detail: "Useful when a problem needs a patient pass over a lot of context.", icon: CircleHelp },
  { label: "v0", category: "design and visualization", detail: "A quick visual hypothesis for a product or interface.", icon: MonitorUp },
  { label: "Lovable", category: "prototyping", detail: "A fast route from a product idea to something people can click.", icon: MousePointer2 },
  { label: "Excalidraw", category: "thinking and documentation", detail: "A shared surface for flows, architecture, and explaining what is hard to say.", icon: GitBranch },
  { label: "ChatGPT", category: "communication and identity", detail: "For writing, visual direction, logos, and making the work legible.", icon: NotebookPen },
];

const steps = [
  ["Understand", "Define the problem, clarify the objective, and identify constraints."],
  ["Research", "Explore relevant information, existing approaches, and evidence."],
  ["Break Down", "Divide a complex problem into smaller, manageable components."],
  ["Plan", "Choose an approach, select tools, and establish priorities."],
  ["Build", "Implement the solution through structured, iterative work."],
  ["Test", "Validate assumptions, examine results, and identify weaknesses."],
  ["Refine", "Improve the solution based on observation and feedback."],
  ["Document", "Record the reasoning, decisions, results, and lessons learned."],
];

const notes = [
  { id: "understand", x: 196, y: 82, rotate: -4, title: "understand before solving", detail: "Name the problem in plain language before reaching for a solution. A clear question reduces wasted motion." },
  { id: "small", x: 348, y: 138, rotate: 3, title: "break complexity down", detail: "A large problem becomes less intimidating when the next small decision is visible." },
  { id: "assumptions", x: 898, y: 92, rotate: 4, title: "test assumptions", detail: "The fastest way to learn is to make the risky assumption observable and run a small experiment." },
  { id: "document", x: 1026, y: 158, rotate: -3, title: "document what matters", detail: "Leave enough context behind that future-you, or another person, can pick the thread back up." },
];

function WrenchIcon(props: ComponentProps<"svg">) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}><path d="m15 6 3-3 3 3-3 3" /><path d="m18 6-7.4 7.4" /><path d="M5.4 20.6a3 3 0 1 1 4.2-4.2L18 8" /><path d="m3 21 3-3" /></svg>;
}

function Hotspot({ label, onClick, children, className = "" }: { label: string; onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      className={`cursor-pointer outline-none ${className}`}
      onClick={onClick}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onClick(); } }}
    >
      {children}
    </g>
  );
}

export default function WorkspaceExperience() {
  const [panel, setPanel] = useState<Panel>(null);
  const [tab, setTab] = useState<ExplorerTab>("files");
  const [powerOn, setPowerOn] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedNote, setSelectedNote] = useState(0);

  const openExplorer = (nextTab: ExplorerTab = "files") => { setTab(nextTab); setPanel("explorer"); };

  return (
    <div className="relative overflow-hidden rounded-[2px] border border-[#382f27] bg-[#e9dfcc] text-[#241f1a] shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#382f27]/25 bg-[#ded1b9] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#66594b] sm:px-6">
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-700" /> workspace / field notes</span>
        <span>interactive technical study · click the objects</span>
      </div>

      <div className="relative aspect-[1.35] min-h-[530px] overflow-hidden sm:min-h-[650px]">
        <svg viewBox="0 0 1200 760" className="absolute inset-0 h-full w-full" role="img" aria-label="Technical ink illustration of a developer workspace with a laptop, phone, charging socket, sticky notes, window, desk and chair.">
          <defs>
            <pattern id="ink-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><path d="M0 0V12" stroke="#3e352b" strokeWidth="0.8" opacity="0.22" /></pattern>
            <pattern id="wood-grain" width="80" height="22" patternUnits="userSpaceOnUse"><path d="M-20 8 C 8 0, 30 19, 70 6 S 110 8, 130 2" fill="none" stroke="#4a3526" strokeWidth="1" opacity="0.2" /><path d="M0 18 C 20 11, 42 23, 80 14" fill="none" stroke="#4a3526" strokeWidth="0.7" opacity="0.18" /></pattern>
            <filter id="paper-shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="4" dy="7" stdDeviation="4" floodColor="#392f26" floodOpacity="0.28" /></filter>
          </defs>

          <rect width="1200" height="760" fill="#e9dfcc" />
          <path d="M0 0H1200V400H0Z" fill="#f1e8d8" />
          <path d="M0 0H1200V400H0Z" fill="url(#ink-hatch)" opacity="0.26" />

          <g aria-label="window and sunlight">
            <rect x="45" y="48" width="250" height="255" fill="#d6e0df" stroke="#241f1a" strokeWidth="5" />
            <path d="M170 48V303M45 174H295" stroke="#241f1a" strokeWidth="5" />
            <path d="M50 52H290V170H50Z" fill="#f4ce8b" opacity="0.55" />
            <path d="M295 52 600 52 820 400 295 400Z" fill="#b79866" opacity="0.14" />
            <path d="M295 303 520 303 620 400 295 400Z" fill="#241f1a" opacity="0.08" />
            <path d="M298 52 600 52 820 400 298 400Z" fill="url(#ink-hatch)" opacity="0.45" />
            <path d="M45 303h250M45 48h250" stroke="#241f1a" strokeWidth="2" />
            <text x="58" y="328" fontFamily="monospace" fontSize="11" fill="#66594b" letterSpacing="2">NATURAL LIGHT / 01</text>
          </g>

          <g aria-label="wall notes">
            {notes.map((note, index) => (
              <Hotspot key={note.id} label={`Open note: ${note.title}`} onClick={() => { setSelectedNote(index); setPanel("note"); }}>
                <g transform={`translate(${note.x} ${note.y}) rotate(${note.rotate})`} filter="url(#paper-shadow)">
                  <rect width="126" height="92" rx="1" fill={index % 2 ? "#e4c86f" : "#e8d58d"} stroke="#5c4d2e" strokeWidth="1.4" />
                  <path d="M10 20h88M10 34h105M10 48h90M10 62h72" stroke="#6a5b38" strokeWidth="1.2" opacity="0.58" />
                  <text x="10" y="15" fontFamily="monospace" fontSize="8" fill="#4e422c">NOTE 0{index + 1}</text>
                  <circle cx="63" cy="-2" r="4" fill="#695944" />
                </g>
              </Hotspot>
            ))}
          </g>

          <g aria-label="books and desk objects">
            <path d="M390 370h162v19H390zM403 351h138v19H403zM421 329h102v22H421z" fill="#6e5842" stroke="#241f1a" strokeWidth="2" />
            <path d="M405 355h130M395 375h150" stroke="#e9dfcc" strokeWidth="1" opacity="0.7" />
            <rect x="585" y="344" width="115" height="68" fill="#e9dfcc" stroke="#241f1a" strokeWidth="2" transform="rotate(-6 585 344)" />
            <path d="m605 360 60-8M606 374l42-6M606 388l51-7" stroke="#66594b" strokeWidth="1" opacity="0.75" />
            <path d="M731 355c25-24 50-25 76-6" fill="none" stroke="#241f1a" strokeWidth="3" />
            <path d="M748 351c0-24 13-37 29-37s29 14 29 37" fill="#d5cfad" stroke="#241f1a" strokeWidth="2" />
            <path d="M735 355h84" stroke="#241f1a" strokeWidth="3" />
            <text x="392" y="430" fontFamily="monospace" fontSize="10" fill="#66594b" letterSpacing="2">TOOLS / REFERENCES / SCRATCH</text>
          </g>

          <g aria-label="laptop" filter="url(#paper-shadow)">
            <path d="M430 218 792 218 832 430 390 430Z" fill="#9c9a91" stroke="#241f1a" strokeWidth="5" />
            <rect x="453" y="241" width="316" height="164" rx="2" fill="#1d2830" stroke="#241f1a" strokeWidth="4" />
            <path d="M471 266h112M471 281h91M471 296h152M471 326h174M471 341h129M471 356h80" stroke="#b9d5d0" strokeWidth="3" opacity="0.9" />
            <path d="M475 377h168" stroke="#d7b769" strokeWidth="3" opacity="0.9" />
            <path d="M388 430h446l-35 31H418Z" fill="#b7b4aa" stroke="#241f1a" strokeWidth="5" />
            <path d="M569 440h86l6 10h-98z" fill="#77766f" stroke="#241f1a" strokeWidth="2" />
            <circle cx="742" cy="263" r="5" fill={powerOn ? "#9dbd74" : "#5d5145"} />
            <Hotspot label="Open workspace explorer on laptop" onClick={() => openExplorer()}>
              <rect x="445" y="232" width="332" height="183" fill="transparent" stroke="transparent" strokeWidth="15" className="focus-visible:stroke-[#9b6d39]" />
            </Hotspot>
            <text x="478" y="399" fontFamily="monospace" fontSize="9" fill="#d5e8dc">click screen / open explorer</text>
          </g>

          <g aria-label="phone and stand">
            <path d="M895 405h84l20 28H875z" fill="#b6a891" stroke="#241f1a" strokeWidth="3" />
            <path d="M909 420h59v-178c0-7-5-12-12-12h-35c-7 0-12 5-12 12z" fill="#2f3436" stroke="#241f1a" strokeWidth="4" />
            <rect x="917" y="252" width="43" height="145" rx="3" fill="#d4e1d4" stroke="#241f1a" strokeWidth="2" />
            <path d="M926 278h26M926 291h18M926 329h26M926 342h20" stroke="#546459" strokeWidth="2" />
            <circle cx="938" cy="383" r="3" fill={powerOn ? "#8fae6b" : "#777066"} />
            <Hotspot label="Open phone details" onClick={() => setPanel("device")}>
              <rect x="906" y="238" width="64" height="186" fill="transparent" stroke="transparent" strokeWidth="12" className="focus-visible:stroke-[#9b6d39]" />
            </Hotspot>
            <text x="878" y="451" fontFamily="monospace" fontSize="10" fill="#66594b" letterSpacing="1">MOBILE / ALWAYS NEARBY</text>
          </g>

          <g aria-label="charging socket and switch">
            <rect x="1012" y="292" width="126" height="170" rx="4" fill="#d0c4ad" stroke="#241f1a" strokeWidth="4" />
            <path d="M1040 319h70M1040 435h70" stroke="#7b6b57" strokeWidth="1" />
            <circle cx="1052" cy="366" r="13" fill="#e9dfcc" stroke="#241f1a" strokeWidth="3" /><circle cx="1098" cy="366" r="13" fill="#e9dfcc" stroke="#241f1a" strokeWidth="3" />
            <path d="M1048 360v12M1056 360v12M1094 360v12M1102 360v12" stroke="#241f1a" strokeWidth="2" />
            <path d="M1033 405h83" stroke="#241f1a" strokeWidth="2" />
            <rect x="1052" y="324" width="45" height="24" rx="2" fill={powerOn ? "#b7d0a0" : "#b9ad9b"} stroke="#241f1a" strokeWidth="2" />
            <Hotspot label={`Power switch ${powerOn ? "on" : "off"}. Toggle charging.`} onClick={() => setPowerOn((value) => !value)}>
              <rect x="1039" y="310" width="70" height="55" fill="transparent" stroke="transparent" strokeWidth="12" className="focus-visible:stroke-[#9b6d39]" />
              <path d={powerOn ? "M1075 325v21M1065 330a12 12 0 1 0 20 0" : "M1075 327v18M1064 333a12 12 0 1 0 22 0"} fill="none" stroke="#241f1a" strokeWidth="2" />
            </Hotspot>
            <path d="M1048 380c-18 60-108 36-104 67 3 25-38 30-78 13" fill="none" stroke="#241f1a" strokeWidth="3" />
            <path d="M1096 380c-25 39-35 75-72 67-34-7-55-14-63 13" fill="none" stroke="#241f1a" strokeWidth="3" />
            <Hotspot label="Open charging details" onClick={() => setPanel("socket")}>
              <rect x="1004" y="284" width="144" height="186" fill="transparent" stroke="transparent" strokeWidth="12" className="focus-visible:stroke-[#9b6d39]" />
            </Hotspot>
            <text x="1020" y="488" fontFamily="monospace" fontSize="10" fill="#66594b" letterSpacing="1">POWER / {powerOn ? "ON" : "OFF"}</text>
          </g>

          <g aria-label="wooden desk and chair">
            <path d="M0 470H1200V760H0Z" fill="#8f684b" stroke="#241f1a" strokeWidth="5" />
            <path d="M0 470H1200V560H0Z" fill="url(#wood-grain)" />
            <path d="M70 560 120 760M1120 560 1080 760" stroke="#241f1a" strokeWidth="7" />
            <path d="M495 760h240M535 590v170M700 590v170" stroke="#241f1a" strokeWidth="5" opacity="0.8" />
            <path d="M488 605c0-88 36-132 112-132s112 44 112 132" fill="#6f6355" stroke="#241f1a" strokeWidth="5" />
            <path d="M515 614h170v72H515z" fill="#847663" stroke="#241f1a" strokeWidth="5" />
            <path d="M540 689 522 760M656 689 676 760" stroke="#241f1a" strokeWidth="5" />
            <path d="M560 555h80" stroke="#d0baa0" strokeWidth="2" opacity="0.7" />
            <text x="50" y="700" fontFamily="monospace" fontSize="11" fill="#4e3929" letterSpacing="2">A QUIET PLACE TO MAKE THINGS</text>
          </g>

          <g aria-label="illustration annotations" fill="#66594b" fontFamily="monospace" fontSize="10">
            <text x="328" y="64">01 / LIGHT CHANGES THE ROOM</text><path d="M340 71v26" stroke="#66594b" strokeWidth="1" />
            <text x="790" y="522">02 / KEEP THE NEXT STEP VISIBLE</text><path d="M785 514 725 464" stroke="#66594b" strokeWidth="1" />
            <text x="974" y="560">03 / POWER IS A STATE</text><path d="M1000 548 1060 468" stroke="#66594b" strokeWidth="1" />
          </g>
        </svg>

        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-[#382f27]/30 bg-[#f1e8d8]/75 px-3 py-1.5 font-mono text-[10px] text-[#66594b] backdrop-blur-sm sm:left-6">
          <MousePointer2 className="h-3.5 w-3.5" /> interactive objects are outlined on focus
        </div>

        {panel && (
          <div className="absolute inset-3 z-10 flex items-center justify-center bg-[#241f1a]/25 p-2 backdrop-blur-[2px] sm:inset-6 sm:p-5">
            {panel === "explorer" && (
              <section className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden border-2 border-[#241f1a] bg-[#f1e8d8] shadow-[8px_10px_0_rgba(36,31,26,0.22)]" aria-label="Workspace explorer">
                <div className="flex items-center justify-between border-b-2 border-[#241f1a] bg-[#ded1b9] px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#66594b]"><Laptop className="h-4 w-4" /> aman / workspace.explorer</div>
                  <button type="button" onClick={() => setPanel(null)} className="rounded-sm p-1 text-[#66594b] transition hover:bg-[#c9b99d] hover:text-[#241f1a]" aria-label="Close workspace explorer"><X className="h-4 w-4" /></button>
                </div>
                <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
                  <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-[#382f27]/25 bg-[#e6dac5] p-2 sm:w-48 sm:flex-col sm:border-b-0 sm:border-r" aria-label="Explorer sections">
                    {(["files", "formats", "tools", "approach"] as ExplorerTab[]).map((item) => (
                      <button key={item} type="button" onClick={() => setTab(item)} className={`whitespace-nowrap px-2.5 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] transition ${tab === item ? "bg-[#241f1a] text-[#f1e8d8]" : "text-[#66594b] hover:bg-[#d5c6ad]"}`}>{item}</button>
                    ))}
                    <div className="mt-auto hidden border-t border-[#382f27]/20 pt-3 font-mono text-[10px] text-[#8a7964] sm:block"><p>click a section</p><p>to inspect it</p></div>
                  </nav>
                  <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                    {tab === "files" && <>
                      <div className="mb-5 flex items-end justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#927c60]">/home/aman</p><h2 className="mt-1 font-serif text-2xl">files and folders</h2></div><Folder className="h-5 w-5 text-[#927c60]" /></div>
                      <div className="grid gap-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(220px,0.9fr)]">
                        <div className="space-y-1">{folders.map((folder, index) => { const Icon = folder.icon; return <button key={folder.name} type="button" onClick={() => setSelectedFolder(index)} className={`flex w-full items-center gap-3 border px-3 py-2.5 text-left transition ${selectedFolder === index ? "border-[#241f1a] bg-[#ded1b9]" : "border-transparent hover:border-[#382f27]/30 hover:bg-[#e6dac5]"}`}><Icon className="h-4 w-4 shrink-0 text-[#927c60]" /><span className="min-w-0 flex-1 text-sm">{folder.name}</span><ChevronRight className="h-3.5 w-3.5 text-[#927c60]" /></button>; })}</div>
                        <div className="border-l border-[#382f27]/20 pl-4 pt-1"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#927c60]">selected folder</p><h3 className="mt-2 font-serif text-xl">{folders[selectedFolder].name}</h3><p className="mt-2 text-sm leading-relaxed text-[#66594b]">{folders[selectedFolder].detail}</p><div className="mt-4 space-y-2">{folders[selectedFolder].contents.map((item) => <div key={item} className="flex items-center gap-2 text-xs text-[#66594b]"><span className="h-1.5 w-1.5 rounded-full bg-[#927c60]" />{item}</div>)}</div></div>
                      </div>
                    </>}
                    {tab === "formats" && <><div className="mb-5"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#927c60]">choose the right container</p><h2 className="mt-1 font-serif text-2xl">file formats I use</h2></div><div className="grid gap-2 sm:grid-cols-2">{formats.map((format, index) => { const Icon = format.icon; return <button key={format.extension} type="button" onClick={() => setSelectedFormat(index)} className={`flex items-start gap-3 border p-3 text-left transition ${selectedFormat === index ? "border-[#241f1a] bg-[#ded1b9]" : "border-[#382f27]/20 hover:bg-[#e6dac5]"}`}><Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#927c60]" /><span><span className="block font-mono text-xs">{format.extension} · {format.label}</span><span className="mt-1 block text-xs leading-relaxed text-[#66594b]">{format.purpose}</span></span></button>; })}</div><div className="mt-4 border-t border-[#382f27]/20 pt-3 font-mono text-[10px] text-[#927c60]">example / <span className="text-[#66594b]">{formats[selectedFormat].example}</span></div></>}
                    {tab === "tools" && <><div className="mb-5"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#927c60]">a catalog of levers</p><h2 className="mt-1 font-serif text-2xl">tools I use</h2></div><div className="grid gap-2 sm:grid-cols-2">{tools.map((tool, index) => { const Icon = tool.icon; return <button key={tool.label} type="button" onClick={() => setSelectedTool(index)} className={`border p-3 text-left transition ${selectedTool === index ? "border-[#241f1a] bg-[#ded1b9]" : "border-[#382f27]/20 hover:bg-[#e6dac5]"}`}><span className="flex items-center gap-2"><Icon className="h-4 w-4 text-[#927c60]" /><span className="font-mono text-xs">{tool.label}</span></span><span className="mt-2 block text-[10px] uppercase tracking-[0.12em] text-[#927c60]">{tool.category}</span><span className="mt-1 block text-xs leading-relaxed text-[#66594b]">{tool.detail}</span></button>; })}</div></>}
                    {tab === "approach" && <><div className="mb-5"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#927c60]">a repeatable loop</p><h2 className="mt-1 font-serif text-2xl">how I solve problems</h2></div><div className="grid gap-2 sm:grid-cols-2">{steps.map(([title, detail], index) => <button key={title} type="button" onClick={() => setSelectedStep(index)} className={`flex items-start gap-3 border p-3 text-left transition ${selectedStep === index ? "border-[#241f1a] bg-[#ded1b9]" : "border-[#382f27]/20 hover:bg-[#e6dac5]"}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#927c60] font-mono text-[10px]">{String(index + 1).padStart(2, "0")}</span><span><span className="block font-serif text-base">{title}</span><span className="mt-1 block text-xs leading-relaxed text-[#66594b]">{detail}</span></span></button>)}</div><div className="mt-5 flex items-center gap-2 border-t border-[#382f27]/20 pt-3 font-mono text-[10px] text-[#927c60]"><ArrowRight className="h-3 w-3" /> every pass leaves a better starting point</div></>}
                  </div>
                </div>
              </section>
            )}

            {panel === "socket" && <InfoPanel title="charging / power state" icon={<Power className="h-4 w-4" />} onClose={() => setPanel(null)}><div className="space-y-4 text-sm leading-relaxed text-[#66594b]"><p>The laptop and phone stay physically connected to the wall socket. The switch only changes whether the setup is receiving power.</p><div className="grid gap-2 sm:grid-cols-2"><div className="border border-[#382f27]/25 bg-[#e6dac5] p-3"><BatteryCharging className="mb-2 h-4 w-4 text-[#927c60]" /><p className="font-mono text-xs">laptop / {powerOn ? "charging" : "connected, not charging"}</p></div><div className="border border-[#382f27]/25 bg-[#e6dac5] p-3"><BatteryCharging className="mb-2 h-4 w-4 text-[#927c60]" /><p className="font-mono text-xs">phone / {powerOn ? "charging" : "connected, not charging"}</p></div></div><button type="button" onClick={() => setPowerOn((value) => !value)} className="border border-[#241f1a] px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] transition hover:bg-[#ded1b9]">toggle switch / {powerOn ? "on" : "off"}</button></div></InfoPanel>}
            {panel === "device" && <InfoPanel title="mobile / nearby context" icon={<MousePointer2 className="h-4 w-4" />} onClose={() => setPanel(null)}><p className="text-sm leading-relaxed text-[#66594b]">The phone is less about notifications and more about keeping the outside world within reach: camera, quick capture, references, and the occasional reality check.</p></InfoPanel>}
            {panel === "note" && <InfoPanel title="wall note / field principle" icon={<StickyNote className="h-4 w-4" />} onClose={() => setPanel(null)}><p className="font-serif text-2xl">{notes[selectedNote].title}</p><p className="mt-3 text-sm leading-relaxed text-[#66594b]">{notes[selectedNote].detail}</p><div className="mt-4 border-t border-[#382f27]/20 pt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#927c60]">a reminder for the next loop</div></InfoPanel>}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#382f27]/25 bg-[#ded1b9] px-4 py-3 font-mono text-[10px] text-[#66594b] sm:px-6">
        <span>click laptop / notes / socket / phone</span>
        <span className="inline-flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${powerOn ? "bg-emerald-700" : "bg-[#8a7964]"}`} /> socket {powerOn ? "powered" : "off"}</span>
      </div>
    </div>
  );
}

function InfoPanel({ title, icon, onClose, children }: { title: string; icon: ReactNode; onClose: () => void; children: ReactNode }) {
  return <section className="w-full max-w-md border-2 border-[#241f1a] bg-[#f1e8d8] p-5 shadow-[8px_10px_0_rgba(36,31,26,0.22)] sm:p-6" aria-label={title}><div className="flex items-center justify-between border-b border-[#382f27]/25 pb-3"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#66594b]">{icon}{title}</div><button type="button" onClick={onClose} className="rounded-sm p-1 text-[#66594b] transition hover:bg-[#ded1b9] hover:text-[#241f1a]" aria-label="Close panel"><X className="h-4 w-4" /></button></div><div className="pt-5">{children}</div></section>;
}
