"use client";

import { Icons } from "./icons";
import { cn } from "@/lib/utils";

interface LLMButtonProps {
  url: string;
  provider: "chatgpt" | "claude" | "scira";
  className?: string;
}

const getPrompt = (url: string) => {
  const mdxUrl = url.endsWith('.md') ? url : `${url}.md`;
  return `I'm looking at this component documentation: ${mdxUrl}\n\nComponent URL: ${mdxUrl}\n\nI want to use it in a React (TypeScript) project.\nHelp me understand how to use it step-by-step, including explaining key concepts, showing practical examples with TypeScript code, and pointing out common pitfalls.\nBe ready to answer follow-up questions and help debug issues based on the documentation.`;
};

const providerConfig = {
  chatgpt: {
    label: "Open in ChatGPT",
    icon: Icons.chatgpt,
    url: (url: string) => {
      const prompt = getPrompt(url);
      return `https://chatgpt.com/?${new URLSearchParams({
        hints: "search",
        q: prompt,
      })}`;
    },
    onClick: () => {
      // No additional action needed, URL contains the prompt
    },
  },
  claude: {
    label: "Open in Claude",
    icon: Icons.claude,
    url: (url: string) => {
      const prompt = getPrompt(url);
      return `https://claude.ai/new?${new URLSearchParams({
        q: prompt,
      })}`;
    },
    onClick: () => {
      // No additional action needed, URL contains the prompt
    },
  },
  scira: {
    label: "Open in Scira AI",
    icon: Icons.scira,
    url: (url: string) => {
      const prompt = getPrompt(url);
      return `https://scira.ai/?${new URLSearchParams({
        q: prompt,
      })}`;
    },
    onClick: () => {
      // No additional action needed, URL contains the prompt
    },
  },
};

export function LLMButton({ url, provider, className }: LLMButtonProps) {
  const config = providerConfig[provider];
  const Icon = config.icon;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (config.onClick) {
      config.onClick();
    }
    window.open(config.url(url), "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={config.url(url)}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={config.label}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md",
        "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100",
        "hover:bg-gray-200 dark:hover:bg-neutral-700",
        "transition-colors duration-200",
        className
      )}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </a>
  );
}
