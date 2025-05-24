import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { RaceList } from './pages/RaceList';
import { NewRace } from './pages/NewRace';
import { EditRace } from './pages/EditRace';
import ViewRace from './pages/ViewRace';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

// Create a client for React Query
const queryClient = new QueryClient();

// Create theme instance
const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#050505',
            paper: '#121212',
        },
        primary: {
            main: '#90CAF9',
        },
        secondary: {
            main: '#F48FB1',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#AAAAAA',
        },
    },
    typography: {
        fontFamily:
            '"Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h1: {
            fontWeight: 700,
            fontStyle: 'italic',
        },
        h4: {
            fontWeight: 700,
            fontStyle: 'italic',
        },
        h6: {
            // For race names in the list
            fontWeight: 400,
            fontStyle: 'italic',
            marginBottom: 0,
        },
        body2: {
            // For metadata text in race listings
            fontStyle: 'italic',
        },
    },
    components: {
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'h4', component: 'h1' },
                    style: {
                        fontWeight: 700,
                        fontStyle: 'italic',
                    },
                },
            ],
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-colorInherit': {
                        fontWeight: 700,
                        fontStyle: 'italic',
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '0px !important',
                    paddingRight: '0px !important',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    '&:last-child': {
                        paddingBottom: '16px',
                    },
                },
            },
        },
    },
});

// Protected route - redirects to login page if user is not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <AuthProvider>
                        <Layout>
                            <Routes>
                                {/* Public routes */}
                                <Route path='/' element={<RaceList />} />
                                <Route path='/races/:id' element={<ViewRace />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />

                                {/* Protected routes */}
                                <Route
                                    path='/races/new'
                                    element={
                                        <ProtectedRoute>
                                            <NewRace />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path='/races/:id/edit'
                                    element={
                                        <ProtectedRoute>
                                            <EditRace />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </Layout>
                    </AuthProvider>
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
