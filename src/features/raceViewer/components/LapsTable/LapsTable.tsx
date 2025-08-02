import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from './LapsTable.styles';
import { useLapTimesArray } from './LapsTable.data';
import { useParams } from 'react-router-dom';
import { useRaceData } from '../../data/useRaceData';

const LapsTable: React.FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const { data } = useRaceData(id);
    const { lapTimesArray } = useLapTimesArray(id);

    if (!data) {
        return <div>Loading lap times data...</div>;
    }

    const results = data.results;

    return (
        <div>
            <h3 style={{ paddingLeft: '60px' }}>Lap Timing Table</h3>
            <Table sx={{ minWidth: 1000 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>Lap\Team</StyledTableCell>
                        {results.map((result) => (
                            <StyledTableCell key={result.teamNumber} align='center'>
                                <b>{result.teamNumber}</b>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lapTimesArray.map((lapByTeamsArray, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                backgroundColor: index % 2 === 0 ? 'rgb(28, 25, 23)' : '#060606',
                            }}
                        >
                            <StyledTableCell align='center'>{index + 1}</StyledTableCell>

                            {lapByTeamsArray.map((lapTime, i) => (
                                <StyledTableCell key={i} align='center'>
                                    {lapTime}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LapsTable;
