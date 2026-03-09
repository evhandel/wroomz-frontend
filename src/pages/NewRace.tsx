import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api, CreateRaceDto } from '../api';
import { RaceForm } from '../components/RaceForm/RaceForm';

export function NewRace() {
    const navigate = useNavigate();

    const createRaceMutation = useMutation({
        mutationFn: (data: CreateRaceDto) => api.races.create(data),
        onSuccess: () => navigate('/'),
    });

    return (
        <RaceForm
            title='Create New Race'
            submitLabel='Create Race'
            submitPendingLabel='Creating...'
            errorMessage='An error occurred while creating the race'
            successMessage='Race data has been calculated and will be saved when you click "Create Race"'
            onSubmit={(data) => createRaceMutation.mutate(data)}
            isPending={createRaceMutation.isPending}
            isError={createRaceMutation.isError}
        />
    );
}
