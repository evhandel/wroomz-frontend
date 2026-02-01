import { GetLapHighlightParams, LapHighlight } from './LapCell.types';

export const getLapHighlight = ({
    lap,
    lapIndex,
    teamIndex,
    lapTimesArray,
    currentRowLaps,
}: GetLapHighlightParams): LapHighlight => {
    if (!lap || isNaN(lap.time)) {
        return 'none';
    }

    const { time: lapSeconds, stintIndex } = lap;

    // First lap of 2nd+ stint
    const previousLap = lapTimesArray[lapIndex - 1]?.[teamIndex];
    const isFirstLapOfStint = previousLap?.stintIndex !== stintIndex && stintIndex > 0;

    if (isFirstLapOfStint) {
        return 'firstLapOfStint';
    }

    // Overall best: fastest lap so far in the race
    const allPreviousLaps = lapTimesArray
        .slice(0, lapIndex)
        .flatMap((row) => row.filter((x) => x && !isNaN(x.time)).map((x) => x!.time));

    const allLapsSoFarIncludingCurrent = allPreviousLaps.concat(
        currentRowLaps.map((x) => x?.time ?? Infinity)
    );

    const minOverallSoFar = Math.min(...allLapsSoFarIncludingCurrent);

    if (lapSeconds === minOverallSoFar) {
        return 'overallBest';
    }

    // Personal best within same stint
    const previousLapsInSameStint = lapTimesArray
        .slice(0, lapIndex)
        .map((row) => row?.[teamIndex])
        .filter((x) => x && x.stintIndex === stintIndex && !isNaN(x.time))
        .map((x) => x!.time);

    const fastestSoFarInStint =
        previousLapsInSameStint.length > 0 ? Math.min(...previousLapsInSameStint) : Infinity;

    if (lapSeconds < fastestSoFarInStint) {
        return 'personalBest';
    }

    return 'none';
};
