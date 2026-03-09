import { useMemo } from 'react';
import { useRaceData } from '../../data/useRaceData';
import { buildChartDatasets } from '../../data/buildChartDatasets';

export const useLapTimesChartData = (raceId: string) => {
    const { data: raceDataFromApi } = useRaceData(raceId);

    return useMemo(() => {
        if (!raceDataFromApi) return { labels: [], datasets: [] };

        return buildChartDatasets(
            raceDataFromApi.stintsAnalysis,
            raceDataFromApi.results,
            (teamStints) =>
                teamStints.reduce<number[]>(
                    (acc, stintData) => [
                        ...acc,
                        ...stintData.laps.map((lapData: any) => lapData.time),
                    ],
                    []
                ),
            undefined,
            raceDataFromApi.teamsAndPilots
        );
    }, [raceDataFromApi]);
};
