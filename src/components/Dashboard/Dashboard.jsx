import { useContext, useEffect, useState } from 'react';
import AuthedUserContext from '../../contexts/AuthedUserContext'
import * as bookingService from '../../services/bookingService';
import SearchFlight from '../Flight/SearchFlight';

const Dashboard = () => {
    const { user } = useContext(AuthedUserContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await bookingService.getAllBookings();
                setBookings(data);
                setLoading(false);
            } catch (error) {
                setError(error?.message || 'Unable to fetch bookings. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);



    const handleDeleteBooking = (bookingId) => {
        try {
            const data = bookingService.deleteBooking(bookingId);
            setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
        } catch (error) {
            setError(error?.message || 'Unable to delete booking. Please try again later.');
        }
    };

    return (
        <div className="container py-5">
            <SearchFlight />
            <h1 className="display-4">Dashboard</h1>
            <p className="lead">Welcome back, {user.username}!</p>

            <div className="mt-5">
                <h2>Your Bookings</h2>
                {loading && <div className="alert alert-info text-center">Loading your bookings...</div>}
                {error && <div className="alert alert-danger text-center">{error}</div>}
                {!loading && !error && bookings.length > 0 ? (
                    <ul className="list-group">
                        {bookings.map((booking) => (
                            <li key={booking._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <p><strong>Flight:</strong> {booking.flight?.flightNumber || 'N/A'}</p>
                                    <p><strong>Seat:</strong> {booking.seatNumber || 'N/A'}</p>
                                    <p><strong>Status:</strong> {booking.status || 'N/A'}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteBooking(booking._id)}
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
