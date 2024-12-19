import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <h1>AirHub</h1>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <Link to="/auth/signin">Sign In</Link>
                <Link to="/auth/signup">Sign Up</Link>
            </ul>
        </nav>
    );
};

export default Navbar;