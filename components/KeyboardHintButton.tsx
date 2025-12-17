'use client';

import { cn, getModifierKeyDisplay } from '@/lib/utils';

export default function KeyboardHintButton() {
  return (
    <button
      className={cn(
        'fixed bottom-6 right-6 z-40',
        'px-3 py-2 rounded-md',
        'bg-white/90 dark:bg-neutral-900/90',
        'border border-gray-200 dark:border-neutral-800',
        'shadow-lg backdrop-blur-sm',
        'flex items-center gap-2',
        'text-xs text-gray-600 dark:text-neutral-400',
        'hover:bg-white dark:hover:bg-neutral-900',
        'transition-all duration-200',
        'animate-[slideFadeUp_0.3s_ease-out]',
        'group'
      )}
      aria-label="Keyboard navigation hint"
    >
      <span>Press</span>
      <kbd
        className={cn(
          'px-2 py-1 text-xs font-mono',
          'bg-gray-100 dark:bg-neutral-800',
          'border border-gray-300 dark:border-neutral-700',
          'rounded',
          'text-gray-700 dark:text-neutral-300',
          'flex items-center gap-1'
        )}
      >
        <span>{getModifierKeyDisplay()}</span>
        <span>+</span>
        <span>K</span>
      </kbd>
      <span>to navigate</span>
      {/* <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">×</span> */}
    </button>
  );
}

