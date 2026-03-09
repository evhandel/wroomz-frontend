import { getPenaltiesByPilotLimit } from '../getPenaltiesByPilotLimit';
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

describe('getPenaltiesByPilotLimit', () => {
    it('returns 0 when all pilots meet minimum', () => {
        const stintsAnalysis = {
            '1': [makeStint('Alice', 1000), makeStint('Bob', 1000)],
        };
        const result = getPenaltiesByPilotLimit(stintsAnalysis, defaultLimits);
        expect(result['1']).toBe(0);
    });

    it('applies minimum penalty for small underseating', () => {
        const stintsAnalysis = {
            '1': [makeStint('Alice', 1500), makeStint('Bob', 895)],
        };
        const result = getPenaltiesByPilotLimit(stintsAnalysis, defaultLimits);
        expect(result['1']).toBe(15);
    });

    it('applies proportional penalty for large underseating', () => {
        const stintsAnalysis = {
            '1': [makeStint('Alice', 1500), makeStint('Bob', 870)],
        };
        const result = getPenaltiesByPilotLimit(stintsAnalysis, defaultLimits);
        expect(result['1']).toBe(31); // 900 - 870 = 30 → floor(30 + 1) = 31
    });

    it('skips penalty for solo pilot (team size 1)', () => {
        const stintsAnalysis = {
            '1': [makeStint('Alice', 500)],
        };
        const result = getPenaltiesByPilotLimit(stintsAnalysis, defaultLimits);
        expect(result['1']).toBe(0);
    });

    it('applies penalty for team of 5 pilots', () => {
        const stintsAnalysis = {
            '1': [
                makeStint('A', 400),
                makeStint('B', 400),
                makeStint('C', 400),
                makeStint('D', 400),
                makeStint('E', 300),
            ],
        };
        const result = getPenaltiesByPilotLimit(stintsAnalysis, defaultLimits);
        // E has 300, limit is 360, underseating = 60 → floor(60 + 1) = 61
        expect(result['1']).toBe(61);
    });

    it('applies penalty for team of 6 pilots', () => {
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
        const result = getPenaltiesByPilotLimit(stintsAnalysis, defaultLimits);
        // F has 250, limit is 300, underseating = 50 → floor(50 + 1) = 51
        expect(result['1']).toBe(51);
    });
});
