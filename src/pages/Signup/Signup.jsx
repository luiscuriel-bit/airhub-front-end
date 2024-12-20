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

    return <>
        <main>
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby='firstName-error'
                        required
                    />
                    {touchedFields.firstName && invalidFields.firstName && (
                        <span id='firstName-error' role='alert'>{invalidFields.firstName}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby='lastName-error'

                        required
                    />
                    {touchedFields.lastName && invalidFields.lastName && (
                        <span id='lastName-error' role='alert'>{invalidFields.lastName}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby='username-error'
                        required
                    />
                    {touchedFields.username && invalidFields.username && (
                        <span id='username-error' role='alert'>{invalidFields.username}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby='email-error'
                        required
                    />
                    {touchedFields.email && invalidFields.email && (
                        <span id='email-error' role='alert'>{invalidFields.email}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby='password-error'
                        required
                    />
                    {touchedFields.password && invalidFields.password && (
                        <span id='password-error' role='alert'>{invalidFields.password}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Confirm password</label>
                    <input
                        type='password'
                        id='passwordConfirmation'
                        name='passwordConfirmation'
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        aria-describedby='passwordConfirmation-error'
                        required
                    />
                    {touchedFields.password && invalidFields.passwordConfirmation && (
                        <span id='passwordConfirmation-error' role='alert'>{invalidFields.passwordConfirmation}</span>
                    )}
                </div>
                {errorMessage && (
                    <div className='errorMessage' role='alert'>
                        {errorMessage}
                    </div>
                )}
                <div>
                    <button disabled={Object.keys(invalidFields).length || isSubmitting}>Sign Up</button>
                    <Link to="/" className='cancel-button'>Cancel</Link>
                </div>
            </form>
        </main>
    </>
};

export { Signup };