import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../App';
import * as bookingService from '../services/bookingService';

const Dashboard = () => {
    const { user, token } = useContext(AuthedUserContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Redirect to sign-in if no user or token is available
        if (!user || !token) {
            navigate('/auth/signin');
            return;
        }

        // Fetch user bookings
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
    }, [user, token, navigate]);

    if (!user || !token) return <p>Redirecting to sign-in...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <p>Welcome back, {user.username}!</p>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                <div>
                    <h2>Your Bookings</h2>
                    {loading ? (
                        <p>Loading your bookings...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : bookings.length > 0 ? (
                        <ul>
                            {bookings.map(booking => (
                                <li key={booking.id}>{booking.details}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no bookings yet.</p>
                    )}
                </div>
                <div>
                    <h2>Previous Flights</h2>
                    <p>Display previous flights here...</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;