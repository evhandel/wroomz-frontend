import { useCallback, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Penalty, PenaltySource } from '@evhandel/wroomz-types';
import { SectionWrapper, Label, SectionHeader } from '../common/styles';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';
import PenaltyRow from './PenaltyRow';

const SOURCE_ORDER: Record<PenaltySource, number> = {
    manual: 0,
    stintLimit: 1,
    pilotLimit: 2,
    minRest: 3,
};

const sortPenalties = (items: Penalty[]): Penalty[] =>
    [...items].sort((a, b) => {
        const teamDiff = Number(a.teamNumber) - Number(b.teamNumber);
        if (teamDiff !== 0) return teamDiff;
        const sourceDiff = SOURCE_ORDER[a.source] - SOURCE_ORDER[b.source];
        if (sourceDiff !== 0) return sourceDiff;
        return a.description.localeCompare(b.description);
    });

const ManualPenalties = () => {
    const {
        penalties,
        disqualifiedTeams,
        addManualPenalty,
        updatePenaltySeconds,
        setPenaltyServedInRace,
        setPenaltyInternal,
        deletePenalty,
        toggleDisqualification,
    } = useRaceEditorStore(
        useShallow((s) => ({
            penalties: s.penalties,
            disqualifiedTeams: s.disqualifiedTeams,
            addManualPenalty: s.addManualPenalty,
            updatePenaltySeconds: s.updatePenaltySeconds,
            setPenaltyServedInRace: s.setPenaltyServedInRace,
            setPenaltyInternal: s.setPenaltyInternal,
            deletePenalty: s.deletePenalty,
            toggleDisqualification: s.toggleDisqualification,
        }))
    );

    const [teamNumber, setTeamNumber] = useState('');
    const [seconds, setSeconds] = useState('');
    const [description, setDescription] = useState('');
    const [servedInRace, setServedInRace] = useState(false);

    const sortedPenalties = useMemo(() => sortPenalties(penalties), [penalties]);

    const secondsParsed = Number(seconds);
    const canAdd =
        teamNumber.trim() !== '' &&
        description.trim() !== '' &&
        (servedInRace ||
            (seconds.trim() !== '' &&
                Number.isFinite(secondsParsed) &&
                secondsParsed !== 0));

    const handleAdd = useCallback(() => {
        if (!canAdd) return;
        addManualPenalty({
            teamNumber: teamNumber.trim(),
            seconds: servedInRace ? 0 : secondsParsed,
            description: description.trim(),
            servedInRace,
        });
        setSeconds('');
        setDescription('');
        setServedInRace(false);
    }, [canAdd, addManualPenalty, teamNumber, secondsParsed, description, servedInRace]);

    return (
        <SectionWrapper>
            <SectionHeader>Penalties & compensations</SectionHeader>

            <Stack spacing={2}>
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
                    <Label>Seconds</Label>
                    {!servedInRace && (
                        <TextField
                            type="number"
                            size="small"
                            sx={{ width: 120 }}
                            value={seconds}
                            onChange={(e) => setSeconds(e.target.value)}
                        />
                    )}
                    <FormControlLabel
                        sx={{ display: 'flex', mt: 1 }}
                        control={
                            <Switch
                                size="small"
                                checked={servedInRace}
                                onChange={(e) => {
                                    const next = e.target.checked;
                                    setServedInRace(next);
                                    if (next) setSeconds('');
                                }}
                            />
                        }
                        label="Served in race"
                    />
                </div>

                <div>
                    <Label>Description</Label>
                    <TextField
                        multiline
                        minRows={2}
                        size="small"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </Stack>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Button
                    variant="contained"
                    size="small"
                    disabled={!canAdd}
                    onClick={handleAdd}
                >
                    Add penalty
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <SectionHeader>Penalty list</SectionHeader>
            {sortedPenalties.length === 0 ? (
                <Typography variant="body2" sx={{ opacity: 0.5 }}>
                    No penalties
                </Typography>
            ) : (
                <Box>
                    {sortedPenalties.map((p) => (
                        <PenaltyRow
                            key={p.id}
                            penalty={p}
                            onUpdateSeconds={updatePenaltySeconds}
                            onSetServedInRace={setPenaltyServedInRace}
                            onSetInternal={setPenaltyInternal}
                            onDelete={deletePenalty}
                        />
                    ))}
                </Box>
            )}

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
