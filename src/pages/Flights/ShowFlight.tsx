import { format } from 'date-fns';
import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as flightService from "../../services/flightService";
import AuthedUserContext from '../../contexts/AuthedUserContext';

const ShowFlight = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthedUserContext);
    const { flightId } = useParams();
    const [flight, setFlight] = useState<any>(null);
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const data = await flightService.getFlightById(flightId!);
                setFlight(data);
            } catch (error: any) {
                setStatus({ type: 'error', message: error || 'Flight not found.' });
            }
        };
        fetchFlight();
    }, [flightId]);

    const handleDelete = async () => {
        try {
            await flightService.deleteFlight(flightId!);
            setStatus({ type: 'success', message: 'Flight deleted successfully.' });
            setTimeout(() => navigate('/flights'), 1500);
        } catch (error: any) {
            setStatus({ type: 'error', message: error || 'Unable to delete flight.' });
        }
    };

    const formatDateTime = (dateString: string) => format(new Date(dateString), "MMM d, yyyy h:mm a");

    if (!flight && !status.message) return <div className="text-center py-20 animate-pulse text-slate-400">Loading flight data...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-10">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter mb-4 inline-block">Flight Info</span>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                                {flight.flightNumber}
                            </h1>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-black text-blue-600 tracking-tighter leading-none">${flight.price}</p>
                            <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">Price per seat</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Origin</p>
                                <p className="text-2xl font-black text-slate-900">{flight.origin}</p>
                                <p className="text-sm text-slate-500 font-medium">{formatDateTime(flight.departureTime)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Destination</p>
                                <p className="text-2xl font-black text-slate-900">{flight.destination}</p>
                                <p className="text-sm text-slate-500 font-medium">{formatDateTime(flight.arrivalTime)}</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-bold uppercase tracking-tighter">Status</span>
                                <span className="text-blue-600 font-black uppercase text-xs">{flight.status}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-bold uppercase tracking-tighter">Availability</span>
                                <span className="text-slate-900 font-black tracking-tighter">{flight.availableSeats} Seats</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                        <Link to="/flights" className="text-slate-400 font-bold hover:text-slate-900 transition-all text-sm uppercase tracking-widest">
                            ← Back to List
                        </Link>
                        {user.role === 'admin' && (
                            <div className="flex space-x-4">
                                <Link to={`/flights/${flightId}/edit`} className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm">
                                    Edit
                                </Link>
                                <button onClick={handleDelete} className="bg-rose-50 text-rose-600 px-6 py-3 rounded-xl font-bold hover:bg-rose-100 transition-all text-sm">
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowFlight;
