export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName?: string;
    email: string;
    role: 'admin' | 'user' | 'staff';
}

export interface Flight {
    _id: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    availableSeats: number;
    price: number;
    status: 'scheduled' | 'delayed' | 'canceled' | 'completed';
    passengers: string[];
    staff: string[];
}

export interface Booking {
    _id: string;
    flight: Flight;
    passenger: User;
    seatNumber: string;
    status: 'pending' | 'confirmed' | 'canceled';
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}
