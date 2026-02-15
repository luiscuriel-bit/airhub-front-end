import { format } from 'date-fns';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as flightService from '../../services/flightService';

interface FlightFormProps {
    flightId?: string | null;
    initialData?: any;
    buttonText: string;
}

const FlightForm = ({ flightId = null, initialData = {}, buttonText }: FlightFormProps) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getTimeInputString = (date = new Date()) => format(date, "yyyy-MM-dd'T'HH:mm");

    const [formData, setFormData] = useState({
        flightNumber: initialData.flightNumber || '',
        origin: initialData.origin || '',
        destination: initialData.destination || '',
        departureTime: initialData.departureTime ? getTimeInputString(new Date(initialData.departureTime)) : getTimeInputString(),
        arrivalTime: initialData.arrivalTime ? getTimeInputString(new Date(initialData.arrivalTime)) : getTimeInputString(),
        availableSeats: initialData.availableSeats || 0,
        price: initialData.price || 0,
        status: initialData.status || 'scheduled'
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const submitData = {
            ...formData,
            departureTime: new Date(formData.departureTime),
            arrivalTime: new Date(formData.arrivalTime),
        };

        try {
            let id = flightId;
            if (buttonText === 'Create Flight') {
                const newFlight = await flightService.createFlight(submitData);
                id = newFlight._id;
            } else {
                await flightService.updateFlight(flightId!, submitData);
            }
            
            setStatus({ type: 'success', message: `Flight ${buttonText === 'Create Flight' ? 'created' : 'updated'} successfully!` });
            setTimeout(() => navigate(`/flights/${id}`), 1000);
        } catch (error: any) {
            setStatus({ type: 'error', message: error || 'Unable to save flight.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900">{buttonText}</h1>
                <p className="text-slate-500 mt-2 text-lg">Enter the technical details for this flight route.</p>
            </header>

            {status.message && (
                <div className={`mb-6 p-4 rounded-2xl text-sm font-bold text-center border ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                {/* ID & Route Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Flight Number</label>
                        <input name="flightNumber" value={formData.flightNumber} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700" placeholder="e.g. AH-123" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Origin</label>
                        <input name="origin" value={formData.origin} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700" placeholder="City or Airport" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Destination</label>
                        <input name="destination" value={formData.destination} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700" placeholder="City or Airport" />
                    </div>
                </div>

                {/* Schedule Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Departure Time</label>
                        <input name="departureTime" type="datetime-local" value={formData.departureTime} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Arrival Time</label>
                        <input name="arrivalTime" type="datetime-local" value={formData.arrivalTime} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700" />
                    </div>
                </div>

                {/* Logistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Seats</label>
                        <input name="availableSeats" type="number" value={formData.availableSeats} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
                        <input name="price" type="number" value={formData.price} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-blue-600" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-700 bg-slate-50">
                            <option value="scheduled">Scheduled</option>
                            <option value="delayed">Delayed</option>
                            <option value="canceled">Canceled</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="flex space-x-4 pt-8">
                    <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-slate-900 text-white font-black rounded-[1.5rem] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest">
                        {isSubmitting ? 'Processing...' : buttonText}
                    </button>
                    <Link to="/flights" className="px-10 py-4 bg-slate-100 text-slate-500 font-bold rounded-[1.5rem] hover:bg-slate-200 transition-all flex items-center justify-center">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export { FlightForm };
