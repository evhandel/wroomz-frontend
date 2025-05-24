import { FC } from 'react';
import { Flex, SectionHeader } from '../common/styles';
import { Box, SectionWrapper } from './StingtsByPilots.styles';
import { StintsByPilotsProps } from './StintsByPilots.types';
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Select,
    MenuItem,
    TextField,
    Button,
} from '@mui/material';

const StintsByPilots: FC<StintsByPilotsProps> = (props) => {
    const { teams, stintsQuantity, stintsByPilots, setStintsByPilots } = props;

    console.log('%c * ', 'background: #000; color: aqua', stintsByPilots);

    const stints: number[] = [];
    let i = 1;
    while (i <= stintsQuantity + 2) {
        stints.push(i++);
    }

    return (
        <SectionWrapper>
            <SectionHeader>Stints by Pilots</SectionHeader>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Stint No</b>
                            </TableCell>
                            {teams.map((team) => (
                                <TableCell>
                                    <b>{team.name}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stints.map((stint) => (
                            <TableRow key={stint}>
                                <TableCell key={0}>
                                    {stint} {stint >= stints.length - 1 ? 'opt' : null}
                                </TableCell>
                                {teams.map((team) => (
                                    <TableCell key={team.name}>
                                        <Select
                                            variant='outlined'
                                            value={
                                                (stintsByPilots[team.name] &&
                                                    stintsByPilots[team.name][stint - 1]?.pilot) ||
                                                ''
                                            }
                                            error={
                                                stintsByPilots[team.name] &&
                                                !stintsByPilots[team.name][stint - 1]?.pilot &&
                                                stint < stints.length - 1
                                            }
                                            onChange={(e) => {
                                                const newArray = [
                                                    ...(stintsByPilots[team.name]
                                                        ? stintsByPilots[team.name]
                                                        : []),
                                                ];
                                                newArray[stint - 1] = {
                                                    pilot: e.target.value,
                                                    kart: stintsByPilots[team.name]
                                                        ? stintsByPilots[team.name][stint - 1]?.kart
                                                        : undefined,
                                                };

                                                setStintsByPilots({
                                                    ...stintsByPilots,
                                                    [team.name]: newArray,
                                                });
                                            }}
                                            sx={{ width: 150 }}
                                            size='small'
                                            autoWidth={false}
                                        >
                                            <MenuItem value={team.pilotOne}>
                                                {team.pilotOne}
                                            </MenuItem>
                                            <MenuItem value={team.pilotTwo}>
                                                {team.pilotTwo}
                                            </MenuItem>
                                            {team.pilotThree ? (
                                                <MenuItem value={team.pilotThree}>
                                                    {team.pilotThree}
                                                </MenuItem>
                                            ) : null}
                                            {team.pilotFour ? (
                                                <MenuItem value={team.pilotFour}>
                                                    {team.pilotFour}
                                                </MenuItem>
                                            ) : null}
                                        </Select>
                                        <Box />
                                        <Flex>
                                            <span>Kart No </span>
                                            <TextField
                                                variant='outlined'
                                                placeholder='No'
                                                size='small'
                                                sx={{
                                                    width: 50,
                                                    '& .MuiOutlinedInput-input': { px: 1 },
                                                }}
                                                disabled={
                                                    stintsByPilots[team.name] &&
                                                    !stintsByPilots[team.name][stint - 1]?.pilot
                                                }
                                                value={
                                                    (stintsByPilots[team.name] &&
                                                        stintsByPilots[team.name][stint - 1]
                                                            ?.kart) ||
                                                    ''
                                                }
                                                error={
                                                    stintsByPilots[team.name] &&
                                                    !stintsByPilots[team.name][stint - 1]?.kart &&
                                                    stint < stints.length - 1
                                                }
                                                onChange={(e) => {
                                                    const newArray = [
                                                        ...(stintsByPilots[team.name]
                                                            ? stintsByPilots[team.name]
                                                            : []),
                                                    ];
                                                    newArray[stint - 1] = {
                                                        pilot: stintsByPilots[team.name]
                                                            ? stintsByPilots[team.name][stint - 1]
                                                                  .pilot
                                                            : undefined,
                                                        kart: e.target.value,
                                                    };

                                                    setStintsByPilots({
                                                        ...stintsByPilots,
                                                        [team.name]: newArray,
                                                    });
                                                }}
                                            />

                                            {stintsByPilots[team.name] &&
                                                stintsByPilots[team.name][stint - 1] && (
                                                    <Button
                                                        onClick={() => {
                                                            const newArray = [
                                                                ...stintsByPilots[team.name],
                                                            ];
                                                            newArray[stint - 1] = undefined;

                                                            setStintsByPilots({
                                                                ...stintsByPilots,
                                                                [team.name]: newArray,
                                                            });
                                                        }}
                                                    >
                                                        Del
                                                    </Button>
                                                )}
                                        </Flex>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </SectionWrapper>
    );
};

export default StintsByPilots;
