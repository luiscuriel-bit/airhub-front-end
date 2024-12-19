import React from 'react';

const Dashboard = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <p>Welcome back, User!</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                <div>
                    <h2>Your Bookings</h2>
                    <p>Display user's bookings here...</p>
                </div>
                <div>
                    <h2>Previous Flights</h2>
                    <p>Display previous flights here...</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;