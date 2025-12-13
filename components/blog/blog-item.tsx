import { cn } from '@/lib/utils';
import Link from 'next/link';
import CornerMarkers from '@/components/CornerMarkers';
import { formatDate } from '@/lib/date-utils';

interface Props {
  title: string;
  slug: string;
  date: string;
}

export default function BlogItem({ title, slug, date }: Props) {
  return (
    <div className="py-2 text-gray-700 dark:text-neutral-300">
      <Link
        href={`/blog/${slug}`}
        className={cn(
          'group flex items-center justify-between gap-1',
          'relative transition-all duration-300 ease-out',
          'hover:translate-x-[-2px]'
        )}>
        <CornerMarkers />
        <h3 className="grow font-medium text-gray-800 dark:text-neutral-200 underline decoration-gray-400 dark:decoration-neutral-400/50 underline-offset-[3px] transition-all duration-300 group-hover:underline-offset-[5px] group-hover:decoration-gray-600 dark:group-hover:decoration-neutral-300">
          {title}
        </h3>

        <span
          className={
            'ml-1 flex items-center gap-1 whitespace-nowrap transition-colors text-gray-600 dark:text-neutral-400'
          }>
          <span>
            {formatDate(date)}
          </span>
        </span>
      </Link>
    </div>
  );
}