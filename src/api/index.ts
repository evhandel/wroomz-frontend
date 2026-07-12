import { authApi } from './auth';
import { racesApi } from './races';
import { adminApi } from './admin';

export { default as apiClient } from './apiClient';
export type { AuthUser, LoginCredentials } from './auth';
export type { Race, CreateRaceDto } from './races';

export const api = {
    auth: authApi,
    races: racesApi,
    admin: adminApi,
};
