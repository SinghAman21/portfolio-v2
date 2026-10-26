import { Search, X } from "lucide-react";
import { styleGroups, styleRegistry } from "./styleRegistry";
import type { StyleGroup } from "./types";

export default function StyleSearch({ query, onQuery, group, onGroup, count }: { query: string; onQuery: (q:string)=>void; group: StyleGroup | "all"; onGroup: (g:StyleGroup | "all")=>void; count:number }) {
  return <div className="ie-search-area"><div className="ie-search-row"><label className="ie-search"><Search size={16} aria-hidden="true"/><span className="ie-sr-only">Search styles, characteristics, or use cases</span><input type="search" value={query} onChange={e=>onQuery(e.target.value)} placeholder="Find a visual language…"/>{query && <button type="button" onClick={()=>onQuery("")} aria-label="Clear search"><X size={14}/></button>}</label><span className="ie-result-count" role="status">{count} of {styleRegistry.length} styles</span></div><div className="ie-filters" aria-label="Filter by category"><button type="button" onClick={()=>onGroup("all")} aria-pressed={group==="all"}>All styles</button>{styleGroups.map(g=><button key={g.id} type="button" onClick={()=>onGroup(g.id)} aria-pressed={group===g.id}><span>{g.id}</span>{g.name}</button>)}</div></div>;
}
