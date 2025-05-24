import { useRaceData } from '../../data/useRaceData';
import { colors } from '../../data/common';

// Hook to get chart data from backend
export const useLapTimesChartData = (raceId: string) => {
    const { data: raceDataFromApi } = useRaceData(raceId);

    if (!raceDataFromApi) return { labels: [], datasets: [] };

    // Data calculations
    const maxLaps = raceDataFromApi.results.reduce(
        (acc, result) => (result.laps > acc ? result.laps : acc),
        0
    );

    const labels = Array.from({ length: maxLaps }, (_, i) => i + 1);

    const datasets = [];
    let counter = 0;

    for (let team in raceDataFromApi.stintsAnalysis) {
        const teamData = raceDataFromApi.stintsAnalysis[team].reduce<number[]>((acc, stintData) => {
            return [...acc, ...stintData.laps.map((lapData) => lapData.time)];
        }, []);

        const teamResultsIndex = raceDataFromApi.results.findIndex(
            (result) => result.teamNumber === team
        );

        const isTopThreeTeam = teamResultsIndex > -1 && teamResultsIndex < 3;

        datasets.push({
            data: teamData,
            label:
                team +
                ' — ' +
                raceDataFromApi.results
                    .find((result) => result.teamNumber === team)
                    ?.pilots.join(', '),
            borderColor: colors[counter],
            backgroundColor: colors[counter],
            // pointStyle: false,
            borderWidth: 2,
            pointRadius: 1,
            pointHoverRadius: 3,
            hidden: !isTopThreeTeam,
            // cubicInterpolationMode: 'monotone',
        });

        counter++;
    }

    return {
        labels,
        datasets,
    };
};
