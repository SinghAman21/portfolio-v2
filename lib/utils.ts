import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getModifierKeyDisplay(): string {
  if (typeof window !== 'undefined' && navigator?.platform) {
    const platform = navigator.platform.toLowerCase()
    if (platform.includes('mac') || platform.includes('iphone') || platform.includes('ipad')) {
      return '⌘'
    }
  }
  return 'Ctrl'
}
