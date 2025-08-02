import { useRaceData } from '../../data/useRaceData';
import { colors } from '../../data/common';

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

    // Find the fastest team on the track (first place finisher excl. penalties)
    const fastestTeam = raceDataFromApi.results
        .filter((result) => result.laps === maxLaps)
        .reduce(
            (fastest, result) =>
                result.totalTimeWithGapWithoutPenalties < fastest.totalTimeWithGapWithoutPenalties
                    ? result
                    : fastest,
            raceDataFromApi.results[0]
        );

    const winnerTeamNumber = fastestTeam.teamNumber;

    const winnerElapsedTimesByLaps = raceDataFromApi.stintsAnalysis[winnerTeamNumber].reduce<
        number[]
    >((acc, stintData) => {
        return [...acc, ...stintData.laps.map((lapData) => lapData.elapsedTime)];
    }, []);

    const averageLapTimeForWinner =
        winnerElapsedTimesByLaps[winnerElapsedTimesByLaps.length - 1] /
        winnerElapsedTimesByLaps.length;

    const datasets = [];
    let teamCounter = 0;

    for (const team in raceDataFromApi.stintsAnalysis) {
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
