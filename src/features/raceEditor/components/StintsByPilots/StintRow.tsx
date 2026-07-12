import { memo } from 'react';
import { TableRow, TableCell } from '@mui/material';
import StintCell from './StintCell';
import { StintRowProps } from './StintsByPilots.types';

const StintRow = memo<StintRowProps>(
    ({
        stintNumber,
        isOptional,
        isRequired,
        teams,
        kartHasFixedNumber,
        activeTeam,
        onActivate,
        onClose,
        onNavigate,
    }) => {
        const stintIndex = stintNumber - 1;

        return (
            <TableRow>
                <TableCell>
                    {stintNumber} {isOptional ? 'opt' : null}
                </TableCell>
                {teams.map((team) => (
                    <TableCell key={team.name}>
                        <StintCell
                            team={team.name}
                            pilots={team.pilots}
                            stintIndex={stintIndex}
                            isRequired={isRequired}
                            kartHasFixedNumber={kartHasFixedNumber}
                            isActive={activeTeam === team.name}
                            onActivate={onActivate}
                            onClose={onClose}
                            onNavigate={onNavigate}
                        />
                    </TableCell>
                ))}
            </TableRow>
        );
    }
);

export default StintRow;
