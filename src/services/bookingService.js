const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/bookings`;

/**
 * Fetch all bookings
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Array>} - List of bookings
 */
const getAllBookings = async (token) => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch bookings');
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        throw error;
    }
};

/**
 * Fetch a single booking by ID
 * @param {string} bookingId - ID of the booking
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - Booking details
 */
const getBookingById = async (bookingId, token) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch booking');
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching booking with ID ${bookingId}:`, error.message);
        throw error;
    }
};

/**
 * Create a new booking
 * @param {Object} bookingData - Booking data (flight, passenger, seatNumber)
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - Created booking
 */
const createBooking = async (bookingData, token) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create booking');
        }

        return await res.json();
    } catch (error) {
        console.error('Error creating booking:', error.message);
        throw error;
    }
};

/**
 * Update an existing booking
 * @param {string} bookingId - ID of the booking
 * @param {Object} updateData - Data to update (seatNumber, flight, status)
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - Updated booking
 */
const updateBooking = async (bookingId, updateData, token) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to update booking');
        }

        return await res.json();
    } catch (error) {
        console.error(`Error updating booking with ID ${bookingId}:`, error.message);
        throw error;
    }
};

/**
 * Delete a booking
 * @param {string} bookingId - ID of the booking
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - Success message
 */
const deleteBooking = async (bookingId, token) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookingId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to delete booking');
        }

        return await res.json();
    } catch (error) {
        console.error(`Error deleting booking with ID ${bookingId}:`, error.message);
        throw error;
    }
};

export { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking };