import React, { FC } from 'react';
import { ResultItem, ResultsWrapper, Time, Position, TeamNumber, DriverNames } from './Results.styles';
import { ResultsProps } from './Results.types';
import { Green, Red } from '../common/styles';
//         P1 Team 15 (Kuzovov, Barinov) 192 laps, +10s penalty, 5 pitstops
const Results: FC<ResultsProps> = ({ results }) => {
    const leaderStintQuantity = results[0].stintsQuantity;
    const maxLaps = results.reduce((acc, result) => (result.laps > acc ? result.laps : acc), 0);
    const maxTotalTimeWithGapWithoutPenalties = results.reduce(
        (acc, result) =>
            result.totalTimeWithGapWithoutPenalties > acc && result.laps === maxLaps
                ? result.totalTimeWithGapWithoutPenalties
                : acc,
        0,
    );

    return (
        <ResultsWrapper>
            {results.map((result, index) => {
                const time = result.avgTimeTotal;
                // result.totalTimeWithGapWithoutPenalties === maxTotalTimeWithGapWithoutPenalties
                //     ? `${result.laps} laps`
                //     : result.laps === maxLaps
                //       ? `+${Math.round(maxTotalTimeWithGapWithoutPenalties - result.totalTimeWithGapWithoutPenalties)} s`
                //       : `+${maxLaps - result.laps} laps`;

                const penaltyPrefix = result.penalty > 0 ? '+' : '';
                const penaltyPostfix = result.penalty >= 0 ? 'penalty' : 'compensation';
                const penaltyString = `${penaltyPrefix}${Math.round(result.penalty)}s ${penaltyPostfix}`;
                const penaltyElement = result.penalty > 0 ? <Red>{penaltyString}</Red> : <Green>{penaltyString}</Green>;

                return (
                    <ResultItem key={result.teamNumber}>
                        <Position>P{index + 1} — </Position>
                        <TeamNumber>{result.teamNumber}</TeamNumber>
                        <DriverNames>{result.pilots.join(', ')}</DriverNames>
                        <Time>(Avg lap time incl. pen. {time})</Time>
                        <Time>{penaltyElement}</Time>
                        <Time>
                            {result.stintsQuantity === leaderStintQuantity ? (
                                ` ${result.stintsQuantity} stints`
                            ) : (
                                <Red>
                                    <b>{result.stintsQuantity} stints</b>
                                </Red>
                            )}
                        </Time>
                    </ResultItem>
                );
            })}
        </ResultsWrapper>
    );
};

export default Results;
