"use client";

import { Icons } from "./icons";
import { cn } from "@/lib/utils";

interface OpenInV0ButtonProps {
  url: string;
  className?: string;
}

export function OpenInV0Button({ url, className }: OpenInV0ButtonProps) {
  return (
    <a
      href={`https://v0.dev/chat/api/open?url=${encodeURIComponent(url)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open in v0"
      className={cn(
        'group flex items-center gap-2',
        'relative transition-all duration-300 ease-out',
        'hover:translate-x-[-2px]',
        'px-3 py-1.5',
        className
      )}
    >
      {/* Top left */}
      <div className="absolute left-[-6.25px] top-[-6.25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 w-[10px] h-[10px]">
        <div className="absolute left-0 top-0 h-[10px] w-[0.5px] bg-gray-500 dark:bg-neutral-500 transition-all duration-300 group-hover:scale-y-100 scale-y-0 origin-top group-hover:shadow-[0_0_4px_rgba(107,114,128,0.4)] dark:group-hover:shadow-[0_0_4px_rgba(163,163,163,0.4)]" />
        <div className="absolute left-0 top-0 h-[0.5px] w-[10px] bg-gray-500 dark:bg-neutral-500 transition-all duration-300 group-hover:scale-x-100 scale-x-0 origin-left group-hover:shadow-[0_0_4px_rgba(107,114,128,0.4)] dark:group-hover:shadow-[0_0_4px_rgba(163,163,163,0.4)]" />
      </div>
      {/* Bottom left */}
      <div className="absolute left-[-6.25px] bottom-[-6.25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-125 w-[10px] h-[10px]">
        <div className="absolute left-0 bottom-0 h-[10px] w-[0.5px] bg-gray-500 dark:bg-neutral-500 transition-all duration-300 group-hover:scale-y-100 scale-y-0 origin-bottom group-hover:shadow-[0_0_4px_rgba(107,114,128,0.4)] dark:group-hover:shadow-[0_0_4px_rgba(163,163,163,0.4)]" />
        <div className="absolute left-0 bottom-0 h-[0.5px] w-[10px] bg-gray-500 dark:bg-neutral-500 transition-all duration-300 group-hover:scale-x-100 scale-x-0 origin-left group-hover:shadow-[0_0_4px_rgba(107,114,128,0.4)] dark:group-hover:shadow-[0_0_4px_rgba(163,163,163,0.4)]" />
      </div>
      {/* Bottom right */}
      <div className="absolute bottom-[-6.25px] right-[-6.25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 w-[10px] h-[10px]">
        <div className="absolute right-0 bottom-0 h-[10px] w-[0.5px] bg-gray-500 dark:bg-neutral-500 transition-all duration-300 group-hover:scale-y-100 scale-y-0 origin-bottom group-hover:shadow-[0_0_4px_rgba(107,114,128,0.4)] dark:group-hover:shadow-[0_0_4px_rgba(163,163,163,0.4)]" />
        <div className="absolute right-0 bottom-0 h-[0.5px] w-[10px] bg-gray-500 dark:bg-neutral-500 transition-all duration-300 group-hover:scale-x-100 scale-x-0 origin-right group-hover:shadow-[0_0_4px_rgba(107,114,128,0.4)] dark:group-hover:shadow-[0_0_4px_rgba(163,163,163,0.4)]" />
      </div>
      <span className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300 relative z-10">
        Open in
      </span>
      <Icons.v0 className="w-5 h-5 text-gray-900 dark:text-neutral-100 relative z-10 flex-shrink-0" />
    </a>
  );
}
