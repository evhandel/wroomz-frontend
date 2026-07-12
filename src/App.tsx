import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { RaceList } from './pages/RaceList';
import { NewRace } from './pages/NewRace';
import { EditRace } from './pages/EditRace';
import { ViewRace } from './pages/ViewRace';
import { Login } from './pages/Login';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminUserForm } from './pages/admin/AdminUserForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ReauthProvider } from './context/ReauthContext';
import { SnackbarProvider, useSnackbar } from './context/SnackbarContext';
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

const SuperadminRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoading, isSuperadmin } = useAuth();
    const { showMessage } = useSnackbar();

    useEffect(() => {
        if (!isLoading && !isSuperadmin) {
            showMessage('Access denied: superadmin only', 'error');
        }
    }, [isLoading, isSuperadmin, showMessage]);

    return (
        <ProtectedRoute>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : isSuperadmin ? (
                <>{children}</>
            ) : (
                <Navigate to='/' replace />
            )}
        </ProtectedRoute>
    );
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
                                    <Route
                                        path='/admin/users'
                                        element={
                                            <SuperadminRoute>
                                                <AdminUsers />
                                            </SuperadminRoute>
                                        }
                                    />
                                    <Route
                                        path='/admin/users/new'
                                        element={
                                            <SuperadminRoute>
                                                <AdminUserForm />
                                            </SuperadminRoute>
                                        }
                                    />
                                    <Route
                                        path='/admin/users/:id'
                                        element={
                                            <SuperadminRoute>
                                                <AdminUserForm />
                                            </SuperadminRoute>
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
