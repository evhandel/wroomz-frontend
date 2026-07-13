// Dev-only reverse proxy for PostHog, so analytics is sent through our own
// origin (localhost:3006/ingest) instead of *.posthog.com — ad blockers drop
// the latter. Mirrors the nginx `/ingest` config used in production.
// CRA loads this file automatically; no wiring needed.
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/ingest/static',
        createProxyMiddleware({
            target: 'https://eu-assets.i.posthog.com',
            changeOrigin: true,
            pathRewrite: { '^/ingest/static': '/static' },
        })
    );
    app.use(
        '/ingest',
        createProxyMiddleware({
            target: 'https://eu.i.posthog.com',
            changeOrigin: true,
            pathRewrite: { '^/ingest': '' },
        })
    );
};
