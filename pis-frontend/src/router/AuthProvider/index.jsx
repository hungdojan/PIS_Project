/*
   The original source to this code can be found at:
   https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */
import axios from 'axios';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem('token'));

  const setToken = (newToken) => {
    _setToken(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
