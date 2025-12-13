import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: string;
  className?: string;
  animationClass?: string;
}

/**
 * Reusable animated section component with fade-up animation
 * Used for consistent animation timing across pages
 */
export default function AnimatedSection({
  children,
  delay = "0.1s",
  className = "",
  animationClass = "animate-[slideFadeUp_0.25s_ease-out]",
}: AnimatedSectionProps) {
  return (
    <section
      className={cn(animationClass, className)}
      style={{ animationDelay: delay, animationFillMode: "both" }}
    >
      {children}
    </section>
  );
}

