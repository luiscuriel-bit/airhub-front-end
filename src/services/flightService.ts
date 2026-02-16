import { Flight, ApiResponse } from '../types';
import apiFetch from './api';

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/flights`;

export const getAllFlights = async (): Promise<Flight[]> => {
    const json: ApiResponse<Flight[]> = await apiFetch(`${BASE_URL}/`);
    return json.data;
};

export const getFlightById = async (flightId: string): Promise<Flight> => {
    const json: ApiResponse<Flight> = await apiFetch(`${BASE_URL}/${flightId}`);
    return json.data;
};

export const createFlight = async (formData: any): Promise<Flight> => {
    const json: ApiResponse<Flight> = await apiFetch(`${BASE_URL}/`, {
        method: 'POST',
        body: JSON.stringify(formData),
    });
    return json.data;
};

export const updateFlight = async (flightId: string, formData: any): Promise<Flight> => {
    const json: ApiResponse<Flight> = await apiFetch(`${BASE_URL}/${flightId}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
    });
    return json.data;
};

export const deleteFlight = async (flightId: string): Promise<void> => {
    await apiFetch(`${BASE_URL}/${flightId}`, { method: 'DELETE' });
};

export const searchFlight = async (formData: any): Promise<Flight[]> => {
    const json: ApiResponse<Flight[]> = await apiFetch(`${BASE_URL}/search`, {
        method: 'POST',
        body: JSON.stringify(formData),
    });
    return json.data;
};
