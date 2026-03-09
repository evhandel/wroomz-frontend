import { StintAnalysisData } from '../components/Main/Main.types';
import { MIN_PENALTY_SECONDS } from './penalties.constants';

export const getPenaltiesByStintLimit = (
    stintsAnalysis: Record<string, StintAnalysisData[]>,
    maxStintDuration: number
) => {
    const penaltiesByStintLimit: Record<string, number> = {};

    for (const team in stintsAnalysis) {
        penaltiesByStintLimit[team] = 0;

        stintsAnalysis[team].forEach((stint) => {
            if (stint.duration > maxStintDuration) {
                const exceeding = stint.duration - maxStintDuration;
                if (exceeding <= MIN_PENALTY_SECONDS) {
                    penaltiesByStintLimit[team] += MIN_PENALTY_SECONDS;
                } else {
                    penaltiesByStintLimit[team] += Math.floor(exceeding + 1); // if exceeding is 20.1 -> 21 penalty
                }
            }
        });
    }

    return penaltiesByStintLimit;
};
