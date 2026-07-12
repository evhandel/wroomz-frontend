import { detectPilotLimitViolations } from '../detectPilotLimitViolations';
import { StintAnalysisData } from '../../components/Main/Main.types';

const makeStint = (pilot: string, duration: number): StintAnalysisData => ({
    no: 1,
    laps: [],
    startGap: 0,
    startTime: 0,
    endTime: duration,
    duration,
    avgLapExcludingPitExitLap: 0,
    bestLap: 0,
    pilot,
    kart: 'K1',
});

const defaultLimits: Record<number, number> = { 2: 900, 3: 600, 4: 450, 5: 360, 6: 300 };

describe('detectPilotLimitViolations', () => {
    it('returns no violations when all pilots meet minimum', () => {
        const stintsAnalysis = {
            '1': [makeStint('Alice', 1000), makeStint('Bob', 1000)],
        };
        const result = detectPilotLimitViolations(stintsAnalysis, defaultLimits);
        expect(result).toEqual([]);
    });

    it('flags small underseating with MIN_PENALTY_SECONDS', () => {
        const stintsAnalysis = {
            '1': [makeStint('Alice', 1500), makeStint('Bob', 895)],
        };
        const result = detectPilotLimitViolations(stintsAnalysis, defaultLimits);
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            source: 'pilotLimit',
            teamNumber: '1',
            pilot: 'Bob',
            actualSeconds: 895,
            limitSeconds: 900,
            teamSize: 2,
            formulaSeconds: 15,
        });
    });

    it('flags large underseating with proportional formula', () => {
        const stintsAnalysis = {
            '1': [makeStint('Alice', 1500), makeStint('Bob', 870)],
        };
        const result = detectPilotLimitViolations(stintsAnalysis, defaultLimits);
        expect(result).toHaveLength(1);
        expect(result[0].formulaSeconds).toBe(31);
    });

    it('skips solo pilot (team size 1, no entry in limits map)', () => {
        const stintsAnalysis = { '1': [makeStint('Alice', 500)] };
        const result = detectPilotLimitViolations(stintsAnalysis, defaultLimits);
        expect(result).toEqual([]);
    });

    it('flags one violation in a team of 5', () => {
        const stintsAnalysis = {
            '1': [
                makeStint('A', 400),
                makeStint('B', 400),
                makeStint('C', 400),
                makeStint('D', 400),
                makeStint('E', 300),
            ],
        };
        const result = detectPilotLimitViolations(stintsAnalysis, defaultLimits);
        expect(result).toHaveLength(1);
        expect(result[0].pilot).toBe('E');
        expect(result[0].formulaSeconds).toBe(61);
        expect(result[0].teamSize).toBe(5);
    });

    it('flags one violation in a team of 6', () => {
        const stintsAnalysis = {
            '1': [
                makeStint('A', 400),
                makeStint('B', 400),
                makeStint('C', 400),
                makeStint('D', 400),
                makeStint('E', 400),
                makeStint('F', 250),
            ],
        };
        const result = detectPilotLimitViolations(stintsAnalysis, defaultLimits);
        expect(result).toHaveLength(1);
        expect(result[0].pilot).toBe('F');
        expect(result[0].formulaSeconds).toBe(51);
        expect(result[0].teamSize).toBe(6);
    });
});
