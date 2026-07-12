import { v4 as uuidv4 } from 'uuid';
import type { Penalty, PenaltySource } from '@evhandel/wroomz-types';

const VALID_SOURCES: ReadonlySet<PenaltySource> = new Set<PenaltySource>([
    'manual',
    'stintLimit',
    'pilotLimit',
    'minRest',
]);

const isPenaltyShape = (raw: unknown): raw is Penalty => {
    if (!raw || typeof raw !== 'object') return false;
    const p = raw as Record<string, unknown>;
    return (
        typeof p.id === 'string' &&
        typeof p.teamNumber === 'string' &&
        typeof p.seconds === 'number' &&
        typeof p.description === 'string' &&
        typeof p.source === 'string' &&
        VALID_SOURCES.has(p.source as PenaltySource)
    );
};

const isLegacyRecord = (raw: unknown): raw is Record<string, number> => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return false;
    return Object.values(raw as Record<string, unknown>).every((v) => typeof v === 'number');
};

export const migrateLegacyPenalties = (stored: unknown): Penalty[] => {
    if (Array.isArray(stored)) {
        return stored.filter(isPenaltyShape);
    }

    if (isLegacyRecord(stored)) {
        return Object.entries(stored)
            .filter(([, seconds]) => seconds !== 0)
            .map(([teamNumber, seconds]) => ({
                id: uuidv4(),
                teamNumber,
                seconds,
                description: 'Manual penalty',
                source: 'manual' as const,
            }));
    }

    return [];
};
