import React, { useContext } from 'react';
import { AuthedUserContext } from '../../App';

const ProfilePage = () => {
    const { user } = useContext(AuthedUserContext);

    if (!user) {
        return <p>You need to log in to view your profile.</p>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Profile</h1>
            <p>Manage your account information here.</p>
            <div style={{ marginTop: '2rem' }}>
                <h2>Your Information</h2>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div style={{ marginTop: '2rem' }}>
                <h2>Actions</h2>
                <button style={{ marginRight: '1rem' }}>Edit Profile</button>
                <button>Change Password</button>
            </div>
        </div>
    );
};

export default ProfilePage