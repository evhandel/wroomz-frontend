import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import wroomzLogo from '../assets/wroomz-logo.svg';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [, setAnchorEl] = useState<null | HTMLElement>(null);

    // const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position='static' sx={{ minWidth: 1000 }}>
                <Toolbar sx={{ px: 0 }}>
                    <Box
                        component='img'
                        src={wroomzLogo}
                        alt='Wroomz'
                        sx={{
                            height: 36,
                            mr: 2,
                            ml: 4,
                            flexGrow: 0,
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    />
                    <Box sx={{ flexGrow: 1 }}></Box>
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
                    minWidth: 1000,
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
                    minWidth: 1000,
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
