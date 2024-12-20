import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

const Homepage = () => {
    const { user } = useContext(AuthedUserContext);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to AirHub</h1>
            <p>Your ultimate destination for seamless travel booking and management.</p>

            <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Link to="/flights">
                    <button>View Flights</button>
                </Link>
                {user ? (
                    <>
                        <Link to="/dashboard">
                            <button>Go to Dashboard</button>
                        </Link>
                        <Link to="/bookings">
                            <button>Manage Bookings</button>
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

            <section style={{ marginTop: '3rem' }}>
                <h2>Upcoming Flights</h2>
                <p>Explore exciting destinations and travel deals!</p>
                {/* Replace this section with dynamic flight content in the future */}
                <p style={{ fontStyle: 'italic', color: 'gray' }}>Flight highlights coming soon...</p>
            </section>
        </div>
    );
};

export default Homepage;