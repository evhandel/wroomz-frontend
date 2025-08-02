import { StintAlalysisData } from '../components/Main/Main.types';

export const getPenaltiesByStintLimit = (
    stintsAnalysis: Record<string, StintAlalysisData[]>,
    maxStintDuration: number,
    // minStintsQuantity: number
) => {
    const penaltiesByStintLimit: Record<string, number> = {};

    for (const team in stintsAnalysis) {
        penaltiesByStintLimit[team] = 0;

        stintsAnalysis[team].forEach((stint) => {
            if (stint.duration > maxStintDuration) {
                const exceeding = stint.duration - maxStintDuration;
                if (exceeding <= 15) {
                    penaltiesByStintLimit[team] += 15;
                } else {
                    penaltiesByStintLimit[team] += Math.floor(exceeding + 1); // if exceeding is 20.1 -> 21 penalty
                }
            }
        });

        //TODO add manual DSQ option for team
        // if (stintsAnalysis[team].length < minStintsQuantity) {
        //     penaltiesByStintLimit[team] += 10000;
        // }
    }

    return penaltiesByStintLimit;
};
