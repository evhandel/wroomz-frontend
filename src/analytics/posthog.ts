import posthog from 'posthog-js';

const KEY = process.env.REACT_APP_PUBLIC_POSTHOG_KEY;
// Route ingestion through our own origin (/ingest) so ad blockers don't drop
// events. Proxied to PostHog by src/setupProxy.js (dev) and nginx.conf (prod).
const HOST = process.env.REACT_APP_PUBLIC_POSTHOG_HOST ?? '/ingest';

// True once init() has run with a real key. Guards all tracking so the app
// works normally (as a no-op) when no key is configured — e.g. local dev.
let enabled = false;

export const isAnalyticsEnabled = () => enabled;

export const initAnalytics = () => {
    if (enabled || !KEY) {
        return;
    }
    posthog.init(KEY, {
        api_host: HOST,
        // Where the PostHog app itself lives (toolbar / dashboard links).
        ui_host: 'https://eu.posthog.com',
        // We send $pageview manually on route change (SPA), see usePageviewTracking.
        capture_pageview: false,
        // Autocapture clicks / inputs / form submits out of the box.
        autocapture: true,
    });
    enabled = true;
};

export { posthog };
