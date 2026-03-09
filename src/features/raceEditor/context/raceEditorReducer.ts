import type { RaceResponse, RaceSettings } from '@evhandel/wroomz-types';
import { PenaltiesData, RaceData, StintsByPilotsData, StintAnalysisData } from '../components/Main/Main.types';
import { ResultsData } from '../../../types/race';
import { SettingsData } from '../components/Settings/Settings.types';
import { Team } from '../components/Teams/Teams.types';
import { defaultSettingsData } from '../components/Settings/Settings.constants';
import { defaultStintsByPilots, defaultTeams } from '../components/Main/Main.constants';
import { StintOverrides } from '../types';

// ─── State ───────────────────────────────────────────────────────────────────

export interface RaceEditorState {
    // Input state
    raceData: RaceData;
    settingsData: SettingsData;
    penaltiesManual: PenaltiesData;
    teams: Team[];
    stintsByPilots: StintsByPilotsData;
    stintOverrides: StintOverrides;
    disqualifiedTeams: string[];
    // Computed (from useRaceCalculation)
    stintsAnalysis: Record<string, StintAnalysisData[]> | undefined;
    penaltiesByStintLimit: PenaltiesData;
    penaltiesByPilotLimit: PenaltiesData;
    results: ResultsData[] | undefined;
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export type RaceEditorAction =
    | { type: 'SET_RACE_DATA'; payload: RaceData }
    | { type: 'SET_SETTINGS_DATA'; payload: SettingsData | ((prev: SettingsData) => SettingsData) }
    | { type: 'SET_PENALTIES_MANUAL'; payload: PenaltiesData }
    | { type: 'SET_TEAMS'; payload: Team[] | ((prev: Team[]) => Team[]) }
    | {
          type: 'SET_STINTS_BY_PILOTS';
          payload: StintsByPilotsData | ((prev: StintsByPilotsData) => StintsByPilotsData);
      }
    | { type: 'SET_STINT_OVERRIDES'; payload: StintOverrides }
    | { type: 'SET_DISQUALIFIED_TEAMS'; payload: string[] }
    | {
          type: 'SET_STINT_OVERRIDE_FOR_TEAM';
          payload: { teamNumber: string; splitLaps: number[] | undefined };
      }
    | {
          type: 'SET_CALCULATION_RESULTS';
          payload: {
              stintsAnalysis: Record<string, StintAnalysisData[]>;
              penaltiesByStintLimit: PenaltiesData;
              penaltiesByPilotLimit: PenaltiesData;
              results: ResultsData[] | undefined;
          };
      };

// ─── Reducer ─────────────────────────────────────────────────────────────────

export const raceEditorReducer = (
    state: RaceEditorState,
    action: RaceEditorAction
): RaceEditorState => {
    switch (action.type) {
        case 'SET_RACE_DATA':
            return { ...state, raceData: action.payload };

        case 'SET_SETTINGS_DATA': {
            const newSettings =
                action.payload instanceof Function
                    ? action.payload(state.settingsData)
                    : action.payload;
            return { ...state, settingsData: newSettings };
        }

        case 'SET_PENALTIES_MANUAL':
            return { ...state, penaltiesManual: action.payload };

        case 'SET_TEAMS': {
            const newTeams =
                action.payload instanceof Function
                    ? action.payload(state.teams)
                    : action.payload;
            return { ...state, teams: newTeams };
        }

        case 'SET_STINTS_BY_PILOTS': {
            const newStints =
                action.payload instanceof Function
                    ? action.payload(state.stintsByPilots)
                    : action.payload;
            return { ...state, stintsByPilots: newStints };
        }

        case 'SET_STINT_OVERRIDES':
            return { ...state, stintOverrides: action.payload };

        case 'SET_STINT_OVERRIDE_FOR_TEAM':
            return {
                ...state,
                stintOverrides: {
                    ...state.stintOverrides,
                    [action.payload.teamNumber]: action.payload.splitLaps,
                },
            };

        case 'SET_DISQUALIFIED_TEAMS':
            return { ...state, disqualifiedTeams: action.payload };

        case 'SET_CALCULATION_RESULTS':
            return {
                ...state,
                stintsAnalysis: action.payload.stintsAnalysis,
                penaltiesByStintLimit: action.payload.penaltiesByStintLimit,
                penaltiesByPilotLimit: action.payload.penaltiesByPilotLimit,
                results: action.payload.results,
            };

        default:
            return state;
    }
};

// ─── localStorage helpers ────────────────────────────────────────────────────

const LS_KEY_SETTINGS = 'settings';
const LS_KEY_TEAMS = 'teams';
const LS_KEY_STINTS_BY_PILOTS = 'stintsByPilots';
const LS_KEY_STINT_OVERRIDES = 'stintOverrides';
const LS_KEY_PENALTIES_MANUAL = 'penaltiesManual';
const LS_KEY_DISQUALIFIED_TEAMS = 'disqualifiedTeams';

function readFromLocalStorage<T>(key: string, fallback: T): T {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.error(error);
        return fallback;
    }
}

