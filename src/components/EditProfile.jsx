import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../App';
import * as authService from '../services/authService'; // Update this if needed for your services

const EditProfile = () => {
  const { user, token } = useContext(AuthedUserContext);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [passwordFormData, setPasswordFormData] = useState({ oldPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const navigate = useNavigate();

  // Prepopulate form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // Handle input changes for profile form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle input changes for password form
  const handlePasswordChange = (e) => {
    setPasswordFormData({ ...passwordFormData, [e.target.name]: e.target.value });
  };

  // Handle profile update submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const updatedUser = await authService.updateUser(formData, token);
      navigate('/profile'); // Redirect back to profile page after update
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle password change submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordSubmitting(true);
    setPasswordError('');

    try {
      await authService.changePassword(passwordFormData, token);
      alert('Password changed successfully.');
      setPasswordFormData({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setPasswordError(err.message || 'Failed to change password.');
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  if (!user) {
    return <p>You need to log in to edit your profile.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleProfileSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>Change Password</h2>
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      <form onSubmit={handlePasswordSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={passwordFormData.oldPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordFormData.newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" disabled={isPasswordSubmitting}>
          {isPasswordSubmitting ? 'Saving...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;