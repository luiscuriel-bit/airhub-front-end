import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import * as authService from '../../services/authService'; // Update this if needed for your services

const EditProfile = () => {
	const { user } = useContext(AuthedUserContext);
	const [formData, setFormData] = useState({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
	});
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
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


	// Handle profile update submission
	const handleProfileSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');		try {
			const updatedUser = await authService.updateUser(formData);
			navigate('/profile'); // Redirect back to profile page after update
		} catch (err) {
			setError(err.message || 'Failed to update profile.');
		} finally {
			setIsSubmitting(false);
		}
	};


	if (!user) {
		return <p>You need to log in to edit your profile.</p>;
	}

	return (
		<div className="container py-5">
			<h1>Edit Profile</h1>
			{error && <p className="text-danger">{error}</p>}

			{/* Profile Update Form */}
			<form onSubmit={handleProfileSubmit} className="mt-4">
				<div className="mb-3">
					<label htmlFor="username" className="form-label">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						className="form-control"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="firstName" className="form-label">First Name</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						className="form-control"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="lastName" className="form-label">Last Name</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						className="form-control"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						className="form-control"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary" disabled={isSubmitting}>
					{isSubmitting ? 'Saving...' : 'Save Changes'}
				</button>
			</form>

		</div>
	);
};

export default EditProfile;