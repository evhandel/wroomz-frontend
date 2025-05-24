import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, CircularProgress, Button, Chip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import Main from '../features/raceViewer/components/Main/Main';
import { useAuth } from '../context/AuthContext';
import { format, parseISO } from 'date-fns';

export function ViewRace() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const {
        data: race,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['race', id],
        queryFn: () => api.races.getById(id!),
    });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
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

    if (!race) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity='error'>Race not found</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant='h4' component='h1' sx={{ ml: 8 }}>
                        {race.name}
                    </Typography>
                    {isAuthenticated && (
                        <Stack direction='row' spacing={2} sx={{ mt: 1 }}>
                            <Chip
                                label={race.isPublished ? 'Published' : 'Not Published'}
                                color={race.isPublished ? 'success' : 'default'}
                                size='small'
                            />
                            {race.createdAt && (
                                <Typography variant='body2' color='text.secondary'>
                                    Created: {format(parseISO(race.createdAt), 'dd.MM.yyyy')}
                                </Typography>
                            )}
                        </Stack>
                    )}
                </Box>

                {isAuthenticated && (
                    <Button
                        variant='outlined'
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/races/${id}/edit`)}
                    >
                        Edit
                    </Button>
                )}
            </Box>

            <Main />
        </Box>
    );
}

export default ViewRace;
