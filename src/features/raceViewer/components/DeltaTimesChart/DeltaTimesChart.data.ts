import { useRaceData } from '../../data/useRaceData';
import { colors } from '../../data/common';
import { teamFirstFinish } from '../../data/teamFirstFinish';

// Hook to get chart data from backend
export const useDeltaTimesChartData = (raceId: string) => {
    const { data: raceDataFromApi } = useRaceData(raceId);

    if (!raceDataFromApi) return { labels: [], datasets: [] };

    // Data calculations
    const maxLaps = raceDataFromApi.results.reduce(
        (acc, result) => (result.laps > acc ? result.laps : acc),
        0
    );

    const labels = Array.from({ length: maxLaps }, (_, i) => i + 1);

    const winnerElapsedTimesByLaps = raceDataFromApi.stintsAnalysis[teamFirstFinish.no].reduce<
        number[]
    >((acc, stintData) => {
        return [...acc, ...stintData.laps.map((lapData) => lapData.elapsedTime)];
    }, []);

    const averageLapTimeForWinner =
        winnerElapsedTimesByLaps[winnerElapsedTimesByLaps.length - 1] /
        winnerElapsedTimesByLaps.length;

    const datasets = [];
    let teamCounter = 0;

    for (let team in raceDataFromApi.stintsAnalysis) {
        let lapCounter = 0;
        const teamData = raceDataFromApi.stintsAnalysis[team].reduce<number[]>((acc, stintData) => {
            return [
                ...acc,
                ...stintData.laps.map(
                    (lapData) => lapData.elapsedTime - averageLapTimeForWinner * ++lapCounter
                ),
            ];
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
            borderColor: colors[teamCounter],
            backgroundColor: colors[teamCounter],
            // pointStyle: false,
            borderWidth: 2,
            pointRadius: 1,
            pointHoverRadius: 3,
            cubicInterpolationMode: 'monotone' as const,
            hidden: !isTopThreeTeam,
        });

        teamCounter++;
    }

    return {
        labels,
        datasets,
        averageLapTimeForWinner,
    };
};
