import { StintAnalysisData } from '../components/Main/Main.types';
import { MIN_PENALTY_SECONDS } from './penalties.constants';

export const getPenaltiesByPilotLimit = (
    stintsAnalysis: Record<string, StintAnalysisData[]>,
    minForPilotByTeamSize: Record<number, number>
) => {
    const penaltiesByPilotLimit: Record<string, number> = {};

    for (const team in stintsAnalysis) {
        penaltiesByPilotLimit[team] = 0;

        const durationByPilots: Record<string, number> = {};

        stintsAnalysis[team].forEach((stint) => {
            if (typeof durationByPilots[stint.pilot] === 'undefined') {
                durationByPilots[stint.pilot] = 0;
            }

            durationByPilots[stint.pilot] += stint.duration;
        });

        const pilotsQuantity = Object.keys(durationByPilots).length;
        const limit = minForPilotByTeamSize[pilotsQuantity];

        if (limit === undefined) continue;

        for (const pilot in durationByPilots) {
            if (durationByPilots[pilot] < limit) {
                const underseating = limit - durationByPilots[pilot];

                if (underseating < MIN_PENALTY_SECONDS) {
                    penaltiesByPilotLimit[team] += MIN_PENALTY_SECONDS;
                } else {
                    penaltiesByPilotLimit[team] += Math.floor(underseating + 1);
                }
            }
        }
    }

    return penaltiesByPilotLimit;
};
