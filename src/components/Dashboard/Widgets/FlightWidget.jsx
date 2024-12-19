import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { getFlights } from '../../../services/flightService';

const FlightWidget = () => {
    const { token } = useContext(UserContext);
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await getFlights(token);
                setFlights(data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, [token]);

    return (
        <div>
            <h2>Available Flights</h2>
            <ul>
                {flights.map((flight) => (
                    <li key={flight._id}>
                        {flight.flightNumber} - {flight.origin} to {flight.destination}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlightWidget;