import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const RequireAuth = () => {
    const { user } = useContext(AuthedUserContext);
    const location = useLocation();

    return user ? <Outlet /> : <Navigate to="/auth/signin" state={{ from: location }} replace />;
};

export default RequireAuth;
