import type { Penalty, PenaltySource, RaceResponse, RaceSettings } from '@evhandel/wroomz-types';
import { v4 as uuidv4 } from 'uuid';
import {
    RaceData,
    StintsByPilotsData,
    StintAnalysisData,
} from '../components/Main/Main.types';
import { ResultsData } from '../../../types/race';
import { SettingsData } from '../components/Settings/Settings.types';
import { Team } from '../components/Teams/Teams.types';
import { defaultSettingsData } from '../components/Settings/Settings.constants';
import { defaultStintsByPilots, defaultTeams } from '../components/Main/Main.constants';
import { StintOverrides, LiveChangeoverEvent } from '../types';
import { migrateLegacyPenalties } from '../utils/migrateLegacyPenalties';

export interface RaceEditorState {
    raceData: RaceData;
    settingsData: SettingsData;
    penalties: Penalty[];
    teams: Team[];
    stintsByPilots: StintsByPilotsData;
    stintOverrides: StintOverrides;
    disqualifiedTeams: string[];
    stintsAnalysis: Record<string, StintAnalysisData[]> | undefined;
    results: ResultsData[] | undefined;
    liveMode: boolean;
    liveLog: LiveChangeoverEvent[];
}

export type RaceEditorAction =
    | { type: 'SET_RACE_DATA'; payload: RaceData }
    | { type: 'SET_SETTINGS_DATA'; payload: SettingsData | ((prev: SettingsData) => SettingsData) }
    | { type: 'SET_PENALTIES'; payload: Penalty[] | ((prev: Penalty[]) => Penalty[]) }
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
              penalties: Penalty[];
              results: ResultsData[] | undefined;
          };
      };

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

        case 'SET_PENALTIES': {
            const next =
                action.payload instanceof Function
                    ? action.payload(state.penalties)
                    : action.payload;
            return { ...state, penalties: next };
        }

        case 'SET_TEAMS': {
            const newTeams =
                action.payload instanceof Function ? action.payload(state.teams) : action.payload;
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
                penalties: action.payload.penalties,
                results: action.payload.results,
            };

        default:
            return state;
    }
};

const LS_KEY_SETTINGS = 'settings';
const LS_KEY_TEAMS = 'teams';
const LS_KEY_STINTS_BY_PILOTS = 'stintsByPilots';
const LS_KEY_STINT_OVERRIDES = 'stintOverrides';
const LS_KEY_PENALTIES = 'penalties';
const LS_KEY_PENALTIES_LEGACY = 'penaltiesManual';
const LS_KEY_DISQUALIFIED_TEAMS = 'disqualifiedTeams';
const LS_KEY_LIVE_MODE = 'liveMode';
const LS_KEY_LIVE_LOG = 'liveLog';
const LS_KEY_LIVE_LOG_RACE_ID = 'liveLogRaceId';

function readFromLocalStorage<T>(key: string, fallback: T): T {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.error(error);
        return fallback;
    }
}

function readRawFromLocalStorage(key: string): unknown {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function migrateTeams(teams: unknown[]): Team[] {
    if (!teams.length) return teams as Team[];
    if (typeof teams[0] === 'object' && teams[0] !== null && 'pilotOne' in teams[0]) {
        return teams.map((raw) => {
            const t = raw as Record<string, unknown>;
            return {
                name: String(t.name),
                pilots: [t.pilotOne, t.pilotTwo, t.pilotThree, t.pilotFour]
                    .filter(Boolean)
                    .map(String),
            };
        });
    }
    return teams as Team[];
}

function migrateSettings(settings: unknown): SettingsData {
    if (settings && typeof settings === 'object' && 'minForPilotIfTwo' in settings) {
        const { minForPilotIfTwo, minForPilotIfThree, minForPilotIfFour, ...rest } =
            settings as Record<string, unknown>;
        return {
            kartHasFixedNumber: true,
            ...rest,
            minForPilotByTeamSize: {
                2: (minForPilotIfTwo as string) ?? '20',
                3: (minForPilotIfThree as string) ?? '60',
                4: (minForPilotIfFour as string) ?? '40',
                5: '30',
                6: '25',
            },
        };
    }
    return { kartHasFixedNumber: true, ...(settings as Partial<SettingsData>) };
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
        kartHasFixedNumber: settings.kartHasFixedNumber ?? true,
        autoChargePenaltiesForLimits: settings.autoChargePenaltiesForLimits ?? true,
        mergeConsecutiveStintsForMax: settings.mergeConsecutiveStintsForMax ?? false,
        minPilotRest: String((settings.minPilotRest ?? 0) / 60),
    };
}

function transformLegacyBackendPenalties(raw: unknown): Penalty[] {
    if (!raw || typeof raw !== 'object') return [];
    const obj = raw as Record<string, unknown>;
    const out: Penalty[] = [];

    const pushDictionary = (
        dict: unknown,
        source: PenaltySource,
        description: string
    ) => {
        if (!dict || typeof dict !== 'object') return;
        for (const [teamNumber, seconds] of Object.entries(dict as Record<string, unknown>)) {
            if (typeof seconds !== 'number') continue;
            out.push({
                id: uuidv4(),
                teamNumber,
                seconds,
                description,
                source,
                servedInRace: source !== 'manual' && seconds === 0,
            });
        }
    };

    pushDictionary(obj.penaltiesManual, 'manual', 'Manual penalty');
    pushDictionary(obj.penaltiesByStintLimit, 'stintLimit', 'Stint limit exceeded');
    pushDictionary(obj.penaltiesByPilotLimit, 'pilotLimit', 'Pilot minimum');

    return out;
}

