import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const Signin = ({ setUser }) => {
	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState(false); // This is to know when a form is already being submitted
	const [errorMessage, setErrorMessage] = useState('');
	const [invalidFields, setInvalidFields] = useState({});
	const [touchedFields, setTouchedFields] = useState({}); // Tracks the fields in the form that have been interacted with
	const [formData, setFormData] = useState({});

	const handleChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });
	const handleBlur = event => setTouchedFields({ ...touchedFields, [event.target.name]: true });

	const isFormInvalid = () => {
		if (Object.keys(formData).length) {
			const validations = {};

			if (!formData.username?.trim()) {
				validations.username = 'Username is required';
			}

			if (!formData.password) {
				validations.password = 'Password is required';
			}

			setInvalidFields(validations);
		}
	};

	const handleSubmit = async event => {
		event.preventDefault();

		if (Object.keys(invalidFields).length) return;
		setIsSubmitting(true);

		try {
			const user = await authService.signin(formData);
			setUser(user);
			navigate('/');
		} catch (error) {
			// This catches amy error that could come from authService
			setErrorMessage(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(isFormInvalid, [formData]);

	return (
		<div className="container my-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Sign In</h2>

							{errorMessage && (
								<div className="alert alert-danger text-center" role="alert">
									{errorMessage}
								</div>
							)}

							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="username" className="form-label">Username</label>
									<input
										type="text"
										id="username"
										name="username"
										className={`form-control ${touchedFields.username && invalidFields.username ? 'is-invalid' : ''}`}
										value={formData.username}
										onChange={handleChange}
										onBlur={handleBlur}
										required
									/>
									{touchedFields.username && invalidFields.username && (
										<div className="invalid-feedback">{invalidFields.username}</div>
									)}
								</div>

								<div className="mb-3">
									<label htmlFor="password" className="form-label">Password</label>
									<input
										type="password"
										id="password"
										name="password"
										className={`form-control ${touchedFields.password && invalidFields.password ? 'is-invalid' : ''}`}
										value={formData.password}
										onChange={handleChange}
										onBlur={handleBlur}
										required
									/>
									{touchedFields.password && invalidFields.password && (
										<div className="invalid-feedback">{invalidFields.password}</div>
									)}
								</div>

								<div className="d-grid gap-2">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={Object.keys(invalidFields).length || isSubmitting}
									>
										{isSubmitting ? 'Signing in...' : 'Sign In'}
									</button>
									<Link to="/" className="btn btn-secondary">Cancel</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;