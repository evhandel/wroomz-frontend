import { StintAnalysisData } from '../components/Main/Main.types';
import { MIN_PENALTY_SECONDS } from './penalties.constants';

export interface PilotLimitViolation {
    source: 'pilotLimit';
    teamNumber: string;
    pilot: string;
    actualSeconds: number;
    limitSeconds: number;
    teamSize: number;
    formulaSeconds: number;
}

const computePilotFormulaSeconds = (actualSeconds: number, limitSeconds: number): number => {
    const underseating = limitSeconds - actualSeconds;
    if (underseating < MIN_PENALTY_SECONDS) {
        return MIN_PENALTY_SECONDS;
    }
    return Math.floor(underseating + 1);
};

export const detectPilotLimitViolations = (
    stintsAnalysis: Record<string, StintAnalysisData[]>,
    minForPilotByTeamSize: Record<number, number>
): PilotLimitViolation[] => {
    const violations: PilotLimitViolation[] = [];

    for (const teamNumber in stintsAnalysis) {
        const durationByPilots: Record<string, number> = {};

        stintsAnalysis[teamNumber].forEach((stint) => {
            if (typeof durationByPilots[stint.pilot] === 'undefined') {
                durationByPilots[stint.pilot] = 0;
            }
            durationByPilots[stint.pilot] += stint.duration;
        });

        const teamSize = Object.keys(durationByPilots).length;
        const limit = minForPilotByTeamSize[teamSize];
        if (limit === undefined || limit <= 0) continue;

        for (const pilot in durationByPilots) {
            const actual = durationByPilots[pilot];
            if (actual < limit) {
                violations.push({
                    source: 'pilotLimit',
                    teamNumber,
                    pilot,
                    actualSeconds: actual,
                    limitSeconds: limit,
                    teamSize,
                    formulaSeconds: computePilotFormulaSeconds(actual, limit),
                });
            }
        }
    }

    return violations;
};
