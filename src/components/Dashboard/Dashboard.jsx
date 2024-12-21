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
        bookingService
            .deleteBooking(bookingId)
            .then(() => {
                setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="container py-5">
            <h1 className="display-4">Dashboard</h1>
            <p className="lead">Welcome back, {user.username}!</p>

            <div className="mt-5">
                <h2>Your Bookings</h2>
                {loading && <p>Loading your bookings...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && bookings.length > 0 ? (
                    <ul className="list-group">
                        {bookings.map((booking) => (
                            <li key={booking.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <p><strong>Flight:</strong> {booking.flight?.flightNumber || 'N/A'}</p>
                                    <p><strong>Seat:</strong> {booking.seatNumber || 'N/A'}</p>
                                    <p><strong>Status:</strong> {booking.status || 'N/A'}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteBooking(booking.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
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
