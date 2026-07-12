import { regenerateAutoPenalties } from '../regenerateAutoPenalties';
import type { Penalty } from '@evhandel/wroomz-types';
import { StintAnalysisData } from '../../components/Main/Main.types';

const makeStint = (
    duration: number,
    overrides: Partial<StintAnalysisData> = {}
): StintAnalysisData => ({
    no: 1,
    laps: [],
    startGap: 0,
    startTime: 0,
    endTime: duration,
    duration,
    avgLapExcludingPitExitLap: 0,
    bestLap: 0,
    pilot: 'Alice',
    kart: 'K1',
    ...overrides,
});

const baseInput = {
    stintsAnalysis: {} as Record<string, StintAnalysisData[]>,
    maxStintSeconds: 1800,
    minForPilotByTeamSizeSeconds: { 2: 900 },
    autoChargeEnabled: true,
    mergeConsecutiveStints: false,
    minRestSeconds: 0,
};

describe('regenerateAutoPenalties', () => {
    it('preserves manual penalties verbatim', () => {
        const manual: Penalty = {
            id: 'm1',
            teamNumber: '5',
            seconds: 30,
            description: 'Late pit',
            source: 'manual',
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            previousItems: [manual],
        });
        expect(result.filter((p) => p.source === 'manual')).toEqual([manual]);
    });

    it('rebuilds auto items from scratch when no prior auto records', () => {
        const result = regenerateAutoPenalties({
            ...baseInput,
            previousItems: [],
            stintsAnalysis: {
                '1': [makeStint(1820.1, { pilot: 'Alice', no: 1 })],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            source: 'stintLimit',
            teamNumber: '1',
            seconds: 21,
        });
        expect(result[0].id).toBeTruthy();
        expect(result[0].description).toContain('Stint limit exceeded');
    });

    it('preserves edited seconds across regeneration but rebuilds description', () => {
        const previousAuto: Penalty = {
            id: 'auto-1',
            teamNumber: '1',
            seconds: 99,
            description: 'stale text',
            source: 'stintLimit',
            userEditedSeconds: true,
            metadata: { pilot: 'Alice', stintNumber: 1 },
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            previousItems: [previousAuto],
            stintsAnalysis: {
                '1': [makeStint(1820.1, { pilot: 'Alice', no: 1 })],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0].seconds).toBe(99);
        expect(result[0].userEditedSeconds).toBe(true);
        expect(result[0].description).toContain('Stint limit exceeded');
        expect(result[0].description).not.toBe('stale text');
        expect(result[0].id).toBe('auto-1');
    });

    it('produces seconds=0 when autoChargeEnabled=false (and no prior edit)', () => {
        const result = regenerateAutoPenalties({
            ...baseInput,
            autoChargeEnabled: false,
            previousItems: [],
            stintsAnalysis: {
                '1': [makeStint(1820.1, { pilot: 'Alice', no: 1 })],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0].seconds).toBe(0);
    });

    it('preserves operator-edited seconds even when autoChargeEnabled=false', () => {
        const previousAuto: Penalty = {
            id: 'auto-1',
            teamNumber: '1',
            seconds: 42,
            description: 'old',
            source: 'stintLimit',
            userEditedSeconds: true,
            metadata: { pilot: 'Alice', stintNumber: 1 },
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            autoChargeEnabled: false,
            previousItems: [previousAuto],
            stintsAnalysis: {
                '1': [makeStint(1820.1, { pilot: 'Alice', no: 1 })],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0].seconds).toBe(42);
        expect(result[0].userEditedSeconds).toBe(true);
    });

    it('drops auto record when violation disappears, even if previously edited', () => {
        const previousAuto: Penalty = {
            id: 'auto-1',
            teamNumber: '1',
            seconds: 42,
            description: 'old',
            source: 'stintLimit',
            userEditedSeconds: true,
            metadata: { pilot: 'Alice', stintNumber: 1 },
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            previousItems: [previousAuto],
            stintsAnalysis: {
                '1': [makeStint(1700, { pilot: 'Alice', no: 1 })],
            },
        });
        expect(result).toEqual([]);
    });

    it('returns manual + auto in [...manual, ...auto] order', () => {
        const manual: Penalty = {
            id: 'm1',
            teamNumber: '5',
            seconds: 30,
            description: 'Late pit',
            source: 'manual',
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            previousItems: [manual],
            stintsAnalysis: {
                '1': [makeStint(1820.1, { pilot: 'Alice', no: 1 })],
            },
        });
        expect(result).toHaveLength(2);
        expect(result[0].source).toBe('manual');
        expect(result[1].source).toBe('stintLimit');
    });

    it('handles pilot-limit violations and uses pilot+source for matching', () => {
        const previousAuto: Penalty = {
            id: 'pilot-1',
            teamNumber: '1',
            seconds: 50,
            description: 'old',
            source: 'pilotLimit',
            userEditedSeconds: true,
            metadata: { pilot: 'Bob', teamSize: 2 },
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            previousItems: [previousAuto],
            stintsAnalysis: {
                '1': [makeStint(1500, { pilot: 'Alice' }), makeStint(870, { pilot: 'Bob' })],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0].source).toBe('pilotLimit');
        expect(result[0].seconds).toBe(50);
        expect(result[0].id).toBe('pilot-1');
    });

    it('carries servedInRace=true from prior auto penalty (seconds reset to 0)', () => {
        const previousAuto: Penalty = {
            id: 'auto-1',
            teamNumber: '1',
            seconds: 21,
            description: 'old',
            source: 'stintLimit',
            servedInRace: true,
            metadata: { pilot: 'Alice', stintNumber: 1 },
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            previousItems: [previousAuto],
            stintsAnalysis: {
                '1': [makeStint(1820.1, { pilot: 'Alice', no: 1 })],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0].servedInRace).toBe(true);
        expect(result[0].seconds).toBe(0);
        expect(result[0].id).toBe('auto-1');
    });

    it('served wins over userEditedSeconds: seconds=0 and userEditedSeconds is dropped', () => {
        const previousAuto: Penalty = {
            id: 'auto-1',
            teamNumber: '1',
            seconds: 99,
            description: 'old',
            source: 'stintLimit',
            servedInRace: true,
            userEditedSeconds: true,
            metadata: { pilot: 'Alice', stintNumber: 1 },
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            previousItems: [previousAuto],
            stintsAnalysis: {
                '1': [makeStint(1820.1, { pilot: 'Alice', no: 1 })],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0].servedInRace).toBe(true);
        expect(result[0].seconds).toBe(0);
        expect(result[0].userEditedSeconds).toBeUndefined();
        expect(result[0]).not.toHaveProperty('userEditedSeconds');
    });

    it('builds a minRest penalty (seconds=0) with correct metadata when minRestSeconds>0', () => {
        const result = regenerateAutoPenalties({
            ...baseInput,
            minForPilotByTeamSizeSeconds: {},
            minRestSeconds: 300,
            previousItems: [],
            stintsAnalysis: {
                '1': [
                    makeStint(100, { no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                    makeStint(100, { no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                    makeStint(100, { no: 3, pilot: 'Alice', startTime: 250, endTime: 350 }),
                ],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            source: 'minRest',
            teamNumber: '1',
            seconds: 0,
            metadata: {
                pilot: 'Alice',
                stintNumber: 3,
                actualSeconds: 150,
                limitSeconds: 300,
            },
        });
        expect(result[0].description).toContain('Min rest');
    });

    it('retains userEditedSeconds on a prior minRest penalty (formulaSeconds=0 does not override)', () => {
        const previousAuto: Penalty = {
            id: 'rest-1',
            teamNumber: '1',
            seconds: 25,
            description: 'old',
            source: 'minRest',
            userEditedSeconds: true,
            metadata: { pilot: 'Alice', stintNumber: 3 },
        };
        const result = regenerateAutoPenalties({
            ...baseInput,
            minForPilotByTeamSizeSeconds: {},
            minRestSeconds: 300,
            previousItems: [previousAuto],
            stintsAnalysis: {
                '1': [
                    makeStint(100, { no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                    makeStint(100, { no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                    makeStint(100, { no: 3, pilot: 'Alice', startTime: 250, endTime: 350 }),
                ],
            },
        });
        expect(result).toHaveLength(1);
        expect(result[0].source).toBe('minRest');
        expect(result[0].seconds).toBe(25);
        expect(result[0].userEditedSeconds).toBe(true);
        expect(result[0].id).toBe('rest-1');
    });

    it('keeps stintLimit and minRest as distinct penalties even when team/pilot/stintNumber match', () => {
        const result = regenerateAutoPenalties({
            ...baseInput,
            minForPilotByTeamSizeSeconds: {},
            minRestSeconds: 300,
            previousItems: [],
            stintsAnalysis: {
                '1': [
                    makeStint(100, { no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                    makeStint(100, { no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                    // Alice returns after a short rest (minRest) AND drives over the limit (stintLimit)
                    makeStint(2000, { no: 3, pilot: 'Alice', startTime: 250, endTime: 2250 }),
                ],
            },
        });
        expect(result).toHaveLength(2);
        const sources = result.map((p) => p.source).sort();
        expect(sources).toEqual(['minRest', 'stintLimit']);
        result.forEach((p) => {
            expect(p.teamNumber).toBe('1');
            expect(p.metadata?.pilot).toBe('Alice');
            expect(p.metadata?.stintNumber).toBe(3);
        });
    });
});
