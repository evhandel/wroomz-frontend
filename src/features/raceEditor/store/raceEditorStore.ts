import { createStore } from 'zustand/vanilla';
import type { RaceResponse } from '@evhandel/wroomz-types';
import {
    PenaltiesData,
    RaceData,
    StintsByPilotsData,
    StintAnalysisData,
    TeamDataExtended,
} from '../components/Main/Main.types';
import { ResultsData } from '../../../types/race';
import { SettingsData } from '../components/Settings/Settings.types';
import { Team } from '../components/Teams/Teams.types';
import { EditorSnapshot, StintOverrides } from '../types';
import { getStintsAnalysis } from '../utils/getStintsAnalysis';
import { getPenaltiesByStintLimit } from '../utils/getPenaltiesByStintLimit';
import { getPenaltiesByPilotLimit } from '../utils/getPenaltiesByPilotLimit';
import {
    getInitialState,
    LS_KEY_SETTINGS,
    LS_KEY_TEAMS,
    LS_KEY_STINTS_BY_PILOTS,
    LS_KEY_STINT_OVERRIDES,
    LS_KEY_PENALTIES_MANUAL,
    LS_KEY_DISQUALIFIED_TEAMS,
} from '../context/raceEditorReducer';

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
    // Computed
    stintsAnalysis: Record<string, StintAnalysisData[]> | undefined;
    penaltiesByStintLimit: PenaltiesData;
    penaltiesByPilotLimit: PenaltiesData;
    results: ResultsData[] | undefined;
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export interface RaceEditorActions {
    setRaceData: (data: RaceData) => void;
    setSettingsData: (data: SettingsData | ((prev: SettingsData) => SettingsData)) => void;
    setPenaltiesManual: (penalties: PenaltiesData) => void;
    setTeams: (value: Team[] | ((prev: Team[]) => Team[])) => void;
    setStintsByPilots: (
        value: StintsByPilotsData | ((prev: StintsByPilotsData) => StintsByPilotsData)
    ) => void;
    setStintOverrideForTeam: (teamNumber: string, splitLaps: number[] | undefined) => void;
    toggleDisqualification: (teamNumber: string) => void;
    calculate: (warn: (msg: string) => void) => void;
}

export type RaceEditorStoreState = RaceEditorState & RaceEditorActions;

// ─── Store factory ───────────────────────────────────────────────────────────

interface CreateStoreOptions {
    initialRaceData?: RaceResponse;
    onCalculate?: (snapshot: EditorSnapshot) => void;
}

