import { FC, useMemo } from 'react';
import { ResultsWrapper, Time, Position, TeamNumber, DriverNames } from './Results.styles';
import { ResultsProps } from './Results.types';
import { Red } from '../../../../components/common/styles';
import PenaltyText from '../../../../components/PenaltyText';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRaceData } from '../../data/useRaceData';

const Results: FC<ResultsProps> = ({ raceId = '' }) => {
    const { data: raceData, isLoading } = useRaceData(raceId);

    const { leaderStintQuantity, maxLaps, fastestTeamOnTrackTime } = useMemo(() => {
        if (!raceData || !raceData.results || raceData.results.length === 0) {
            return { leaderStintQuantity: 0, maxLaps: 0, fastestTeamOnTrackTime: 0 };
        }
        const activeResults = raceData.results.filter((r) => !r.isDisqualified);
        if (activeResults.length === 0) {
            return { leaderStintQuantity: 0, maxLaps: 0, fastestTeamOnTrackTime: 0 };
        }
        const leaderStintQuantity = activeResults[0].stintsQuantity;
        const maxLaps = activeResults.reduce(
            (acc, result) => (result.laps > acc ? result.laps : acc),
            0
        );
        const fastestTeamOnTrackTime = activeResults
            .filter((result) => result.laps === maxLaps)
            .reduce(
                (minTime, result) =>
                    result.totalTimeWithGapWithoutPenalties < minTime
                        ? result.totalTimeWithGapWithoutPenalties
                        : minTime,
                Number.MAX_VALUE
            );
        return { leaderStintQuantity, maxLaps, fastestTeamOnTrackTime };
    }, [raceData]);

    // If no data is available yet, show loading or empty state
    if (isLoading || !raceData || !raceData.results || raceData.results.length === 0) {
        return (
            <ResultsWrapper>
                <Typography variant="h5" component="h2">Race results:</Typography>
                <div>{isLoading ? 'Loading race data...' : 'No race data available'}</div>
            </ResultsWrapper>
        );
    }

    return (
        <ResultsWrapper>
            <Typography variant="h5" component="h2">Race results:</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        {(() => {
                            let position = 0;
                            return raceData.results.map((result) => {
                            const isDsq = result.isDisqualified;

                            const time = isDsq ? (
                                    <Red><b>DSQ</b></Red>
                                ) : result.totalTimeWithGapWithoutPenalties ===
                                fastestTeamOnTrackTime ? (
                                    <b>{result.laps} laps</b>
                                ) : result.laps === maxLaps ? (
                                    `+${Math.round(result.totalTimeWithGapWithoutPenalties - fastestTeamOnTrackTime)} s`
                                ) : (
                                    `+${maxLaps - result.laps} laps`
                                );

                            const penaltyPrefix = result.penalty > 0 ? '+' : '';
                            const penaltyPostfix =
                                result.penalty >= 0 ? 'penalty' : 'compensation';
                            const penaltyElement = (
                                <PenaltyText value={result.penalty}>
                                    {`${penaltyPrefix}${Math.round(result.penalty)}s ${penaltyPostfix}`}
                                </PenaltyText>
                            );

                            return (
                                <TableRow
                                    key={result.teamNumber}
                                    {...(isDsq ? { sx: { opacity: 0.5 } } : {})}
                                >
                                    <TableCell>
                                        <Position>
                                            {isDsq ? (
                                                <Red><b>DSQ</b></Red>
                                            ) : (
                                                `${++position}.`
                                            )}
                                        </Position>
                                    </TableCell>
                                    <TableCell>
                                        <TeamNumber>{result.teamNumber}</TeamNumber>
                                    </TableCell>
                                    <TableCell>
                                        <DriverNames>
                                            {result.teamLabel ? (
                                                <Tooltip title={result.pilots.join(', ')} arrow>
                                                    <span>{result.teamLabel}</span>
                                                </Tooltip>
                                            ) : (
                                                result.pilots.join(', ')
                                            )}
                                        </DriverNames>
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
                        });
                        })()}
                    </TableBody>
                </Table>
            </TableContainer>
        </ResultsWrapper>
    );
};

export default Results;
