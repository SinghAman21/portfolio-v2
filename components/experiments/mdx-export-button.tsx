"use client";

import { useState } from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface MDXExportButtonProps {
  mdxContent: string;
  className?: string;
}

export function MDXExportButton({ mdxContent, className }: MDXExportButtonProps) {
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

  const handleDownload = () => {
    const blob = new Blob([mdxContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "component.mdx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md",
          "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100",
          "hover:bg-gray-200 dark:hover:bg-neutral-700",
          "transition-colors duration-200"
        )}
        aria-label="Copy MDX"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy MDX
          </>
        )}
      </button>
      <button
        onClick={handleDownload}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md",
          "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100",
          "hover:bg-gray-200 dark:hover:bg-neutral-700",
          "transition-colors duration-200"
        )}
        aria-label="Download MDX"
      >
        <Icons.markdown className="w-4 h-4" />
        Download MDX
      </button>
    </div>
  );
}
