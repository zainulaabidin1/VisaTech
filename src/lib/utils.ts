import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge Tailwind + conditional class names cleanly
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
