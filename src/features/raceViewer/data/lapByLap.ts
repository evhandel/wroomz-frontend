import { raceData } from './stintsAnalysis';
import { useRaceData } from './useRaceData';

type lapByLapItem = Record<
    string,
    {
        lapTime: number;
        elapsedTime: number;
        pilot: string;
        stint: number;
        kart: string;
    }
>;

export const lapByLap: lapByLapItem[] = [];

// Initialize with static data
for (let team in raceData.stintsAnalysis) {
    raceData.stintsAnalysis[team].forEach((stintData) => {
        stintData.laps.forEach((lapData) => {
            if (!lapByLap[lapData.no - 1]) {
                lapByLap[lapData.no - 1] = {};
            }

            lapByLap[lapData.no - 1][team] = {
                lapTime: lapData.time,
                elapsedTime: lapData.elapsedTime,
                pilot: stintData.pilot,
                stint: stintData.no,
                kart: stintData.kart || '', // TODO: remove `|| '`
            };
        });
    });
}

// Hook to get dynamic lapByLap data from backend
export const useLapByLap = (raceId: string) => {
    const { data } = useRaceData(raceId);
    
    if (!data) return lapByLap;
    
    const dynamicLapByLap: lapByLapItem[] = [];
    
    for (let team in data.stintsAnalysis) {
        data.stintsAnalysis[team].forEach((stintData) => {
            stintData.laps.forEach((lapData) => {
                if (!dynamicLapByLap[lapData.no - 1]) {
                    dynamicLapByLap[lapData.no - 1] = {};
                }
    
                dynamicLapByLap[lapData.no - 1][team] = {
                    lapTime: lapData.time,
                    elapsedTime: lapData.elapsedTime,
                    pilot: stintData.pilot,
                    stint: stintData.no,
                    kart: stintData.kart || '', // TODO: remove `|| '`
                };
            });
        });
    }
    
    return dynamicLapByLap;
};