export const createRaceEditorStore = ({ initialRaceData, onCalculate }: CreateStoreOptions) => {
    const initial = getInitialState(initialRaceData);

    const store = createStore<RaceEditorStoreState>()((set, get) => ({
        ...initial,

        // ─── Setters ─────────────────────────────────────────────────────────

        setRaceData: (data) => set({ raceData: data }),

        setSettingsData: (data) =>
            set((state) => ({
                settingsData: data instanceof Function ? data(state.settingsData) : data,
            })),

        setPenaltiesManual: (penalties) => set({ penaltiesManual: penalties }),

        setTeams: (value) =>
            set((state) => ({
                teams: value instanceof Function ? value(state.teams) : value,
            })),

        setStintsByPilots: (value) =>
            set((state) => ({
                stintsByPilots:
                    value instanceof Function ? value(state.stintsByPilots) : value,
            })),

        setStintOverrideForTeam: (teamNumber, splitLaps) =>
            set((state) => ({
                stintOverrides: {
                    ...state.stintOverrides,
                    [teamNumber]: splitLaps,
                },
            })),

        toggleDisqualification: (teamNumber) =>
            set((state) => {
                const current = state.disqualifiedTeams;
                return {
                    disqualifiedTeams: current.includes(teamNumber)
                        ? current.filter((t) => t !== teamNumber)
                        : [...current, teamNumber],
                };
            }),

        // ─── Calculate ───────────────────────────────────────────────────────

        calculate: (warn) => {
            const {
                raceData,
                stintsByPilots,
                settingsData,
                penaltiesManual,
                teams,
                stintOverrides,
                disqualifiedTeams,
            } = get();

            const stintsAnalysis = getStintsAnalysis(
                raceData,
                stintsByPilots,
                settingsData,
                (msg) => warn(msg),
                stintOverrides
            );

            const newPenaltiesByStintLimit = getPenaltiesByStintLimit(
                stintsAnalysis,
                Number(settingsData.maxStint) * 60
            );

            const minForPilotByTeamSizeInSeconds: Record<number, number> = {};
            if (settingsData.minForPilotByTeamSize) {
                for (const [key, value] of Object.entries(settingsData.minForPilotByTeamSize)) {
                    minForPilotByTeamSizeInSeconds[Number(key)] = Number(value) * 60;
                }
            }
            const newPenaltiesByPilotLimit = getPenaltiesByPilotLimit(
                stintsAnalysis,
                minForPilotByTeamSizeInSeconds
            );

            const teamDataExtended: TeamDataExtended = {};
            for (const teamNumber in raceData) {
                teamDataExtended[teamNumber] = {
                    ...raceData[teamNumber],
                    totalTime: 0,
                    avgTimeTotal: 0,
                };
            }

            for (const teamNumber in raceData) {
                const totalLapsTime = raceData[teamNumber].laps.reduce(
                    (acc, cur) => acc + cur.lapTime,
                    0
                );

                teamDataExtended[teamNumber].totalTime =
                    totalLapsTime +
                    raceData[teamNumber].startGap +
                    (penaltiesManual[teamNumber] || 0) +
                    newPenaltiesByPilotLimit[teamNumber] +
                    newPenaltiesByStintLimit[teamNumber];
                teamDataExtended[teamNumber].avgTimeTotal =
                    teamDataExtended[teamNumber].totalTime /
                    raceData[teamNumber].laps.length;
            }

            const orderedTeams = [];
            for (const teamNumber in teamDataExtended) {
                const team = teams.find((t) => t.name === teamNumber);
                orderedTeams.push({
                    avgTimeTotal: teamDataExtended[teamNumber].avgTimeTotal,
                    teamNumber,
                    pilots: team?.pilots ?? [],
                    teamLabel: team?.teamLabel,
                    laps: teamDataExtended[teamNumber].laps.length,
                    totalTimeWithGapWithoutPenalties:
                        Math.round(
                            (teamDataExtended[teamNumber].totalTime -
                                ((penaltiesManual[teamNumber] || 0) +
                                    newPenaltiesByPilotLimit[teamNumber] +
                                    newPenaltiesByStintLimit[teamNumber])) *
                                1000
                        ) / 1000,
                    penalty:
                        (penaltiesManual[teamNumber] || 0) +
                        newPenaltiesByPilotLimit[teamNumber] +
                        newPenaltiesByStintLimit[teamNumber],
                    stintsQuantity: stintsByPilots[teamNumber]?.length ?? 0,
                    isDisqualified: disqualifiedTeams.includes(teamNumber),
                });
            }

            orderedTeams.sort((a, b) => {
                if (a.isDisqualified && !b.isDisqualified) return 1;
                if (!a.isDisqualified && b.isDisqualified) return -1;
                return a.avgTimeTotal < b.avgTimeTotal ? -1 : 1;
            });

            if (onCalculate) {
                onCalculate({
                    results: orderedTeams,
                    stintsAnalysis,
                    penalties: {
                        penaltiesManual,
                        penaltiesByStintLimit: newPenaltiesByStintLimit,
                        penaltiesByPilotLimit: newPenaltiesByPilotLimit,
                        disqualifiedTeams,
                    },
                    settingsData: {
                        maxStint: Number(settingsData.maxStint),
                        minForPilotByTeamSize: minForPilotByTeamSizeInSeconds,
                        pitStopDetectionTime: Number(settingsData.pitStopDetectionTime),
                        minPitStopLapTime: Number(settingsData.minPitStopLapTime),
                        minStintsQuantity: Number(settingsData.minStintsQuantity),
                    },
                    raceData,
                    teams,
                    stintsByPilots,
                    stintOverrides,
                });
            }

            set({
                stintsAnalysis,
                penaltiesByStintLimit: newPenaltiesByStintLimit,
                penaltiesByPilotLimit: newPenaltiesByPilotLimit,
                results: orderedTeams,
            });
        },
    }));

    // ─── localStorage persistence ────────────────────────────────────────────

    store.subscribe((state, prevState) => {
        const persist = (key: string, current: unknown, prev: unknown) => {
            if (current !== prev) {
                try {
                    window.localStorage.setItem(key, JSON.stringify(current));
                } catch (error) {
                    console.error(error);
                }
            }
        };

        persist(LS_KEY_SETTINGS, state.settingsData, prevState.settingsData);
        persist(LS_KEY_TEAMS, state.teams, prevState.teams);
        persist(LS_KEY_STINTS_BY_PILOTS, state.stintsByPilots, prevState.stintsByPilots);
        persist(LS_KEY_STINT_OVERRIDES, state.stintOverrides, prevState.stintOverrides);
        persist(LS_KEY_PENALTIES_MANUAL, state.penaltiesManual, prevState.penaltiesManual);
        persist(LS_KEY_DISQUALIFIED_TEAMS, state.disqualifiedTeams, prevState.disqualifiedTeams);
    });

    return store;
};
