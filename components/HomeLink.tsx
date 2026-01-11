import Link from 'next/link';
import { cn } from '@/lib/utils';
import CornerMarkers from '@/components/CornerMarkers';

interface HomeLinkProps {
  href: string;
  label: string;
  description?: string;
  animationDelay?: string;
  shortcutKey?: string;
}

export default function HomeLink({ href, label, description, animationDelay = '0.1s', shortcutKey }: HomeLinkProps) {
  return (
    <section
      className="mt-6 animate-[slideFadeUp_0.25s_ease-out]"
      style={{ animationDelay, animationFillMode: 'both' }}
    >
      <Link
        href={href}
        className={cn(
          'group flex items-center justify-between gap-2',
          'relative transition-all duration-300 ease-out',
          'hover:translate-x-[-2px]'
        )}>
        <CornerMarkers />
        <h2 className="grow text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 underline decoration-gray-500 dark:decoration-neutral-400/50 underline-offset-4 transition-all duration-300 group-hover:underline-offset-[6px] group-hover:decoration-gray-700 dark:group-hover:decoration-neutral-300">
          {label}
        </h2>
        {shortcutKey && (
          <kbd
            className={cn(
              'px-2 py-1 text-xs font-mono',
              'bg-gray-100/50 dark:bg-neutral-800/50',
              'border border-gray-300/50 dark:border-neutral-700/50',
              'rounded',
              'text-gray-500 dark:text-neutral-500',
              'flex items-center gap-1',
              'opacity-0 group-hover:opacity-100',
              'transition-opacity duration-200',
              'flex-shrink-0'
            )}
            title={`Press ${shortcutKey} to navigate`}
          >
            <span>{shortcutKey}</span>
          </kbd>
        )}
      </Link>
      {description && (
        <p className="mt-2 text-gray-600 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      )}
    </section>
  );
}
