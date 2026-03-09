import { RaceData, StintAnalysisData, StintsByPilotsData } from '../components/Main/Main.types';
import { SettingsData } from '../components/Settings/Settings.types';
import { StintOverrides } from '../types';

const INITIAL_BEST_LAP = Infinity;

const finalizeStint = (stintData: StintAnalysisData, isFirstStint: boolean) => {
    let lapsDuration = stintData.laps.reduce((acc, lap) => acc + lap.time, 0);

    if (isFirstStint) {
        lapsDuration += stintData.startGap;
        stintData.endTime = lapsDuration;
    } else {
        stintData.endTime = stintData.startTime + lapsDuration;
    }

    stintData.duration = lapsDuration;

    const avgLapExcludingPitExitLap = isFirstStint
        ? (lapsDuration - stintData.startGap) / stintData.laps.length
        : (lapsDuration - stintData.laps[0].time) / (stintData.laps.length - 1);

    const bestLap = stintData.laps.reduce(
        (acc, lap) => (lap.time < acc ? lap.time : acc),
        INITIAL_BEST_LAP
    );

    stintData.avgLapExcludingPitExitLap = avgLapExcludingPitExitLap;
    stintData.bestLap = bestLap;
};

export const getStintsAnalysis = (
    raceData: RaceData,
    stintsByPilots: StintsByPilotsData,
    settingsData: SettingsData,
    onError?: (message: string) => void,
    stintOverrides?: StintOverrides
) => {
    const stintsAnalysis: Record<string, StintAnalysisData[]> = {};

    for (const teamNumber in raceData) {
        stintsAnalysis[teamNumber] = [];

        // When overrides exist for this team, use manual split points instead of auto-detection
        const teamOverride = stintOverrides?.[teamNumber];
        const overrideSplitLaps: Set<number> | null = teamOverride
            ? new Set(teamOverride.slice(1)) // skip lap 1 (always the start)
            : null;

        let currentStint = 1;
        const stintEntry = stintsByPilots[teamNumber]?.[currentStint - 1];
        let currentStintData: StintAnalysisData = {
            no: currentStint,
            laps: [],
            startGap: 0,
            startTime: 0,
            endTime: 0,
            duration: 0,
            avgLapExcludingPitExitLap: 0,
            bestLap: INITIAL_BEST_LAP,
            pilot: stintEntry?.pilot ?? '',
            kart: stintEntry?.kart,
        };

        raceData[teamNumber].laps.forEach((lap, index) => {
            const lapNumber = index + 1;
            const isAutoSplit =
                overrideSplitLaps === null &&
                lap.lapTime >= +(settingsData.pitStopDetectionTime ?? '0');
            const isManualSplit = overrideSplitLaps !== null && overrideSplitLaps.has(lapNumber);
            const shouldSplit = isAutoSplit || isManualSplit;

            if (!shouldSplit) {
                if (index === 0) {
                    currentStintData.startGap = raceData[teamNumber].startGap;
                    currentStintData.startTime = 0;
                }
                currentStintData.laps.push({
                    no: index + 1,
                    time: lap.lapTime,
                    elapsedTime: lap.elapsedTime,
                });
            } else {
                finalizeStint(currentStintData, currentStint === 1);
                stintsAnalysis[teamNumber].push(currentStintData);

                const startTimeOfNewStint = currentStintData.endTime;

                currentStint++;

                const newStintEntry = stintsByPilots[teamNumber]?.[currentStint - 1];
                if (!newStintEntry) {
                    onError?.(`No data for stint number ${currentStint} for team number ${teamNumber}`);
                }

                currentStintData = {
                    no: currentStint,
                    laps: [],
                    startGap: 0,
                    startTime: startTimeOfNewStint,
                    endTime: 0,
                    duration: 0,
                    avgLapExcludingPitExitLap: 0,
                    bestLap: INITIAL_BEST_LAP,
                    pilot: newStintEntry?.pilot ?? '',
                    kart: newStintEntry?.kart,
                };

                currentStintData.laps.push({
                    no: index + 1,
                    time: lap.lapTime,
                    elapsedTime: lap.elapsedTime,
                });
            }
        });

        finalizeStint(currentStintData, currentStint === 1);
        stintsAnalysis[teamNumber].push(currentStintData);
    }

    return stintsAnalysis;
};
