import { createStore } from 'zustand/vanilla';
import { v4 as uuidv4 } from 'uuid';
import type { Penalty, RaceResponse } from '@evhandel/wroomz-types';
import {
    RaceData,
    StintsByPilotsData,
    StintAnalysisData,
    TeamDataExtended,
} from '../components/Main/Main.types';
import { ResultsData } from '../../../types/race';
import { SettingsData } from '../components/Settings/Settings.types';
import { Team } from '../components/Teams/Teams.types';
import { EditorSnapshot, StintOverrides, LiveChangeoverEvent } from '../types';
import { getStintsAnalysis } from '../utils/getStintsAnalysis';
import { regenerateAutoPenalties } from '../utils/regenerateAutoPenalties';
import {
    getInitialState,
    LS_KEY_SETTINGS,
    LS_KEY_TEAMS,
    LS_KEY_STINTS_BY_PILOTS,
    LS_KEY_STINT_OVERRIDES,
    LS_KEY_PENALTIES,
    LS_KEY_DISQUALIFIED_TEAMS,
    LS_KEY_LIVE_MODE,
    LS_KEY_LIVE_LOG,
} from '../context/raceEditorReducer';

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

export interface RaceEditorActions {
    setRaceData: (data: RaceData) => void;
    setSettingsData: (data: SettingsData | ((prev: SettingsData) => SettingsData)) => void;
    addManualPenalty: (input: {
        teamNumber: string;
        seconds: number;
        description: string;
        servedInRace: boolean;
    }) => void;
    updateManualPenalty: (
        id: string,
        patch: Partial<Pick<Penalty, 'teamNumber' | 'seconds' | 'description'>>
    ) => void;
    updatePenaltySeconds: (id: string, seconds: number) => void;
    setPenaltyServedInRace: (id: string, value: boolean) => void;
    setPenaltyInternal: (id: string, value: boolean) => void;
    deletePenalty: (id: string) => void;
    setTeams: (value: Team[] | ((prev: Team[]) => Team[])) => void;
    setStintsByPilots: (
        value: StintsByPilotsData | ((prev: StintsByPilotsData) => StintsByPilotsData)
    ) => void;
    updateStintCell: (
        teamName: string,
        stintIndex: number,
        patch: { pilot?: string; kart?: string }
    ) => void;
    clearStintCell: (teamName: string, stintIndex: number) => void;
    setStintOverrideForTeam: (teamNumber: string, splitLaps: number[] | undefined) => void;
    toggleDisqualification: (teamNumber: string) => void;
    setLiveMode: (value: boolean) => void;
    recordChangeover: (teamName: string, stintIndex: number) => void;
    clearLiveLog: () => void;
    calculate: (warn: (msg: string) => void) => void;
}

export type RaceEditorStoreState = RaceEditorState & RaceEditorActions;

interface CreateStoreOptions {
    initialRaceData?: RaceResponse;
    onCalculate?: (snapshot: EditorSnapshot) => void;
}

