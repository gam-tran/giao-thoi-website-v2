
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Send ecommerce events to Google Analytics 4.
 * GA4 is already initialized in index.html.
 */
export const trackGA4Event = (
  eventName: string,
  params: Record<string, unknown>
): void => {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag !== 'function') {
    console.warn('GA4 is not initialized.');
    return;
  }

  window.gtag('event', eventName, params);
};
