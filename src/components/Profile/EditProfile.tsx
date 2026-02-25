import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { profileSchema } from '../../utils/schemas';
import { ProfileFields } from '../../utils/schemas';
import { useNavigate } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';
import * as authService from '../../services/authService';

const EditProfile = () => {
    const { user, setUser } = useContext(AuthedUserContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFields>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: user?.username || '',
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
        }
    })

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })
        }
    }, [user, reset])

    const navigate = useNavigate();

    const onSubmit = async (data: ProfileFields) => {
        try {
            const updatedUser = await authService.updateUser(data);
            setUser(updatedUser);
            toast.success('Profile updated successfully!')
            setTimeout(() => navigate('/profile'), 1500);
        } catch (error: any) {
            toast.error(error?.message || 'Failed to update profile.');
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-4xl font-extrabold text-slate-900">Edit Profile</h1>
                <p className="text-slate-500 mt-2 text-lg">Keep your personal details up to date.</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                        <input
                            {...register('firstName')}
                            type="text"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700"
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-xs font-medium text-rose-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                        <input 
                        {...register('lastName')}
                        type="text"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700" 
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-xs font-medium text-rose-500">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                    <input 
                    {...register('username')}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700 bg-slate-50" />
                    {errors.username && (
                        <p className="mt-1 text-xs font-medium text-rose-500">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input 
                    {...register('email')}
                    type="email"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700" />
                    {errors.email && (
                        <p className="mt-1 text-xs font-medium text-rose-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving changes...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                        className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
