import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const Homepage = () => {
    const { user } = useContext(AuthedUserContext);

    return (
        <div className="relative isolate pt-14">
            <div className="text-center">
                {/* Hero Title */}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
                    Travel with <span className="text-blue-600">Confidence</span>, 
                    <br /> Fly with AirHub
                </h1>
                
                {/* Lead Text */}
                <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                    Experience seamless flight management and booking. Whether you're a passenger or an admin, 
                    we've built the ultimate platform for your travel needs.
                </p>

                {/* Main Action Buttons */}
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to="/flights"
                        className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:scale-105"
                    >
                        Search Flights
                    </Link>
                    
                    {!user && (
                        <Link to="/auth/signup" className="text-lg font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-colors">
                            Create an account <span aria-hidden="true">→</span>
                        </Link>
                    )}
                </div>

                {/* Secondary Cards for Logged Users */}
                {user && (
                    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
                        <Link to="/dashboard" className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">Dashboard</h3>
                            <p className="mt-2 text-sm text-slate-500">Manage your active flights and stats</p>
                        </Link>
                        
                        <Link to="/bookings" className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">My Bookings</h3>
                            <p className="mt-2 text-sm text-slate-500">View and manage your flight history</p>
                        </Link>

                        <Link to="/profile" className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">Profile</h3>
                            <p className="mt-2 text-sm text-slate-500">Personalize your flying experience</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;