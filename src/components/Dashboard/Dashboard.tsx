import { useContext, useEffect, useState } from 'react';
import AuthedUserContext from '../../contexts/AuthedUserContext';
import * as bookingService from '../../services/bookingService';
import SearchFlight from '../Flight/SearchFlight';

const Dashboard = () => {
    const { user } = useContext(AuthedUserContext);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await bookingService.getAllBookings();
                setBookings(data);
            } catch (error: any) {
                setError(error?.message || 'Unable to fetch bookings.');
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);

    const handleDeleteBooking = async (bookingId: string) => {
        try {
            await bookingService.deleteBooking(bookingId);
            setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
        } catch (error: any) {
            setError(error?.message || 'Unable to delete booking.');
        }
    };

    return (
        <div className="space-y-10">
            <SearchFlight />
            
            <div className="border-t border-slate-200 pt-10">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Your Bookings</h1>
                        <p className="text-slate-500 mt-1">Manage your upcoming travels and history.</p>
                    </div>
                    <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                        {bookings.length} trips
                    </span>
                </header>

                {loading && <div className="text-center py-10 text-slate-400 animate-pulse">Loading your travels...</div>}
                {error && <div className="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 mb-6">{error}</div>}

                <div className="grid grid-cols-1 gap-4">
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-all group">
                                <div className="flex items-center space-x-6">
                                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
                                        ✈️
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Flight</p>
                                        <p className="text-lg font-bold text-slate-900">{booking.flight?.flightNumber || 'N/A'}</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Seat</p>
                                        <p className="text-lg font-bold text-slate-900">{booking.seatNumber || 'N/A'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteBooking(booking._id)}
                                    className="mt-4 sm:mt-0 text-slate-400 hover:text-rose-600 font-semibold px-4 py-2 rounded-lg hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        ))
                    ) : (
                        !loading && <p className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">No trip history yet. Time to fly!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;