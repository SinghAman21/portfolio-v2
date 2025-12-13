"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import CornerMarkers from "@/components/CornerMarkers";
import { Icons } from "./icons";

interface MDXCopyButtonProps {
  mdxContent: string;
  className?: string;
}

export function MDXCopyButton({ mdxContent, className }: MDXCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mdxContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'group flex items-center gap-2',
        'relative transition-all duration-300 ease-out',
        'hover:translate-x-[-2px]',
        className
      )}
    >
      <CornerMarkers />
      <Icons.markdown className="w-4 h-4 text-gray-900 dark:text-neutral-100" />
      <span className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300">
        {copied ? "Copied!" : "MDX"}
      </span>
      {copied && (
        <Check className="w-4 h-4 text-gray-900 dark:text-neutral-100 transition-all duration-300" />
      )}
    </button>
  );
}
