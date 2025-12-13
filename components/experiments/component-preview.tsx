"use client";

import { useState } from "react";
import { Eye, Code2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import CodeBlock from "./code-block";


interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
  className?: string;
  pageUrl?: string;
  v0Url?: string;
}

export default function ComponentPreview({
  children,
  code,
  title,
  className,
  pageUrl,
  v0Url,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [key, setKey] = useState(0);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      {/* Tab Header */}
      <div className="flex items-center justify-between border border-gray-200 dark:border-neutral-800 rounded-t-xl bg-gray-50 dark:bg-neutral-900/30">
        <div className="flex">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2",
              activeTab === "preview"
                ? "text-gray-900 dark:text-white border-gray-900 dark:border-white"
                : "text-gray-500 dark:text-neutral-500 border-transparent hover:text-gray-700 dark:hover:text-neutral-300"
            )}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2",
              activeTab === "code"
                ? "text-gray-900 dark:text-white border-gray-900 dark:border-white"
                : "text-gray-500 dark:text-neutral-500 border-transparent hover:text-gray-700 dark:hover:text-neutral-300"
            )}
          >
            <Code2 className="w-4 h-4" />
            Code
          </button>
        </div>

        {activeTab === "preview" && (
          <div className="flex items-center gap-2 mr-2">
            <button
              onClick={handleReplay}
              className="p-2 rounded-md text-gray-500 dark:text-neutral-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all"
              title="Replay animation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="border-x border-b border-gray-200 dark:border-neutral-800 rounded-b-xl">
        {activeTab === "preview" ? (
          <div className="relative min-h-[280px] flex items-center justify-center p-8 bg-gray-100/50 dark:bg-neutral-950/50">
            {/* Grid background pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(128, 128, 128, 0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Corner markers */}
            <div className="absolute top-3 left-3 w-3 h-3">
              <div className="absolute left-0 top-0 h-full w-px bg-gray-400 dark:bg-neutral-600" />
              <div className="absolute left-0 top-0 h-px w-full bg-gray-400 dark:bg-neutral-600" />
            </div>
            <div className="absolute top-3 right-3 w-3 h-3">
              <div className="absolute right-0 top-0 h-full w-px bg-gray-400 dark:bg-neutral-600" />
              <div className="absolute right-0 top-0 h-px w-full bg-gray-400 dark:bg-neutral-600" />
            </div>
            <div className="absolute bottom-3 left-3 w-3 h-3">
              <div className="absolute left-0 bottom-0 h-full w-px bg-gray-400 dark:bg-neutral-600" />
              <div className="absolute left-0 bottom-0 h-px w-full bg-gray-400 dark:bg-neutral-600" />
            </div>
            <div className="absolute bottom-3 right-3 w-3 h-3">
              <div className="absolute right-0 bottom-0 h-full w-px bg-gray-400 dark:bg-neutral-600" />
              <div className="absolute right-0 bottom-0 h-px w-full bg-gray-400 dark:bg-neutral-600" />
            </div>

            {/* Component */}
            <div key={key} className="relative z-10">
              {children}
            </div>


          </div>
        ) : (
          <CodeBlock
            code={code}
            title={title}
            collapsible
            defaultCollapsed
            maxHeight={400}
          />
        )}
      </div>
    </div>
  );
}

