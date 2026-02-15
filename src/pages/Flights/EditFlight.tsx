import { useParams } from 'react-router-dom';
import { FlightForm } from '../../components/Flight/FlightForm';
import { useEffect, useState } from 'react';
import * as flightService from '../../services/flightService';

const EditFlight = () => {
    const { flightId } = useParams();
    const [flight, setFlight] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const data = await flightService.getFlightById(flightId!);
                setFlight(data);
            } catch (error: any) {
                setErrorMessage(error || 'Unable to fetch flight data.');
            }
        };
        fetchFlight();
    }, [flightId]);

    if (errorMessage) return <div className="text-center py-20 text-rose-600 font-bold">{errorMessage}</div>;
    if (!flight) return <div className="text-center py-20 animate-pulse text-slate-400">Loading flight editor...</div>;

    return (
        <div className="py-10">
            <FlightForm flightId={flightId} initialData={flight} buttonText="Update Flight" />
        </div>
    );
};

export default EditFlight;