import { SectionHeader } from '../common/styles';
import { SectionWrapper } from './StintsByPilots.styles';
import { OPTIONAL_STINTS_COUNT } from './StintsByPilots.constants';
import { useStintSelection } from '../../hooks/useStintSelection';
import StintRow from './StintRow';
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Tooltip,
} from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';

const StintsByPilots = () => {
    const { teams, settingsData, stintsByPilots, setStintsByPilots } = useRaceEditorStore(
        useShallow((s) => ({
            teams: s.teams,
            settingsData: s.settingsData,
            stintsByPilots: s.stintsByPilots,
            setStintsByPilots: s.setStintsByPilots,
        }))
    );
    const stintsQuantity = Number(settingsData.minStintsQuantity);

    const { getStintData, updatePilot, updateKart, clearStint } = useStintSelection({
        stintsByPilots,
        setStintsByPilots,
    });

    const totalStints = stintsQuantity + OPTIONAL_STINTS_COUNT;
    const stints = Array.from({ length: totalStints }, (_, i) => i + 1);

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
                            {teams.map((team) => {
                                const fullText =
                                    team.teamLabel || team.pilots.join(', ');
                                const shortText =
                                    fullText.length > 5
                                        ? fullText.slice(0, 5) + '…'
                                        : fullText;
                                return (
                                    <TableCell key={team.name}>
                                        <Tooltip title={fullText} arrow>
                                            <span>
                                                <b>{team.name}</b>
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
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stints.map((stint) => (
                            <StintRow
                                key={stint}
                                stintNumber={stint}
                                isOptional={stint > stintsQuantity}
                                isRequired={stint <= stintsQuantity}
                                teams={teams}
                                getStintData={getStintData}
                                updatePilot={updatePilot}
                                updateKart={updateKart}
                                clearStint={clearStint}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </SectionWrapper>
    );
};

export default StintsByPilots;
