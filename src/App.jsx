import { createContext, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as authService from './services/authService';
import Homepage from './components/Homepage/Homepage';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Dashboard from './components/Dashboard/Dashboard';
import ManageBookings from './pages/Bookings/ManageBookings';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FlightList from './pages/Flights/FlightList/FlightList';
import NewFlight from './pages/Flights/NewFlight/NewFlight';
import EditFlight from './pages/Flights/EditFlight/EditFlight';
import ShowFlight from './pages/Flights/ShowFlight/ShowFlight';
import EditProfile from './components/EditProfile/EditProfile'
import ShowBooking from './components/Booking/ShowBooking';
import NavBar from './components/NavBar/NavBar';
import SearchFlight from './components/SearchFlight/SearchFlight';


export const AuthedUserContext = createContext({ user: null, token: null });

const App = () => {
	const [user, setUser] = useState(authService.getUser());

	const handleSignout = () => {
		authService.signout();
		setUser(null);
	};


	return (
		<AuthedUserContext.Provider value={{ user }}>
			<NavBar handleSignout={handleSignout} />
			<SearchFlight />
			<div className="container mt-4">
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/auth/signup" element={<Signup setUser={setUser} />} />
					<Route path="/auth/signin" element={<Signin setUser={setUser} />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/bookings" element={<ManageBookings />} />
					<Route path="/bookings/:bookingId" element={<ShowBooking />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/flights" element={<FlightList />} />
					<Route path='/flights/new' element={<NewFlight />}></Route>
					<Route path="/profile/edit" element={<EditProfile />} />
					<Route path='/flights/:flightId/edit' element={<EditFlight />}></Route>
					<Route path="/flights/:flightId" element={<ShowFlight />} />

				</Routes>
			</div>
		</AuthedUserContext.Provider>
	);
};

export default App;
