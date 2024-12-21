import { createContext, useState } from 'react';
import './App.css';
import * as authService from './services/authService';
import { Link, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup/Signup';
import { Signin } from './pages/Signin/Signin';
import Dashboard from './components/Dashboard/Dashboard';
import Homepage from './components/Homepage/Homepage';
import ManageBookings from './pages/Bookings/ManageBookings';
import ProfilePage from './pages/ProfilePage/ProfilePage'; // Import ProfilePage
import EditProfile from './components/EditProfile'

export const AuthedUserContext = createContext({ user: null, token: null });

const App = () => {
    const [user, setUser] = useState(authService.getUser());
    const [token, setToken] = useState(localStorage.getItem('token')); // Ensures revalidation for conditional rendering

    const handleSignout = () => {
        authService.signout();
        setUser(null);
        setToken(null); // Clear the token state
        localStorage.removeItem('token'); // Ensure the token is fully cleared
    };

    return (
        <AuthedUserContext.Provider value={{ user, token }}>
            <nav>
                <Link to="/">Home</Link>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/bookings">Manage Bookings</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleSignout}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/auth/signin">Sign In</Link>
                        <Link to="/auth/signup">Sign Up</Link>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/auth/signup" element={<Signup setUser={setUser} />} />
                <Route path="/auth/signin" element={<Signin setUser={setUser} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookings" element={<ManageBookings />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<EditProfile />} />
            </Routes>
        </AuthedUserContext.Provider>
    );
};

export default App;