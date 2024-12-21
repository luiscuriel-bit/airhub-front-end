import { useParams } from "react-router-dom";
import { FlightForm } from "../../../components/FlightForm"
import { useEffect, useState } from "react";
import * as flightService from "../../../services/flightService";

const EditFlight = () => {
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

    if (errorMessage) {
        return <div role="alert" className="error">{errorMessage}</div>;
    }

    if (!flight) {
        return <div>Loading flight details...</div>;
    }

    return (
        <FlightForm flightId={flightId} initialData={flight} buttonText={'Edit Flight'} />
    );
};

export default EditFlight;