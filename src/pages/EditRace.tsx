import { useNavigate, useParams } from 'react-router-dom';
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
    CircularProgress,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api, CreateRaceDto } from '../api/client';
import { useEffect, useState } from 'react';
import Main from '../features/raceEditor/components/Main/Main';
import { CalculatedData } from '../features/raceEditor/types';

interface EditRaceForm {
    name: string;
    isPublished: boolean;
}

export function EditRace() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [calculatedData, setCalculatedData] = useState<CalculatedData | null>(null);

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<EditRaceForm>({
        defaultValues: {
            name: '',
            isPublished: false,
        },
    });

    const {
        data: race,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['race', id],
        queryFn: () => id && api.races.getById(id),
    });

    useEffect(() => {
        if (race) {
            reset({
                name: race.name,
                isPublished: race.isPublished,
            });
        }
    }, [race, reset]);

    const updateRaceMutation = useMutation({
        mutationFn: (data: CreateRaceDto) => api.races.update(id, data),
        onSuccess: () => {
            navigate('/');
        },
    });

    const onSubmit = (data: EditRaceForm) => {
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

        updateRaceMutation.mutate(raceData);
    };

    const handleCalculate = (data: CalculatedData) => {
        setCalculatedData(data);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress color='error' />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity='error'>An error occurred while loading data</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant='h4' component='h1' sx={{ mb: 4 }}>
                Edit Race
            </Typography>

            {updateRaceMutation.isError && (
                <Alert severity='error' sx={{ mb: 2 }}>
                    An error occurred while updating the race
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
                                disabled={updateRaceMutation.isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                disabled={updateRaceMutation.isPending}
                            >
                                {updateRaceMutation.isPending ? 'Saving...' : 'Save'}
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>

            <Main onCalculate={handleCalculate} />

            {calculatedData && (
                <Alert severity='success' sx={{ mt: 2 }}>
                    Race data has been calculated and will be saved when you click "Save"
                </Alert>
            )}
        </Box>
    );
}
