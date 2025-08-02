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
import { useMutation } from '@tanstack/react-query';
import { api, CreateRaceDto } from '../api/client';
import { useState } from 'react';
import Main from '../features/raceEditor/components/Main/Main';
import { CalculatedData } from '../features/raceEditor/types';

interface NewRaceForm {
    name: string;
    isPublished: boolean;
}

export function NewRace() {
    const navigate = useNavigate();
    const [calculatedData, setCalculatedData] = useState<CalculatedData | null>(null);

    const {
        control,
        handleSubmit,
    } = useForm<NewRaceForm>({
        defaultValues: {
            name: '',
            isPublished: false,
        },
    });

    const createRaceMutation = useMutation({
        mutationFn: (data: CreateRaceDto) => api.races.create(data),
        onSuccess: () => {
            navigate('/');
        },
    });

    const onSubmit = (data: NewRaceForm) => {
        const raceData: CreateRaceDto = {
            name: data.name,
            isPublished: data.isPublished,
            details: calculatedData
                ? {
                      results: calculatedData.results,
                      calculatedData: calculatedData.stintsAnalysis,
                      penalties: calculatedData.penalties,
                      settings: calculatedData.settingsData,
                  }
                : undefined,
        };

        createRaceMutation.mutate(raceData);
    };

    const handleCalculate = (data: CalculatedData) => {
        setCalculatedData(data);
    };

    return (
        <Box>
            <Typography variant='h4' component='h1' sx={{ mb: 4 }}>
                Create New Race
            </Typography>

            {createRaceMutation.isError && (
                <Alert severity='error' sx={{ mb: 2 }}>
                    An error occurred while creating the race
                </Alert>
            )}

            <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                disabled={createRaceMutation.isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                disabled={createRaceMutation.isPending}
                            >
                                {createRaceMutation.isPending ? 'Creating...' : 'Create Race'}
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>

            <Main onCalculate={handleCalculate} />

            {calculatedData && (
                <Alert severity='success' sx={{ mt: 2 }}>
                    Race data has been calculated and will be saved when you click "Create Race"
                </Alert>
            )}
        </Box>
    );
}
