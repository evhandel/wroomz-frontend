import { StintAlalysisData } from '../components/Main/Main.types';

export const getPenaltiesByPilotLimit = (
    stintsAnalysis: Record<string, StintAlalysisData[]>,
    minForPilotIfTwo: number,
    minForPilotIfThree: number,
    minForPilotIfFour: number
) => {
    const penaltiesByPilotLimit: Record<string, number> = {};

    const limitation = {
        2: minForPilotIfTwo,
        3: minForPilotIfThree,
        4: minForPilotIfFour,
    };

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

        for (const pilot in durationByPilots) {
            if (durationByPilots[pilot] < limitation[pilotsQuantity as keyof typeof limitation]) {
                const underseating =
                    limitation[pilotsQuantity as keyof typeof limitation] - durationByPilots[pilot];

                if (underseating < 15) {
                    penaltiesByPilotLimit[team] += 15;
                } else {
                    penaltiesByPilotLimit[team] += Math.floor(underseating + 1) ;
                }
            }
        }
    }

    return penaltiesByPilotLimit;
};
