import React from 'react';
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Welcome to Airhub</h1>
            <p>Your one-stop platform for booking flights and managing reservations.</p>
            <div style={{ marginTop: '2rem' }}>
                <Link to="/login" style={{ margin: '1rem', textDecoration: 'none' }}>
                <button>Login</button>
                </Link>
                <Link to="signup" style={{ margin: '1rem', textDecoration: 'none' }}>
                <button>Sign Up</button>
                </Link>

            </div>
            </div>

    );
};

export default HomePage;