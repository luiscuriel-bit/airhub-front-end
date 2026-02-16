import logError from "../utils/logError";
import { refreshAccessToken, signout } from "./authService";

const apiFetch = async (url: string, options: RequestInit = {}, retry: boolean = true): Promise<any> => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });

        if (response.status === 204) return null;

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
    } catch (error: any) {
        logError('API Fetch Error:', error);

        if (error.message === 'Session expired. Please sign in again.') {
            window.location.href = '/auth/signin';
        }
        throw error;
    }
};

export default apiFetch;