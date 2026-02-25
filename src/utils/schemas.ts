import { z } from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 chatacters'),
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['admin', 'staff', 'passenger']).default('passenger'),
});

export const signinSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export const flightSchema = z.object({
    flightNumber: z.string().min(1, 'Flight number is required'),
    origin: z.string().min(1, 'Origin is required'),
    destination: z.string().min(1, 'Destination is required'),
    departureTime: z.string().min(1, 'Departure time is required'),
    arrivalTime: z.string().min(1, 'Arrival time is required'),
    availableSeats: z.coerce.number().min(0, 'Must be 0 or more'),
    price: z.coerce.number().min(0, 'Price cannot be negative'),
    status: z.enum(['scheduled', 'delayed', 'canceled', 'completed']).default('scheduled'),
});

// Esquema para el Perfil (EditProfile)
export const profileSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
});

export type SignupFields = z.infer<typeof signupSchema>;
export type SigninFields = z.infer<typeof signinSchema>;
export type FlightFields = z.infer<typeof flightSchema>;
export type ProfileFields = z.infer<typeof profileSchema>;