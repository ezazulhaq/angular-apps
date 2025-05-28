export interface User {
    id: string;
    email: string;
    displayName?: string;
    createdAt?: string;
    lastSignInAt?: string;
}

export interface AuthSession {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    username?: string;
}