/*
  The original source of this code is here:
  https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

export const ProtectedRoute = ({ ignoreAuth = false }) => {
  const { token } = useAuth();

  if (!ignoreAuth && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
