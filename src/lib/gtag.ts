// Helper de eventos GA4. Só dispara se o gtag existir (i.e., após consentimento).
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-RZ37G397BW";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function event(action: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}
