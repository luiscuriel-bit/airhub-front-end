import { useState, ChangeEvent, FormEvent } from 'react';
import * as flightService from '../../services/flightService';
import FlightCard from './FlightCard';

const SearchFlight = () => {
    const [formData, setFormData] = useState({ origin: '', destination: '', departureStart: '', departureEnd: '' });
    const [flights, setFlights] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        
        const cleanedFormData: any = { ...formData };
        Object.keys(cleanedFormData).forEach(key => {
            if (!cleanedFormData[key]?.trim()) delete cleanedFormData[key];
        });

        try {
            const flightsData = await flightService.searchFlight(cleanedFormData);
            setFlights(flightsData);
        } catch (error: any) {
            setErrorMessage(error || 'Unable to search flights.');
        }
    };

    return (
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="mr-2">🔍</span> Search Flights
            </h2>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Origin</label>
                    <input name="origin" value={formData.origin} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g. Madrid" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Destination</label>
                    <input name="destination" value={formData.destination} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g. Tokyo" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">From Date</label>
                    <input type="date" name="departureStart" value={formData.departureStart} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mt-6">
                    <button type="submit" className="w-full h-[3.25rem] bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-[0.97]">
                        Find Flights
                    </button>
                </div>
            </form>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {flights.map((flight) => (
                    <FlightCard key={flight._id} flight={flight} />
                ))}
            </div>
        </section>
    );
};

export default SearchFlight;