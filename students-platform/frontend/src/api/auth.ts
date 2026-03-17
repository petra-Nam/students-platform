import type { RegisterForm, LoginForm, AuthResponse, SafeUser } from '../types/auth';
import { api } from '../services/api';
import { secureApi } from '../services/secureApi';


export const registerUser = async (data: RegisterForm): Promise<AuthResponse> => {
    const response = await api.post('/users/register', data);
    return response.data;
};

export const loginUser = async (data: LoginForm): Promise<AuthResponse> => {
    const response = await api.post('/users/login', data);
    return response.data;
};

export const logoutUser = async (): Promise<AuthResponse> => {
    const response = await secureApi.post('/users/logout');
    return response.data;
};

export const getProfile = async (): Promise<SafeUser> => {
    const response = await secureApi.get('/users/get-profile');
    return response.data;
};
