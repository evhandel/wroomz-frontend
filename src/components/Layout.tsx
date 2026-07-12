import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Box,
    Chip,
    Container,
    Toolbar,
    Typography,
    Button,
    Stack,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import siteLogo from '../assets/racetrace-mark.svg';
import { getTeamLogo } from '../features/teams/logoMap';

const MIN_CONTENT_WIDTH = 1000;

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { isAuthenticated, isSuperadmin, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position='static' sx={{ minWidth: MIN_CONTENT_WIDTH, display: 'none' }}>
                <Toolbar sx={{ px: 0 }}>
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={1.5}
                        sx={{ ml: 4, mr: 2, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        <Box
                            component='img'
                            src={siteLogo}
                            alt='RaceTrace'
                            sx={{ height: 32, flexGrow: 0 }}
                        />
                        <Typography
                            variant='h6'
                            sx={{ fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
                        >
                            Race
                            <Box component='span' sx={{ color: '#3179F5' }}>
                                Trace
                            </Box>
                        </Typography>
                    </Stack>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    {isAuthenticated && user && (
                        <Stack direction='row' spacing={1.5} alignItems='center' sx={{ mr: 2 }}>
                            {isSuperadmin ? (
                                <Chip
                                    label='SUPERADMIN'
                                    color='warning'
                                    size='small'
                                    onClick={() => navigate('/admin/users')}
                                    sx={{ cursor: 'pointer', fontWeight: 700 }}
                                />
                            ) : (
                                <>
                                    <Avatar
                                        src={getTeamLogo(user.logoKey)}
                                        alt={user.teamName ?? 'Wroomz'}
                                        variant='rounded'
                                        sx={{ width: 28, height: 28, bgcolor: 'transparent' }}
                                    />
                                    {user.teamName && (
                                        <Typography
                                            variant='body2'
                                            sx={{ color: 'inherit', fontWeight: 600 }}
                                        >
                                            {user.teamName}
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                    )}
                    {isAuthenticated && (
                        <Button
                            color='inherit'
                            onClick={handleLogout}
                            sx={{
                                mr: 4,
                                fontWeight: 700,
                                fontStyle: 'italic',
                            }}
                        >
                            Log out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Container
                component='main'
                maxWidth={false}
                disableGutters
                sx={{
                    mt: 4,
                    mb: 4,
                    flex: 1,
                    minWidth: MIN_CONTENT_WIDTH,
                    px: 0,
                }}
            >
                {children}
            </Container>
            <Box
                component='footer'
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    minWidth: MIN_CONTENT_WIDTH,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth='sm'>
                    <Typography variant='body2' color='text.secondary' align='center'>
                        © {new Date().getFullYear()} Wroomz
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}
