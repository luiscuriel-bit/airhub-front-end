import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const ProfilePage = () => {
    const { user } = useContext(AuthedUserContext);
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                
                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6">
                        <div className="h-24 w-24 bg-white rounded-2xl p-1 shadow-lg">
                            <div className="h-full w-full bg-slate-100 rounded-xl flex items-center justify-center text-3xl font-black text-blue-600">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900">{user.firstName} {user.lastName}</h1>
                            <p className="text-slate-500 font-medium">@{user.username}</p>
                        </div>
                        <button
                            onClick={() => navigate('/profile/edit')}
                            className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1 border-l-2 border-slate-100 pl-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                            <p className="text-slate-700 font-semibold">{user.email || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1 border-l-2 border-slate-100 pl-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Type</p>
                            <p className="text-blue-600 font-bold uppercase text-xs bg-blue-50 px-2 py-1 rounded inline-block">
                                {user.role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="text-center mt-6 text-slate-400 text-sm">
                Member since {new Date().getFullYear()} • AirHub Account
            </p>
        </div>
    );
};

export default ProfilePage;
