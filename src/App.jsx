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
import SearchFlight from './components/SearchFlight/SearchFlight';
import EditProfile from './components/EditProfile/EditProfile'


export const AuthedUserContext = createContext({ user: null, token: null });

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };


  return (
    <AuthedUserContext.Provider value={{ user }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">AirHub</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <SearchFlight />
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth/signin">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth/signup">Sign Up</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button className="btn btn-outline-danger" onClick={handleSignout}>Sign Out</button>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/bookings">Bookings</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/flights/new">Create Flight</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/signup" element={<Signup setUser={setUser} />} />
          <Route path="/auth/signin" element={<Signin setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<ManageBookings />} />
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
