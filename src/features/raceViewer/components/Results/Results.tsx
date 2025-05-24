import { FC } from 'react';
import { ResultsWrapper, Time, Position, TeamNumber, DriverNames } from './Results.styles';
import { ResultsProps } from './Results.types';
import { Green, Red } from '../common/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { teamFirstFinish } from '../../data/teamFirstFinish';
import { useRaceData } from '../../data/useRaceData';

//         P1 Team 15 (Kuzovov, Barinov) 192 laps, +10s penalty, 5 pitstops
const Results: FC<ResultsProps> = ({ raceId = '' }) => {
    const { data: raceData, isLoading } = useRaceData(raceId);

    console.log('%c * raceData', 'background: #000; color: aqua', raceData);

    // If no data is available yet, show loading or empty state
    if (isLoading || !raceData || !raceData.results || raceData.results.length === 0) {
        return (
            <ResultsWrapper>
                <h2>Race results:</h2>
                <div>{isLoading ? 'Loading race data...' : 'No race data available'}</div>
            </ResultsWrapper>
        );
    }

    const leaderStintQuantity = raceData.results[0].stintsQuantity;
    const maxLaps = raceData.results.reduce(
        (acc, result) => (result.laps > acc ? result.laps : acc),
        0
    );

    return (
        <ResultsWrapper>
            <h2>Race results:</h2>
            <TableContainer>
                <Table>
                    <TableBody>
                        {raceData.results.map((result, index) => {
                            console.log('%c * result', 'background: #000; color: aqua');
                            const time =
                                result.totalTimeWithGapWithoutPenalties ===
                                teamFirstFinish.elapsedTime ? (
                                    <b>{result.laps} laps</b>
                                ) : result.laps === maxLaps ? (
                                    `+${Math.round(result.totalTimeWithGapWithoutPenalties - teamFirstFinish.elapsedTime)} s`
                                ) : (
                                    `+${maxLaps - result.laps} laps`
                                );

                            const penaltyPrefix = result.penalty > 0 ? '+' : ''; // minus will be added automatically
                            const penaltyPostfix = result.penalty >= 0 ? 'penalty' : 'compensation';
                            const penaltyString = `${penaltyPrefix}${Math.round(result.penalty)}s ${penaltyPostfix}`;
                            const penaltyElement =
                                result.penalty > 0 ? (
                                    <Red>{penaltyString}</Red>
                                ) : (
                                    <Green>{penaltyString}</Green>
                                );

                            return (
                                <TableRow key={result.teamNumber}>
                                    <TableCell>
                                        <Position>{index + 1}.</Position>
                                    </TableCell>
                                    <TableCell>
                                        <TeamNumber>{result.teamNumber}</TeamNumber>
                                    </TableCell>
                                    <TableCell>
                                        <DriverNames>{result.pilots.join(', ')}</DriverNames>
                                    </TableCell>
                                    <TableCell>
                                        <Time>{time}</Time>
                                    </TableCell>
                                    <TableCell>
                                        <Time>{penaltyElement}</Time>
                                    </TableCell>
                                    <TableCell>
                                        <Time>
                                            {result.stintsQuantity === leaderStintQuantity ? (
                                                ` ${result.stintsQuantity} stints`
                                            ) : (
                                                <Red>
                                                    <b>{result.stintsQuantity} stints</b>
                                                </Red>
                                            )}
                                        </Time>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </ResultsWrapper>
    );
};

export default Results;
