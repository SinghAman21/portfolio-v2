"use client";

import { useState } from "react";

export function Term({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dashed border-gray-400 dark:border-neutral-500 cursor-help transition-colors duration-200 hover:border-gray-600 dark:hover:border-neutral-300"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        tabIndex={0}
        role="button"
        aria-describedby={`term-${term}`}
      >
        {children}
      </span>
      <span
        id={`term-${term}`}
        role="tooltip"
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs leading-snug rounded-md
          bg-gray-900 dark:bg-neutral-100 text-white dark:text-gray-900
          whitespace-nowrap shadow-lg z-50 pointer-events-none
          transition-all duration-200 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
        `}
      >
        {term}
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900 dark:border-t-neutral-100" />
      </span>
    </span>
  );
}
