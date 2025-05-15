import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const bookingsData = await bookingService.getAllBookings();
                setBookings(bookingsData);
                setLoading(false);
            } catch (error) {
                setErrorMessage(error || 'Unable to fetch bookings. Please try again later.');
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleDelete = async bookingId => {
        try {
            await bookingService.deleteBooking(bookingId);
            setBookings(prev => prev.filter(booking => booking._id !== bookingId));
            setSuccessMessage('Booking deleted successfully.');
        } catch (error) {
            setErrorMessage(error || 'Unable to delete booking. Please try again later.');
        }
    };

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentBookings = bookings.slice(startIndex, endIndex);
    const totalPages = Math.ceil(bookings.length / entriesPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Manage Your Bookings</h1>

            {loading && <div className="alert alert-info text-center">Loading bookings...</div>}
            {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

            {!loading && !errorMessage && bookings.length > 0 ? (
                <>
                    <div className="list-group mb-4">
                        {currentBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <span>
                                    <strong>Flight:</strong> {booking.flight?.flightNumber || 'N/A'} -{' '}
                                    <strong>Seat:</strong> {booking.seatNumber || 'N/A'} -{' '}
                                    <strong>Status:</strong> {booking.status || 'N/A'}
                                </span>
                                <div>
                                    <Link
                                        to={`/bookings/${booking._id}`}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                                    Previous
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <li key={idx + 1} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => goToPage(idx + 1)}>
                                        {idx + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <div className="alert alert-warning text-center">No bookings found.</div>
            )
            }
        </div >
    );
};

export default ManageBookings;