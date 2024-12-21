import React, { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App'; // Import the existing context
import * as bookingService from '../../services/bookingService';

const ManageBookings = () => {
  const { user, token } = useContext(AuthedUserContext); // Use context for user and token
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch bookings when the component mounts
  useEffect(() => {
    if (!token) {
      setError('You must be logged in to view your bookings.');
      setLoading(false);
      return;
    }

    bookingService
      .getAllBookings() // Ensure this fetches bookings properly
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const handleDeleteBooking = (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    bookingService
      .deleteBooking(bookingId) // Use the deleteBooking service
      .then(() => {
        setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Manage Your Bookings</h1>
      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <span>
                Flight: {booking.flight?.flightNumber} - Seat: {booking.seatNumber} - Status:{' '}
                {booking.status}
              </span>
              <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No bookings to display.</p>
      )}
    </div>
  );
};

export default ManageBookings;