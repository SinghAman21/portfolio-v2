"use client";

import React, { useId, useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

type MermaidModule = typeof import("mermaid").default;

let mermaidModulePromise: Promise<MermaidModule> | null = null;

function loadMermaid() {
  mermaidModulePromise ??= import("mermaid").then((module) => module.default);
  return mermaidModulePromise;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}


function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (
    React.isValidElement<{
      children?: React.ReactNode;
      dangerouslySetInnerHTML?: { __html?: string };
    }>(node)
  ) {
    if (node.props.dangerouslySetInnerHTML?.__html) {
      return node.props.dangerouslySetInnerHTML.__html;
    }

    return getTextContent(node.props.children);
  }

  return "";
}

function getCodeLanguage(children: React.ReactNode) {
  if (!React.isValidElement<{ className?: string }>(children)) return null;

  const className = children.props.className || "";
  const match = className.match(/language-([^\s]+)/);

  return match?.[1] || null;
}

function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const mermaid = await loadMermaid();

        if (cancelled) return;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "default",
        });

        const result = await mermaid.render(`mermaid-${id}`, chart);

        if (!cancelled) {
          setSvg(result.svg);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to render Mermaid diagram:", err);
        if (!cancelled) {
          setError(`Could not render this diagram: ${getErrorMessage(err)}`);
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 md:p-6">
      {svg ? (
        <div
          className="min-w-180 md:min-w-0 [&_svg]:mx-auto [&_svg]:max-w-none md:[&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p className="text-sm text-gray-500 dark:text-neutral-500">
          Rendering diagram…
        </p>
      )}
    </div>
  );
}

interface PreProps {
  children: React.ReactNode;
  [key: string]: any;
}

export function Pre({ children, ...props }: PreProps) {
  const language = getCodeLanguage(children);
  const rawCode = getTextContent(children).trim();

  if (language === "mermaid") {
    return <MermaidDiagram chart={rawCode} />;
  }

  return <CodePre {...props}>{children}</CodePre>;
}

function CodePre({ children, ...props }: PreProps) {
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

