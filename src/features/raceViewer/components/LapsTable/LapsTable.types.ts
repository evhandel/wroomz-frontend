export interface LapData {
    time: number;
    stintIndex: number;
}

export type LapTimesArray = (LapData | null)[][];
