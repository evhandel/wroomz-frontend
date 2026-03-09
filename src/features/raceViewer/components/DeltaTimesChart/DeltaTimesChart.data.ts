import { useMemo } from 'react';
import { useRaceData } from '../../data/useRaceData';
import { buildChartDatasets } from '../../data/buildChartDatasets';

export const useDeltaTimesChartData = (raceId: string) => {
    const { data: raceDataFromApi } = useRaceData(raceId);

    return useMemo(() => {
        if (!raceDataFromApi)
            return { labels: [], datasets: [], averageLapTimeForWinner: 0 };

        const { results, stintsAnalysis } = raceDataFromApi;

        const maxLaps = results.reduce(
            (acc: number, result: any) => (result.laps > acc ? result.laps : acc),
            0
        );

        const fastestTeam = results
            .filter((result: any) => result.laps === maxLaps)
            .reduce(
                (fastest: any, result: any) =>
                    result.totalTimeWithGapWithoutPenalties <
                    fastest.totalTimeWithGapWithoutPenalties
                        ? result
                        : fastest,
                results[0]
            );

        const winnerTeamNumber = fastestTeam.teamNumber;

        const winnerElapsedTimesByLaps = stintsAnalysis[winnerTeamNumber].reduce<number[]>(
            (acc, stintData: any) => [
                ...acc,
                ...stintData.laps.map((lapData: any) => lapData.elapsedTime),
            ],
            []
        );

        const averageLapTimeForWinner =
            winnerElapsedTimesByLaps[winnerElapsedTimesByLaps.length - 1] /
            winnerElapsedTimesByLaps.length;

        const { labels, datasets } = buildChartDatasets(
            stintsAnalysis,
            results,
            (teamStints) => {
                let lapCounter = 0;
                return teamStints.reduce<number[]>(
                    (acc, stintData: any) => [
                        ...acc,
                        ...stintData.laps.map(
                            (lapData: any) =>
                                lapData.elapsedTime - averageLapTimeForWinner * ++lapCounter
                        ),
                    ],
                    []
                );
            },
            { cubicInterpolationMode: 'monotone' as const },
            raceDataFromApi.teamsAndPilots
        );

        return { labels, datasets, averageLapTimeForWinner };
    }, [raceDataFromApi]);
};
