import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as flightService from "../../../services/flightService";

const ShowFlight = () => {
    const navigate = useNavigate()
    const { flightId } = useParams();
    const [flight, setFlight] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const flightData = await flightService.getFlightById(flightId);
                setFlight(flightData);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchFlight();
    }, [flightId]);

    const handleDelete = async () => {
        try {
            await flightService.deleteFlight(flightId);
            navigate('/flights');
        } catch (error) {
            setErrorMessage('Error deleting flight. Please try again.', error);
        }
    };

    if (errorMessage) {
        return <div role="alert" className="error">{errorMessage}</div>;
    }

    if (!flight) {
        return <div>Loading flight details...</div>;
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    };


    return (
        <div className="flight-details">
            <h1>Flight Details</h1>
            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p><strong>Origin:</strong> {flight.origin}</p>
            <p><strong>Destination:</strong> {flight.destination}</p>
            <p><strong>Departure Time:</strong> {formatDateTime(flight.departureTime)}</p>
            <p><strong>Arrival Time:</strong> {formatDateTime(flight.arrivalTime)}</p>
            <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
            <p><strong>Status:</strong> {flight.status}</p>
            <p><strong>Price:</strong> ${flight.price}</p>
            <p><strong>Passengers:</strong> {flight.passengers.length || 'No passengers'}</p>
            <p><strong>Staff:</strong> {flight.staff.length || 'No staff'}</p>
            
            {
                !flight.passengers.length ? (
                    <button onClick={handleDelete}>Delete Flight</button>
                ) : (
                    <p>You cannot delete this flight because it has passengers.</p>
                )
            }

            <div className="actions">
                <Link to={`/flights/${flightId}/edit`} className="button">Edit</Link>
                <Link to="/flights" className="button">Back to Flights</Link>
            </div>
        </div>
    );
};

export default ShowFlight;


