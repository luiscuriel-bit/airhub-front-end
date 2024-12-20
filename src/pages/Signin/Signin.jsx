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
        const validations = {};

        if (!formData.username?.trim()) {
            validations.username = 'Username is required';
        }

        if (!formData.password) {
            validations.password = 'Password is required';
        }

        setInvalidFields(validations);
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

    return <>
        <main>
            <h2>Sign In</h2>
            <form className="signin-form" onSubmit={handleSubmit}>
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
                {errorMessage && (
                    <div className='errorMessage' role='alert'>
                        {errorMessage}
                    </div>
                )}
                <div>
                    <button disabled={Object.keys(invalidFields).length || isSubmitting}>Sign In</button>
                    <Link to="/" className='cancel-button'>Cancel</Link>
                </div>
            </form>
        </main>
    </>
};

export { Signin };