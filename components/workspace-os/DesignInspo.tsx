"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Columns2, Expand, PanelLeft, Search, X } from "lucide-react";
import { IllustrationStage, LazyPreview } from "@/components/illustration/IllustrationStage";
import { filterStyles, findStyle, styleGroups, styleRegistry } from "@/components/illustration/styleRegistry";
import type { IllustrationStyle, StyleGroup } from "@/components/illustration/types";
import type { WorkspaceState } from "./types";

function Description({ style }: { style: IllustrationStyle }) {
  return <div className="di-description"><p><strong>Description:</strong> {style.description}</p><p><strong>Best suited for:</strong> {style.useCases.slice(0, 3).join(", ")}.</p><details><summary>Details & implementation</summary><p>{style.rationale}</p><p>{style.characteristics.join(" · ")}</p><p>{style.limitations}</p><p>{style.implementation}</p></details></div>;
}

export default function DesignInspo({ state, update, reducedMotion }: { state: WorkspaceState; update: (patch: Partial<WorkspaceState>) => void; reducedMotion: boolean }) {
  const [focused, setFocused] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = findStyle(state.styleId);
  const comparison = findStyle(state.comparisonId);
  const query = useDeferredValue(state.search);
  const entries = filterStyles(query, state.group);
  const total = styleRegistry.length;

  useEffect(() => {
    if (!focused) return;
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, [focused]);

  function navigate(direction: number) {
    const index = styleRegistry.findIndex(s => s.id === selected.id);
    update({ styleId: styleRegistry[(index + direction + total) % total].id });
  }

  return <div className={`di-layout ${state.galleryOpen ? "" : "di-gallery-hidden"}`} onKeyDown={event => {
    const target = event.target as HTMLElement;
    if (event.ctrlKey || event.metaKey || event.altKey || target.closest("input, select, textarea, summary, dialog")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); navigate(event.key === "ArrowRight" ? 1 : -1); }
    if (event.key === "Home") { event.preventDefault(); update({ styleId: styleRegistry[0].id }); }
    if (event.key === "End") { event.preventDefault(); update({ styleId: styleRegistry[total - 1].id }); }
  }}>
    <aside className="di-sidebar" aria-label="Illustration gallery" hidden={!state.galleryOpen}>
      <div className="di-sidebar-controls"><label className="di-search"><Search size={13}/><span className="ie-sr-only">Search styles</span><input type="search" placeholder="Find a style…" value={state.search} onChange={event => update({ search: event.target.value })}/></label><label className="ie-sr-only" htmlFor="di-category">Style category</label><select id="di-category" value={state.group} onChange={event => update({ group: event.target.value as StyleGroup | "all" })}><option value="all">All families</option>{styleGroups.map(g => <option key={g.id} value={g.id}>{g.id} / {g.name}</option>)}</select><p aria-live="polite">{entries.length} / {total} styles</p></div>
      <div className="di-gallery" role="group" aria-label="Select a style">{entries.map(style => <button type="button" key={style.id} className={`di-style-entry ${style.id === selected.id ? "is-selected" : ""}`} aria-pressed={style.id === selected.id} onClick={() => update({ styleId: style.id })}><span className="di-thumbnail"><LazyPreview style={style}/></span><span className="di-entry-label"><span>{String(style.number).padStart(2, "0")} <span> / {style.group}</span></span><strong>{style.name}</strong></span>{style.id === selected.id && <Check className="di-entry-check" size={11}/>}</button>)}{!entries.length && <div className="di-empty"><p>No matching styles.</p><button type="button" onClick={() => update({ search: "", group: "all" })}>Clear filters</button></div>}</div>
    </aside>
    <div className="di-canvas-area">
      <div className="di-toolbar"><button type="button" onClick={() => update({ galleryOpen: !state.galleryOpen })} aria-expanded={state.galleryOpen} aria-label="Toggle style gallery"><PanelLeft size={15}/></button><span className="di-current-number">{String(selected.number).padStart(2, "0")} / {total}</span><label className="ie-sr-only" htmlFor="di-current-style">Selected illustration</label><select id="di-current-style" className="di-current-select" value={selected.id} onChange={event => update({ styleId: event.target.value })}>{styleRegistry.map(style => <option key={style.id} value={style.id}>{style.name}</option>)}</select><div className="di-stage-actions"><button type="button" aria-pressed={state.comparing} onClick={() => update({ comparing: !state.comparing })} aria-label="Toggle comparison"><Columns2 size={15}/></button><button type="button" onClick={() => setFocused(true)} aria-label="Focus selected artwork"><Expand size={15}/></button><button type="button" onClick={() => navigate(-1)} aria-label="Previous style"><ArrowLeft size={15}/></button><button type="button" onClick={() => navigate(1)} aria-label="Next style"><ArrowRight size={15}/></button></div></div>
      <div className={`di-demo ${state.comparing ? "di-demo-compare" : ""}`}>
        <div className="di-demo-side"><div className="di-artwork" tabIndex={0} aria-label={`${selected.name} preview. Use left and right arrows to change styles.`}><IllustrationStage style={selected} reducedMotion={reducedMotion}/></div><Description style={selected}/></div>
        {state.comparing && <div className="di-demo-side"><div className="di-compare-control"><label htmlFor="di-second-style">Compare with</label><select id="di-second-style" value={comparison.id} onChange={event => update({ comparisonId: event.target.value })}>{styleRegistry.map(style => <option key={style.id} value={style.id}>{String(style.number).padStart(2, "0")} / {style.name}</option>)}</select></div><div className="di-artwork"><IllustrationStage style={comparison} reducedMotion={reducedMotion}/></div><Description style={comparison}/></div>}
      </div>
      <footer className="di-status"><span>{selected.capabilities.medium === "asset" ? "Dedicated artwork" : "Live vector illustration"}</span><span>one workspace / {total} visual languages</span><span>← → to explore</span></footer>
    </div>
    <p className="ie-sr-only" aria-live="polite">{selected.number} of {total}. {selected.name}.</p>
    <dialog ref={dialog} className="os-focus-dialog" onClose={() => setFocused(false)} onClick={event => { if (event.currentTarget === event.target) setFocused(false); }} aria-labelledby="os-focus-title">
      {focused && <><header><h2 id="os-focus-title">{String(selected.number).padStart(2, "0")} / {selected.name}</h2><button type="button" autoFocus onClick={() => setFocused(false)} aria-label="Close focused artwork"><X size={20}/></button></header><div className="os-focus-art"><IllustrationStage style={selected} variant="focus" reducedMotion={reducedMotion}/></div><footer><button type="button" onClick={() => navigate(-1)}><ArrowLeft size={15}/>Previous</button><span>{selected.number} / {total}</span><button type="button" onClick={() => navigate(1)}>Next<ArrowRight size={15}/></button></footer></>}
    </dialog>
  </div>;
}
