import BackNavigation from "@/components/back-navigation";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  backHref: string;
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  titleSize?: "sm" | "md" | "lg";
  showBackNavigation?: boolean;
}

/**
 * Reusable page header component with back navigation, title, and description
 * Used across projects, experience, experiments, and other listing pages
 */
export default function PageHeader({
  backHref,
  title,
  description,
  titleClassName = "",
  descriptionClassName = "",
  titleSize = "lg",
  showBackNavigation = true,
}: PageHeaderProps) {
  const titleSizeClasses = {
    sm: "text-xl font-medium",
    md: "text-2xl font-semibold",
    lg: "text-2xl font-serif font-semibold",
  };

  return (
    <>
      {showBackNavigation && <BackNavigation href={backHref}>back</BackNavigation>}
      <h1
        className={cn(
          titleSizeClasses[titleSize],
          "mb-4 mt-4 text-gray-900 dark:text-neutral-100 animate-[slideFadeUp_0.4s_ease-out]",
          titleClassName
        )}
      >
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "mt-2 mb-8 text-justify text-gray-600 dark:text-neutral-400 leading-relaxed animate-[slideFadeUp_0.5s_ease-out]",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </>
  );
}

