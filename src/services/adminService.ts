import apiFetch from './api';
import { ApiResponse } from '../types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/admin`;

export interface AdminStats {
    totalFlights: number;
    totalBookings: number;
    totalUsers: number;
    totalRevenue: number;
    occupancyRate: number;
};

export const getStats = async (): Promise<AdminStats> => {
    const json: ApiResponse<AdminStats> = await apiFetch(`${BASE_URL}/stats`);
    return json.data;
};