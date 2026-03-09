import type { StintsByPilots } from '@evhandel/wroomz-types';

export { ResultsData, StintAnalysisData, PenaltiesData } from '../../../../types/race';

export interface RaceData {
    [key: string]: {
        laps: { lapTime: number; elapsedTime: number }[];
        startGap: number;
    };
}

export interface TeamDataExtended {
    [key: string]: {
        laps: { lapTime: number; elapsedTime: number }[];
        startGap: number;
        totalTime: number;
        avgTimeTotal: number;
    };
}

export type StintsByPilotsData = StintsByPilots;
