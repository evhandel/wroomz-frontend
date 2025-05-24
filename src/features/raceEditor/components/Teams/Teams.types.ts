export interface Team {
    name: string;
    pilotOne: string;
    pilotTwo: string;
    pilotThree?: string;
    pilotFour?: string;
}

export interface TeamsProps {
    teams: Team[];
    setTeams: (value: Team[] | ((val: Team[]) => Team[])) => void;
}
