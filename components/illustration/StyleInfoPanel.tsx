import type { IllustrationStyle } from "./types";
import { styleGroups } from "./styleRegistry";

export default function StyleInfoPanel({ style }: { style: IllustrationStyle }) {
  return <aside className="ie-info" aria-label={`About ${style.name}`}>
    <p className="ie-eyebrow">{style.group} / {styleGroups.find(g => g.id === style.group)?.name}</p>
    <h2><span>{String(style.number).padStart(2,"0")}.</span> {style.name}</h2>
    <p className="ie-description">{style.description}</p>
    <div className="ie-info-section"><h3>Visual vocabulary</h3><ul className="ie-tags">{style.characteristics.map(item => <li key={item}>{item}</li>)}</ul></div>
    <div className="ie-info-section"><h3>Where it belongs</h3><ul className="ie-use-cases">{style.useCases.map(item => <li key={item}>{item}</li>)}</ul><p>{style.rationale}</p></div>
    <details className="ie-detail"><summary>Trade-offs & implementation</summary><p>{style.limitations}</p><p className="ie-implementation">{style.implementation}</p></details>
  </aside>;
}
