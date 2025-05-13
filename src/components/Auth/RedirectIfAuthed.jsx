import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const RedirectIfAuthed = () => {
    const { user } = useContext(AuthedUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return user ? null : <Outlet />;
};

export default RedirectIfAuthed;