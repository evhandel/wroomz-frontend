import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3005/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерфейсы для типов данных
export interface Race {
    id: number;
    name: string;
    isPublished: boolean;
    details: RaceDetails | null;
    createdAt: string;
    updatedAt: string;
}

export interface RaceDetails {
    id: number;
    teamsAndPilots?: Record<string, any>;
    lapsNotDelimiters?: Record<string, any>;
    stintByPilots?: Record<string, any>;
    rawData?: Record<string, any>;
    results?: {
        teamNumber: string;
        avgTimeTotal: number;
        laps: number;
        totalTimeWithGapWithoutPenalties: number;
        pilots: string[];
        penalty: number;
        stintsQuantity: number;
    }[];
    penalties?: {
        penaltiesManual: Record<string, number>;
        penaltiesByStintLimit: Record<string, number>;
        penaltiesByPilotLimit: Record<string, number>;
    };
    settings?: {
        maxStint: number;
        minForPilotIfFour: number;
        minForPilotIfThree: number;
        minForPilotIfTwo: number;
        minPitStopLapTime: number;
        minStintsQuantity: number;
    };

    calculatedData?: Record<
        string,
        {
            no: number;
            laps: { no: number; time: number; elapsedTime: number }[];
            startGap: number;
            startTime: number;
            endTime: number;
            duration: number;
            avgLapExcludingPitExitLap: number;
            bestLap: number;
            pilot: string;
            kart?: string;
        }[]
    >;
}

export interface CreateRaceDto {
    name: string;
    isPublished?: boolean;
    details?: Omit<RaceDetails, 'id'>;
}

export interface AuthUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Добавляем интерцептор для проверки авторизации
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// API методы
export const api = {
    auth: {
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
            return userJson ? JSON.parse(userJson) : null;
        },

        setCurrentUser: (user: AuthUser) => {
            localStorage.setItem('authToken', user.token);
            localStorage.setItem('authUser', JSON.stringify(user));
        },

        isAuthenticated: () => {
            return localStorage.getItem('authToken') !== null;
        },
    },
    races: {
        getAll: () => apiClient.get<Race[]>('/public/races').then((response) => response.data),

        getById: (id: string) =>
            apiClient.get<Race>(`/public/races/${id}`).then((response) => response.data),

        create: (data: CreateRaceDto) =>
            apiClient.post<Race>('/races', data).then((response) => response.data),

        update: (id: string, data: CreateRaceDto) =>
            apiClient.put<Race>(`/races/${id}`, data).then((response) => response.data),

        delete: (id: string) => apiClient.delete(`/races/${id}`).then((response) => response.data),
    },
};
