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
        // Must be explicit: posthog-js defaults capture_pageleave to
        // "if_capture_pageview", so disabling capture_pageview above also silently
        // drops $pageleave. Without it a read-only session (e.g. raceViewer, no
        // clicks) has a single $pageview event and $session_duration collapses to ~0.
        capture_pageleave: true,
        // Autocapture clicks / inputs / form submits out of the box.
        autocapture: true,
        // Record every session. Note: the master on/off, sampling rate and
        // minimum-duration cutoff live in the PostHog project settings (Session
        // Replay) — to truly capture 100% of sessions, sampling must be 100% and
        // minimum duration 0 there. This block only controls *how* we record.
        disable_session_recording: false,
        session_recording: {
            // Show real typed input (email, names, free text) in replays.
            // Password fields are always masked regardless of this flag.
            maskAllInputs: false,
        },
    });
    // Stamped on every event, so dev/prod are always distinguishable in the UI.
    posthog.register({ environment: IS_PROD ? 'production' : 'development' });
    enabled = true;
};

export { posthog };
