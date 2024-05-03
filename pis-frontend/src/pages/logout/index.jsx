import { Navigate } from 'react-router-dom';
import { useAuth } from '../../router/AuthProvider';

const Logout = () => {
  const { setToken } = useAuth();

  setToken();
  localStorage.removeItem('user');
  localStorage.setItem('role', 'user');
  return <Navigate to="/" />;
};

export default Logout;
