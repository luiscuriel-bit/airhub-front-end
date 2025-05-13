import AuthProvider from './contexts/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Layout/Homepage';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import Dashboard from './components/Dashboard/Dashboard';
import ManageBookings from './pages/Bookings/ManageBookings';
import ProfilePage from './components/Profile/ProfilePage';
import FlightList from './pages/Flights/FlightList';
import NewFlight from './pages/Flights/NewFlight';
import EditFlight from './pages/Flights/EditFlight';
import ShowFlight from './pages/Flights/ShowFlight';
import EditProfile from './components/Profile/EditProfile';
import ShowBooking from './components/Booking/ShowBooking';
import NavBar from './components/Layout/NavBar';
import RequireAuth from './components/AccessControl/RequireAuth';
import RequireAdmin from './components/AccessControl/RequireAdmin';
import RedirectIfAuthed from './components/Auth/RedirectIfAuthed';

const App = () => {
    return (
        <AuthProvider>
            <NavBar />
            <div className='container mt-4'>
                <Routes>

                    <Route element={<RedirectIfAuthed />}>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/auth/signup" element={<Signup />} />
                        <Route path="/auth/signin" element={<Signin />} />
                    </Route>

                    <Route element={<RequireAuth />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/bookings" element={<ManageBookings />} />
                        <Route path="/bookings/:bookingId" element={<ShowBooking />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile/edit" element={<EditProfile />} />

                        <Route element={<RequireAdmin />}>
                            <Route path="/flights/new" element={<NewFlight />} />
                            <Route path="/flights/:flightId/edit" element={<EditFlight />} />
                            <Route path="/flights" element={<FlightList />} />
                        </Route>
                    </Route>

                    <Route path="/flights/:flightId" element={<ShowFlight />} />
                </Routes>
            </div>
        </AuthProvider>
    );
};

export default App;
