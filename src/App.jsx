import { createContext, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
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
import SearchFlight from './components/SearchFlight/SearchFlight';


export const AuthedUserContext = createContext(null); // Set the initial value of the context to null

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={{ user }}>
      <nav>
        <Link to="/">Home</Link>
        <div>
          <SearchFlight />
        </div>
        {!user && (
          <>
            <div>
              <Link to="/auth/signin">Sign In</Link>
            </div>
            <div>
              <Link to="/auth/signup">Sign Up</Link>
            </div>
          </>
        )}
        {user && (
          <>
            <button onClick={handleSignout}>Sign Out</button>
            <div>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div>
              <Link to="/bookings">Bookings</Link>
            </div>
            <div>
              <Link to="/profile">Profile</Link>
            </div>
            <div>
              <Link to="/flights/new">Create Flight</Link>
            </div>
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
        <Route path="/flights" element={<FlightList />} />
        <Route path='/flights/new' element={<NewFlight />}></Route>
        <Route path='/flights/:flightId/edit' element={<EditFlight />}></Route>
        <Route path="/flights/:flightId" element={<ShowFlight />} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;
