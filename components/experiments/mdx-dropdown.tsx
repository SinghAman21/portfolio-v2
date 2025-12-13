"use client";

import { useState, useRef, useEffect } from "react";
import { Icons } from "./icons";
import { ChevronDown, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import CornerMarkers from "@/components/CornerMarkers";

interface MDXDropdownProps {
  pageUrl: string;
  mdxContent: string;
  className?: string;
}

export function MDXDropdown({ pageUrl, mdxContent, className }: MDXDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'group flex items-center gap-2',
          'relative transition-all duration-300 ease-out',
          'hover:translate-x-[-2px]'
        )}
      >
        <CornerMarkers />
        <span className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300">
          MDX
        </span>
        <ChevronDown className={cn("w-4 h-4 text-gray-900 dark:text-neutral-100 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md bg-gray-50 dark:bg-neutral-900/95 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-neutral-800 py-2 z-50 animate-[slideFadeUp_0.2s_ease-out]">
          <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-neutral-400 uppercase tracking-wider border-b border-gray-200 dark:border-neutral-800 mb-1">
            Actions
          </div>

          <div className="px-2 py-1 space-y-1">
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(mdxContent);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                    setIsOpen(false);
                  }, 1500);
                } catch (err) {
                  console.error("Failed to copy:", err);
                  setIsOpen(false);
                }
              }}
              className={cn(
                'group flex items-center gap-2 w-full',
                'relative transition-all duration-300 ease-out px-3 py-2',
                'hover:translate-x-[-2px]'
              )}
            >
              <CornerMarkers />
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-gray-900 dark:text-neutral-100 relative z-10" />
                  <span className="text-sm font-medium text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300 relative z-10">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-900 dark:text-neutral-100 relative z-10" />
                  <span className="text-sm font-medium text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300 relative z-10">
                    Copy MDX
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                const mdxUrl = pageUrl.endsWith('.md') ? pageUrl : `${pageUrl}.md`;
                window.open(mdxUrl, "_blank", "noopener,noreferrer");
                setIsOpen(false);
              }}
              className={cn(
                'group flex items-center gap-2 w-full',
                'relative transition-all duration-300 ease-out px-3 py-2',
                'hover:translate-x-[-2px]'
              )}
            >
              <CornerMarkers />
              <Icons.markdown className="w-4 h-4 text-gray-900 dark:text-neutral-100 relative z-10" />
              <span className="text-sm font-medium text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300 relative z-10">
                View as Markdown
              </span>
            </button>

            <button
              onClick={() => {
                const mdxUrl = pageUrl.endsWith('.md') ? pageUrl : `${pageUrl}.md`;
                const prompt = `I'm looking at this component documentation: ${mdxUrl}\n\nComponent URL: ${mdxUrl}\n\nI want to use it in a React (TypeScript) project.\nHelp me understand how to use it step-by-step, including explaining key concepts, showing practical examples with TypeScript code, and pointing out common pitfalls.\nBe ready to answer follow-up questions and help debug issues based on the documentation.`;
                const url = `https://chatgpt.com/?${new URLSearchParams({
                  hints: "search",
                  q: prompt,
                })}`;
                window.open(url, "_blank", "noopener,noreferrer");
                setIsOpen(false);
              }}
              className={cn(
                'group flex items-center gap-2 w-full',
                'relative transition-all duration-300 ease-out px-3 py-2',
                'hover:translate-x-[-2px]'
              )}
            >
              <CornerMarkers />
              <Icons.chatgpt className="w-4 h-4 text-gray-900 dark:text-neutral-100 relative z-10" />
              <span className="text-sm font-medium text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300 relative z-10">
                Open in ChatGPT
              </span>
            </button>

            <button
              onClick={() => {
                const mdxUrl = pageUrl.endsWith('.md') ? pageUrl : `${pageUrl}.md`;
                const prompt = `I'm looking at this component documentation: ${mdxUrl}\n\nComponent URL: ${mdxUrl}\n\nI want to use it in a React (TypeScript) project.\nHelp me understand how to use it step-by-step, including explaining key concepts, showing practical examples with TypeScript code, and pointing out common pitfalls.\nBe ready to answer follow-up questions and help debug issues based on the documentation.`;
                const url = `https://claude.ai/new?${new URLSearchParams({
                  q: prompt,
                })}`;
                window.open(url, "_blank", "noopener,noreferrer");
                setIsOpen(false);
              }}
              className={cn(
                'group flex items-center gap-2 w-full',
                'relative transition-all duration-300 ease-out px-3 py-2',
                'hover:translate-x-[-2px]'
              )}
            >
              <CornerMarkers />
              <Icons.claude className="w-4 h-4 text-gray-900 dark:text-neutral-100 relative z-10" />
              <span className="text-sm font-medium text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300 relative z-10">
                Open in Claude
              </span>
            </button>

            <button
              onClick={() => {
                const mdxUrl = pageUrl.endsWith('.md') ? pageUrl : `${pageUrl}.md`;
                const prompt = `I'm looking at this component documentation: ${mdxUrl}\n\nComponent URL: ${mdxUrl}\n\nI want to use it in a React (TypeScript) project.\nHelp me understand how to use it step-by-step, including explaining key concepts, showing practical examples with TypeScript code, and pointing out common pitfalls.\nBe ready to answer follow-up questions and help debug issues based on the documentation.`;
                const url = `https://scira.ai/?${new URLSearchParams({
                  q: prompt,
                })}`;
                window.open(url, "_blank", "noopener,noreferrer");
                setIsOpen(false);
              }}
              className={cn(
                'group flex items-center gap-2 w-full',
                'relative transition-all duration-300 ease-out px-3 py-2',
                'hover:translate-x-[-2px]'
              )}
            >
              <CornerMarkers />
              <Icons.scira className="w-4 h-4 text-gray-900 dark:text-neutral-100 relative z-10" />
              <span className="text-sm font-medium text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300 relative z-10">
                Open in Scira AI
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
