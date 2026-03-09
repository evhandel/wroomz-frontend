import apiClient from './apiClient';
import type { AuthUserResponse, LoginRequest, RegisterRequest } from '@evhandel/wroomz-types';

// Re-export shared types with local aliases for backward compatibility
export type AuthUser = AuthUserResponse;
export type LoginCredentials = LoginRequest;
export type RegisterData = RegisterRequest;

export const authApi = {
    login: (credentials: LoginCredentials) =>
        apiClient.post<AuthUser>('/auth/login', credentials).then((response) => response.data),

    register: (data: RegisterData) =>
        apiClient.post<AuthUser>('/auth/register', data).then((response) => response.data),

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    },

    getCurrentUser: (): AuthUser | null => {
        const userJson = localStorage.getItem('authUser');
        if (!userJson) return null;
        try {
            return JSON.parse(userJson);
        } catch {
            localStorage.removeItem('authUser');
            return null;
        }
    },

    setCurrentUser: (user: AuthUser) => {
        localStorage.setItem('authToken', user.token);
        localStorage.setItem('authUser', JSON.stringify(user));
    },

    isAuthenticated: () => {
        return localStorage.getItem('authToken') !== null;
    },
};