function readPenaltiesFromBackend(backendRace: RaceResponse | undefined): Penalty[] {
    const raw = backendRace?.penalties as unknown;
    if (!raw || typeof raw !== 'object') return [];
    const items = (raw as Record<string, unknown>).items;
    if (Array.isArray(items)) {
        return migrateLegacyPenalties(items);
    }
    return transformLegacyBackendPenalties(raw);
}

function readPenaltiesFromLocalStorage(): Penalty[] {
    const fresh = readRawFromLocalStorage(LS_KEY_PENALTIES);
    if (fresh !== null) {
        return migrateLegacyPenalties(fresh);
    }
    const legacy = readRawFromLocalStorage(LS_KEY_PENALTIES_LEGACY);
    if (legacy === null) return [];
    const migrated = migrateLegacyPenalties(legacy);
    try {
        window.localStorage.setItem(LS_KEY_PENALTIES, JSON.stringify(migrated));
        window.localStorage.removeItem(LS_KEY_PENALTIES_LEGACY);
    } catch (error) {
        console.error(error);
    }
    return migrated;
}

// The live-timing log is scoped to a single race: when the editor loads a race
// different from the one the persisted log belongs to, the log resets (its
// per-change downloads are already on the judge's disk). Within one race it
// survives reloads. `null` identifies the unsaved draft (no backend id yet).
function readScopedLiveLog(currentRaceId: number | null): LiveChangeoverEvent[] {
    const storedRaceId = readFromLocalStorage<number | null>(LS_KEY_LIVE_LOG_RACE_ID, null);
    if (storedRaceId === currentRaceId) {
        return readFromLocalStorage<LiveChangeoverEvent[]>(LS_KEY_LIVE_LOG, []);
    }
    try {
        window.localStorage.setItem(LS_KEY_LIVE_LOG_RACE_ID, JSON.stringify(currentRaceId));
        window.localStorage.setItem(LS_KEY_LIVE_LOG, JSON.stringify([]));
    } catch (error) {
        console.error(error);
    }
    return [];
}

export const getInitialState = (backendRace?: RaceResponse): RaceEditorState => {
    const currentRaceId = backendRace?.id ?? null;
    const liveMode = readFromLocalStorage<boolean>(LS_KEY_LIVE_MODE, false);
    const liveLog = readScopedLiveLog(currentRaceId);

    if (backendRace?.rawData) {
        return {
            raceData: backendRace.rawData as RaceData,
            settingsData: backendRace.settings
                ? raceSettingsToSettingsData(backendRace.settings)
                : defaultSettingsData,
            penalties: readPenaltiesFromBackend(backendRace),
            teams: Array.isArray(backendRace.teamsAndPilots)
                ? (backendRace.teamsAndPilots as unknown as Team[])
                : defaultTeams,
            stintsByPilots: backendRace.stintByPilots ?? defaultStintsByPilots,
            stintOverrides: (backendRace.lapsNotDelimiters as unknown as StintOverrides) ?? {},
            disqualifiedTeams: backendRace.penalties?.disqualifiedTeams ?? [],
            stintsAnalysis: backendRace.calculatedData ?? undefined,
            results: backendRace.results ?? undefined,
            liveMode,
            liveLog,
        };
    }

    return {
        raceData: {},
        settingsData: migrateSettings(
            readFromLocalStorage<SettingsData>(LS_KEY_SETTINGS, defaultSettingsData)
        ),
        penalties: readPenaltiesFromLocalStorage(),
        teams: migrateTeams(readFromLocalStorage<Team[]>(LS_KEY_TEAMS, defaultTeams)),
        stintsByPilots: readFromLocalStorage<StintsByPilotsData>(
            LS_KEY_STINTS_BY_PILOTS,
            defaultStintsByPilots
        ),
        stintOverrides: readFromLocalStorage<StintOverrides>(LS_KEY_STINT_OVERRIDES, {}),
        disqualifiedTeams: readFromLocalStorage<string[]>(LS_KEY_DISQUALIFIED_TEAMS, []),
        stintsAnalysis: undefined,
        results: undefined,
        liveMode,
        liveLog,
    };
};

export {
    LS_KEY_SETTINGS,
    LS_KEY_TEAMS,
    LS_KEY_STINTS_BY_PILOTS,
    LS_KEY_STINT_OVERRIDES,
    LS_KEY_PENALTIES,
    LS_KEY_DISQUALIFIED_TEAMS,
    LS_KEY_LIVE_MODE,
    LS_KEY_LIVE_LOG,
};

export const clearRaceEditorLocalStorage = () => {
    const keys = [LS_KEY_STINT_OVERRIDES, LS_KEY_PENALTIES, LS_KEY_PENALTIES_LEGACY];
    try {
        for (const key of keys) {
            window.localStorage.removeItem(key);
        }
    } catch (error) {
        console.error(error);
    }
};
