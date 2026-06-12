import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocale(): "en" | "ar" {
  if (typeof window !== "undefined") {
    const segments = window.location.pathname.split("/");
    const firstSegment = segments[1];
    if (firstSegment === "ar" || firstSegment === "en") {
      return firstSegment;
    }
  }
  return "en";
}