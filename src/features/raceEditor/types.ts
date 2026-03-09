import type { RaceResult, StintAnalysis, RacePenalties, RaceSettings } from '@evhandel/wroomz-types';
import type { RaceData, StintsByPilotsData } from './components/Main/Main.types';
import type { Team } from './components/Teams/Teams.types';

export type StintOverrides = Record<string, number[] | undefined>;

export interface CalculatedData {
    results: RaceResult[];
    stintsAnalysis: Record<string, StintAnalysis[]>;
    penalties: RacePenalties;
    settingsData: RaceSettings;
}

export interface EditorSnapshot extends CalculatedData {
    raceData: RaceData;
    teams: Team[];
    stintsByPilots: StintsByPilotsData;
    stintOverrides: StintOverrides;
}
