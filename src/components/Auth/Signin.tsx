import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signinSchema, SigninFields } from '../../utils/schemas';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const Signin = () => {
    const navigate = useNavigate();
    const { signin } = useContext(AuthedUserContext);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<SigninFields>({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit = async (data: SigninFields) => {
        try {
            await signin(data);
            toast.success('Welcome back to AirHub! 🛫');
            navigate('/');
        } catch (error: any) {
            toast.error(error?.message || 'Invalid credentials. Please try again.');
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

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                {...register('username')}
                                type="text"
                                className={`block w-full rounded-xl border ${errors.username ? 'border-rose-500 ring-rose-500' : 'border-slate-300'} px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm`}
                                placeholder="your_username"
                            />
                            {errors.username && (
                                <p className="mt-1 text-xs font-medium text-rose-500">{errors.username.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                {...register('password')}
                                type="password"
                                className={`block w-full rounded-xl border ${errors.password ? 'border-rose-500 ring-rose-500' : 'border-slate-300'} px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs font-medium text-rose-500">{errors.password.message}</p>
                            )}
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