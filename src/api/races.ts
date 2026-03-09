import apiClient from './apiClient';
import type { RaceResponse, CreateRaceRequest } from '@evhandel/wroomz-types';

// Re-export shared types with local aliases for backward compatibility
export type Race = RaceResponse;
export type CreateRaceDto = CreateRaceRequest;

export const racesApi = {
    getAll: () => apiClient.get<Race[]>('/public/races').then((response) => response.data),

    getById: (id: string) =>
        apiClient.get<Race>(`/public/races/${id}`).then((response) => response.data),

    create: (data: CreateRaceDto) =>
        apiClient.post<Race>('/races', data).then((response) => response.data),

    update: (id: string, data: CreateRaceDto) =>
        apiClient.put<Race>(`/races/${id}`, data).then((response) => response.data),

    delete: (id: string) => apiClient.delete(`/races/${id}`).then((response) => response.data),
};
