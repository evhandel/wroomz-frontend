import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, api } from '../api/client';

interface AuthContextProps {
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<AuthUser>;
    register: (
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => Promise<AuthUser>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentUser = api.auth.getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const userData = await api.auth.login({ email, password });
        setUser(userData);
        api.auth.setCurrentUser(userData);
        return userData;
    };

    const register = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => {
        const userData = await api.auth.register({ firstName, lastName, email, password });
        setUser(userData);
        api.auth.setCurrentUser(userData);
        return userData;
    };

    const logout = () => {
        api.auth.logout();
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
