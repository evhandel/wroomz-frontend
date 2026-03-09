import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Box, Alert, CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api, CreateRaceDto } from '../api';
import { useMemo } from 'react';
import { RaceForm } from '../components/RaceForm/RaceForm';
import { RaceFormValues } from '../components/RaceForm/RaceForm.types';

export function EditRace() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <Navigate to='/' />;
    }

    return <EditRaceContent id={id} />;
}

function EditRaceContent({ id }: { id: string }) {
    const navigate = useNavigate();

    const {
        data: race,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['race', id],
        queryFn: () => api.races.getById(id),
    });

    const updateRaceMutation = useMutation({
        mutationFn: (data: CreateRaceDto) => api.races.update(id, data),
        onSuccess: () => navigate('/'),
    });

    const defaultValues = useMemo<RaceFormValues | undefined>(
        () =>
            race
                ? {
                      name: race.name,
                      isPublished: race.isPublished,
                  }
                : undefined,
        [race]
    );

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
        <RaceForm
            title='Edit Race'
            submitLabel='Save'
            submitPendingLabel='Saving...'
            errorMessage='An error occurred while updating the race'
            successMessage='Race data has been calculated and will be saved when you click "Save"'
            defaultValues={defaultValues}
            initialRaceData={race}
            onSubmit={(data) => updateRaceMutation.mutate(data)}
            isPending={updateRaceMutation.isPending}
            isError={updateRaceMutation.isError}
        />
    );
}
