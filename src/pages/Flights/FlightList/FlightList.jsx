import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as flightService from '../../../services/flightService';

const FlightList = () => {
    const [flights, setFlights] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await flightService.getAllFlights();
                setFlights(data);
            } catch (error) {
                setErrorMessage('Unable to fetch flights. Please try again later.', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFlights();
    }, []);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    };

    if (isLoading) {
        return <p>Loading flights...</p>;
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
                    {flights.map(flight => (
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
        </div>
    );
};

export default FlightList;