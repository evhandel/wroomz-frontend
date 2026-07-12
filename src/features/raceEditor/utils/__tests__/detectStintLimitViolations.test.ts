import { detectStintLimitViolations } from '../detectStintLimitViolations';
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
    pilot: 'Driver',
    kart: 'K1',
    ...overrides,
});

describe('detectStintLimitViolations', () => {
    it('returns no violations when stint is within limit', () => {
        const stintsAnalysis = { '1': [makeStint(1800)] };
        const result = detectStintLimitViolations(stintsAnalysis, 1800);
        expect(result).toEqual([]);
    });

    it('flags small exceedance with MIN_PENALTY_SECONDS formula', () => {
        const stintsAnalysis = { '1': [makeStint(1805)] };
        const result = detectStintLimitViolations(stintsAnalysis, 1800);
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            source: 'stintLimit',
            teamNumber: '1',
            pilot: 'Driver',
            stintNumber: 1,
            actualSeconds: 1805,
            limitSeconds: 1800,
            formulaSeconds: 15,
        });
    });

    it('flags large exceedance with proportional formula', () => {
        const stintsAnalysis = { '1': [makeStint(1820.1)] };
        const result = detectStintLimitViolations(stintsAnalysis, 1800);
        expect(result).toHaveLength(1);
        expect(result[0].formulaSeconds).toBe(21);
    });

    it('emits one violation per offending stint with correct stintNumber/pilot', () => {
        const stintsAnalysis = {
            '1': [
                makeStint(1820.1, { no: 1, pilot: 'Alice' }),
                makeStint(1810, { no: 2, pilot: 'Bob' }),
                makeStint(1700, { no: 3, pilot: 'Alice' }),
            ],
        };
        const result = detectStintLimitViolations(stintsAnalysis, 1800);
        expect(result).toHaveLength(2);
        expect(result.map((v) => v.stintNumber)).toEqual([1, 2]);
        expect(result.map((v) => v.pilot)).toEqual(['Alice', 'Bob']);
    });

    it('mergeConsecutive=true: two short consecutive same-pilot stints (sum over limit) yield ONE merged violation', () => {
        const stintsAnalysis = {
            '1': [
                makeStint(1000, {
                    no: 1,
                    pilot: 'Alice',
                    startTime: 0,
                    endTime: 1000,
                }),
                makeStint(1000, {
                    no: 2,
                    pilot: 'Alice',
                    startTime: 1000,
                    endTime: 2000,
                }),
            ],
        };
        const result = detectStintLimitViolations(stintsAnalysis, 1800, true);
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            source: 'stintLimit',
            teamNumber: '1',
            pilot: 'Alice',
            stintNumber: 1,
            actualSeconds: 2000,
            limitSeconds: 1800,
        });
    });

    it('mergeConsecutive=false: the same split-stint input yields NO violation (flag matters)', () => {
        const stintsAnalysis = {
            '1': [
                makeStint(1000, {
                    no: 1,
                    pilot: 'Alice',
                    startTime: 0,
                    endTime: 1000,
                }),
                makeStint(1000, {
                    no: 2,
                    pilot: 'Alice',
                    startTime: 1000,
                    endTime: 2000,
                }),
            ],
        };
        expect(detectStintLimitViolations(stintsAnalysis, 1800)).toEqual([]);
        expect(detectStintLimitViolations(stintsAnalysis, 1800, false)).toEqual([]);
    });
});
