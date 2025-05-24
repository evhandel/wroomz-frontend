import { raceData } from './stintsAnalysis';
import { useRaceData } from './useRaceData';

export let minLapTime = 999;

// Initialize with static data
for (let teamNumber in raceData.stintsAnalysis) {
    raceData.stintsAnalysis[teamNumber].forEach((stint) =>
        stint.laps.forEach((lapData) => {
            if (lapData.time < minLapTime) {
                minLapTime = lapData.time;
            }
        }),
    );
}

// Hook to get dynamic minLapTime from backend
export const useMinLapTime = (raceId: string) => {
    const { data } = useRaceData(raceId);
    
    if (!data) return minLapTime;
    
    let dynamicMinLapTime = 999;
    
    for (let teamNumber in data.stintsAnalysis) {
        data.stintsAnalysis[teamNumber].forEach((stint) =>
            stint.laps.forEach((lapData) => {
                if (lapData.time < dynamicMinLapTime) {
                    dynamicMinLapTime = lapData.time;
                }
            }),
        );
    }
    
    return dynamicMinLapTime;
};
