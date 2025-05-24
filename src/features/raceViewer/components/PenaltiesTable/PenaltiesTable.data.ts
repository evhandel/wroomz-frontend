import { useRaceData } from '../../data/useRaceData';

export const usePenalties = (raceId: string) => {
    const { data } = useRaceData(raceId);

    if (!data) return { penaltiesManual: [], penaltiesByStintLimit: [], penaltiesByPilotLimit: [] };

    const penaltiesManual: number[] = [];
    const penaltiesByStintLimit: number[] = [];
    const penaltiesByPilotLimit: number[] = [];

    data.results.forEach((result, index) => {
        penaltiesManual.push(data.penalties.penaltiesManual[result.teamNumber] ?? 0);
        penaltiesByStintLimit.push(data.penalties.penaltiesByStintLimit[result.teamNumber] ?? 0);
        penaltiesByPilotLimit.push(data.penalties.penaltiesByPilotLimit[result.teamNumber] ?? 0);
    });

    return {
        penaltiesManual,
        penaltiesByStintLimit,
        penaltiesByPilotLimit,
    };
};
