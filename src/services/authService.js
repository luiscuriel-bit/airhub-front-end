import logError from '../utils/logError';
import apiFetch from './api';

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth`;

const signup = async (formData) => {
    try {
        const json = await apiFetch(`${BASE_URL}/signup`, {
            method: 'POST',
            body: JSON.stringify(formData),

        });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to sign up', error);

        throw error;
    }
};

const signin = async (formData) => {
    try {
        const json = await apiFetch(`${BASE_URL}/signin`, {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to sign in', error);

        throw error;
    }
};

const refreshAccessToken = async () => {
    try {
        const json = await apiFetch(`${BASE_URL}/refresh-token`, {
            method: 'POST',
        });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to refresh token', error);

        throw error;
    }
};

const signout = async () => {
    await apiFetch(`${BASE_URL}/signout`, { method: 'POST' });
};

const updateUser = async (formData) => {
    try {
        const json = await apiFetch(`${BASE_URL}/update`, {
            method: 'PUT',
            body: JSON.stringify(formData),
        });

        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to update user', error);

        throw error;
    }
};

export {
    signup,
    signin,
    refreshAccessToken,
    signout,
    updateUser
};