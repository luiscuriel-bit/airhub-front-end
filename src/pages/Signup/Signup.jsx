import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const Signup = ({ setUser }) => {
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
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formData.firstName?.trim()) {
                validations.firstName = 'First Name is required';
            }

            if (!formData.lastName?.trim()) {
                validations.lastName = 'Last Name is required';
            }

            if (!formData.username?.trim()) {
                validations.username = 'Username is required';
            }

            if (!formData.email?.trim()) {
                validations.email = 'Email is required';
            }
            else if (formData.email && !emailRegex.test(formData.email)) {
                validations.email = 'Enter a valid email address';
            }

            if (!formData.password) {
                validations.password = 'Password is required';
            } else if (formData.password.length < 6) {
                validations.password = 'Password must be at least 6 characters';
            }

            if (formData.passwordConfirmation && formData.password && formData.passwordConfirmation !== formData.password) {
                validations.passwordConfirmation = 'Passwords must match';
            }

            setInvalidFields(validations);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (Object.keys(invalidFields).length) return;
        setIsSubmitting(true);

        try {
            const newUser = await authService.signup(formData);
            setUser(newUser);
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
                            <h2 className="card-title text-center mb-4">Sign Up</h2>

                            {errorMessage && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className={`form-control ${touchedFields.firstName && invalidFields.firstName ? 'is-invalid' : ''}`}
                                        value={formData.firstName || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {touchedFields.firstName && invalidFields.firstName && (
                                        <div className="invalid-feedback">{invalidFields.firstName}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className={`form-control ${touchedFields.lastName && invalidFields.lastName ? 'is-invalid' : ''}`}
                                        value={formData.lastName || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {touchedFields.lastName && invalidFields.lastName && (
                                        <div className="invalid-feedback">{invalidFields.lastName}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className={`form-control ${touchedFields.username && invalidFields.username ? 'is-invalid' : ''}`}
                                        value={formData.username || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {touchedFields.username && invalidFields.username && (
                                        <div className="invalid-feedback">{invalidFields.username}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-control ${touchedFields.email && invalidFields.email ? 'is-invalid' : ''}`}
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {touchedFields.email && invalidFields.email && (
                                        <div className="invalid-feedback">{invalidFields.email}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`form-control ${touchedFields.password && invalidFields.password ? 'is-invalid' : ''}`}
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {touchedFields.password && invalidFields.password && (
                                        <div className="invalid-feedback">{invalidFields.password}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="passwordConfirmation"
                                        name="passwordConfirmation"
                                        className={`form-control ${touchedFields.passwordConfirmation && invalidFields.passwordConfirmation ? 'is-invalid' : ''}`}
                                        value={formData.passwordConfirmation || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {touchedFields.passwordConfirmation && invalidFields.passwordConfirmation && (
                                        <div className="invalid-feedback">{invalidFields.passwordConfirmation}</div>
                                    )}
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={Object.keys(invalidFields).length || isSubmitting}
                                    >
                                        {isSubmitting ? 'Signing up...' : 'Sign Up'}
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

export default Signup;