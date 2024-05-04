import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { PrivateHeaderBar } from '../../components';
import axios from 'axios';
import { useAuth } from '../../router/AuthProvider';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  useEffect(() => {
    document.title = 'Login Page';
  }, []);

  if (token) {
    navigate('/staff', { replace: true });
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/employees/login', {
        login: username,
        password: password,
      });
      setToken(response.data.token);
      localStorage.setItem('user', response.data.user);
      localStorage.setItem('role', response.data.role);
      navigate('/staff', { replace: true });
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <PrivateHeaderBar />
      <Container fluid className="mb-3 login-container">
        <label className="mb-3 login-label">Login Page</label>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 login-input" controlId="usernameField">
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 login-input" controlId="passwordField">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Container className="submit-container">
            <Button
              className="login-submit-button mb-3"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Container>
        </Form>
        {error && (
          <Alert variant="danger" className="mb-3">
            Login failed!
          </Alert>
        )}
      </Container>
    </>
  );
};

export default LoginPage;
