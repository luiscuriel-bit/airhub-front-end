const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/bookings`;

const getAllBookings = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

const getBookingById = async (bookingId) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookingId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

const createBooking = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formData),
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

const updateBooking = async (bookingId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formData),
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

const deleteBooking = async (bookingId) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

export {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};