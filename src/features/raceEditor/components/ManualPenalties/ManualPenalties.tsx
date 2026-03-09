import { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { SectionWrapper, Label, SectionHeader } from '../common/styles';
import PenaltyList from '../../../../components/PenaltyList';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';

const ManualPenalties = () => {
    const { penaltiesManual, setPenaltiesManual, disqualifiedTeams, toggleDisqualification } =
        useRaceEditorStore(
            useShallow((s) => ({
                penaltiesManual: s.penaltiesManual,
                setPenaltiesManual: s.setPenaltiesManual,
                disqualifiedTeams: s.disqualifiedTeams,
                toggleDisqualification: s.toggleDisqualification,
            }))
        );

    const [teamNumber, setTeamNumber] = useState('');
    const [value, setValue] = useState('');

    const addPenalty = useCallback(() => {
        const newPenalties = {
            ...penaltiesManual,
            [teamNumber]: (penaltiesManual[teamNumber] || 0) + Number(value),
        };
        setPenaltiesManual(newPenalties);

        setTeamNumber('');
        setValue('');
    }, [penaltiesManual, teamNumber, value, setPenaltiesManual]);

    return (
        <SectionWrapper>
            <SectionHeader>Manual penalties</SectionHeader>
            <PenaltyList penalties={penaltiesManual} />

            <Stack spacing={2} sx={{ mt: 2 }}>
                <div>
                    <Label>Team number</Label>
                    <TextField
                        type="number"
                        size="small"
                        sx={{ width: 120 }}
                        value={teamNumber}
                        onChange={(e) => setTeamNumber(e.target.value + '')}
                    />
                </div>

                <div>
                    <Label>Penalty/compensation, sec</Label>
                    <TextField
                        type="number"
                        size="small"
                        sx={{ width: 120 }}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </Stack>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Button
                    variant="contained"
                    size="small"
                    disabled={!teamNumber || !value}
                    onClick={addPenalty}
                >
                    Add penalty/compensation
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    disabled={Object.keys(penaltiesManual).length === 0}
                    onClick={() => setPenaltiesManual({})}
                >
                    Clear all
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <SectionHeader>DSQ (Disqualification)</SectionHeader>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Button
                    variant="contained"
                    size="small"
                    color="warning"
                    disabled={!teamNumber}
                    onClick={() => {
                        toggleDisqualification(teamNumber);
                        setTeamNumber('');
                    }}
                >
                    {disqualifiedTeams.includes(teamNumber) ? 'Un-DSQ' : 'DSQ'} team
                </Button>
            </Box>

            {disqualifiedTeams.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {disqualifiedTeams.map((team) => (
                        <Chip
                            key={team}
                            label={`Team ${team}`}
                            color="error"
                            onDelete={() => toggleDisqualification(team)}
                        />
                    ))}
                </Box>
            )}
        </SectionWrapper>
    );
};

export default ManualPenalties;
