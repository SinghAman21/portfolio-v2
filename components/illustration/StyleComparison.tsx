import { IllustrationStage } from "./IllustrationStage";
import StyleInfoPanel from "./StyleInfoPanel";
import { styleRegistry } from "./styleRegistry";
import type { IllustrationStyle } from "./types";

export default function StyleComparison({ left, right, onLeft, onRight, reducedMotion }: { left: IllustrationStyle; right: IllustrationStyle; onLeft: (id:string)=>void; onRight: (id:string)=>void; reducedMotion: boolean }) {
  return <div className="ie-comparison">{[{style:left,onChange:onLeft,label:"A"},{style:right,onChange:onRight,label:"B"}].map(({style,onChange,label})=><section key={label} aria-label={`Comparison ${label}`}><div className="ie-compare-selector"><label htmlFor={`compare-${label}`}>{label}</label><select id={`compare-${label}`} value={style.id} onChange={e=>onChange(e.target.value)}>{styleRegistry.map(s=><option key={s.id} value={s.id}>{String(s.number).padStart(2,"0")} / {s.name}</option>)}</select></div><IllustrationStage style={style} reducedMotion={reducedMotion}/><StyleInfoPanel style={style}/></section>)}</div>;
}
