import { useParams } from 'react-router-dom';
import { FlightForm } from '../../components/Flight/FlightForm';
import { useEffect, useState } from 'react';
import * as flightService from '../../services/flightService';

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
        setErrorMessage(error?.message || 'Unable to fetch flight data. Please try again later.');
      }
    };
    fetchFlight();
  }, [flightId]);

  if (errorMessage) {
    return <div className="alert alert-danger text-center">{errorMessage}</div>;
  }

  if (!flight) {
    return <div className="alert alert-info text-center">Loading flight details...</div>;
  }

  return (
    <>
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      <FlightForm flightId={flightId} initialData={flight} buttonText={'Edit Flight'} />
    </>
  );
};

export default EditFlight;