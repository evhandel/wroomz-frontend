import { format, parseISO } from 'date-fns';
import type { LiveChangeoverEvent } from '../types';

export const LIVE_LOG_TEXT_FILENAME = 'wroomz-live-timing.txt';

const formatTimestamp = (iso: string): string => {
    try {
        return format(parseISO(iso), 'yyyy-MM-dd HH:mm:ss');
    } catch {
        return iso;
    }
};

/**
 * Human-readable rendering of the changeover log, e.g.
 *
 *   Wroomz — Live timing log
 *   Exported: 2026-07-09 14:35:10
 *   Changeovers: 2
 *
 *     1. 2026-07-09 14:32:05  Team 7 · stint 1  start: Petrov  (kart #12)
 *     2. 2026-07-09 14:48:20  Team 7 · stint 2  Petrov → Sidorov  (kart #5)
 */
export const formatLiveLogAsText = (events: LiveChangeoverEvent[]): string => {
    const header = [
        'Wroomz — Live timing log',
        `Exported: ${formatTimestamp(new Date().toISOString())}`,
        `Changeovers: ${events.length}`,
        '',
    ];

    const lines = events.map((e, i) => {
        const num = String(i + 1).padStart(3, ' ');
        const time = formatTimestamp(e.capturedAt);
        const change = e.previousPilot
            ? `${e.previousPilot} → ${e.pilot}`
            : `start: ${e.pilot}`;
        const kart = e.kart ? `  (kart #${e.kart})` : '';
        return `${num}. ${time}  Team ${e.team} · stint ${e.stintNumber}  ${change}${kart}`;
    });

    return [...header, ...lines].join('\n') + '\n';
};
