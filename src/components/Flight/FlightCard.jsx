import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';
import { useState } from 'react';

const FlightCard = ({ flight }) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBooking = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const booking = await bookingService.createBooking({ flightId: flight._id });
            navigate(`/bookings/${booking._id}`);
        } catch (error) {
            // This catches any error that could come from flightService
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), "MMM d, yyyy h:mm a");
        } catch (error) {
            return 'Invalid Date';
        }
    };

    return (
        <div className='card shadow-sm'>
            <div className='card-body'>
                <h5 className='card-title'>
                    {flight.origin} → {flight.destination}
                </h5>
                <p className='card-text'>
                    <strong>Departure Time:</strong> {formatDateTime(flight.departureTime)}
                </p>
                <p className='card-text'>
                    <strong>Price:</strong> ${flight.price}
                </p>
                <button
                    onClick={handleBooking}
                    className='btn btn-primary'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Booking...' : 'Book Now'}
                </button>
                {errorMessage && (
                    <div className='alert alert-danger mt-3' role='alert'>
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightCard;