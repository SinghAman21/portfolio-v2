"use client";

import { useDeferredValue, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Columns2, Expand, Moon, RotateCcw, Sun, X } from "lucide-react";
import { IllustrationStage, useReducedMotion } from "./IllustrationStage";
import StyleGallery from "./StyleGallery";
import StyleComparison from "./StyleComparison";
import StyleInfoPanel from "./StyleInfoPanel";
import StyleSearch from "./StyleSearch";
import { DEFAULT_STYLE, filterStyles, findStyle, styleRegistry } from "./styleRegistry";
import type { StyleGroup } from "./types";
import "./explorer.css";

export default function IllustrationExplorer() {
  const [selectedId, setSelectedId] = useState(DEFAULT_STYLE);
  const [comparisonId, setComparisonId] = useState("flat-vector");
  const [comparing, setComparing] = useState(false);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<StyleGroup | "all">("all");
  const [dark, setDark] = useState(false);
  const [focused, setFocused] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const total = styleRegistry.length;
  const selected = findStyle(selectedId);
  const deferredQuery = useDeferredValue(query);
  const results = filterStyles(deferredQuery, group);

  useEffect(() => { setAnnouncement(`${String(selected.number).padStart(2,"0")} of ${total}. ${selected.name}`); }, [selected, total]);
  useEffect(() => {
    if (!focused) return;
    const node = dialog.current;
    node?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = previousOverflow; };
  }, [focused]);

  function select(id: string) { setSelectedId(id); }
  function navigate(direction: number) {
    const index = styleRegistry.findIndex(s=>s.id === selectedId);
    select(styleRegistry[(index+direction+styleRegistry.length)%styleRegistry.length].id);
  }
  function handleKeyboard(event: KeyboardEvent<HTMLElement>) {
    // The site's bare-letter route shortcuts must not intercept explorer controls.
    event.stopPropagation();
    if (event.altKey || event.metaKey || event.ctrlKey) return;
    const target = event.target as HTMLElement;
    if (target.closest("input, select, textarea, dialog, [contenteditable='true']")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); navigate(event.key === "ArrowRight" ? 1 : -1); }
    if (event.key === "Home") { event.preventDefault(); select(styleRegistry[0].id); }
    if (event.key === "End") { event.preventDefault(); select(styleRegistry[total - 1].id); }
  }
  function reset() { select(DEFAULT_STYLE); setComparisonId("flat-vector"); setComparing(false); setQuery(""); setGroup("all"); }
  function selectFromGallery(id: string) { select(id); stage.current?.scrollIntoView({behavior:reducedMotion?"instant":"smooth",block:"start"}); }

  return <section className="illustration-explorer" data-theme={dark?"dark":"light"} aria-label="Illustration Style Explorer" onKeyDown={handleKeyboard}>
    <div className="ie-topline"><a href="/" className="ie-back"><ArrowLeft size={13}/> Aman Singh</a><span>Visual field guide / no. 001</span><a href="#my-workspace">Enter my desk <ArrowUpRight size={13}/></a></div>
    <header className="ie-header"><div><p className="ie-eyebrow">One room. {total} perspectives.</p><h1>Illustration<br className="ie-mobile-break"/> Style Explorer<span className="ie-title-dot">.</span></h1><p className="ie-subtitle">Explore {total} visual languages for the web.</p></div><div className="ie-edition"><span className="ie-edition-number">{String(selected.number).padStart(2,"0")}<span> / {total}</span></span><span className="ie-edition-caption">the workspace collection</span></div></header>

    <div className="ie-stage-section" ref={stage}>
      <div className="ie-toolbar"><div className="ie-view-controls"><button type="button" aria-pressed={!comparing} onClick={()=>setComparing(false)}>Explore</button><button type="button" aria-pressed={comparing} onClick={()=>setComparing(true)}><Columns2 size={14}/>Compare</button></div><div className="ie-toolbar-actions"><button type="button" onClick={()=>setDark(!dark)} aria-label={dark?"Use light interface":"Use dark interface"}>{dark?<Sun size={15}/>:<Moon size={15}/>}</button><button type="button" onClick={reset} aria-label="Reset selection and filters" title="Reset selection and filters"><RotateCcw size={15}/></button><button type="button" onClick={()=>setFocused(true)} aria-label="Expand selected illustration"><Expand size={15}/><span className="ie-desktop-label">Focus</span></button></div></div>
      {comparing ? <StyleComparison left={selected} right={findStyle(comparisonId)} onLeft={select} onRight={setComparisonId} reducedMotion={reducedMotion}/> : <div className="ie-main"><div className="ie-stage-column"><div className="ie-stage-frame" tabIndex={0} aria-label="Illustration preview. Use left and right arrow keys to change styles."><IllustrationStage style={selected} reducedMotion={reducedMotion}/><span className="ie-plate-number">PLATE {String(selected.number).padStart(2,"0")}</span></div><div className="ie-stage-caption"><span>Same subject, a different way of seeing.</span><div className="ie-prev-next"><button type="button" onClick={()=>navigate(-1)} aria-label="Previous style"><ArrowLeft size={16}/></button><span>{String(selected.number).padStart(2,"0")} / {total}</span><button type="button" onClick={()=>navigate(1)} aria-label="Next style"><ArrowRight size={16}/></button></div></div></div><StyleInfoPanel style={selected}/></div>}
      {comparing && <p className="ie-compare-hint">Each side uses its own artwork and composition. Choose any pair to compare form, material, and mood.</p>}
    </div>

    <div className="ie-collection-intro"><div><p className="ie-eyebrow">The complete collection</p><h2>Find your visual language.</h2></div><p>A desk, a laptop, a window, a few ideas.<br/>The subject stays. The expression changes.</p></div>
    <StyleSearch query={query} onQuery={setQuery} group={group} onGroup={setGroup} count={results.length}/>
    {results.length ? <StyleGallery styles={results} selectedId={selectedId} onSelect={selectFromGallery}/> : <div className="ie-empty"><h3>No styles found.</h3><p>Try a material, a use case, or a broader visual characteristic.</p><button type="button" onClick={()=>{setQuery("");setGroup("all");}}>Show all {total} styles <ArrowRight size={14}/></button></div>}
    <footer className="ie-footer"><span>{total} studies / {new Set(styleRegistry.map(s=>s.group)).size} families / 1 workspace</span><span>Use ← → to move through the collection</span></footer>
    <p className="ie-sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>

    <dialog ref={dialog} className="ie-focus-dialog" aria-labelledby="ie-focus-title" onClose={()=>setFocused(false)} onClick={e=>{if(e.target===e.currentTarget)setFocused(false);}}>
      {focused && <div className="ie-focus-content"><div className="ie-focus-header"><div><p className="ie-eyebrow">Focused view / {String(selected.number).padStart(2,"0")}</p><h2 id="ie-focus-title">{selected.name}</h2></div><button type="button" autoFocus onClick={()=>setFocused(false)} aria-label="Close focused view"><X size={22}/></button></div><IllustrationStage style={selected} variant="focus" reducedMotion={reducedMotion}/><div className="ie-focus-footer"><button type="button" onClick={()=>navigate(-1)}><ArrowLeft size={15}/>Previous</button><span>{String(selected.number).padStart(2,"0")} / {total}</span><button type="button" onClick={()=>navigate(1)}>Next<ArrowRight size={15}/></button></div></div>}
    </dialog>
  </section>;
}
