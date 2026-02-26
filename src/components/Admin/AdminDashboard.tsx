import { useEffect, useState } from "react";
import * as adminService from "../../services/adminService";
import { AdminStats } from "../../services/adminService";
import { toast } from 'sonner';

const AdminDashboard = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
            } catch (error: any) {
                toast.error('Failed to load admin statistics');
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading)
        return <div className="animate-pulse flex space-x-4">Loading statistics...</div>;

    if (!stats) return null;
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header>
                <h1 className="text-4xl font-extrabold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-500 mt-2 text-lg">Real-time system performance and metrics.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Flights Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Flights</p>
                    <p className="text-4xl font-black text-blue-600 mt-1">{stats.totalFlights}</p>
                </div>
                {/* Total Bookings Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Bookings</p>
                    <p className="text-4xl font-black text-indigo-600 mt-1">{stats.totalBookings}</p>
                </div>
                {/* Occupancy Rate Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Occupancy</p>
                    <p className="text-4xl font-black text-emerald-600 mt-1">{stats.occupancyRate}%</p>
                </div>
                {/* Revenue Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Revenue</p>
                    <p className="text-4xl font-black text-slate-900 mt-1">
                        ${stats.totalRevenue.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Pie de página informativo */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
                <p className="text-blue-800 font-medium">
                    🔍 Tip: These metrics are calculated from all scheduled, completed, and delayed flights.
                </p>
            </div>
        </div>
    );
};
export default AdminDashboard;