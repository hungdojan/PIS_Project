/*
  The original source of this code is here:
  https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */
import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthProvider';
import axios from 'axios';

export const ProtectedRoute = ({ ignoreAuth = false }) => {
  const { token } = useAuth();
  const [redirect, setRedirect] = useState(<Outlet />);

  if (!ignoreAuth && !token) {
    return <Navigate to="/login" />;
  } else {
    // axios
    //   .post('/api/employees/validate')
    //   .then((resp) => {
    //     setRedirect(<Outlet />);
    //   })
    //   .catch((err) => {
    //     setRedirect(<Navigate to="/login"/>);
    //   });
  }

  return redirect;
};
