import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

const Homepage = () => {
  const { user } = useContext(AuthedUserContext);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to AirHub</h1>
      <p>Your ultimate destination for seamless travel booking and management.</p>

      <div style={{ margin: '2rem 0' }}>
        <Link to="/flights">
          <button>Search Flights</button>
        </Link>
        {user ? (
          <>
            <Link to="/dashboard">
              <button>Dashboard</button>
            </Link>
            <Link to="/bookings">
              <button>My Bookings</button>
            </Link>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/auth/signin">
              <button>Sign In</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;