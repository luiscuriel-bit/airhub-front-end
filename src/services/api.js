import logError from "../utils/logError";
import { refreshAccessToken, signout } from "./authService";

const apiFetch = async (url, options = {}, retry = true) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });

        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403 && retry) {
                try {
                    await refreshAccessToken();
                    return apiFetch(url, options, false);
                } catch {
                    signout();
                    window.location.href = '/auth/signin';
                    throw new Error('Session expired. Please sign in again.');
                }
            }
            throw new Error(data.error || 'Something went wrong');
        }
        return data;
    } catch (error) {
        logError('API Fetch Error:', error);

        if (error.message === 'Session expired. Please sign in again.') {
            window.location.href = '/auth/signin';
        }
        throw error;
    }
};

export default apiFetch;