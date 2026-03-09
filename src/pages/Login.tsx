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
} from '@mui/material';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';

interface LoginFormValues {
    email: string;
    password: string;
}

export function Login() {
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const returnTo = searchParams.get('returnTo');
    const { login } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setServerError('');

        try {
            await login(data.email, data.password);
            // Redirect back to the page the user was trying to access (open redirect protection)
            const target = returnTo?.startsWith('/') ? returnTo : '/';
            navigate(target);
        } catch (err) {
            const message =
                err instanceof AxiosError ? err.response?.data?.message : undefined;
            setServerError(message || 'Error logging in');
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant='h4' component='h1' gutterBottom align='center'>
                        Log In
                    </Typography>

                    {returnTo && (
                        <Alert severity='info' sx={{ mb: 2 }}>
                            Сессия истекла. Пожалуйста, войдите снова.
                        </Alert>
                    )}

                    {serverError && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {serverError}
                        </Alert>
                    )}

                    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
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
                                    autoFocus
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
                                    autoComplete='current-password'
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
                                'Log In'
                            )}
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link to='/register' style={{ textDecoration: 'none' }}>
                                <Typography variant='body2' color='primary'>
                                    Don't have an account? Register
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
