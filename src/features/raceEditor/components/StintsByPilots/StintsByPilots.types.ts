import { Team } from '../Teams/Teams.types';

export interface ActiveCell {
    team: string;
    stintIndex: number;
}

export type NavDirection = 'up' | 'down' | 'left' | 'right';

export interface StintRowProps {
    stintNumber: number;
    isOptional: boolean;
    isRequired: boolean;
    teams: Team[];
    kartHasFixedNumber: boolean;
    /** Team name of the active cell in this row, or null if no cell in this row is active. */
    activeTeam: string | null;
    onActivate: (team: string, stintIndex: number) => void;
    onClose: () => void;
    onNavigate: (direction: NavDirection, team: string, stintIndex: number) => void;
}

export interface StintCellProps {
    team: string;
    pilots: string[];
    stintIndex: number;
    isRequired: boolean;
    kartHasFixedNumber: boolean;
    isActive: boolean;
    onActivate: (team: string, stintIndex: number) => void;
    onClose: () => void;
    onNavigate: (direction: NavDirection, team: string, stintIndex: number) => void;
}
