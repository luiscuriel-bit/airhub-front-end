import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';
import { useState } from 'react';

interface FlightCardProps {
    flight: any;
}

const FlightCard = ({ flight }: FlightCardProps) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBooking = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const booking = await bookingService.createBooking({ flightId: flight._id });
            navigate(`/bookings/${booking._id}`);
        } catch (error: any) {
            setErrorMessage(error?.message || 'Booking failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDateTime = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), "MMM d, yyyy h:mm a");
        } catch (error) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {flight.origin} → {flight.destination}
                    </h3>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Available
                    </span>
                </div>
                
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-500 text-sm">
                        <span className="mr-2">📅</span>
                        {formatDateTime(flight.departureTime)}
                    </div>
                    <div className="flex items-center text-slate-900 font-bold text-lg">
                        <span className="mr-2 text-slate-400 font-normal">Price:</span>
                        ${flight.price}
                    </div>
                </div>

                <button
                    onClick={handleBooking}
                    className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Booking...' : 'Book Now'}
                </button>

                {errorMessage && (
                    <p className="mt-3 text-rose-600 text-xs text-center font-medium bg-rose-50 p-2 rounded-lg">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FlightCard;