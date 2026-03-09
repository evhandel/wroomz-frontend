import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SectionWrapper, SectionHeader, Label } from '../common/styles';
import { Team } from './Teams.types';
import { StyledForm } from './Teams.styles';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';
import { useSnackbar } from '../../../../context/SnackbarContext';

const MIN_PILOTS = 1;
const MAX_PILOTS = 6;

const Teams = () => {
    const { teams, setTeams } = useRaceEditorStore(
        useShallow((s) => ({ teams: s.teams, setTeams: s.setTeams }))
    );
    const { showMessage } = useSnackbar();

    const [teamName, setTeamName] = useState('');
    const [teamLabel, setTeamLabel] = useState('');
    const [pilots, setPilots] = useState<string[]>(['', '']);

    const addPilotField = () => {
        if (pilots.length < MAX_PILOTS) setPilots([...pilots, '']);
    };

    const removePilotField = () => {
        if (pilots.length > MIN_PILOTS) setPilots(pilots.slice(0, -1));
    };

    const updatePilot = (index: number, value: string) => {
        setPilots(pilots.map((p, i) => (i === index ? value : p)));
    };

    const onSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const name = teamName.trim();
            const filledPilots = pilots.filter((p) => p.trim());

            if (!name) {
                showMessage('Enter a team number.', 'error');
                return;
            }
            if (!filledPilots.length) {
                showMessage('Add at least one pilot.', 'error');
                return;
            }
            if (teams.find((team) => name === team.name)) {
                showMessage('Уже есть команда с таким номером.', 'error');
                return;
            }

            const newTeam: Team = {
                name,
                ...(teamLabel.trim() && { teamLabel: teamLabel.trim() }),
                pilots: filledPilots,
            };
            setTeams([...teams, newTeam].sort((a, b) => (Number(a.name) < Number(b.name) ? -1 : 1)));
            setTeamName('');
            setTeamLabel('');
            setPilots(['', '']);
        },
        [teamName, teamLabel, pilots, teams, setTeams, showMessage]
    );

    const removeTeam = useCallback(
        (teamName: string) => {
            setTeams(teams.filter((t) => t.name !== teamName));
        },
        [teams, setTeams]
    );

    return (
        <SectionWrapper>
            <SectionHeader>Teams and Pilots</SectionHeader>
            {teams.map((team) => (
                <Box
                    key={team.name}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 0.5,
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {team.name}.
                    </Typography>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                        {team.teamLabel ? (
                            <Tooltip title={team.pilots.join(', ')} arrow>
                                <span>{team.teamLabel}</span>
                            </Tooltip>
                        ) : (
                            team.pilots.join(', ')
                        )}
                    </Typography>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => removeTeam(team.name)}
                    >
                        remove
                    </Button>
                </Box>
            ))}

            <StyledForm onSubmit={onSubmit}>
                <Label>
                    <TextField
                        type="number"
                        size="small"
                        sx={{ width: 100, mr: 1, mb: 1 }}
                        placeholder="Team Number"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <TextField
                        type="text"
                        size="small"
                        sx={{ width: 160, mr: 1, mb: 1 }}
                        placeholder="Team Name (optional)"
                        value={teamLabel}
                        onChange={(e) => setTeamLabel(e.target.value)}
                    />
                    {pilots.map((pilot, index) => (
                        <TextField
                            key={index}
                            type="text"
                            size="small"
                            sx={{ width: 160, mr: 1, mb: 1 }}
                            placeholder={`Pilot ${index + 1}`}
                            value={pilot}
                            onChange={(e) => updatePilot(index, e.target.value)}
                        />
                    ))}
                    <IconButton
                        size="small"
                        onClick={addPilotField}
                        disabled={pilots.length >= MAX_PILOTS}
                        title="Add pilot"
                    >
                        +
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={removePilotField}
                        disabled={pilots.length <= MIN_PILOTS}
                        title="Remove pilot"
                    >
                        −
                    </IconButton>
                </Label>

                <Button type="submit" variant="contained" size="small" sx={{ mt: 1 }}>
                    Add team
                </Button>
            </StyledForm>
        </SectionWrapper>
    );
};

export default Teams;
