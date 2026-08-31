import { GOOGLE_ADS_CALL_CONVERSION } from '../data/site';

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/**
 * Fires the Google Ads call conversion plus a GA4 event.
 *
 * The previous build defined an equivalent `gtag_report_conversion` inline in
 * index.html but never called it from anywhere, so no phone conversion was
 * ever attributed. Call this from every tel: link and booking CTA.
 *
 * Returns void and does not block navigation: cancelling the click to wait for
 * the conversion callback costs real calls when the network is slow, and the
 * beacon almost always lands anyway.
 */
export function reportCallConversion(source: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_CALL_CONVERSION,
  });

  window.gtag('event', 'phone_call_click', {
    event_category: 'engagement',
    event_label: source,
  });
}

/** GA4-only event for non-call conversions such as WhatsApp or directions. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
