import { authApi } from './auth';
import { racesApi } from './races';

export { default as apiClient } from './apiClient';
export type { AuthUser, LoginCredentials, RegisterData } from './auth';
export type { Race, CreateRaceDto } from './races';

export const api = {
    auth: authApi,
    races: racesApi,
};
