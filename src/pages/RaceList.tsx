import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Stack,
    Chip,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, parseISO } from 'date-fns';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function RaceList() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [raceToDelete, setRaceToDelete] = useState<number | null>(null);
    const { isAuthenticated } = useAuth();

    const {
        data: races,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['races'],
        queryFn: api.races.getAll,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.races.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['races'] });
            setDeleteDialogOpen(false);
            setRaceToDelete(null);
        },
    });

    const handleDeleteClick = (raceId: number, event: React.MouseEvent) => {
        event.stopPropagation();
        setRaceToDelete(raceId);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (raceToDelete !== null) {
            deleteMutation.mutate(raceToDelete.toString());
        }
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setRaceToDelete(null);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: '60px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4, px: '60px' }}>
                <Typography color='error'>An error occurred while loading data</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ px: '60px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant='h4' component='h1'>
                    Race List
                </Typography>
                {isAuthenticated && (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => navigate('/races/new')}
                    >
                        Create Race
                    </Button>
                )}
            </Box>

            <Stack spacing={2}>
                {races?.map((race) => (
                    <Card
                        key={race.id}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 3,
                                transition: 'box-shadow 0.2s',
                            },
                        }}
                        onClick={() => navigate(`/races/${race.id}`)}
                    >
                        <CardContent sx={{ pb: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant='h6'
                                        component='div'
                                        sx={{
                                            fontWeight: 400,
                                            fontStyle: 'italic',
                                            mb: 0,
                                        }}
                                    >
                                        {race.name}
                                    </Typography>
                                    {isAuthenticated && (
                                        <Chip
                                            label={race.isPublished ? 'Published' : 'Not Published'}
                                            color={race.isPublished ? 'success' : 'default'}
                                            size='small'
                                            sx={{ mr: 1 }}
                                        />
                                    )}
                                    {isAuthenticated && race.createdAt && (
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                            sx={{
                                                mt: 1,
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            Created:{' '}
                                            {format(parseISO(race.createdAt), 'dd.MM.yyyy')}
                                        </Typography>
                                    )}
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {isAuthenticated && (
                                        <>
                                            <Tooltip title='Edit'>
                                                <IconButton
                                                    size='small'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/races/${race.id}/edit`);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Delete'>
                                                <IconButton
                                                    size='small'
                                                    color='error'
                                                    onClick={(e) => handleDeleteClick(race.id, e)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you sure you want to delete this race? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color='error'
                        autoFocus
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
