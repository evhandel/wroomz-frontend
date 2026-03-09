import { colors } from './common';

export const buildChartDatasets = (
    stintsAnalysis: Record<string, any>,
    results: any[],
    mapTeamData: (teamStints: any[]) => number[],
    datasetOverrides?: Record<string, any>,
    teamsAndPilots?: any
) => {
    const maxLaps = results.reduce(
        (acc: number, result: any) => (result.laps > acc ? result.laps : acc),
        0
    );

    const labels = Array.from({ length: maxLaps }, (_, i) => i + 1);

    const datasets: any[] = [];
    let counter = 0;

    for (const team in stintsAnalysis) {
        const teamData = mapTeamData(stintsAnalysis[team]);

        const teamResultsIndex = results.findIndex(
            (result: any) => result.teamNumber === team
        );

        const isTopThreeTeam = teamResultsIndex > -1 && teamResultsIndex < 3;

        const matchedResult = results.find((result: any) => result.teamNumber === team);
        const matchedTeam = teamsAndPilots?.find((t: any) => t.name === team);

        datasets.push({
            data: teamData,
            label:
                team +
                ' — ' +
                (matchedResult?.teamLabel ||
                    matchedTeam?.teamLabel ||
                    matchedResult?.pilots?.join(', ') ||
                    ''),
            borderColor: colors[counter],
            backgroundColor: colors[counter],
            borderWidth: 2,
            pointRadius: 1,
            pointHoverRadius: 3,
            hidden: !isTopThreeTeam,
            ...datasetOverrides,
        });

        counter++;
    }

    return { labels, datasets };
};
