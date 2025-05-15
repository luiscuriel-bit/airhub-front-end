import logError from '../utils/logError';
import apiFetch from './api';

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/flights`;

const getAllFlights = async () => {
    try {
        const json = await apiFetch(`${BASE_URL}/`);

        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to fetch flights', error);

        throw error;
    }
};

const getFlightById = async (flightId) => {
    try {
        const json = await apiFetch(`${BASE_URL}/${flightId}`);

        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to fetch flight', error);

        throw error;
    }
};

const createFlight = async (formData) => {
    try {
        const json = await apiFetch(`${BASE_URL}/`, {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to create flight', error);

        throw error;
    }
};

const updateFlight = async (flightId, formData) => {
    try {
        const json = await apiFetch(`${BASE_URL}/${flightId}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
        });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to update flight', error);

        throw error;
    }
};

const deleteFlight = async (flightId) => {
    try {
        const json = await apiFetch(`${BASE_URL}/${flightId}`, {
            method: 'DELETE',
        });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to delete flight', error);

        throw error;
    }
};

const searchFlight = async (formData) => {
    try {
        const json = await apiFetch(`${BASE_URL}/search`, {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error);
    } catch (error) {
        logError('Failed to search flight', error);

        throw error;
    }
};
export {
    getAllFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight,
    searchFlight
};