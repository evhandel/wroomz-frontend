import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { format, parseISO } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../../api';
import { getTeamLogo } from '../../features/teams/logoMap';
import { useSnackbar } from '../../context/SnackbarContext';

const PAGE_PX = '60px';

export function AdminUsers() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showMessage } = useSnackbar();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data: users, isLoading, error } = useQuery({
        queryKey: ['admin', 'users'],
        queryFn: api.admin.listTeamUsers,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => api.admin.deleteTeamUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            showMessage('User deleted', 'success');
            setDeleteId(null);
        },
        onError: (err) => {
            const message =
                err instanceof AxiosError ? err.response?.data?.message : undefined;
            showMessage(message || 'Failed to delete user', 'error');
        },
    });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: PAGE_PX }}>
                <CircularProgress color='error' />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4, px: PAGE_PX }}>
                <Typography color='error'>Failed to load users</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ px: PAGE_PX }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ mb: 3 }}
            >
                <Typography variant='h4' component='h1'>
                    Team Users
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/users/new')}
                >
                    Create Team
                </Button>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Logo</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((u) => (
                            <TableRow key={u.id} hover>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>
                                    {u.firstName} {u.lastName}
                                </TableCell>
                                <TableCell>{u.teamName ?? '—'}</TableCell>
                                <TableCell>
                                    <Avatar
                                        src={getTeamLogo(u.logoKey)}
                                        alt={u.logoKey ?? 'wroomz'}
                                        variant='rounded'
                                        sx={{ width: 28, height: 28, bgcolor: 'transparent' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={u.role}
                                        size='small'
                                        color={u.role === 'SUPERADMIN' ? 'warning' : 'default'}
                                    />
                                </TableCell>
                                <TableCell>
                                    {format(parseISO(u.createdAt), 'dd.MM.yyyy')}
                                </TableCell>
                                <TableCell align='right'>
                                    <Tooltip title='Edit'>
                                        <IconButton
                                            size='small'
                                            onClick={() => navigate(`/admin/users/${u.id}`)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Delete'>
                                        <IconButton
                                            size='small'
                                            color='error'
                                            disabled={u.role === 'SUPERADMIN'}
                                            onClick={() => setDeleteId(u.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
                <DialogTitle>Delete user?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will permanently delete the user and detach their races. This cannot be
                        undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button
                        color='error'
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteId !== null && deleteMutation.mutate(deleteId)}
                    >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
