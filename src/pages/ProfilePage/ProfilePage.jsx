import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

const ProfilePage = () => {
    const { user } = useContext(AuthedUserContext);
    const navigate = useNavigate(); // Allows navigation to the Edit Profile page

    return (
        <div className="container my-4">
            <div className="card shadow">
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">Profile</h1>
                    <p className="card-text text-center">Manage your account information here.</p>

                    <hr />

                    <div className="mt-4">
                        <h2>Your Information</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Username:</strong> {user.username}</li>
                            <li className="list-group-item"><strong>First Name:</strong> {user.firstName}</li>
                            <li className="list-group-item"><strong>Last Name:</strong> {user.lastName || 'Not available'}</li>
                            <li className="list-group-item"><strong>Email:</strong> {user.email || 'Not available'}</li>
                            <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
                        </ul>
                    </div>

                    <div className="mt-4 text-center">
                        <h2>Actions</h2>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => navigate('/profile/edit')}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;