import { Check, ArrowUpRight } from "lucide-react";
import { LazyPreview } from "./IllustrationStage";
import { styleGroups } from "./styleRegistry";
import type { IllustrationStyle } from "./types";

function StyleCard({ style, selected, onSelect }: { style: IllustrationStyle; selected: boolean; onSelect: (id: string) => void }) {
  return <button type="button" className={`ie-card ${selected ? "is-selected" : ""}`} onClick={() => onSelect(style.id)} aria-pressed={selected}>
    <div className="ie-card-art"><LazyPreview style={style}/><span className="ie-card-select" aria-hidden="true">{selected ? <Check size={14}/> : <ArrowUpRight size={14}/>}</span></div>
    <div className="ie-card-label"><span className="ie-card-number">{String(style.number).padStart(2,"0")}</span><h4>{style.name}</h4></div>
    <p>{style.description}</p>
  </button>;
}

export default function StyleGallery({ styles, selectedId, onSelect }: { styles: IllustrationStyle[]; selectedId: string; onSelect: (id: string) => void }) {
  return <div className="ie-gallery">{styleGroups.map(group => {
    const entries = styles.filter(s => s.group === group.id);
    if (!entries.length) return null;
    return <section key={group.id} className="ie-gallery-group" aria-labelledby={`group-${group.id}`}><div className="ie-group-heading"><span>{group.id}</span><h3 id={`group-${group.id}`}>{group.name}</h3><span className="ie-group-count">{String(entries.length).padStart(2,"0")}</span></div><div className="ie-card-grid">{entries.map(style => <StyleCard key={style.id} style={style} selected={style.id === selectedId} onSelect={onSelect}/>)}</div></section>;
  })}</div>;
}
