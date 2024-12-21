import * as bookingService from '../../services/bookingService';

const FlightCard = ({ flight }) => {
    return (
        <div className="">
            <h2>{flight.origin} → {flight.destination}</h2>
            <p><strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
            <p><strong>Price:</strong> ${flight.price}</p>
            <button onClick={() => bookingService.createBooking(flight)}>
                Book Now
            </button>
        </div>
    );
};

export default FlightCard;