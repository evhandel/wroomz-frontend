import { LapData, LapTimesArray } from '../../LapsTable.types';

export type LapHighlight = 'firstLapOfStint' | 'overallBest' | 'personalBest' | 'none';

export interface LapCellProps {
    lap: LapData | null;
    lapIndex: number;
    teamIndex: number;
    lapTimesArray: LapTimesArray;
    currentRowLaps: (LapData | null)[];
}

export interface GetLapHighlightParams {
    lap: LapData | null;
    lapIndex: number;
    teamIndex: number;
    lapTimesArray: LapTimesArray;
    currentRowLaps: (LapData | null)[];
}
