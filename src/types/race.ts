import type { RaceResult, StintAnalysis } from '@evhandel/wroomz-types';

export type ResultsData = RaceResult;

export type StintAnalysisData = StintAnalysis;

export interface PenaltiesData {
    [key: string]: number;
}
