import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signupSchema, SignupFields } from '../../utils/schemas';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useContext(AuthedUserContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFields>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFields) => {
        try {
            await signup(data);
            toast.success('Account created! Welcome to AirHub! 🛫');
            navigate('/');
        } catch (error: any) {
            toast.error(error?.message || 'Failed to create account.');
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


                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">First Name</label>
                            <input
                                {...register('firstName')}
                                type="text"
                                className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-xs font-medium text-rose-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        {/* Last Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Last Name</label>
                            <input
                                {...register('lastName')}
                                type="text"
                                className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-xs font-medium text-rose-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Username */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                            <input
                            {...register('username')}
                                type="text"
                                className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                            />
                            {errors.username && (
                                <p className="mt-1 text-xs font-medium text-rose-500">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <input
                            {...register('email')}
                                type="email"
                                className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs font-medium text-rose-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Passwords Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                                <input
                                {...register('password')}
                                    type="password"
                                    className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs font-medium text-rose-500">
                                        {errors.password.message}
                                    </p>
                                )}
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