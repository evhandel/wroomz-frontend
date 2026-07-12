import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useRef } from 'react';
import { api, CreateRaceDto } from '../api';
import { RaceForm } from '../components/RaceForm/RaceForm';
import { RaceFormValues } from '../components/RaceForm/RaceForm.types';
import { useAuth } from '../context/AuthContext';
import { clearRaceEditorLocalStorage } from '../features/raceEditor/context/raceEditorReducer';

export function NewRace() {
    const navigate = useNavigate();
    const { user, isSuperadmin } = useAuth();

    const clearedRef = useRef(false);
    if (!clearedRef.current) {
        clearRaceEditorLocalStorage();
        clearedRef.current = true;
    }

    const createRaceMutation = useMutation({
        mutationFn: (data: CreateRaceDto) => api.races.create(data),
        onSuccess: () => navigate('/'),
    });

    const defaultValues = useMemo<RaceFormValues>(
        () => ({
            name: '',
            organizer: user?.organizer ?? 'wroomz',
            isPublished: false,
        }),
        [user?.organizer]
    );

    return (
        <RaceForm
            title='Create New Race'
            submitLabel='Create Race'
            submitPendingLabel='Creating...'
            errorMessage='An error occurred while creating the race'
            successMessage='Race data has been calculated and will be saved when you click "Create Race"'
            defaultValues={defaultValues}
            onSubmit={(data) => createRaceMutation.mutate(data)}
            isPending={createRaceMutation.isPending}
            isError={createRaceMutation.isError}
            currentUserOrganizer={user?.organizer ?? null}
            isSuperadmin={isSuperadmin}
        />
    );
}
