import React, { useState } from 'react';
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
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error logging in');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant='h4' component='h1' gutterBottom align='center'>
                        Log In
                    </Typography>

                    {error && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component='form' onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Log In'}
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
