import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const ShowBooking = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<any>(null);
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const data = await bookingService.getBookingById(bookingId!);
                setBooking(data);
            } catch (error: any) {
                setStatus({ type: 'error', message: error || 'Booking not found.' });
            }
        };
        fetchBooking();
    }, [bookingId]);

    if (!booking && !status.message) return <div className="text-center py-20 animate-pulse text-slate-400">Fetching ticket...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in duration-500">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Boarding Pass</h1>
                <button onClick={() => navigate(-1)} className="text-slate-400 font-bold hover:text-slate-900 transition-colors">← Back</button>
            </header>

            {status.message && (
                <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100 text-center font-bold">
                    {status.message}
                </div>
            )}

            {booking && (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
                    <div className="p-8 bg-blue-600 text-white">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-blue-100 font-bold tracking-widest uppercase text-xs">AirHub Express</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">{booking.status}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-4xl font-black tracking-tighter uppercase">{booking.flight?.origin}</p>
                                <p className="text-blue-200 text-xs font-bold mt-1">Departure Gate</p>
                            </div>
                            <div className="text-3xl opacity-50">✈️</div>
                            <div className="text-right">
                                <p className="text-4xl font-black tracking-tighter uppercase">{booking.flight?.destination}</p>
                                <p className="text-blue-200 text-xs font-bold mt-1">Arrival Terminal</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-2 gap-8 relative">
                        <div className="absolute top-0 left-0 right-0 h-px border-t-2 border-dashed border-slate-100"></div>
                        
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Passenger</p>
                            <p className="text-lg font-black text-slate-900">{booking.passenger?.firstName} {booking.passenger?.lastName}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Flight Number</p>
                            <p className="text-lg font-black text-slate-900"># {booking.flight?.flightNumber}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seat assigned</p>
                            <p className="text-lg font-black text-blue-600">{booking.seatNumber}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Boarding Phase</p>
                            <p className="text-lg font-black text-slate-900 italic">Phase 1</p>
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="h-12 w-full bg-slate-900 rounded-xl overflow-hidden flex space-x-1 p-2 opacity-10">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div key={i} className="h-full bg-white" style={{ width: `${Math.random() * 8 + 2}px` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBooking;
