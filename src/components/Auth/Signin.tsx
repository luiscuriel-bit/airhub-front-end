import { useEffect, useState, useContext, ChangeEvent, FormEvent } from 'react';
import AuthedUserContext from '../../contexts/AuthedUserContext';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    const { signin } = useContext(AuthedUserContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            await signin(formData);
            navigate('/');
        } catch (error: any) {
            setErrorMessage(error?.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                            Create one for free
                        </Link>
                    </p>
                </div>

                {errorMessage && (
                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                placeholder="tu_usuario"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;