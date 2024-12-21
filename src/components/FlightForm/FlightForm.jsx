import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as flightService from '../../services/flightService'

const FlightForm = ({ flightId = null, initialData = {}, buttonText }) => {

    const navigate = useNavigate();

    const getTimeInputString = (date = new Date()) => {
        return date
            .toLocaleString('en-CA', { hour12: false, })
            .replace(',', '')
            .replace(' ', 'T')
            .slice(0, 16);
    }

    if (Object.keys(initialData).length) {
        initialData.departureTime = getTimeInputString(new Date(initialData.departureTime));
        initialData.arrivalTime = getTimeInputString(new Date(initialData.arrivalTime));
    }

    const [isSubmitting, setIsSubmitting] = useState(false); // This is to know when a form is already being submitted
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidFields, setInvalidFields] = useState({});
    const [touchedFields, setTouchedFields] = useState({}); // Tracks the fields in the form that have been interacted with
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        if (Object.keys(invalidFields).length) {
            const firstInvalidField = Object.keys(invalidFields)[0];
            const element = document.getElementById(firstInvalidField);
            if (element) {
                element.focus();
            }
        }
    }, [invalidFields]);

    const handleChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });

    const handleBlur = event => setTouchedFields({ ...touchedFields, [event.target.name]: true });

    const isFormInvalid = () => {
        if (Object.keys(formData).length) {
            const validations = {};

            if (!formData.flightNumber?.trim()) {
                validations.flightNumber = 'Flight Number is required';
            }

            if (!formData.origin?.trim()) {
                validations.origin = 'Origin is required';
            }

            if (!formData.destination?.trim()) {
                validations.destination = 'Destination is required';
            }

            if (!formData.departureTime?.trim()) {
                validations.departureTime = 'Departure time is required';
            } else if (formData.departureTime && new Date(formData.departureTime) < new Date()) {
                validations.departureTime = 'Departure time cannot be in the past';
            }

            if (!formData.arrivalTime?.trim()) {
                validations.arrivalTime = 'Arrival time is required';
            } else if (formData.arrivalTime && new Date(formData.arrivalTime) < new Date(formData.departureTime)) {
                validations.arrivalTime = 'Arrival time must be later than departure time';
            }

            if (!formData.availableSeats) {
                validations.availableSeats = 'Available seats are required';
            }

            if (!formData.price) {
                validations.price = 'Price is required';
            }

            setInvalidFields(validations);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (isSubmitting || Object.keys(invalidFields).length) return;
        setIsSubmitting(true);
        formData.departureTime = new Date(formData.departureTime);
        formData.arrivalTime = new Date(formData.arrivalTime);

        try {
            if (buttonText === 'Create Flight')
                flightId = (await flightService.createFlight(formData))._id;
            else
                await flightService.updateFlight(flightId, formData);
            navigate(`/flights/${flightId}`);
        } catch (error) {
            // This catches amy error that could come from flightService
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(isFormInvalid, [formData]);

    return (
        <form className="container mt-4" onSubmit={handleSubmit}>
            <h2 className="mb-4">{buttonText || 'Flight Form'}</h2>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="flightNumber" className="form-label">Flight Number</label>
                    <input
                        type="text"
                        id="flightNumber"
                        name="flightNumber"
                        className={`form-control ${touchedFields.flightNumber && invalidFields.flightNumber ? 'is-invalid' : ''}`}
                        value={formData.flightNumber || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.flightNumber && invalidFields.flightNumber && (
                        <div className="invalid-feedback">{invalidFields.flightNumber}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="origin" className="form-label">Origin</label>
                    <input
                        type="text"
                        id="origin"
                        name="origin"
                        className={`form-control ${touchedFields.origin && invalidFields.origin ? 'is-invalid' : ''}`}
                        value={formData.origin || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.origin && invalidFields.origin && (
                        <div className="invalid-feedback">{invalidFields.origin}</div>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="destination" className="form-label">Destination</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        className={`form-control ${touchedFields.destination && invalidFields.destination ? 'is-invalid' : ''}`}
                        value={formData.destination || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.destination && invalidFields.destination && (
                        <div className="invalid-feedback">{invalidFields.destination}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="departureTime" className="form-label">Departure Time</label>
                    <input
                        type="datetime-local"
                        id="departureTime"
                        name="departureTime"
                        className={`form-control ${touchedFields.departureTime && invalidFields.departureTime ? 'is-invalid' : ''}`}
                        value={formData.departureTime || getTimeInputString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.departureTime && invalidFields.departureTime && (
                        <div className="invalid-feedback">{invalidFields.departureTime}</div>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="arrivalTime" className="form-label">Arrival Time</label>
                    <input
                        type="datetime-local"
                        id="arrivalTime"
                        name="arrivalTime"
                        className={`form-control ${touchedFields.arrivalTime && invalidFields.arrivalTime ? 'is-invalid' : ''}`}
                        value={formData.arrivalTime || getTimeInputString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.arrivalTime && invalidFields.arrivalTime && (
                        <div className="invalid-feedback">{invalidFields.arrivalTime}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="availableSeats" className="form-label">Available Seats</label>
                    <input
                        type="number"
                        id="availableSeats"
                        name="availableSeats"
                        className={`form-control ${touchedFields.availableSeats && invalidFields.availableSeats ? 'is-invalid' : ''}`}
                        value={formData.availableSeats || 0}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.availableSeats && invalidFields.availableSeats && (
                        <div className="invalid-feedback">{invalidFields.availableSeats}</div>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className={`form-control ${touchedFields.price && invalidFields.price ? 'is-invalid' : ''}`}
                        value={formData.price || 0}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.price && invalidFields.price && (
                        <div className="invalid-feedback">{invalidFields.price}</div>
                    )}
                </div>
                {formData.status && (
                    <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="form-select"
                            value={formData.status || 'scheduled'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="scheduled">Scheduled</option>
                            <option value="delayed">Delayed</option>
                            <option value="canceled">Canceled</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                )}
            </div>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" disabled={Object.keys(invalidFields).length || isSubmitting}>
                    {buttonText || 'Submit'}
                </button>
                <Link to="/" className="btn btn-secondary">Cancel</Link>
            </div>
        </form>
    );
};

export { FlightForm };