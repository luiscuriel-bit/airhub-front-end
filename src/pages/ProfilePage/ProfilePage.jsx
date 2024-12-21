import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

const ProfilePage = () => {
  const { user } = useContext(AuthedUserContext);
  const navigate = useNavigate(); // Allows navigation to the Edit Profile page

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
        <p><strong>Last Name:</strong> {user.lastName || 'Not available'}</p>
        <p><strong>Email:</strong> {user.email || 'Not available'}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2>Actions</h2>
        {/* Redirects to the Edit Profile page */}
        <button 
          style={{ marginRight: '1rem' }}
          onClick={() => navigate('/profile/edit')}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;