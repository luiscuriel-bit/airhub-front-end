import apiFetch from './api';

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/bookings`;

const getAllBookings = async () => {
    try {
        const json = await apiFetch(`${BASE_URL}/`);

        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Bookings fetch failed');
    } catch (error) {
        console.error('Failed to fetch bookings', error);
        throw error;
    }
}

const getBookingById = async (bookingId) => {
    try {
        const json = await apiFetch(`${BASE_URL}/${bookingId}`);

        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Booking fetch failed');
    } catch (error) {
        console.error('Failed to fetch booking', error);
        throw error;
    }
}

const createBooking = async (formData) => {
    try {
        const json = await apiFetch(`${BASE_URL}/`, {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Booking creation failed');
    } catch (error) {
        console.error('Failed to create booking', error);
        throw error;
    }
}
const deleteBooking = async (bookingId) => {
    try {
        const json = await apiFetch(`${BASE_URL}/${bookingId}`, {
            method: 'DELETE',
        });
        if (json.success) {
            return json.data;
        }
        throw new Error(json.error || 'Booking deletion failed');
    } catch (error) {
        console.error('Failed to delete booking', error);
        throw error;
    }
}

export {
    getAllBookings,
    getBookingById,
    createBooking,
    deleteBooking
};