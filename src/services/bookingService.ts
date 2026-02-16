import { Booking, ApiResponse } from '../types';
import apiFetch from './api';

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/bookings`;

export const getAllBookings = async (): Promise<Booking[]> => {
    const json: ApiResponse<Booking[]> = await apiFetch(`${BASE_URL}/`);
    return json.data;
};

export const getBookingById = async (bookingId: string): Promise<Booking> => {
    const json: ApiResponse<Booking> = await apiFetch(`${BASE_URL}/${bookingId}`);
    return json.data;
};

export const createBooking = async (formData: any): Promise<Booking> => {
    const json: ApiResponse<Booking> = await apiFetch(`${BASE_URL}/`, {
        method: 'POST',
        body: JSON.stringify(formData),
    });
    return json.data;
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
    await apiFetch(`${BASE_URL}/${bookingId}`, { method: 'DELETE' });
};
