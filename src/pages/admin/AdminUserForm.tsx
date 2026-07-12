import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type {
    CreateTeamUserRequest,
    Organizer,
    UpdateTeamUserRequest,
} from '@evhandel/wroomz-types';
import { api } from '../../api';
import { useSnackbar } from '../../context/SnackbarContext';
import { LOGO_KEYS, getTeamLogo } from '../../features/teams/logoMap';

interface AdminUserFormValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    teamName: string;
    logoKey: string;
    organizer: Organizer | '';
}

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function AdminUserForm() {
    const { id } = useParams<{ id: string }>();
    const isEdit = id !== undefined;
    const userId = isEdit ? Number(id) : null;

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showMessage } = useSnackbar();

    const { data: users, isLoading: isLoadingUsers } = useQuery({
        queryKey: ['admin', 'users'],
        queryFn: api.admin.listTeamUsers,
        enabled: isEdit,
    });

    const existing = useMemo(
        () => (isEdit && users ? users.find((u) => u.id === userId) ?? null : null),
        [isEdit, users, userId]
    );

    const { control, handleSubmit, reset, formState: { isSubmitting }, watch } =
        useForm<AdminUserFormValues>({
            defaultValues: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                teamName: '',
                logoKey: '',
                organizer: '',
            },
        });

    useEffect(() => {
        if (existing) {
            reset({
                email: existing.email,
                password: '',
                firstName: existing.firstName,
                lastName: existing.lastName,
                teamName: existing.teamName ?? '',
                logoKey: existing.logoKey ?? '',
                organizer: existing.organizer ?? '',
            });
        }
    }, [existing, reset]);

    const createMutation = useMutation({
        mutationFn: (data: CreateTeamUserRequest) => api.admin.createTeamUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            showMessage('Team user created', 'success');
            navigate('/admin/users');
        },
        onError: (err) => {
            const message =
                err instanceof AxiosError ? err.response?.data?.message : undefined;
            showMessage(message || 'Failed to create user', 'error');
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id: targetId, data }: { id: number; data: UpdateTeamUserRequest }) =>
            api.admin.updateTeamUser(targetId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            showMessage('Team user updated', 'success');
            navigate('/admin/users');
        },
        onError: (err) => {
            const message =
                err instanceof AxiosError ? err.response?.data?.message : undefined;
            showMessage(message || 'Failed to update user', 'error');
        },
    });

    const onSubmit = (values: AdminUserFormValues) => {
        const logoKey = values.logoKey === '' ? null : values.logoKey;
        const organizer: Organizer | null = values.organizer === '' ? null : values.organizer;

        if (isEdit && userId !== null) {
            const patch: UpdateTeamUserRequest = {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                teamName: values.teamName,
                logoKey,
                organizer,
            };
            if (values.password) {
                patch.password = values.password;
            }
            updateMutation.mutate({ id: userId, data: patch });
        } else {
            const body: CreateTeamUserRequest = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                teamName: values.teamName,
                logoKey,
                organizer,
            };
            createMutation.mutate(body);
        }
    };

    if (isEdit && isLoadingUsers) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress color='error' />
            </Box>
        );
    }

    if (isEdit && !existing) {
        return (
            <Container maxWidth='sm' sx={{ mt: 4 }}>
                <Alert severity='error'>User not found</Alert>
            </Container>
        );
    }

    const isPending = createMutation.isPending || updateMutation.isPending;
    const currentLogoKey = watch('logoKey');

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant='h4' component='h1' gutterBottom>
                        {isEdit ? 'Edit Team User' : 'Create Team User'}
                    </Typography>

                    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Controller
                                name='email'
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                    pattern: { value: EMAIL_RE, message: 'Enter a valid email address' },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label='Email'
                                        fullWidth
                                        required
                                        disabled={isSubmitting || isPending}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='password'
                                control={control}
                                rules={{
                                    validate: (value) => {
                                        if (!isEdit && !value) return 'Password is required';
                                        if (value && value.length < 6)
                                            return 'Password must be at least 6 characters';
                                        return true;
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        type='password'
                                        label={isEdit ? 'New Password (leave blank to keep)' : 'Password'}
                                        fullWidth
                                        required={!isEdit}
                                        disabled={isSubmitting || isPending}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                            <Stack direction='row' spacing={2}>
                                <Controller
                                    name='firstName'
                                    control={control}
                                    rules={{ required: 'First name is required' }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            label='First Name'
                                            fullWidth
                                            required
                                            disabled={isSubmitting || isPending}
                                            error={!!error}
                                            helperText={error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='lastName'
                                    control={control}
                                    rules={{ required: 'Last name is required' }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            label='Last Name'
                                            fullWidth
                                            required
                                            disabled={isSubmitting || isPending}
                                            error={!!error}
                                            helperText={error?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Controller
                                name='teamName'
                                control={control}
                                rules={{ required: 'Team name is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label='Team Name'
                                        fullWidth
                                        required
                                        disabled={isSubmitting || isPending}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='organizer'
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id='organizer-label'>Organizer</InputLabel>
                                        <Select
                                            {...field}
                                            labelId='organizer-label'
                                            label='Organizer'
                                            disabled={isSubmitting || isPending}
                                        >
                                            <MenuItem value=''>
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value='wroomz'>wroomz</MenuItem>
                                            <MenuItem value='noorracing'>noorracing</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='logoKey'
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id='logoKey-label'>Team Logo</InputLabel>
                                        <Select
                                            {...field}
                                            labelId='logoKey-label'
                                            label='Team Logo'
                                            disabled={isSubmitting || isPending}
                                        >
                                            <MenuItem value=''>
                                                <em>None</em>
                                            </MenuItem>
                                            {LOGO_KEYS.map((key) => (
                                                <MenuItem key={key} value={key}>
                                                    {key}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Stack direction='row' spacing={2} alignItems='center'>
                                <Typography variant='caption' color='text.secondary'>
                                    Preview:
                                </Typography>
                                <Avatar
                                    src={getTeamLogo(currentLogoKey || null)}
                                    alt='logo preview'
                                    variant='rounded'
                                    sx={{ width: 36, height: 36, bgcolor: 'transparent' }}
                                />
                            </Stack>
                            <Stack direction='row' spacing={2} justifyContent='flex-end' sx={{ mt: 2 }}>
                                <Button
                                    variant='outlined'
                                    onClick={() => navigate('/admin/users')}
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
                                    {isPending
                                        ? 'Saving...'
                                        : isEdit
                                          ? 'Save'
                                          : 'Create'}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
