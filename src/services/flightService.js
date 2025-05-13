import apiFetch from './api';

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/flights`;

const getAllFlights = () => {
    try {
        const json = apiFetch(`${BASE_URL}/`);

        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Fetch failed');
    } catch (error) {
        console.error('Failed to fetch flights', error);
        throw error;
    }
};

const getFlightById = (flightId) => {
    try {
        const json = apiFetch(`${BASE_URL}/${flightId}`);

        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Fetch failed');
    } catch (error) {
        console.error('Failed to fetch flight', error);
        throw error;
    }
};
const createFlight = (formData) => {
    try {
        const json =
            apiFetch(`${BASE_URL}/`, {
                method: 'POST',
                body: JSON.stringify(formData),
            });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Flight creation failed');
    } catch (error) {
        console.error('Failed to create flight', error);
        throw error;
    }
};

const updateFlight = (flightId, formData) => {
    try {
        const json =
            apiFetch(`${BASE_URL}/${flightId}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
            });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Flight update failed');
    } catch (error) {
        console.error('Failed to update flight', error);
        throw error;
    }
};

const deleteFlight = (flightId) => {
    try {
        const json =
            apiFetch(`${BASE_URL}/${flightId}`, {
                method: 'DELETE',
            });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Flight deletion failed');
    } catch (error) {
        console.error('Failed to delete booking', error);
        throw error;
    }
};

const searchFlight = (formData) => {
    try {
        const json =
            apiFetch(`${BASE_URL}/search`, {
                method: 'POST',
                body: JSON.stringify(formData),
            });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Search failed');
    } catch (error) {
        console.error('Failed to search flight', error);
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