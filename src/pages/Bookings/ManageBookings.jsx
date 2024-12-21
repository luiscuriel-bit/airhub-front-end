import { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import * as bookingService from '../../services/bookingService';

const ManageBookings = () => {
    const { user } = useContext(AuthedUserContext);
    const [bookings, setBookings] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        bookingService
            .getAllBookings()
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                setErrorMessage(err.message);
                setLoading(false);
            });
    }, []);

    const handleDeleteBooking = (bookingId) => {
        bookingService
            .deleteBooking(bookingId) // Use the deleteBooking service
            .then(() => {
                setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
            })
            .catch((err) => setErrorMessage(err.message));
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Manage Your Bookings</h1>

            {loading && <div className="alert alert-info" role="alert">Loading bookings...</div>}
            {errorMessage && (
                <div className="alert alert-danger text-center" role="alert">
                    {errorMessage}
                </div>
            )}

            {!loading && !errorMessage && bookings.length > 0 ? (
                <div className="list-group">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                <strong>Flight:</strong> {booking.flight?.flightNumber} - <strong>Seat:</strong> {booking.seatNumber} - <strong>Status:</strong> {booking.status}
                            </span>
                            <button
                                onClick={() => handleDeleteBooking(booking._id)}
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <div className="alert alert-info" role="alert">No bookings to display.</div>
            )}
        </div>
    );
};

export default ManageBookings;