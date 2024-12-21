const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/flights`;

const getAllFlights = async () => {
    try {
        const res = await fetch(`${BASE_URL}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    } catch (error) {
        console.error('Error fetching flights:', error);
        throw error;
    }
};

const getFlightById = async (flightId) => {
    try {
        const res = await fetch(`${BASE_URL}/${flightId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    } catch (error) {
        console.error(`Error fetching flight with ID ${flightId}`, error);
        throw error; // This will throw the error to the component
    }
};

const createFlight = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    } catch (error) {
        console.error('Error creating flight:', error);
        throw error;
    }
};

const updateFlight = async (flightId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/${flightId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    } catch (error) {
        console.error(`Error updating flight with ID ${flightId}`, error);
        throw error;
    }
};

const deleteFlight = async (flightId) => {
    try {
        const res = await fetch(`${BASE_URL}/${flightId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    } catch (error) {
        console.error(`Error deleting flight with ID ${flightId}`, error);
        throw error;
    }
};

const searchFlight = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/search`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    } catch (error) {
        console.error(`Error searching flights`, error);
        throw error;
    }
};

export {
    getAllFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight,
    searchFlight,
};