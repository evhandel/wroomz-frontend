import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { StyledTableCell } from './LapsTable.styles';
import { useLapTimesArray } from './LapsTable.data';
import { useParams } from 'react-router-dom';
import { useRaceData } from '../../data/useRaceData';
import { LapCell } from './components/LapCell/LapCell';

const getRowBackground = (index: number) => (theme: any) =>
    index % 2 === 0 ? theme.custom.tableRowAlt : theme.custom.tableRowDefault;

const LapsTable: React.FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const { data } = useRaceData(id);
    const { lapTimesArray } = useLapTimesArray(id);

    if (!data) {
        return <div>Loading lap times data...</div>;
    }

    const { results } = data;

    return (
        <div>
            <h3 style={{ paddingLeft: '60px' }}>Lap Timing Table</h3>
            <Table sx={{ minWidth: 1000 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>Lap\Team</StyledTableCell>
                        {results.map((result) => {
                            const fullText =
                                result.teamLabel || result.pilots.join(', ');
                            const shortText =
                                fullText.length > 5
                                    ? fullText.slice(0, 5) + '…'
                                    : fullText;
                            return (
                                <StyledTableCell key={result.teamNumber} align='center'>
                                    <Tooltip title={fullText} arrow>
                                        <span>
                                            <b>{result.teamNumber}</b>
                                            <div
                                                style={{
                                                    fontSize: '0.75em',
                                                    fontWeight: 'normal',
                                                }}
                                            >
                                                {shortText}
                                            </div>
                                        </span>
                                    </Tooltip>
                                </StyledTableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lapTimesArray.map((currentRowLaps, lapIndex) => (
                        <TableRow
                            key={lapIndex}
                            sx={{ backgroundColor: getRowBackground(lapIndex) }}
                        >
                            <StyledTableCell align='center'>{lapIndex + 1}</StyledTableCell>
                            {currentRowLaps.map((lap, teamIndex) => (
                                <LapCell
                                    key={teamIndex}
                                    lap={lap}
                                    lapIndex={lapIndex}
                                    teamIndex={teamIndex}
                                    lapTimesArray={lapTimesArray}
                                    currentRowLaps={currentRowLaps}
                                />
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LapsTable;
