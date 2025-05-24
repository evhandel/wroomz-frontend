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
