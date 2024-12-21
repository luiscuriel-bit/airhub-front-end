import { useParams } from "react-router-dom";
import { FlightForm } from '../../../components/FlightForm/FlightForm'
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

    if (!flight) {
        return <div>Loading flight details...</div>;
    }

    return <>
        {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
            </div>
        )}
        <FlightForm flightId={flightId} initialData={flight} buttonText={'Edit Flight'} />
    </>
};

export default EditFlight;