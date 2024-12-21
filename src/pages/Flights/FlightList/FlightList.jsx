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

    if (isLoading) {
        return <p>Loading flights...</p>;
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (!flights.length) {
        return <p>No flights available at the moment.</p>;
    }

    return (
        <div>
            <h1>All Flights</h1>
            <ul>
                {flights.map(flight => (
                    <li key={flight._id}>
                        <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                        <p><strong>Origin:</strong> {flight.origin}</p>
                        <p><strong>Destination:</strong> {flight.destination}</p>
                        <p><strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                        <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
                        <Link to={`/flights/${flight._id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlightList;