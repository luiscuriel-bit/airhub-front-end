import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const ShowBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await bookingService.getBookingById(bookingId);
        setBooking(data);
        setSuccessMessage('Booking loaded successfully.');
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (errorMessage) {
    return <div className="alert alert-danger text-center">{errorMessage}</div>;
  }

  if (!booking) {
    return <div className="alert alert-info text-center">Loading booking details...</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Booking Details</h1>
      {successMessage && (
        <div className="alert alert-success text-center">{successMessage}</div>
      )}
      <p>
        <strong>Flight:</strong> {booking.flight?.flightNumber || 'N/A'}
      </p>
      <p>
        <strong>Seat:</strong> {booking.seatNumber || 'N/A'}
      </p>
      <p>
        <strong>Status:</strong> {booking.status || 'N/A'}
      </p>
      <p>
        <strong>Passenger:</strong> {booking.passenger?.firstName || 'N/A'}{' '}
        {booking.passenger?.lastName || ''}
      </p>
      <button
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default ShowBooking;