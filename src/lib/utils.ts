import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind + conditional class names cleanly
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
