import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as flightService from '../services/flightService'


const FlightForm = ({ initialData = {}, buttonText }) => {
    const navigate = useNavigate();

    const getTimeInputString = (date = new Date()) => date
        .toLocaleString('en-CA', { hour12: false, })
        .replace(',', '')
        .replace(' ', 'T')
        .slice(0, 16);

    if (!Object.keys(initialData).length) {
        initialData.departureTime = getTimeInputString(initialData.departureTime);
        initialData.arrivalTime = getTimeInputString(initialData.arrivalTime);
    }

    const [isSubmitting, setIsSubmitting] = useState(false); // This is to know when a form is already being submitted
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidFields, setInvalidFields] = useState({});
    const [touchedFields, setTouchedFields] = useState({}); // Tracks the fields in the form that have been interacted with
    const [formData, setFormData] = useState(initialData);

    const handleChange = event => {
        console.log(formData)
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
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

        if (Object.keys(invalidFields).length) return;
        setIsSubmitting(true);

        formData.departureTime = new Date(formData.departureTime);
        formData.arrivalTime = new Date(formData.arrivalTime);

        try {
            await flightService.createFlight(formData);
            navigate('/flights');
        } catch (error) {
            // This catches amy error that could come from flightService
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(isFormInvalid, [formData]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='flightNumber'>Flight Number</label>
                <input
                    type='text'
                    id='flightNumber'
                    name='flightNumber'
                    value={formData.flightNumber || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby='flightNumber-error'
                    required
                />
                {touchedFields.flightNumber && invalidFields.flightNumber && (
                    <span id='flightNumber-error' role='alert'>{invalidFields.flightNumber}</span>
                )}
            </div>
            <div>
                <label htmlFor='origin'>Origin</label>
                <input
                    type='text'
                    id='origin'
                    name='origin'
                    value={formData.origin || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby='origin-error'
                    required
                />
                {touchedFields.origin && invalidFields.origin && (
                    <span id='origin-error' role='alert'>{invalidFields.origin}</span>
                )}
            </div>
            <div>
                <label htmlFor='destination'>Destination</label>
                <input
                    type='text'
                    id='destination'
                    name='destination'
                    value={formData.destination || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby='destination-error'
                    required
                />
                {touchedFields.destination && invalidFields.destination && (
                    <span id='destination-error' role='alert'>{invalidFields.destination}</span>
                )}
            </div>
            <div>
                <label htmlFor='departureTime'>Departure Time</label>
                <input
                    type='datetime-local'
                    id='departureTime'
                    name='departureTime'
                    value={formData.departureTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby='departureTime-error'
                    required
                />
                {touchedFields.departureTime && invalidFields.departureTime && (
                    <span id='departureTime-error' role='alert'>{invalidFields.departureTime}</span>
                )}
            </div>
            <div>
                <label htmlFor='arrivalTime'>Arrival Time</label>
                <input
                    type='datetime-local'
                    id='arrivalTime'
                    name='arrivalTime'
                    value={formData.arrivalTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby='arrivalTime-error'
                    required
                />
                {touchedFields.arrivalTime && invalidFields.arrivalTime && (
                    <span id='arrivalTime-error' role='alert'>{invalidFields.arrivalTime}</span>
                )}
            </div>
            <div>
                <label htmlFor='availableSeats'>Available Seats</label>
                <input
                    type='number'
                    id='availableSeats'
                    name='availableSeats'
                    value={formData.availableSeats || 0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby='availableSeats-error'
                    required
                />
                {touchedFields.availableSeats && invalidFields.availableSeats && (
                    <span id='availableSeats-error' role='alert'>{invalidFields.availableSeats}</span>
                )}
            </div>
            {formData.status && (
                <div>
                    <label htmlFor='status'>Status</label>
                    <select id="status" name="status" value={formData.status || 'scheduled'} onChange={handleChange} onBlur={handleBlur} aria-describedby='status-error'>
                        <option value="scheduled">Scheduled</option>
                        <option value="delayed">Delayed</option>
                        <option value="canceled">Canceled</option>
                        <option value="completed">Completed</option>
                    </select>
                    {touchedFields.status && invalidFields.status && (
                        <span id='status-error' role='alert'>{invalidFields.status}</span>
                    )}
                </div>)
            }
            <div>
                <label htmlFor='price'>Price</label>
                <input
                    type='number'
                    id='price'
                    name='price'
                    value={formData.price || 0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby='price-error'
                    required
                />
                {touchedFields.price && invalidFields.price && (
                    <span id='price-error' role='alert'>{invalidFields.price}</span>
                )}
            </div>
            {errorMessage && (
                <div className='errorMessage' role='alert'>
                    {errorMessage}
                </div>
            )}
            <div>
                <button disabled={Object.keys(invalidFields).length || isSubmitting}>{buttonText || 'Submit'}</button>
                <Link to="/" className='cancel-button'>Cancel</Link>
            </div>
        </form>
    );
};

export { FlightForm };