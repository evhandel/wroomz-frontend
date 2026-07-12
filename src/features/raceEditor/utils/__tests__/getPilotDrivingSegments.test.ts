import { getPilotDrivingSegments } from '../getPilotDrivingSegments';
import { StintAnalysisData } from '../../components/Main/Main.types';

const makeStint = (overrides: Partial<StintAnalysisData> = {}): StintAnalysisData => ({
    no: 1,
    laps: [],
    startGap: 0,
    startTime: 0,
    endTime: 100,
    duration: 100,
    avgLapExcludingPitExitLap: 0,
    bestLap: 0,
    pilot: 'Alice',
    kart: 'K1',
    ...overrides,
});

describe('getPilotDrivingSegments', () => {
    it('merges adjacent same-pilot stints: sums duration, keeps first stint number and outer times', () => {
        const stints = [
            makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100, duration: 100 }),
            makeStint({ no: 2, pilot: 'Alice', startTime: 100, endTime: 250, duration: 150 }),
        ];
        const result = getPilotDrivingSegments(stints);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            pilot: 'Alice',
            firstStintNumber: 1,
            startTime: 0,
            endTime: 250,
            duration: 250,
        });
    });

    it('breaks a segment on pilot change (A, B -> two segments)', () => {
        const stints = [
            makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100, duration: 100 }),
            makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 220, duration: 120 }),
        ];
        const result = getPilotDrivingSegments(stints);
        expect(result).toHaveLength(2);
        expect(result.map((s) => s.pilot)).toEqual(['Alice', 'Bob']);
        expect(result.map((s) => s.firstStintNumber)).toEqual([1, 2]);
    });

    it('keeps non-adjacent same pilot as two separate segments (A, B, A)', () => {
        const stints = [
            makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100, duration: 100 }),
            makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 200, duration: 100 }),
            makeStint({ no: 3, pilot: 'Alice', startTime: 200, endTime: 320, duration: 120 }),
        ];
        const result = getPilotDrivingSegments(stints);
        expect(result).toHaveLength(3);
        expect(result.map((s) => s.pilot)).toEqual(['Alice', 'Bob', 'Alice']);
        expect(result[0].firstStintNumber).toBe(1);
        expect(result[2].firstStintNumber).toBe(3);
        expect(result[0].duration).toBe(100);
        expect(result[2].duration).toBe(120);
    });

    it('sorts unsorted input by startTime before merging', () => {
        const stints = [
            makeStint({ no: 3, pilot: 'Alice', startTime: 200, endTime: 320, duration: 120 }),
            makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100, duration: 100 }),
            makeStint({ no: 2, pilot: 'Alice', startTime: 100, endTime: 200, duration: 100 }),
        ];
        const result = getPilotDrivingSegments(stints);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            pilot: 'Alice',
            firstStintNumber: 1,
            startTime: 0,
            endTime: 320,
            duration: 320,
        });
    });

    it('merges same pilot across different karts (merge is by pilot name, ignoring kart)', () => {
        const stints = [
            makeStint({ no: 1, pilot: 'Alice', kart: 'K1', startTime: 0, endTime: 100, duration: 100 }),
            makeStint({ no: 2, pilot: 'Alice', kart: 'K9', startTime: 100, endTime: 250, duration: 150 }),
        ];
        const result = getPilotDrivingSegments(stints);
        expect(result).toHaveLength(1);
        expect(result[0].duration).toBe(250);
        expect(result[0].firstStintNumber).toBe(1);
    });

    it('returns a single segment for a single stint', () => {
        const stints = [
            makeStint({ no: 7, pilot: 'Bob', startTime: 50, endTime: 180, duration: 130 }),
        ];
        const result = getPilotDrivingSegments(stints);
        expect(result).toEqual([
            {
                pilot: 'Bob',
                firstStintNumber: 7,
                startTime: 50,
                endTime: 180,
                duration: 130,
            },
        ]);
    });

    it('returns [] for empty input', () => {
        expect(getPilotDrivingSegments([])).toEqual([]);
    });
});
