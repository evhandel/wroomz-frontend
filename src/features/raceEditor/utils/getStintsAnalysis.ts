import { RaceData, StintAlalysisData, StintsByPilotsData } from '../components/Main/Main.types';
import { SettingsData } from '../components/Settings/Settings.types';

export const getStintsAnalysis = (
    raceData: RaceData,
    stintsByPilots: StintsByPilotsData,
    settingsData: SettingsData
) => {
    const stintsAnalysis: Record<string, StintAlalysisData[]> = {};

    for (const teamNumber in raceData) {
        stintsAnalysis[teamNumber] = [];

        let currentStint = 1;
        let currentStintData: StintAlalysisData = {
            no: currentStint,
            laps: [],
            startGap: 0,
            startTime: 0,
            endTime: 0,
            duration: 0,
            avgLapExcludingPitExitLap: 0,
            bestLap: 999,
            pilot: stintsByPilots[teamNumber][currentStint - 1].pilot,
            kart: stintsByPilots[teamNumber][currentStint - 1].kart,
        };

        raceData[teamNumber].laps.forEach((lap, index) => {
            if (lap.lapTime < +settingsData.minPitStopLapTime) {
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
                // START OF finalize previous stint
                let lapsDuration = currentStintData.laps.reduce((acc, lap) => acc + lap.time, 0);

                if (currentStint === 1) {
                    lapsDuration += currentStintData.startGap;
                    currentStintData.endTime = lapsDuration;
                } else {
                    currentStintData.endTime = currentStintData.startTime + lapsDuration;
                }

                // if (teamNumber === '13') debugger;

                const avgLapExcludingPitExitLap =
                    currentStint === 1
                        ? (lapsDuration - currentStintData.startGap) / currentStintData.laps.length
                        : (lapsDuration - currentStintData.laps[0].time) /
                          (currentStintData.laps.length - 1);
                const bestLap = currentStintData.laps.reduce(
                    (acc, lap) => (lap.time < acc ? lap.time : acc),
                    9999
                );

                currentStintData.duration = lapsDuration;
                currentStintData.avgLapExcludingPitExitLap = avgLapExcludingPitExitLap;
                currentStintData.bestLap = bestLap;

                stintsAnalysis[teamNumber].push(currentStintData);

                const startTimeOfNewStint = currentStintData.endTime;

                currentStint++;

                console.log(
                    '%c * hui ',
                    'background: #000; color: aqua',
                    raceData,
                    stintsByPilots[teamNumber],
                    currentStint
                );
                if (!stintsByPilots[teamNumber][currentStint - 1]) {
                    alert(`No data for stint number ${currentStint} for team number ${teamNumber}`);
                }

                currentStintData = {
                    no: currentStint,
                    laps: [],
                    startGap: 0,
                    startTime: startTimeOfNewStint,
                    endTime: 0,
                    duration: 0,
                    avgLapExcludingPitExitLap: 0,
                    bestLap: 999,
                    pilot: stintsByPilots[teamNumber][currentStint - 1].pilot,
                    kart: stintsByPilots[teamNumber][currentStint - 1].kart,
                };

                currentStintData.laps.push({
                    no: index + 1,
                    time: lap.lapTime,
                    elapsedTime: lap.elapsedTime,
                });
            }
        });

        let lapsDuration = currentStintData.laps.reduce((acc, lap) => acc + lap.time, 0);

        if (currentStint === 1) {
            lapsDuration += currentStintData.startGap;
            currentStintData.endTime = lapsDuration;
        } else {
            currentStintData.endTime = currentStintData.startTime + lapsDuration;
        }

        currentStintData.duration = lapsDuration;

        stintsAnalysis[teamNumber].push(currentStintData);
    }

    for (const teamNumber in stintsAnalysis) {
        const currentStintIndex = stintsAnalysis[teamNumber].length - 1;

        const currentStintData = stintsAnalysis[teamNumber][currentStintIndex];

        const avgLapExcludingPitExitLap =
            (currentStintData.duration -
                currentStintData.startGap -
                currentStintData.laps[0].time) /
            (currentStintData.laps.length - 1);
        const bestLap = currentStintData.laps.reduce(
            (acc, lap) => (lap.time < acc ? lap.time : acc),
            9999
        );
        currentStintData.avgLapExcludingPitExitLap = avgLapExcludingPitExitLap;
        currentStintData.bestLap = bestLap;
    }

    return stintsAnalysis;
};
