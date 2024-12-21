import { useState } from 'react';
import * as flightService from '../../services/flightService'
import FlightCard from '../FlightCard/FlightCard';

const SearchFlight = () => {
    const [formData, setFormData] = useState({ origin: '', destination: '', departureTime: '' });
    const [flights, setFlights] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

    const handleSearch = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        console.log(formData);
        const cleanedFormData = { ...formData };
        for (let property in cleanedFormData) {
            if (!cleanedFormData[property]?.trim()) {
                delete cleanedFormData[property];
            }
        }
        if (cleanedFormData.departureTime) {
            cleanedFormData.departureTime = new Date(cleanedFormData.departureTime);
        }
        try {
            const flightsData = await flightService.searchFlight(cleanedFormData);
            setFlights(flightsData);
        } catch (error) {
            setErrorMessage(error.message);
            setFlights([]);
        }
    };

    return (
        <div>
            <h1>Search Flights</h1>
            <form className="search-form" onSubmit={handleSearch}>
                <div>
                    <input
                        type="text"
                        name="origin"
                        placeholder="Origin"
                        value={formData.origin}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        value={formData.destination}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name="departureTime"
                        value={formData.departureTime}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            {errorMessage && (
                <div className='errorMessage' role='alert'>
                    {errorMessage}
                </div>
            )}
            <div>
                {
                    flights.length ?
                        flights.map((flight) => <FlightCard key={flight._id} flight={flight} />)
                        : <p>No flights found</p>
                }
            </div>
        </div>
    );
};

export default SearchFlight;