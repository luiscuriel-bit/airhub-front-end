import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const ShowBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await bookingService.getBookingById(bookingId);
        setBooking(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (errorMessage) {
    return <div className="alert alert-danger">{errorMessage}</div>;
  }

  if (!booking) {
    return <div className="alert alert-info">Loading booking details...</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Booking Details</h1>
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