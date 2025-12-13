"use client";

import { cn } from "@/lib/utils";
import CornerMarkers from "@/components/CornerMarkers";

interface ExperimentItemDemoProps {
  title: string;
  description: string;
  year: string;
}

/**
 * Demo version of ExperimentItem without Link navigation
 * Used for showcasing the component in the experiments page
 */
export function ExperimentItemDemo({ title, description, year }: ExperimentItemDemoProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-1">
        <div
          className={cn(
            'group flex items-center justify-between gap-4 w-full',
            'hover:outline-[0.5px] outline-offset-[6px] hover:outline-gray-400/50 dark:hover:outline-neutral-600/50 hover:[&>h3]:text-gray-900 dark:hover:[&>h3]:text-white hover:[&>div>span]:text-gray-900 dark:hover:[&>div>span]:text-white border-0',
            'relative cursor-pointer'
          )}
        >
          <CornerMarkers />
          <h3 className="grow font-medium text-gray-800 dark:text-neutral-200 underline decoration-gray-400 dark:decoration-neutral-400/50 underline-offset-[3px] transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-gray-500 dark:text-neutral-500 text-sm tabular-nums">
              {year}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-neutral-400 mb-2">{description}</p>
    </div>
  );
}

