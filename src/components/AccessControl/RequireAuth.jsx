import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthedUserContext  from '../../contexts/AuthedUserContext';

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthedUserContext);

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // If children are provided, render them (for direct wrapping), otherwise render <Outlet /> for nested routes
  return children ? children : <Outlet />;
};

export default RequireAuth;

