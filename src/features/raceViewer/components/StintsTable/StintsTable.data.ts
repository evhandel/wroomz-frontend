import { useRaceData } from '../../data/useRaceData';
import { StintFormatted } from './StintsTable.types';

// Hook to get stints data from backend
export const useStints = (raceId: string) => {
    const { data: raceDataFromApi } = useRaceData(raceId);

    if (!raceDataFromApi) return [];

    // Data calculations
    const maxStints = raceDataFromApi.results.reduce(
        (acc, result) => (result.stintsQuantity > acc ? result.stintsQuantity : acc),
        0
    );

    const stintIndexesList = Array.from({ length: maxStints }, (_, i) => i);

    const stints: StintFormatted[][] = stintIndexesList.map(stintIndex => {
        const stintData: StintFormatted[] = [];
        raceDataFromApi.results.forEach(result => {
            stintData.push({
                ...raceDataFromApi.stintsAnalysis[result.teamNumber][stintIndex],
                teamNumber: result.teamNumber,
            });
        });

        return stintData;
    });

    return stints;
};
