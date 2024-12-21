import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import * as bookingService from '../../services/bookingService';

const Dashboard = () => {
  const { user } = useContext(AuthedUserContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user bookings on mount
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }

    bookingService
      .getAllBookings()
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user, navigate]);

  const handleDeleteBooking = (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    bookingService
      .deleteBooking(bookingId)
      .then(() => {
        setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      })
      .catch((err) => setError(err.message));
  };

  if (!user) return <p>Redirecting to sign-in...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome back, {user.username}!</p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Your Bookings</h2>
        {loading && <p>Loading your bookings...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && bookings.length > 0 ? (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id} style={{ marginBottom: '1rem' }}>
                <p>
                  <strong>Flight:</strong> {booking.flight?.flightNumber || 'N/A'}
                  <br />
                  <strong>Seat:</strong> {booking.seatNumber || 'N/A'}
                  <br />
                  <strong>Status:</strong> {booking.status || 'N/A'}
                </p>
                <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
