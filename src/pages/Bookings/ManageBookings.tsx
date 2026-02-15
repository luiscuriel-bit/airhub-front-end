import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const ManageBookings = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsData = await bookingService.getAllBookings();
                setBookings(bookingsData);
            } catch (error: any) {
                setErrorMessage(error || 'Unable to fetch bookings.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleDelete = async (bookingId: string) => {
        try {
            await bookingService.deleteBooking(bookingId);
            setBookings(prev => prev.filter(booking => booking._id !== bookingId));
            setSuccessMessage('Booking deleted successfully.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error: any) {
            setErrorMessage(error || 'Unable to delete booking.');
        }
    };

    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentBookings = bookings.slice(startIndex, startIndex + entriesPerPage);
    const totalPages = Math.ceil(bookings.length / entriesPerPage);

    if (loading) return <div className="text-center py-20 animate-pulse text-slate-400">Loading your history...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-4xl font-extrabold text-slate-900">Manage Your Bookings</h1>
                <p className="text-slate-500 mt-2 text-lg">Detailed view of your flight schedule and status.</p>
            </header>

            {(errorMessage || successMessage) && (
                <div className={`p-4 rounded-2xl text-sm font-medium text-center ${errorMessage ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {errorMessage || successMessage}
                </div>
            )}

            <div className="space-y-4">
                {bookings.length > 0 ? (
                    currentBookings.map((booking) => (
                        <div key={booking._id} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-blue-200 transition-all shadow-sm">
                            <div className="flex items-center space-x-6">
                                <div className="hidden sm:flex h-14 w-14 bg-slate-50 rounded-2xl items-center justify-center text-2xl">
                                    🎫
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Flight {booking.flight?.flightNumber || 'N/A'}
                                    </h3>
                                    <div className="flex flex-wrap gap-x-4 text-sm text-slate-500">
                                        <span>Seat: <strong className="text-slate-700">{booking.seatNumber}</strong></span>
                                        <span>•</span>
                                        <span>Status: <strong className="text-blue-600 uppercase tracking-tighter">{booking.status}</strong></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex space-x-3">
                                <Link
                                    to={`/bookings/${booking._id}`}
                                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleDelete(booking._id)}
                                    className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
                        No bookings yet. Ready for your next adventure?
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 pt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageBookings;