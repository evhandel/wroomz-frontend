import { useRaceData } from '../../data/useRaceData';
import { LapTimesArray } from './LapsTable.types';

// Hook to get lap times data from backend
export const useLapTimesArray = (raceId: string) => {
    const { data } = useRaceData(raceId);

    if (!data) return { lapTimesArray: [] as LapTimesArray };

    const lapTimesArray: LapTimesArray = [];
    const emptyLapTimesForOneLap = Array.from({ length: data.results.length }, () => null);

    data.results.forEach((result, index) => {
        data.stintsAnalysis[result.teamNumber].forEach((stint, stintIndex) => {
            stint.laps.forEach((lapData) => {
                if (!lapTimesArray[lapData.no - 1]) {
                    lapTimesArray[lapData.no - 1] = [...emptyLapTimesForOneLap];
                }
                lapTimesArray[lapData.no - 1][index] = {
                    time: lapData.time,
                    stintIndex,
                };
            });
        });
    });

    return {
        lapTimesArray,
    };
};
