import { detectMinRestViolations } from '../detectMinRestViolations';
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

describe('detectMinRestViolations', () => {
    it('returns [] when minRestSeconds is 0', () => {
        const stintsAnalysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                makeStint({ no: 3, pilot: 'Alice', startTime: 200, endTime: 300 }),
            ],
        };
        expect(detectMinRestViolations(stintsAnalysis, 0)).toEqual([]);
    });

    it('returns [] when minRestSeconds is negative', () => {
        const stintsAnalysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                makeStint({ no: 3, pilot: 'Alice', startTime: 200, endTime: 300 }),
            ],
        };
        expect(detectMinRestViolations(stintsAnalysis, -50)).toEqual([]);
    });

    it("never flags a pilot's first drive", () => {
        const stintsAnalysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
            ],
        };
        expect(detectMinRestViolations(stintsAnalysis, 600)).toEqual([]);
    });

    it('flags a short rest with correct actualSeconds, stintNumber and metadata', () => {
        const stintsAnalysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                makeStint({ no: 3, pilot: 'Alice', startTime: 250, endTime: 350 }),
            ],
        };
        const result = detectMinRestViolations(stintsAnalysis, 300);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            source: 'minRest',
            teamNumber: '1',
            pilot: 'Alice',
            stintNumber: 3,
            actualSeconds: 150, // returnStart(250) - firstEnd(100)
            limitSeconds: 300,
            formulaSeconds: 0,
        });
    });

    it('does not flag when rest is exactly equal to the limit (condition is strict <)', () => {
        const stintsAnalysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                makeStint({ no: 3, pilot: 'Alice', startTime: 400, endTime: 500 }),
            ],
        };
        // rest = 400 - 100 = 300, exactly the limit -> not flagged
        expect(detectMinRestViolations(stintsAnalysis, 300)).toEqual([]);
    });

    it('does not flag when rest is greater than the limit', () => {
        const stintsAnalysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                makeStint({ no: 3, pilot: 'Alice', startTime: 500, endTime: 600 }),
            ],
        };
        // rest = 500 - 100 = 400 > 300 -> not flagged
        expect(detectMinRestViolations(stintsAnalysis, 300)).toEqual([]);
    });

    it('does not treat a self-on-self pit (consecutive same pilot) as rest', () => {
        const stintsAnalysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                // tiny gap that a naive per-stint check would flag, but this is a merged self-pit
                makeStint({ no: 2, pilot: 'Alice', startTime: 105, endTime: 200 }),
            ],
        };
        expect(detectMinRestViolations(stintsAnalysis, 300)).toEqual([]);
    });

    it('flags each return of the same pilot with a distinct stintNumber', () => {
        const stintsAnalysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, endTime: 100 }),
                makeStint({ no: 2, pilot: 'Bob', startTime: 100, endTime: 200 }),
                makeStint({ no: 3, pilot: 'Alice', startTime: 250, endTime: 350 }),
                makeStint({ no: 4, pilot: 'Carol', startTime: 350, endTime: 450 }),
                makeStint({ no: 5, pilot: 'Alice', startTime: 500, endTime: 600 }),
            ],
        };
        const result = detectMinRestViolations(stintsAnalysis, 300);
        expect(result).toHaveLength(2);
        expect(result.map((v) => v.pilot)).toEqual(['Alice', 'Alice']);
        expect(result.map((v) => v.stintNumber)).toEqual([3, 5]);
        expect(result.map((v) => v.actualSeconds)).toEqual([150, 150]);
    });
});
