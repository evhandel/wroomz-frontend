import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell } from './StintsTable.styles';
import { useStints } from './StintsTable.data';
import ComboTableCell from './components/ComboTableCell/ComboTableCell';
import { useParams } from 'react-router-dom';
import { useRaceData } from '../../data/useRaceData';

const StintsTable: React.FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const { data } = useRaceData(id);
    const stints = useStints(id);

    const [activeKart, setActiveKart] = useState<string | null>(null);

    let fastestAvg = 9999;
    let fastestPit = 9999;
    let minLapTime = 999;

    // Calculate minimum lap time from backend data
    if (data?.stintsAnalysis) {
        for (const teamNumber in data.stintsAnalysis) {
            const stints = data.stintsAnalysis[teamNumber];
            for (const stint of stints) {
                for (const lapData of stint.laps) {
                    if (lapData.time < minLapTime) {
                        minLapTime = lapData.time;
                    }
                }
            }
        }
    }

    stints.forEach((stintByTeams) => {
        stintByTeams.forEach((stint) => {
            if (!stint.laps) return;

            if (stint.avgLapExcludingPitExitLap < fastestAvg) {
                fastestAvg = stint.avgLapExcludingPitExitLap;
            }
            if (stint.laps[0].time < fastestPit && stint.no > 1) {
                fastestPit = stint.laps[0].time;
            }
        });
    });

    const maxStint = data?.settings?.maxStint;
    const results = data?.results;

    if (!data || !results || !maxStint) {
        return <div>Loading race data...</div>;
    }

    return (
        <div>
            <h3 style={{ paddingLeft: '60px' }}>Stint Statistics Table</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }} aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Stint\Team</StyledTableCell>
                            {results.map((result) => (
                                <StyledTableCell key={result.teamNumber} align='center'>
                                    <b>{result.teamNumber}</b>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stints.map((stintByTeams, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor:
                                        index % 2 === 0 ? 'rgb(28, 25, 23)' : 'inherit',
                                }}
                            >
                                <StyledTableCell align='center'>
                                    <b>{index + 1}</b>
                                </StyledTableCell>
                                {stintByTeams.map((stintByTeam) =>
                                    stintByTeam?.laps?.length ? (
                                        <StyledTableCell key={stintByTeam.teamNumber}>
                                            <ComboTableCell
                                                {...stintByTeam}
                                                minLapTime={minLapTime}
                                                fastestBest={stintByTeam.bestLap === minLapTime}
                                                fastestAvg={
                                                    stintByTeam.avgLapExcludingPitExitLap ===
                                                    fastestAvg
                                                }
                                                fastestPit={stintByTeam.laps[0].time === fastestPit}
                                                stintMaxLimit={maxStint}
                                                activeKart={activeKart}
                                                setActiveKart={setActiveKart}
                                            />
                                        </StyledTableCell>
                                    ) : (
                                        <StyledTableCell />
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StintsTable;
