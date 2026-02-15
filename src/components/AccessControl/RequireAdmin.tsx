import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthedUserContext from '../../contexts/AuthedUserContext';

const RequireAdmin = () => {
    const { user } = useContext(AuthedUserContext);

    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default RequireAdmin;
