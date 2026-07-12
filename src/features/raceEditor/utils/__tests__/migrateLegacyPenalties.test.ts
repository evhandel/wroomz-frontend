import { migrateLegacyPenalties } from '../migrateLegacyPenalties';
import type { Penalty } from '@evhandel/wroomz-types';

describe('migrateLegacyPenalties', () => {
    it('returns [] for null', () => {
        expect(migrateLegacyPenalties(null)).toEqual([]);
    });

    it('returns [] for undefined', () => {
        expect(migrateLegacyPenalties(undefined)).toEqual([]);
    });

    it('returns [] for unrelated shapes', () => {
        expect(migrateLegacyPenalties('hello')).toEqual([]);
        expect(migrateLegacyPenalties(42)).toEqual([]);
        expect(migrateLegacyPenalties({ foo: 'bar' })).toEqual([]);
    });

    it('passes through a valid Penalty[] array', () => {
        const items: Penalty[] = [
            {
                id: 'a',
                teamNumber: '1',
                seconds: 30,
                description: 'manual one',
                source: 'manual',
            },
            {
                id: 'b',
                teamNumber: '2',
                seconds: 15,
                description: 'auto one',
                source: 'stintLimit',
                metadata: { pilot: 'Alice', stintNumber: 1 },
            },
        ];
        expect(migrateLegacyPenalties(items)).toEqual(items);
    });

    it('drops malformed entries from a mixed array', () => {
        const items = [
            {
                id: 'a',
                teamNumber: '1',
                seconds: 30,
                description: 'ok',
                source: 'manual',
            },
            { id: 'b', teamNumber: '2' },
            null,
            'garbage',
            {
                id: 'c',
                teamNumber: '3',
                seconds: 10,
                description: 'unknown source',
                source: 'bogus',
            },
        ];
        const result = migrateLegacyPenalties(items);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('a');
    });

    it('maps Record<string, number> legacy form to manual Penalty[]', () => {
        const legacy = { '5': 30, '7': 15 };
        const result = migrateLegacyPenalties(legacy);
        expect(result).toHaveLength(2);

        const team5 = result.find((p) => p.teamNumber === '5');
        expect(team5).toBeDefined();
        expect(team5!.seconds).toBe(30);
        expect(team5!.source).toBe('manual');
        expect(team5!.description).toBe('Manual penalty');
        expect(typeof team5!.id).toBe('string');
        expect(team5!.id.length).toBeGreaterThan(0);

        const team7 = result.find((p) => p.teamNumber === '7');
        expect(team7).toBeDefined();
        expect(team7!.seconds).toBe(15);
    });

    it('returns [] for legacy-shaped object with non-number values', () => {
        const notLegacy = { '5': 'thirty' };
        expect(migrateLegacyPenalties(notLegacy)).toEqual([]);
    });

    it('returns [] for empty array (no entries to validate)', () => {
        expect(migrateLegacyPenalties([])).toEqual([]);
    });

    it('returns [] for empty object (legacy with no entries → maps to [])', () => {
        expect(migrateLegacyPenalties({})).toEqual([]);
    });

    it('round-trips a Penalty[] entry with servedInRace=true unchanged', () => {
        const items: Penalty[] = [
            {
                id: 'srv-1',
                teamNumber: '4',
                seconds: 0,
                description: 'Served in race',
                source: 'manual',
                servedInRace: true,
            },
        ];
        expect(migrateLegacyPenalties(items)).toEqual(items);
    });

    it('drops zero-second entries from legacy Record<string, number>', () => {
        const legacy = { '3': 0 };
        expect(migrateLegacyPenalties(legacy)).toEqual([]);
    });

    it('keeps only non-zero entries from a mixed legacy Record<string, number>', () => {
        const legacy = { '1': 30, '2': 0, '3': 15 };
        const result = migrateLegacyPenalties(legacy);
        expect(result).toHaveLength(2);
        const teams = result.map((p) => p.teamNumber).sort();
        expect(teams).toEqual(['1', '3']);
        expect(result.every((p) => p.seconds !== 0)).toBe(true);
        expect(result.every((p) => p.source === 'manual')).toBe(true);
    });
});
