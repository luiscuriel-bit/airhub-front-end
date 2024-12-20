import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import * as bookingService from '../../services/bookingService';
import * as flightService from '../../services/flightService';

const Dashboard = () => {
    const { user, token } = useContext(AuthedUserContext);
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !token) {
            navigate('/auth/signin');
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

        flightService
            .getAllFlights()
            .then(data => {
                setFlights(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [user, token, navigate]);

    const handleViewDetails = (bookingId) => {
        bookingService
            .getBookingById(bookingId, token)
            .then(data => setSelectedBooking(data))
            .catch(err => setError(err.message));
    };

    const handleDeleteBooking = (bookingId) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;

        bookingService
            .deleteBooking(bookingId, token)
            .then(() => {
                setBookings(bookings.filter(booking => booking.id !== bookingId));
            })
            .catch(err => setError(err.message));
    };

    const handleViewFlightDetails = (flightId) => {
        flightService
            .getFlightById(flightId)
            .then(data => setSelectedFlight(data))
            .catch(err => setError(err.message));
    };

    const handleDeleteFlight = (flightId) => {
        if (!window.confirm('Are you sure you want to delete this flight?')) return;
    
        flightService
            .deleteFlight(flightId)
            .then(() => {
                setFlights(prevFlights => prevFlights.filter(flight => flight.id !== flightId));
            })
            .catch(err => setError(err.message));
    };

    useEffect(() => {
        if (selectedBooking && !bookings.some(booking => booking.id === selectedBooking.id)) {
            setSelectedBooking(null); // Clear the selected booking if it's deleted
        }
    }, [bookings, selectedBooking]);
    

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
                                <li key={booking.id}>
                                    <span>{booking.details}</span>
                                    <button onClick={() => handleViewDetails(booking.id)}>View Details</button>
                                    <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no bookings yet.</p>
                    )}
                </div>

                <div>
                    <h2>Booking Details</h2>
                    {selectedBooking ? (
                        <div>
                            <p><strong>ID:</strong> {selectedBooking.id}</p>
                            <p><strong>Details:</strong> {selectedBooking.details}</p>
                            <p><strong>Status:</strong> {selectedBooking.status}</p>
                        </div>
                    ) : (
                        <p>Select a booking to view details.</p>
                    )}
                </div>

                <div>
                    <h2>Available Flights</h2>
                    {loading ? (
                        <p>Loading flights...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : flights.length > 0 ? (
                        <ul>
                            {flights.map(flight => (
                                <li key={flight.id}>
                                    <span>{flight.details}</span>
                                    <button onClick={() => handleViewFlightDetails(flight.id)}>View Details</button>
                                    <button onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No flights available.</p>
                    )}
                </div>

                <div>
                    <h2>Flight Details</h2>
                    {selectedFlight ? (
                        <div>
                            <p><strong>ID:</strong> {selectedFlight.id}</p>
                            <p><strong>Details:</strong> {selectedFlight.details}</p>
                            <p><strong>Status:</strong> {selectedFlight.status}</p>
                        </div>
                    ) : (
                        <p>Select a flight to view details.</p>
                    )}
                </div>

                <div>
                    <h2>Previous Flights</h2>
                    <p>Flight history functionality will be added soon.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
