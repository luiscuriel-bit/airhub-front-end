import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useContext(AuthedUserContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.passwordConfirmation) {
            setErrorMessage("Passwords don't match!");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            await signup(formData);
            navigate('/');
        } catch (error: any) {
            setErrorMessage(error || 'An error occurred during signup.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-xl space-y-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
                <div>
                    <h2 className="text-center text-4xl font-extrabold tracking-tight text-slate-900">
                        Create your account
                    </h2>
                    <p className="mt-4 text-center text-slate-600">
                        Already have an account?{' '}
                        <Link to="/auth/signin" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>

                {errorMessage && (
                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm text-center font-medium animate-in fade-in zoom-in duration-300">
                        {errorMessage}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                required
                                className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Last Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Last Name</label>
                            <input
                                name="lastName"
                                type="text"
                                required
                                className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Username */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                            <input
                                name="username"
                                type="text"
                                required
                                className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Passwords Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                                <input
                                    name="passwordConfirmation"
                                    type="password"
                                    required
                                    className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                    value={formData.passwordConfirmation}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;