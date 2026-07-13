import posthog from 'posthog-js';

const KEY = process.env.REACT_APP_PUBLIC_POSTHOG_KEY;
// Route ingestion through our own origin (/ingest) so ad blockers don't drop
// events. Proxied to PostHog by src/setupProxy.js (dev) and nginx.conf (prod).
const HOST = process.env.REACT_APP_PUBLIC_POSTHOG_HOST ?? '/ingest';

const IS_PROD = process.env.NODE_ENV === 'production';
// In dev, analytics is off by default so local clicks don't pollute the data.
// Set REACT_APP_POSTHOG_DEV=true to force it on when testing the integration.
const DEV_ENABLED = process.env.REACT_APP_POSTHOG_DEV === 'true';

// True once init() has run with a real key. Guards all tracking so the app
// works normally (as a no-op) when analytics is disabled — e.g. local dev.
let enabled = false;

export const isAnalyticsEnabled = () => enabled;

export const initAnalytics = () => {
    if (enabled || !KEY || (!IS_PROD && !DEV_ENABLED)) {
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
    // Stamped on every event, so dev/prod are always distinguishable in the UI.
    posthog.register({ environment: IS_PROD ? 'production' : 'development' });
    enabled = true;
};

export { posthog };
