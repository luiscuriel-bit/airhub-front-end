import { useState } from 'react';
import * as flightService from '../../services/flightService';
import FlightCard from './FlightCard';

const SearchFlight = () => {
    const [formData, setFormData] = useState({ origin: '', destination: '', departureStart: '', departureEnd: '' });
    const [flights, setFlights] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        const cleanedFormData = { ...formData };

        // Clean empty fields
        for (let property in cleanedFormData) {
            if (!cleanedFormData[property]?.trim()) {
                delete cleanedFormData[property];
            }
        }

        try {
            const flightsData = await flightService.searchFlight(cleanedFormData);

            setFlights(flightsData);
        } catch (error) {
            setErrorMessage(error || 'Unable to search flights. Please try again later.');
            setFlights([]);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Search Flights</h1>
            <form className="mb-4" onSubmit={handleSearch}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <label htmlFor="origin" className="form-label">Origin</label>
                        <input
                            type="text"
                            id="origin"
                            name="origin"
                            className="form-control"
                            placeholder="Enter origin"
                            value={formData.origin}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="destination" className="form-label">Destination</label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            className="form-control"
                            placeholder="Enter destination"
                            value={formData.destination}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="departureStart" className="form-label">Departure Start</label>
                        <input
                            type="date"
                            id="departureStart"
                            name="departureStart"
                            className="form-control"
                            value={formData.departureStart}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="departureEnd" className="form-label">Departure End</label>
                        <input
                            type="date"
                            id="departureEnd"
                            name="departureEnd"
                            className="form-control"
                            value={formData.departureEnd}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <div className="row">
                {flights.length ? (
                    flights.map((flight) => (
                        <div key={flight._id} className="col-md-4 mb-4">
                            <FlightCard flight={flight} />
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-muted">No flights found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchFlight;