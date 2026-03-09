import { Team } from '../Teams/Teams.types';
import { StintsByPilotsData } from '../Main/Main.types';

export interface StintsByPilotsProps {
    teams: Team[];
    stintsQuantity: number;
    stintsByPilots: StintsByPilotsData;
    setStintsByPilots: (
        value: StintsByPilotsData | ((val: StintsByPilotsData) => StintsByPilotsData)
    ) => void;
}

export interface StintRowProps {
    stintNumber: number;
    isOptional: boolean;
    isRequired: boolean;
    teams: Team[];
    getStintData: (
        teamName: string,
        stintIndex: number
    ) => { pilot?: string; kart?: string } | undefined;
    updatePilot: (teamName: string, stintIndex: number, pilot: string) => void;
    updateKart: (teamName: string, stintIndex: number, kart: string) => void;
    clearStint: (teamName: string, stintIndex: number) => void;
}
