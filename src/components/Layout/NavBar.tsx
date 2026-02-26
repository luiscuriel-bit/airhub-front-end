import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const NavBar = () => {
    const { user, signout } = useContext(AuthedUserContext);

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        AirHub
                    </Link>

                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <>
                                <Link to="/auth/signin" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    Sign In
                                </Link>
                                <Link to="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-shadow shadow-sm font-medium">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-6">
                                <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/bookings" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    Bookings
                                </Link>
                                <Link to="/profile" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    Profile
                                </Link>

                                {user.role === 'admin' && (
                                    <>
                                        <Link to="/admin/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors border-l border-slate-200 pl-4">
                                            Analytics
                                        </Link>
                                        <Link to="/flights/new" className="text-slate-600 hover:text-blue-600 font-medium transition-colors border-l border-slate-200 pl-4">
                                            Create Flight
                                        </Link>
                                        <Link to="/flights" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                            Flights
                                        </Link>
                                    </>
                                )}

                                <button
                                    onClick={signout}
                                    className="text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-md font-medium transition-all"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
