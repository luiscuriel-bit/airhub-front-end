import { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const ManageBookings = () => {
  const { user } = useContext(AuthedUserContext);
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

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

      {loading && <div className="alert alert-info">Loading bookings...</div>}
      {errorMessage && (
        <div className="alert alert-danger text-center">{errorMessage}</div>
      )}

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
                    onClick={() => handleDeleteBooking(booking._id)}
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
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        !loading && <div className="alert alert-info">No bookings to display.</div>
      )}
    </div>
  );
};

export default ManageBookings;