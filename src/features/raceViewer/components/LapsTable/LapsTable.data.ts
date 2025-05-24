import { useRaceData } from '../../data/useRaceData';
import { formatTime } from '../../helpers/format';

// Hook to get lap times data from backend
export const useLapTimesArray = (raceId: string) => {
    const { data } = useRaceData(raceId);

    if (!data) return { lapTimesArray: [] };

    const lapTimesArray: string[][] = [];
    const emptyLapTimesForOneLap = Array.from({ length: data.results.length }, (_, i) => '-');

    data.results.forEach((result, index) => {
        data.stintsAnalysis[result.teamNumber].forEach(stint => {
            stint.laps.forEach(lapData => {
                if (!lapTimesArray[lapData.no - 1]) {
                    lapTimesArray[lapData.no - 1] = [...emptyLapTimesForOneLap];
                }
                lapTimesArray[lapData.no - 1][index] = formatTime(lapData.time, true);
            });
        });
    });

    return {
        lapTimesArray,
    };
};
