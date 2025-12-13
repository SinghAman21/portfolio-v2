import { cn } from "@/lib/utils";
import Link from "next/link";
import CornerMarkers from "@/components/CornerMarkers";

interface ExperimentItemProps {
  slug: string;
  title: string;
  description: string;
  year: string;
}

export default function ExperimentItem({ slug, title, description, year }: ExperimentItemProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-1">
        <Link
          href={`/experiments/${slug}`}
          className={cn(
            'group flex items-center justify-between gap-1 w-full',
            'relative transition-all duration-300 ease-out',
            'hover:translate-x-[-2px]'
          )}
        >
          <CornerMarkers />
          <h3 className="grow text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300">
            {title}
          </h3>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-gray-500 dark:text-neutral-500 text-sm tabular-nums transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white">
              {year}
            </span>
          </div>
        </Link>
      </div>

      <p className="text-gray-600 dark:text-neutral-400 mb-2">{description}</p>
    </div>
  );
}

