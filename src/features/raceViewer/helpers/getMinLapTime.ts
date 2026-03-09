import { StintAnalysis } from '@evhandel/wroomz-types';

export const getMinLapTime = (stintsAnalysis?: Record<string, StintAnalysis[]>): number => {
    if (!stintsAnalysis) return 999;

    let minTime = 999;
    for (const teamNumber in stintsAnalysis) {
        for (const stint of stintsAnalysis[teamNumber]) {
            for (const lapData of stint.laps) {
                if (lapData.time < minTime) {
                    minTime = lapData.time;
                }
            }
        }
    }
    return minTime;
};
