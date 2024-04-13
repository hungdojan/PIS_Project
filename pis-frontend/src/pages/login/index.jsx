import { useEffect } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login Page';
  }, []);
  return <div className="login-container">This is a login page</div>;
};

export default LoginPage;