function migrateTeams(teams: any[]): Team[] {
    if (!teams.length) return teams;
    // Check if old format (has pilotOne)
    if ('pilotOne' in teams[0]) {
        return teams.map((t: any) => ({
            name: t.name,
            pilots: [t.pilotOne, t.pilotTwo, t.pilotThree, t.pilotFour].filter(Boolean),
        }));
    }
    return teams;
}

function migrateSettings(settings: any): SettingsData {
    if (settings && 'minForPilotIfTwo' in settings) {
        const { minForPilotIfTwo, minForPilotIfThree, minForPilotIfFour, ...rest } = settings;
        return {
            ...rest,
            minForPilotByTeamSize: {
                2: minForPilotIfTwo ?? '20',
                3: minForPilotIfThree ?? '60',
                4: minForPilotIfFour ?? '40',
                5: '30',
                6: '25',
            },
        };
    }
    return settings;
}

function raceSettingsToSettingsData(settings: RaceSettings): SettingsData {
    const minForPilotByTeamSize: Record<number, string> = {};
    for (const [key, value] of Object.entries(settings.minForPilotByTeamSize)) {
        minForPilotByTeamSize[Number(key)] = String(value / 60);
    }
    return {
        maxStint: String(settings.maxStint),
        minForPilotByTeamSize,
        pitStopDetectionTime: String(settings.pitStopDetectionTime),
        minPitStopLapTime: String(settings.minPitStopLapTime),
        minStintsQuantity: String(settings.minStintsQuantity),
    };
}

export const getInitialState = (backendRace?: RaceResponse): RaceEditorState => {
    if (backendRace?.rawData) {
        return {
            raceData: backendRace.rawData as RaceData,
            settingsData: backendRace.settings
                ? raceSettingsToSettingsData(backendRace.settings)
                : defaultSettingsData,
            penaltiesManual: backendRace.penalties?.penaltiesManual ?? {},
            teams: Array.isArray(backendRace.teamsAndPilots)
                ? (backendRace.teamsAndPilots as unknown as Team[])
                : defaultTeams,
            stintsByPilots: backendRace.stintByPilots ?? defaultStintsByPilots,
            stintOverrides: (backendRace.lapsNotDelimiters as unknown as StintOverrides) ?? {},
            disqualifiedTeams: backendRace.penalties?.disqualifiedTeams ?? [],
            stintsAnalysis: backendRace.calculatedData ?? undefined,
            penaltiesByStintLimit: backendRace.penalties?.penaltiesByStintLimit ?? {},
            penaltiesByPilotLimit: backendRace.penalties?.penaltiesByPilotLimit ?? {},
            results: backendRace.results ?? undefined,
        };
    }

    return {
        raceData: {},
        settingsData: migrateSettings(
            readFromLocalStorage<SettingsData>(LS_KEY_SETTINGS, defaultSettingsData)
        ),
        penaltiesManual: readFromLocalStorage<PenaltiesData>(LS_KEY_PENALTIES_MANUAL, {}),
        teams: migrateTeams(readFromLocalStorage<Team[]>(LS_KEY_TEAMS, defaultTeams)),
        stintsByPilots: readFromLocalStorage<StintsByPilotsData>(
            LS_KEY_STINTS_BY_PILOTS,
            defaultStintsByPilots
        ),
        stintOverrides: readFromLocalStorage<StintOverrides>(LS_KEY_STINT_OVERRIDES, {}),
        disqualifiedTeams: readFromLocalStorage<string[]>(LS_KEY_DISQUALIFIED_TEAMS, []),
        stintsAnalysis: undefined,
        penaltiesByStintLimit: {},
        penaltiesByPilotLimit: {},
        results: undefined,
    };
};

export {
    LS_KEY_SETTINGS,
    LS_KEY_TEAMS,
    LS_KEY_STINTS_BY_PILOTS,
    LS_KEY_STINT_OVERRIDES,
    LS_KEY_PENALTIES_MANUAL,
    LS_KEY_DISQUALIFIED_TEAMS,
};
