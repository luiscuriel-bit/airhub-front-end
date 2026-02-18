import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as flightService from '../../services/flightService';
import { useSocket } from '../../hooks/useSocket';
import { Flight } from '../../types';

const FlightList = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    useSocket((event, data) => {
        if (event === 'flight:created') {
            setFlights(prev => [data, ...prev]);
        }
        if (event === 'flight:updated') {
            setFlights(prev =>
                prev.map(f => f._id === data._id ? data : f)
            );
        }
        if (event === 'flight:deleted') {
            setFlights(prev =>
                prev.filter(f => f._id !== data)
            );
        }
    });

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await flightService.getAllFlights();
                setFlights(data);
            } catch (error: any) {
                setErrorMessage(error || 'Unable to fetch flights.');
            } finally {
                setLoading(false);
            }
        };
        fetchFlights();
    }, []);

    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentFlights = flights.slice(startIndex, startIndex + entriesPerPage);
    const totalPages = Math.ceil(flights.length / entriesPerPage);

    const formatDateTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM d, yyyy h:mm a");
        } catch (e) {
            return 'Invalid Date';
        }
    };

    if (loading) return <div className="text-center py-20 animate-pulse text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching Flight Roster...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">All Flights</h1>
                    <p className="text-slate-500 mt-2 text-lg">Control center for all active routes.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 text-sm font-black text-blue-600 shadow-sm uppercase tracking-tighter">
                    {flights.length} TOTAL ROUTES
                </div>
            </header>

            {errorMessage && (
                <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100 text-center font-bold">
                    {errorMessage}
                </div>
            )}

            <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Flight</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Route</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Departure</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {currentFlights.map(flight => (
                                <tr key={flight._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6 font-black text-slate-900 text-sm tracking-tight">{flight.flightNumber}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-slate-700">{flight.origin}</span>
                                            <span className="text-slate-300 text-xs">→</span>
                                            <span className="font-bold text-slate-700">{flight.destination}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-slate-500 text-sm font-medium">{formatDateTime(flight.departureTime)}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${flight.availableSeats > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {flight.availableSeats > 0 ? `${flight.availableSeats} Available` : 'Full'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Link
                                            to={`/flights/${flight._id}`}
                                            className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-900 hover:text-white transition-all group-hover:scale-105 active:scale-95 shadow-sm"
                                        >
                                            DETAILS
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 pt-4">
                    <button
                        className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-400 disabled:opacity-20 transition-all shadow-sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        ←
                    </button>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Page <span className="text-slate-900">{currentPage}</span> of {totalPages}
                    </div>
                    <button
                        className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-400 disabled:opacity-20 transition-all shadow-sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
};

export default FlightList;
