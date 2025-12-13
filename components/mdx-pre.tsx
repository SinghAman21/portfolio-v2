"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

interface PreProps {
  children: React.ReactNode;
  [key: string]: any;
}

export function Pre({ children, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);
  const [codeText, setCodeText] = useState("");
  const preRef = useRef<HTMLPreElement>(null);

  // Extract code text from the pre element after render
  useEffect(() => {
    if (preRef.current) {
      // Get text content from the pre element, which includes all nested elements
      const text = preRef.current.textContent || preRef.current.innerText || "";
      setCodeText(text);
    }
  }, [children]);

  const handleCopy = async () => {
    if (!codeText) return;
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="group relative my-4">
      <pre
        ref={preRef}
        className="relative bg-gray-100 dark:bg-neutral-900 rounded-lg overflow-x-auto border border-gray-200 dark:border-neutral-800 py-3 px-4 text-sm"
        {...props}
      >
        {children}
        {codeText && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-200/90 dark:bg-neutral-800/90 hover:bg-gray-300 dark:hover:bg-neutral-700 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-20 pointer-events-auto"
            aria-label="Copy code"
            title="Copy code"
            style={{ pointerEvents: 'auto' }}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-700 dark:text-neutral-300" />
            )}
          </button>
        )}
      </pre>
    </div>
  );
}

