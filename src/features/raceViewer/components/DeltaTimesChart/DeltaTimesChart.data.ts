import { useMemo } from 'react';
import type { StintAnalysis } from '@evhandel/wroomz-types';
import { useRaceData } from '../../data/useRaceData';
import { buildChartDatasets } from '../../data/buildChartDatasets';

export const useDeltaTimesChartData = (raceId: string) => {
    const { data: raceDataFromApi } = useRaceData(raceId);

    return useMemo(() => {
        if (!raceDataFromApi)
            return { labels: [], datasets: [], averageLapTimeForWinner: 0 };

        const { results, stintsAnalysis } = raceDataFromApi;

        const maxLaps = results.reduce(
            (acc, result) => (result.laps > acc ? result.laps : acc),
            0
        );

        const fastestTeam = results
            .filter((result) => result.laps === maxLaps)
            .reduce(
                (fastest, result) =>
                    result.totalTimeWithGapWithoutPenalties <
                    fastest.totalTimeWithGapWithoutPenalties
                        ? result
                        : fastest,
                results[0]
            );

        const winnerTeamNumber = fastestTeam.teamNumber;

        const winnerElapsedTimesByLaps = stintsAnalysis[winnerTeamNumber].reduce<number[]>(
            (acc, stintData) => [
                ...acc,
                ...stintData.laps.map((lapData) => lapData.elapsedTime),
            ],
            []
        );

        const averageLapTimeForWinner =
            winnerElapsedTimesByLaps[winnerElapsedTimesByLaps.length - 1] /
            winnerElapsedTimesByLaps.length;

        const { labels, datasets } = buildChartDatasets(
            stintsAnalysis,
            results,
            (teamStints: StintAnalysis[]) => {
                let lapCounter = 0;
                return teamStints.reduce<number[]>(
                    (acc, stintData) => [
                        ...acc,
                        ...stintData.laps.map(
                            (lapData) =>
                                lapData.elapsedTime - averageLapTimeForWinner * ++lapCounter
                        ),
                    ],
                    [0]
                );
            },
            { cubicInterpolationMode: 'monotone' as const },
            raceDataFromApi.teamsAndPilots
        );

        return { labels: [0, ...labels], datasets, averageLapTimeForWinner };
    }, [raceDataFromApi]);
};
