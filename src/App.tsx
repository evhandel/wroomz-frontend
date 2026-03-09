import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { RaceList } from './pages/RaceList';
import { NewRace } from './pages/NewRace';
import { EditRace } from './pages/EditRace';
import { ViewRace } from './pages/ViewRace';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ReauthProvider } from './context/ReauthContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { isTokenExpired } from './utils/jwt';
import { theme } from './theme';

const queryClient = new QueryClient();

// Protected route - redirects to login page if user is not authenticated or token is expired
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading, logout } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Proactive check: if token expired, clear auth and redirect with returnTo
    const token = localStorage.getItem('authToken');
    if (isAuthenticated && isTokenExpired(token)) {
        logout();
        const returnTo = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?returnTo=${returnTo}`} replace />;
    }

    if (!isAuthenticated) {
        const returnTo = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?returnTo=${returnTo}`} replace />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <SnackbarProvider>
                        <Router>
                            <ReauthProvider>
                            <Layout>
                                <ErrorBoundary>
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
                                </ErrorBoundary>
                            </Layout>
                            </ReauthProvider>
                        </Router>
                    </SnackbarProvider>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
