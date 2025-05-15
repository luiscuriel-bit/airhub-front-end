import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as flightService from '../../services/flightService';

const FlightList = () => {
    const [flights, setFlights] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await flightService.getAllFlights();
                setFlights(data);
            } catch (error) {
                setErrorMessage(error || 'Unable to fetch flights. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentFlights = flights.slice(startIndex, endIndex);
    const totalPages = Math.ceil(flights.length / entriesPerPage);

    const formatDateTime = (dateString) => {
        return format(new Date(dateString), "MMM d, yyyy h:mm a");
    };

    if (loading) {
        return <div className="alert alert-info text-center">Loading flights...</div>;
    }

    if (errorMessage) {
        return <div className="alert alert-danger text-center">{errorMessage}</div>;
    }

    if (!flights.length) {
        return <p>No flights available at the moment.</p>;
    }

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">All Flights</h1>
            {errorMessage && (
                <div className="alert alert-danger text-center" role="alert">
                    {errorMessage}
                </div>
            )}
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Flight Number</th>
                        <th scope="col">Origin</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Departure Time</th>
                        <th scope="col">Available Seats</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFlights.map(flight => (
                        <tr key={flight._id}>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{formatDateTime(flight.departureTime)}</td>
                            <td>{flight.availableSeats}</td>
                            <td>
                                <Link to={`/flights/${flight._id}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center my-4">
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="align-self-center mx-2">Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FlightList;