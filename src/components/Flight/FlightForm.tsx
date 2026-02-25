import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { flightSchema, FlightFields } from '../../utils/schemas';
import { format } from 'date-fns';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as flightService from '../../services/flightService';
import { Flight } from '../../types';
import { toast } from 'sonner';

interface FlightFormProps {
    flightId?: string | null;
    initialData?: any;
    buttonText: string;
}

const FlightForm = ({ flightId = null, initialData = {}, buttonText }: FlightFormProps) => {
    const navigate = useNavigate();

    const formattedData = {
        ...initialData,
        departureTime: initialData.departureTime
            ? format(new Date(initialData.departureTime), "yyyy-MM-dd'T'HH:mm")
            : '',
        arrivalTime: initialData.arrivalTime
            ? format(new Date(initialData.arrivalTime), "yyyy-MM-dd'T'HH:mm")
            : '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FlightFields>({
        resolver: zodResolver(flightSchema),
        defaultValues: formattedData,
    });

    const onSubmit = async (data: FlightFields) => {
        try {
            // Convertimos las fechas locales a ISO para que el servidor las guarde bien en UTC
            const payload = {
                ...data,
                departureTime: new Date(data.departureTime).toISOString(),
                arrivalTime: new Date(data.arrivalTime).toISOString(),
            };

            let newFlight: Flight;
            if (buttonText === 'Create Flight') {
                newFlight = await flightService.createFlight(payload);
                toast.success('Flight created!');
            } else {
                newFlight = await flightService.updateFlight(flightId!, payload);
                toast.success('Flight updated!');
            }
            setTimeout(() => navigate(`/flights/${newFlight._id}`), 1000);
        } catch (error: any) {
            toast.error(error?.message || 'Failed to save flight.')
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900">{buttonText}</h1>
                <p className="text-slate-500 mt-2 text-lg">Enter the technical details for this flight route.</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                {/* ID & Route Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Flight Number</label>
                        <input
                            {...register('flightNumber')}
                            type='text'
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700"
                            placeholder="e.g. AH-123"
                        />
                        {errors.flightNumber && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.flightNumber.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Origin</label>
                        <input
                            {...register('origin')}
                            type='text'
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700"
                            placeholder="City or Airport"
                        />
                        {errors.origin && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.origin.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Destination</label>
                        <input
                            {...register('destination')}
                            type='text'
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700"
                            placeholder="City or Airport"
                        />
                        {errors.destination && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.destination.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Schedule Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Departure Time</label>
                        <input
                            {...register('departureTime')}
                            type="datetime-local"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700"
                        />
                        {errors.departureTime && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.departureTime.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Arrival Time</label>
                        <input
                            {...register('arrivalTime')}
                            type="datetime-local"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700"
                        />
                        {errors.arrivalTime && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.arrivalTime.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Logistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Seats</label>
                        <input
                            {...register('availableSeats')}
                            type="number"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700"
                        />
                        {errors.availableSeats && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.availableSeats.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
                        <input
                            {...register('price')}
                            type="number"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-blue-600"
                        />
                        {errors.price && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.price.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                        <select
                            {...register('status')}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700 bg-slate-50">
                            <option value="scheduled">Scheduled</option>
                            <option value="delayed">Delayed</option>
                            <option value="canceled">Canceled</option>
                            <option value="completed">Completed</option>
                        </select>
                        {errors.status && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.status.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex space-x-4 pt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 bg-slate-900 text-white font-black rounded-[1.5rem] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest">
                        {isSubmitting ? 'Processing...' : buttonText}
                    </button>
                    <Link to="/flights" className="px-10 py-4 bg-slate-100 text-slate-500 font-bold rounded-[1.5rem] hover:bg-slate-200 transition-all flex items-center justify-center">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export { FlightForm };
