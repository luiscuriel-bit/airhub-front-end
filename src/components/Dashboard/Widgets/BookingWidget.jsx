import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { getBookings } from '../../../services/bookingService';

const BookingWidget = () => {
    const { token } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getBookings(token);
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [token]);

    return (
        <div>
            <h2>Your Bookings</h2>
            <ul>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <li key={booking._id}>
                            Flight: {booking.flight.flightNumber}, Seat: {booking.seatNumber}, Status: {booking.status}
                        </li>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </ul>
        </div>
    );
};

export default BookingWidget;