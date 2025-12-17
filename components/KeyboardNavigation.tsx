'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn, getModifierKeyDisplay } from '@/lib/utils';

interface Route {
  path: string;
  label: string;
  key: string;
}

const routes: Route[] = [
  { path: '/', label: 'Home', key: 'H' },
  { path: '/experience', label: 'Experience', key: 'E' },
  { path: '/projects', label: 'Projects', key: 'P' },
  { path: '/blog', label: 'Blog', key: 'B' },
  { path: '/about', label: 'About', key: 'A' },
  { path: '/resume', label: 'Resume', key: 'R' },
];

// Helper to check if modifier key is pressed (Ctrl on Windows/Linux, Cmd on Mac)
const isModifierKey = (e: KeyboardEvent): boolean => {
  return e.ctrlKey || e.metaKey;
};


export default function KeyboardNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateToRoute = useCallback(
    (route: Route) => {
      router.push(route.path);
      setIsDialogOpen(false);
    },
    [router]
  );

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
    setSelectedIndex(0);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleRouteNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (!isModifierKey(e)) return null;

      const key = e.key.toLowerCase();
      const route = routes.find((r) => r.key.toLowerCase() === key);
      
      if (route) {
        e.preventDefault();
        navigateToRoute(route);
        return true;
      }
      return false;
    },
    [navigateToRoute]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Open dialog with Ctrl/Cmd + K
      if (isModifierKey(e) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openDialog();
        return;
      }

      // Close dialog with Escape
      if (e.key === 'Escape' && isDialogOpen) {
        e.preventDefault();
        closeDialog();
        return;
      }

      // Handle navigation in dialog
      if (isDialogOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % routes.length);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + routes.length) % routes.length);
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          navigateToRoute(routes[selectedIndex]);
          return;
        }
        // Allow direct navigation with Ctrl/Cmd + route keys even when dialog is open
        if (handleRouteNavigation(e)) {
          return;
        }
      }

      // Handle Ctrl/Cmd + key shortcuts (only when dialog is closed)
      if (!isDialogOpen) {
        handleRouteNavigation(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, isDialogOpen, selectedIndex, openDialog, closeDialog, navigateToRoute, handleRouteNavigation]);

  // Close dialog when clicking outside
  useEffect(() => {
    if (!isDialogOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-keyboard-nav-dialog]')) return;
      closeDialog();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDialogOpen, closeDialog]);

  if (!isDialogOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={closeDialog}
    >
      <div
        data-keyboard-nav-dialog
        className={cn(
          'w-full max-w-md mx-4 bg-white dark:bg-neutral-900',
          'border border-gray-200 dark:border-neutral-800',
          'rounded-lg shadow-xl',
          'animate-[slideFadeUp_0.2s_ease-out]'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-neutral-800">
          <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
            Press &nbsp;<kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded text-gray-700 dark:text-neutral-300">
              Enter
            </kbd> &nbsp;
            to navigate, &nbsp;
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded text-gray-700 dark:text-neutral-300">
              Esc 
            </kbd> &nbsp;
             to close.
          </p>
        </div>
        <div className="p-2 max-h-[400px] overflow-y-auto">
          {routes.map((route, index) => {
            const isActive = pathname === route.path;
            const isSelected = index === selectedIndex;
            return (
              <button
                key={route.path}
                onClick={() => navigateToRoute(route)}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-md',
                  'transition-colors duration-150',
                  'flex items-center justify-between gap-4',
                  isSelected && 'bg-gray-100 dark:bg-neutral-800',
                  isActive && 'text-gray-900 dark:text-neutral-100 font-medium',
                  !isActive && 'text-gray-600 dark:text-neutral-400',
                  'hover:bg-gray-100 dark:hover:bg-neutral-800'
                )}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span>{route.label}</span>
                <div className="flex items-center gap-2">
                  {isActive && (
                    <span className="text-xs text-gray-500 dark:text-neutral-500">
                      Current
                    </span>
                  )}
                  <kbd
                    className={cn(
                      'px-2 py-1 text-xs font-mono',
                      'bg-gray-200 dark:bg-neutral-700',
                      'border border-gray-300 dark:border-neutral-600',
                      'rounded',
                      'text-gray-700 dark:text-neutral-300',
                      'flex items-center gap-1'
                    )}
                  >
                    <span>{getModifierKeyDisplay()}</span>
                    <span>+</span>
                    <span>{route.key}</span>
                  </kbd>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

