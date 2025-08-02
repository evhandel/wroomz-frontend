import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from './PenaltiesTable.styles';
import { useParams } from 'react-router-dom';
import { usePenalties } from './PenaltiesTable.data';
import { formatTime } from '../../helpers/format';
import { printPenaltyValue } from './PenaltiesTable.helpers';
import { useRaceData } from '../../data/useRaceData';

const PenaltiesTable: React.FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const { data } = useRaceData(id);
    const { penaltiesManual, penaltiesByStintLimit, penaltiesByPilotLimit } = usePenalties(id);

    const results = data?.results;

    if (!data || !results) {
        return <div>Loading penalties data...</div>;
    }

    return (
        <div>
            <h3 style={{ paddingLeft: '60px' }}>Penalties</h3>
            <Table sx={{ minWidth: 1000 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>
                            <b>Penalties\Team</b>
                        </StyledTableCell>
                        {results.map((result) => (
                            <StyledTableCell key={result.teamNumber} align='center'>
                                <b>{result.teamNumber}</b>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={1} sx={{ backgroundColor: 'rgb(28, 25, 23)' }}>
                        <StyledTableCell align='center'>Safety and conduct</StyledTableCell>
                        {penaltiesManual.map((penalty, i) => (
                            <StyledTableCell key={i} align='center'>
                                {printPenaltyValue(penalty)}
                            </StyledTableCell>
                        ))}
                    </TableRow>

                    <TableRow key={2}>
                        <StyledTableCell align='center'> Exceeding stint limits</StyledTableCell>
                        {penaltiesByStintLimit.map((penalty, i) => (
                            <StyledTableCell key={i} align='center'>
                                {printPenaltyValue(penalty)}
                            </StyledTableCell>
                        ))}
                    </TableRow>

                    <TableRow key={3} sx={{ backgroundColor: 'rgb(28, 25, 23)' }}>
                        <StyledTableCell align='center'>Minimum per pilot</StyledTableCell>
                        {penaltiesByPilotLimit.map((penalty, i) => (
                            <StyledTableCell key={i} align='center'>
                                {printPenaltyValue(penalty)}
                            </StyledTableCell>
                        ))}
                    </TableRow>

                    <TableRow key={4}>
                        <StyledTableCell align='center'>
                            <b>Total</b>
                        </StyledTableCell>
                        {penaltiesManual.map((penalty, index) => (
                            <StyledTableCell align='center' key={index}>
                                <b>
                                    {formatTime(
                                        penalty +
                                            penaltiesByPilotLimit[index] +
                                            penaltiesByStintLimit[index],
                                        false,
                                        true
                                    )}
                                </b>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default PenaltiesTable;
