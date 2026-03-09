import { getPenaltiesByStintLimit } from '../getPenaltiesByStintLimit';
import { StintAnalysisData } from '../../components/Main/Main.types';

const makeStint = (duration: number): StintAnalysisData => ({
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
});

describe('getPenaltiesByStintLimit', () => {
    it('returns 0 penalty when stint is within limit', () => {
        const stintsAnalysis = { '1': [makeStint(1800)] };
        const result = getPenaltiesByStintLimit(stintsAnalysis, 1800);
        expect(result['1']).toBe(0);
    });

    it('applies minimum penalty for small exceedance', () => {
        const stintsAnalysis = { '1': [makeStint(1805)] };
        const result = getPenaltiesByStintLimit(stintsAnalysis, 1800);
        expect(result['1']).toBe(15);
    });

    it('applies proportional penalty for large exceedance', () => {
        const stintsAnalysis = { '1': [makeStint(1820.1)] };
        const result = getPenaltiesByStintLimit(stintsAnalysis, 1800);
        expect(result['1']).toBe(21);
    });
});
