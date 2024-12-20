import React, { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import * as bookingService from '../../services/bookingService';

const ManageBookings = () => {
    const { user, token } = useContext(AuthedUserContext);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setError('You must be logged in to view your bookings.');
            setLoading(false);
            return;
        }

        bookingService
            .getAllBookings(token)
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [token]);

    const handleDeleteBooking = (bookingId) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;

        bookingService
            .deleteBooking(bookingId, token)
            .then(() => {
                setBookings(bookings.filter(booking => booking.id !== bookingId));
            })
            .catch(err => setError(err.message));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Manage Your Bookings</h1>
            {loading && <p>Loading bookings...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && bookings.length > 0 ? (
                <ul>
                    {bookings.map(booking => (
                        <li key={booking.id}>
                            <span>{booking.details}</span>
                            <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings to display.</p>
            )}
        </div>
    );
};

export default ManageBookings;