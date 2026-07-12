import apiClient from './apiClient';
import type {
    CreateTeamUserRequest,
    TeamUserListItem,
    UpdateTeamUserRequest,
} from '@evhandel/wroomz-types';

export const adminApi = {
    listTeamUsers: () =>
        apiClient.get<TeamUserListItem[]>('/admin/users').then((response) => response.data),

    createTeamUser: (data: CreateTeamUserRequest) =>
        apiClient
            .post<TeamUserListItem>('/admin/users', data)
            .then((response) => response.data),

    updateTeamUser: (id: number, data: UpdateTeamUserRequest) =>
        apiClient
            .put<TeamUserListItem>(`/admin/users/${id}`, data)
            .then((response) => response.data),

    deleteTeamUser: (id: number) =>
        apiClient.delete<void>(`/admin/users/${id}`).then((response) => response.data),
};
