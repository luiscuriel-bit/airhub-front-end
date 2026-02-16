import { User, ApiResponse } from '../types';
import apiFetch from './api';

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth`;

export const signup = async (formData: any): Promise<User> => {
    const json: ApiResponse<User> = await apiFetch(`${BASE_URL}/signup`, {
        method: 'POST',
        body: JSON.stringify(formData),

    });
    return json.data;
};

export const signin = async (formData: any): Promise<User> => {
    const json: ApiResponse<User> = await apiFetch(`${BASE_URL}/signin`, {
        method: 'POST',
        body: JSON.stringify(formData),
    });
    return json.data;
};

export const refreshAccessToken = async (): Promise<any> => {
    const json: ApiResponse<any> = await apiFetch(`${BASE_URL}/refresh-token`, {
        method: 'POST',
    });
    return json.data;
};

export const signout = async (): Promise<void> => {
    await apiFetch(`${BASE_URL}/signout`, { method: 'POST' });
};

export const updateUser = async (formData: any): Promise<User> => {
    const json: ApiResponse<User> = await apiFetch(`${BASE_URL}/update`, {
        method: 'PUT',
        body: JSON.stringify(formData),
    });

    return json.data;
};
