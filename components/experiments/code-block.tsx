"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { highlight } from "sugar-high";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  maxHeight?: number;
}

export default function CodeBlock({
  code,
  language = "tsx",
  title,
  showLineNumbers = true,
  collapsible = false,
  defaultCollapsed = false,
  maxHeight = 400,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current && collapsible) {
      setShowExpandButton(codeRef.current.scrollHeight > maxHeight);
    }
  }, [code, collapsible, maxHeight]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const highlightedCode = highlight(code);

  const lines = code.split("\n");

  return (
    <div className="group relative rounded-lg border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50 overflow-hidden">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900">
          <span className="text-xs font-medium text-gray-600 dark:text-neutral-400 uppercase tracking-wider">
            {title || language}
          </span>
        </div>
      )}

      {/* Code container */}
      <div className="relative">
        <pre
          ref={codeRef}
          className={`overflow-x-auto py-4 text-sm leading-relaxed transition-all duration-300 ${collapsible && isCollapsed && showExpandButton
              ? `max-h-[${maxHeight}px] overflow-hidden`
              : ""
            }`}
          style={
            collapsible && isCollapsed && showExpandButton
              ? { maxHeight: `${maxHeight}px` }
              : {}
          }
        >
          <code className="block font-mono">
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div key={index} className="table-row">
                  <span className="table-cell pr-4 pl-4 text-right text-gray-400 dark:text-neutral-600 select-none w-12">
                    {index + 1}
                  </span>
                  <span
                    className="table-cell pr-4"
                    dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
                  />
                </div>
              ))
            ) : (
              <div className="px-4">
                {lines.map((line, index) => (
                  <div key={index} className="block">
                    <span
                      dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </code>
        </pre>

        {/* Gradient overlay for collapsed state */}
        {collapsible && isCollapsed && showExpandButton && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-gray-50 dark:from-neutral-900/90 to-transparent pointer-events-none" />
        )}

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-gray-200/80 dark:bg-neutral-800/80 hover:bg-gray-300 dark:hover:bg-neutral-700 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-600 dark:text-neutral-400" />
          )}
        </button>
      </div>

      {/* Expand/Collapse button */}
      {collapsible && showExpandButton && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full py-2 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white border-t border-gray-200 dark:border-neutral-800 bg-gray-100/50 dark:bg-neutral-900/50 transition-colors"
        >
          {isCollapsed ? (
            <>
              <ChevronDown className="w-4 h-4" />
              Expand code
            </>
          ) : (
            <>
              <ChevronUp className="w-4 h-4" />
              Collapse code
            </>
          )}
        </button>
      )}
    </div>
  );
}

