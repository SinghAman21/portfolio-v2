import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to get modifier key display name (Ctrl on Windows/Linux, Cmd on Mac)
export function getModifierKeyDisplay(): string {
  if (typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
    return '⌘';
  }
  return 'Ctrl';
}