import React, { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// ---------------------------------------------------------------------------
// Module-level accessor so Axios interceptor can trigger reauth outside React
// ---------------------------------------------------------------------------
type ReauthFn = () => Promise<void>;

let reauthFn: ReauthFn | null = null;

export const setReauthFn = (fn: ReauthFn | null) => {
    reauthFn = fn;
};
export const getReauthFn = (): ReauthFn | null => reauthFn;

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface ReauthContextValue {
    requestReauth: () => Promise<void>;
}

const ReauthContext = createContext<ReauthContextValue | undefined>(undefined);

export const useReauth = () => {
    const ctx = useContext(ReauthContext);
    if (!ctx) throw new Error('useReauth must be used within ReauthProvider');
    return ctx;
};

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export const ReauthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pending promise resolve/reject — shared across concurrent 401s
    const pendingRef = useRef<{ resolve: () => void; reject: (err: unknown) => void } | null>(
        null
    );
    // Deduplication: single promise for all concurrent calls
    const promiseRef = useRef<Promise<void> | null>(null);

    const requestReauth = useCallback((): Promise<void> => {
        // If modal is already open, return the same promise
        if (promiseRef.current) return promiseRef.current;

        const promise = new Promise<void>((resolve, reject) => {
            pendingRef.current = { resolve, reject };
        });
        promiseRef.current = promise;

        // Pre-fill email from stored user if available
        try {
            const stored = localStorage.getItem('authUser');
            if (stored) {
                const parsed = JSON.parse(stored);
                setEmail(parsed.email ?? '');
            }
        } catch {
            /* ignore */
        }

        setPassword('');
        setError('');
        setIsOpen(true);

        return promise;
    }, []);

    // Register module-level accessor
    React.useEffect(() => {
        setReauthFn(requestReauth);
        return () => setReauthFn(null);
    }, [requestReauth]);

    const handleLogin = async () => {
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password);
            setIsOpen(false);
            pendingRef.current?.resolve();
            cleanup();
        } catch {
            setError('Неверный email или пароль');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        logout();
        navigate('/login');
        pendingRef.current?.reject(new Error('Reauth cancelled'));
        cleanup();
    };

    const cleanup = () => {
        pendingRef.current = null;
        promiseRef.current = null;
    };

    return (
        <ReauthContext.Provider value={{ requestReauth }}>
            {children}

            <Dialog open={isOpen} onClose={handleCancel} maxWidth="xs" fullWidth>
                <DialogTitle>Сессия истекла</DialogTitle>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        autoFocus
                    />
                    <TextField
                        margin="dense"
                        label="Пароль"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isSubmitting) handleLogin();
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} disabled={isSubmitting}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        disabled={isSubmitting || !email || !password}
                    >
                        {isSubmitting ? <CircularProgress size={20} /> : 'Войти'}
                    </Button>
                </DialogActions>
            </Dialog>
        </ReauthContext.Provider>
    );
};
