import { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';
import * as authService from '../../services/authService';

const EditProfile = () => {
    const { user, setUser } = useContext(AuthedUserContext);
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const navigate = useNavigate();

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const updatedUser = await authService.updateUser(formData);
            setUser(updatedUser);
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
            setTimeout(() => navigate('/profile'), 1500);
        } catch (error: any) {
            setStatus({ type: 'error', message: error?.message || 'Failed to update profile.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-4xl font-extrabold text-slate-900">Edit Profile</h1>
                <p className="text-slate-500 mt-2 text-lg">Keep your personal details up to date.</p>
            </header>

            {status.message && (
                <div className={`p-4 rounded-2xl text-sm font-bold text-center ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                        <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                        <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                    <input name="username" value={formData.username} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700 bg-slate-50" />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700" />
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
