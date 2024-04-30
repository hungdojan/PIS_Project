import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login Page';
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validate = () => {
    return username === 'admin' && password === 'admin';
  };

  const handleSubmit = (event) => {
    if (validate() === false) {
      event.preventDefault();
      setError(true);
    } else {
      navigate('/');
    }
  };
  return (
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
  );
};

export default LoginPage;