export const createRaceEditorStore = ({ initialRaceData, onCalculate }: CreateStoreOptions) => {
    const initial = getInitialState(initialRaceData);

    const store = createStore<RaceEditorStoreState>()((set, get) => ({
        ...initial,

        setRaceData: (data) => set({ raceData: data }),

        setSettingsData: (data) =>
            set((state) => ({
                settingsData: data instanceof Function ? data(state.settingsData) : data,
            })),

        addManualPenalty: ({ teamNumber, seconds, description, servedInRace }) =>
            set((state) => ({
                penalties: [
                    ...state.penalties,
                    {
                        id: uuidv4(),
                        teamNumber,
                        seconds: servedInRace === true ? 0 : seconds,
                        description,
                        source: 'manual',
                        servedInRace,
                    },
                ],
            })),

        updateManualPenalty: (id, patch) =>
            set((state) => {
                const target = state.penalties.find((p) => p.id === id);
                if (!target) {
                    console.warn(`updateManualPenalty: penalty ${id} not found`);
                    return {};
                }
                if (target.source !== 'manual') {
                    console.warn(
                        `updateManualPenalty: refusing to patch non-manual penalty ${id} (source=${target.source})`
                    );
                    return {};
                }
                return {
                    penalties: state.penalties.map((p) =>
                        p.id === id ? { ...p, ...patch } : p
                    ),
                };
            }),

        updatePenaltySeconds: (id, seconds) =>
            set((state) => {
                const target = state.penalties.find((p) => p.id === id);
                if (!target) {
                    console.warn(`updatePenaltySeconds: penalty ${id} not found`);
                    return {};
                }
                if (target.servedInRace === true) {
                    console.warn(
                        `updatePenaltySeconds: refusing to edit seconds on served-in-race penalty ${id}`
                    );
                    return {};
                }
                return {
                    penalties: state.penalties.map((p) => {
                        if (p.id !== id) return p;
                        if (p.source === 'manual') {
                            return { ...p, seconds };
                        }
                        return { ...p, seconds, userEditedSeconds: true };
                    }),
                };
            }),

        setPenaltyServedInRace: (id, value) =>
            set((state) => {
                const target = state.penalties.find((p) => p.id === id);
                if (!target) {
                    console.warn(`setPenaltyServedInRace: penalty ${id} not found`);
                    return {};
                }
                return {
                    penalties: state.penalties.map((p) => {
                        if (p.id !== id) return p;
                        if (value === true) {
                            const { userEditedSeconds: _ignored, ...rest } = p;
                            return { ...rest, seconds: 0, servedInRace: true };
                        }
                        return { ...p, servedInRace: false };
                    }),
                };
            }),

        setPenaltyInternal: (id, value) =>
            set((state) => {
                const target = state.penalties.find((p) => p.id === id);
                if (!target) {
                    return {};
                }
                return {
                    penalties: state.penalties.map((p) => {
                        if (p.id !== id) return p;
                        if (value === true) {
                            return { ...p, internal: true };
                        }
                        const { internal: _ignored, ...rest } = p;
                        return rest;
                    }),
                };
            }),

        deletePenalty: (id) =>
            set((state) => ({
                penalties: state.penalties.filter((p) => p.id !== id),
            })),

        setTeams: (value) =>
            set((state) => ({
                teams: value instanceof Function ? value(state.teams) : value,
            })),

        setStintsByPilots: (value) =>
            set((state) => ({
                stintsByPilots: value instanceof Function ? value(state.stintsByPilots) : value,
            })),

        updateStintCell: (teamName, stintIndex, patch) =>
            set((state) => {
                const nextTeam = [...(state.stintsByPilots[teamName] ?? [])];
                nextTeam[stintIndex] = { ...nextTeam[stintIndex], ...patch };
                return {
                    stintsByPilots: { ...state.stintsByPilots, [teamName]: nextTeam },
                };
            }),

        clearStintCell: (teamName, stintIndex) =>
            set((state) => {
                const nextTeam = [...(state.stintsByPilots[teamName] ?? [])];
                nextTeam[stintIndex] = {};
                return {
                    stintsByPilots: { ...state.stintsByPilots, [teamName]: nextTeam },
                };
            }),

        setLiveMode: (value) => set({ liveMode: value }),

        recordChangeover: (teamName, stintIndex) =>
            set((state) => {
                const cell = state.stintsByPilots[teamName]?.[stintIndex];
                if (!cell?.pilot) return {};
                const stintNumber = stintIndex + 1;
                // Normalize empty kart to undefined so '' and missing dedup alike.
                const kart = cell.kart || undefined;
                const lastForCell = [...state.liveLog]
                    .reverse()
                    .find((e) => e.team === teamName && e.stintNumber === stintNumber);
                if (
                    lastForCell &&
                    lastForCell.pilot === cell.pilot &&
                    (lastForCell.kart || undefined) === kart
                ) {
                    return {};
                }
                const event: LiveChangeoverEvent = {
                    id: uuidv4(),
                    capturedAt: new Date().toISOString(),
                    team: teamName,
                    stintNumber,
                    pilot: cell.pilot,
                    kart,
                    previousPilot: state.stintsByPilots[teamName]?.[stintIndex - 1]?.pilot,
                };
                return { liveLog: [...state.liveLog, event] };
            }),

        clearLiveLog: () => set({ liveLog: [] }),

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

        calculate: (warn) => {
            const {
                raceData,
                stintsByPilots,
                settingsData,
                penalties: previousPenalties,
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

            const maxStintSeconds = Number(settingsData.maxStint) * 60;

            const minForPilotByTeamSizeSeconds: Record<number, number> = {};
            if (settingsData.minForPilotByTeamSize) {
                for (const [key, value] of Object.entries(settingsData.minForPilotByTeamSize)) {
                    minForPilotByTeamSizeSeconds[Number(key)] = Number(value) * 60;
                }
            }

            const autoChargeEnabled = settingsData.autoChargePenaltiesForLimits ?? true;
            const mergeConsecutiveStints = settingsData.mergeConsecutiveStintsForMax ?? false;
            const minRestSeconds = Number(settingsData.minPilotRest ?? 0) * 60;

            const nextPenalties = regenerateAutoPenalties({
                previousItems: previousPenalties,
                stintsAnalysis,
                maxStintSeconds,
                minForPilotByTeamSizeSeconds,
                autoChargeEnabled,
                mergeConsecutiveStints,
                minRestSeconds,
            });

            const penaltyByTeam: Record<string, number> = {};
            for (const p of nextPenalties) {
                penaltyByTeam[p.teamNumber] =
                    (penaltyByTeam[p.teamNumber] ?? 0) +
                    (p.servedInRace === true ? 0 : p.seconds);
            }

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
                    (penaltyByTeam[teamNumber] ?? 0);
                teamDataExtended[teamNumber].avgTimeTotal =
                    teamDataExtended[teamNumber].totalTime / raceData[teamNumber].laps.length;
            }

            const orderedTeams = [];
            for (const teamNumber in teamDataExtended) {
                const team = teams.find((t) => t.name === teamNumber);
                const teamPenalty = penaltyByTeam[teamNumber] ?? 0;
                orderedTeams.push({
                    avgTimeTotal: teamDataExtended[teamNumber].avgTimeTotal,
                    teamNumber,
                    pilots: team?.pilots ?? [],
                    teamLabel: team?.teamLabel,
                    laps: teamDataExtended[teamNumber].laps.length,
                    totalTimeWithGapWithoutPenalties:
                        Math.round(
                            (teamDataExtended[teamNumber].totalTime - teamPenalty) * 1000
                        ) / 1000,
                    penalty: teamPenalty,
                    stintsQuantity: stintsAnalysis[teamNumber]?.length ?? 0,
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
                        items: nextPenalties,
                        disqualifiedTeams,
                    },
                    settingsData: {
                        maxStint: Number(settingsData.maxStint),
                        minForPilotByTeamSize: minForPilotByTeamSizeSeconds,
                        pitStopDetectionTime: Number(settingsData.pitStopDetectionTime),
                        minPitStopLapTime: Number(settingsData.minPitStopLapTime),
                        minStintsQuantity: Number(settingsData.minStintsQuantity),
                        kartHasFixedNumber: settingsData.kartHasFixedNumber ?? true,
                        autoChargePenaltiesForLimits: autoChargeEnabled,
                        mergeConsecutiveStintsForMax: mergeConsecutiveStints,
                        minPilotRest: minRestSeconds,
                    },
                    raceData,
                    teams,
                    stintsByPilots,
                    stintOverrides,
                });
            }

            set({
                stintsAnalysis,
                penalties: nextPenalties,
                results: orderedTeams,
            });
        },
    }));

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
        persist(LS_KEY_PENALTIES, state.penalties, prevState.penalties);
        persist(LS_KEY_DISQUALIFIED_TEAMS, state.disqualifiedTeams, prevState.disqualifiedTeams);
        persist(LS_KEY_LIVE_MODE, state.liveMode, prevState.liveMode);
        persist(LS_KEY_LIVE_LOG, state.liveLog, prevState.liveLog);
    });

    return store;
};
