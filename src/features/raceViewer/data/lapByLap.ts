import { useMemo } from 'react';
import { useRaceData } from './useRaceData';

export type LapByLapItem = Record<
    string,
    {
        lapTime: number;
        elapsedTime: number;
        pilot: string;
        stint: number;
        kart: string;
    }
>;

// Hook to get dynamic lapByLap data from backend
export const useLapByLap = (raceId: string) => {
    const { data } = useRaceData(raceId);

    return useMemo(() => {
        if (!data || !data.stintsAnalysis) return [];

        const dynamicLapByLap: LapByLapItem[] = [];

        for (const team in data.stintsAnalysis) {
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
                        kart: stintData.kart || '',
                    };
                });
            });
        }

        return dynamicLapByLap;
    }, [data]);
};
