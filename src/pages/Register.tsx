import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Container,
    Alert,
    CircularProgress,
    Grid,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';

interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    inviteCode: string;
}

export function Register() {
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const {
        control,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm<RegisterFormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            inviteCode: '',
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setServerError('');

        try {
            await register(data.firstName, data.lastName, data.email, data.password, data.inviteCode);
            navigate('/');
        } catch (err) {
            const message =
                err instanceof AxiosError ? err.response?.data?.message : undefined;
            setServerError(message || 'Registration error');
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant='h4' component='h1' gutterBottom align='center'>
                        Register
                    </Typography>

                    {serverError && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {serverError}
                        </Alert>
                    )}

                    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name='firstName'
                                    control={control}
                                    rules={{ required: 'First name is required' }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            autoComplete='given-name'
                                            required
                                            fullWidth
                                            id='firstName'
                                            label='First Name'
                                            autoFocus
                                            disabled={isSubmitting}
                                            error={!!error}
                                            helperText={error?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name='lastName'
                                    control={control}
                                    rules={{ required: 'Last name is required' }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id='lastName'
                                            label='Last Name'
                                            autoComplete='family-name'
                                            disabled={isSubmitting}
                                            error={!!error}
                                            helperText={error?.message}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Controller
                            name='email'
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Enter a valid email address',
                                },
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email'
                                    autoComplete='email'
                                    disabled={isSubmitting}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    margin='normal'
                                    required
                                    fullWidth
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                    disabled={isSubmitting}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                        <Controller
                            name='confirmPassword'
                            control={control}
                            rules={{
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === watch('password') || 'Passwords do not match',
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    margin='normal'
                                    required
                                    fullWidth
                                    label='Confirm Password'
                                    type='password'
                                    id='confirmPassword'
                                    disabled={isSubmitting}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                        <Controller
                            name='inviteCode'
                            control={control}
                            rules={{ required: 'Код приглашения обязателен' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='inviteCode'
                                    label='Код приглашения'
                                    disabled={isSubmitting}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} color='error' />
                            ) : (
                                'Register'
                            )}
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <Typography variant='body2' color='primary'>
                                    Already have an account? Log In
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
