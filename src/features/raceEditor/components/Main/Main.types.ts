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

export interface PenaltiesData {
    [key: string]: number;
}

export interface ResultsData {
    teamNumber: string;
    avgTimeTotal: number;
    laps: number;
    totalTimeWithGapWithoutPenalties: number;
    pilots: string[];
    penalty: number;
    stintsQuantity: number;
}

export interface StintAlalysisData {
    no: number;
    laps: { no: number; time: number; elapsedTime: number }[];
    startGap: number;
    startTime: number;
    endTime: number;
    duration: number;
    avgLapExcludingPitExitLap: number;
    bestLap: number;
    pilot: string;
    kart?: string;
}

export type StintsByPilotsData = Record<string, { pilot?: string; kart?: string }[]>;
