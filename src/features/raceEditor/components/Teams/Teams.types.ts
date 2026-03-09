export interface Team {
    name: string;
    teamLabel?: string;
    pilots: string[];
}

export interface TeamsProps {
    teams: Team[];
    setTeams: (value: Team[] | ((val: Team[]) => Team[])) => void;
}
