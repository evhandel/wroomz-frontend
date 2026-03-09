import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Stack,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Main from '../../features/raceEditor/components/Main/Main';
import { EditorSnapshot } from '../../features/raceEditor/types';
import type { RaceData } from '../../features/raceEditor/components/Main/Main.types';
import type { Team } from '../../features/raceEditor/components/Teams/Teams.types';
import type { StintOverrides } from '../../features/raceEditor/types';
import { CreateRaceDto } from '../../api';
import { RaceFormProps, RaceFormValues } from './RaceForm.types';

function buildSnapshotFromBackend(race: NonNullable<RaceFormProps['initialRaceData']>): EditorSnapshot | null {
    if (!race.results) return null;
    return {
        results: race.results,
        stintsAnalysis: race.calculatedData ?? {},
        penalties: race.penalties ?? {
            penaltiesManual: {},
            penaltiesByStintLimit: {},
            penaltiesByPilotLimit: {},
            disqualifiedTeams: [],
        },
        settingsData: race.settings ?? {
            maxStint: 0,
            minForPilotByTeamSize: {},
            pitStopDetectionTime: 0,
            minPitStopLapTime: 0,
            minStintsQuantity: 0,
        },
        raceData: (race.rawData ?? {}) as RaceData,
        teams: (race.teamsAndPilots as unknown as Team[]) ?? [],
        stintsByPilots: race.stintByPilots ?? {},
        stintOverrides: (race.lapsNotDelimiters as unknown as StintOverrides) ?? {},
    };
}

export function RaceForm({
    title,
    submitLabel,
    submitPendingLabel,
    errorMessage,
    successMessage,
    defaultValues,
    initialRaceData,
    onSubmit,
    isPending,
    isError,
}: RaceFormProps) {
    const navigate = useNavigate();
    const [editorSnapshot, setEditorSnapshot] = useState<EditorSnapshot | null>(
        () => (initialRaceData ? buildSnapshotFromBackend(initialRaceData) : null)
    );

    const { control, handleSubmit, reset } = useForm<RaceFormValues>({
        defaultValues: {
            name: '',
            isPublished: false,
        },
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const handleFormSubmit = (data: RaceFormValues) => {
        const raceData: CreateRaceDto = {
            name: data.name,
            isPublished: data.isPublished,
            ...(editorSnapshot
                ? {
                      results: editorSnapshot.results,
                      calculatedData: editorSnapshot.stintsAnalysis,
                      penalties: editorSnapshot.penalties,
                      settings: editorSnapshot.settingsData,
                      rawData: editorSnapshot.raceData,
                      teamsAndPilots: editorSnapshot.teams,
                      stintByPilots: editorSnapshot.stintsByPilots,
                      lapsNotDelimiters: editorSnapshot.stintOverrides,
                  }
                : {}),
        };

        onSubmit(raceData);
    };

    return (
        <Box>
            <Typography variant='h4' component='h1' sx={{ mb: 4 }}>
                {title}
            </Typography>

            {isError && (
                <Alert severity='error' sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Stack spacing={3}>
                        <Controller
                            name='name'
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label='Race Name'
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />

                        <Controller
                            name='isPublished'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <FormControlLabel
                                    control={<Switch checked={value} onChange={onChange} />}
                                    label='Publish Race'
                                />
                            )}
                        />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                variant='outlined'
                                onClick={() => navigate('/')}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                disabled={isPending}
                            >
                                {isPending ? submitPendingLabel : submitLabel}
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>

            <Main initialRaceData={initialRaceData} onCalculate={setEditorSnapshot} />

            {editorSnapshot && (
                <Alert severity='success' sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}
        </Box>
    );
}
