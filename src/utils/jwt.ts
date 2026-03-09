/**
 * Decode JWT payload without external dependencies.
 * Returns null if the token is malformed.
 */
function decodePayload(token: string): { exp?: number } | null {
    try {
        const base64 = token.split('.')[1];
        if (!base64) return null;
        const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(json);
    } catch {
        return null;
    }
}

/**
 * Check whether a JWT token is expired (or will expire within `bufferSeconds`).
 * Returns true if expired, malformed, or missing.
 */
export function isTokenExpired(token: string | null, bufferSeconds = 60): boolean {
    if (!token) return true;
    const payload = decodePayload(token);
    if (!payload?.exp) return true;
    return payload.exp < Date.now() / 1000 + bufferSeconds;
}
