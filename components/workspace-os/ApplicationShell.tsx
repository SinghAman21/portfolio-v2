import { Home, Minus, X } from "lucide-react";
import type { ReactNode } from "react";

export default function ApplicationShell({ title, subtitle, onHome, children, className = "", tools }: { title: string; subtitle?: string; onHome: () => void; children: ReactNode; className?: string; tools?: ReactNode }) {
  return <section className={`os-application ${className}`} aria-label={title}>
    <header className="os-app-header"><button type="button" onClick={onHome} className="os-app-home" aria-label="Return to workspace"><Home size={15}/></button><div className="os-app-title"><h1>{title}</h1>{subtitle && <span>{subtitle}</span>}</div><div className="os-app-header-tools">{tools}<button type="button" onClick={onHome} aria-label={`Minimize ${title}`}><Minus size={15}/></button><button type="button" onClick={onHome} aria-label={`Close ${title} and return to workspace`}><X size={15}/></button></div></header>
    <div className="os-app-content">{children}</div>
  </section>;
}
