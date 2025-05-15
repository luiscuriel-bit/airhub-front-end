import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';
import * as authService from '../../services/authService';
import logError from '../../utils/logError';

const EditProfile = () => {
    const { user, setUser } = useContext(AuthedUserContext);
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
            newErrors.email = 'Email is invalid';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            const firstErrorField = Object.keys(validationErrors)[0];
            const firstErrorInput = document.querySelector(`[name="${firstErrorField}"]`);
            if (firstErrorInput) {
                firstErrorInput.focus();
            }
            return;
        }

        setIsSubmitting(true);
        try {
            const updatedUser = await authService.updateUser(formData);
            setUser(updatedUser);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => {
                navigate('/profile');
            }, 1000);
            setIsSubmitting(false);
        } catch (error) {
            logError('Failed to update profile.', error);
        }
    }

    if (!user) {
        return <div className="alert alert-warning text-center">You need to log in to edit your profile.</div>;
    }

    return (
        <div className='container py-5'>
            <h1>Edit Profile</h1>
            {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );

};

export default EditProfile;