import { createContext, useState } from 'react';
import './App.css';
import * as authService from './services/authService';
import { Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup/Signup';
import { Signin } from './pages/Signin/Signin';
import { NewFlight } from './pages/Flights/NewFlight/NewFlight';
import Dashboard from './components/Dashboard/Dashboard';
import Homepage from './components/Homepage/Homepage';
import ManageBookings from './pages/Bookings/ManageBookings';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { Link } from 'react-router-dom';

export const AuthedUserContext = createContext(null); // Set the initial value of the context to null

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={{user}}>
      <Link to="/auth/signin">Sign In</Link>
      <Link to="/auth/signup">Sign Up</Link>
      {user && <button onClick={handleSignout}>Sign Out</button>} 

      {user ? <p>Signed in</p> : <p>Not signed in</p>}


            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/auth/signup" element={<Signup setUser={setUser} />} />
                <Route path="/auth/signin" element={<Signin setUser={setUser} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookings" element={<ManageBookings />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path='/flights/new' element={<NewFlight />}></Route>
            </Routes>
        </AuthedUserContext.Provider>
    );
};

export default App;

/* token is now part of useState variable so it can update dynamically.
added logic so that handleSignout clears user and token.
"Sign Out will only show if the user is authenticated" <- From chatGPT*/