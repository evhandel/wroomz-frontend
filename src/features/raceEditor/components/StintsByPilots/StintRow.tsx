import { memo, useMemo } from 'react';
import { Flex } from '../common/styles';
import { Box } from './StintsByPilots.styles';
import { StintRowProps } from './StintsByPilots.types';
import {
    TableRow,
    TableCell,
    Select,
    MenuItem,
    TextField,
    Button,
} from '@mui/material';

const StintRow = memo<StintRowProps>(({
    stintNumber,
    isOptional,
    isRequired,
    teams,
    getStintData,
    updatePilot,
    updateKart,
    clearStint,
}) => {
    const stintIndex = stintNumber - 1;

    const pilotsByTeam = useMemo(
        () =>
            new Map(
                teams.map((team) => [
                    team.name,
                    team.pilots,
                ])
            ),
        [teams]
    );

    return (
        <TableRow>
            <TableCell>
                {stintNumber} {isOptional ? 'opt' : null}
            </TableCell>
            {teams.map((team) => {
                const data = getStintData(team.name, stintIndex);
                const pilot = data?.pilot ?? '';
                const kart = data?.kart ?? '';
                const pilots = pilotsByTeam.get(team.name) ?? [];

                return (
                    <TableCell key={team.name}>
                        <Select
                            variant="outlined"
                            value={pilot}
                            error={isRequired && !pilot}
                            onChange={(e) =>
                                updatePilot(team.name, stintIndex, e.target.value as string)
                            }
                            sx={{ width: 150 }}
                            size="small"
                            autoWidth={false}
                        >
                            {pilots.map((p) => (
                                <MenuItem key={p} value={p}>
                                    {p}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box />
                        <Flex>
                            <span>Kart No </span>
                            <TextField
                                variant="outlined"
                                placeholder="No"
                                size="small"
                                sx={{
                                    width: 50,
                                    '& .MuiOutlinedInput-input': { px: 1 },
                                }}
                                disabled={!pilot}
                                value={kart}
                                error={isRequired && !kart}
                                onChange={(e) =>
                                    updateKart(team.name, stintIndex, e.target.value)
                                }
                            />
                            {data && (
                                <Button onClick={() => clearStint(team.name, stintIndex)}>
                                    Del
                                </Button>
                            )}
                        </Flex>
                    </TableCell>
                );
            })}
        </TableRow>
    );
});

export default StintRow;
