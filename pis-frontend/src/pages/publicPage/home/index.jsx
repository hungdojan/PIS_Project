import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  const [data, setData] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    document.title = 'Home page';
    axios
      .get(`/api/hello`)
      .then((response) => {
        setData(response.data?.hello);
      })
      .catch(() => {
        // nothing
      });
    const _role = localStorage.getItem('role');
    if (_role !== null) {
      setRole(_role);
    } else {
      setRole('user');
    }
  }, []);

  const renderAPICall = () => {
    if (data.hello !== undefined) {
      return <h3>Hello {data}</h3>;
    }
    return <h3>API call did not work.</h3>;
  };

  const renderRoleLabel = () => {
    return <p>I'm {role}</p>;
  };

  const renderRoleButtons = () => {
    return (
      <>
        <Button
          onClick={() => {
            localStorage.setItem('role', 'staff');
            setRole('staff');
          }}
        >
          Staff
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem('role', 'admin');
            setRole('admin');
          }}
        >
          Admin
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem('role', 'manager');
            setRole('manager');
          }}
        >
          Manager
        </Button>
        <Button
          onClick={() => {
            localStorage.removeItem('role');
            setRole('user');
          }}
        >
          Anonymous user
        </Button>
      </>
    );
  };

  return (
    <>
      <h1>This is a home page.</h1>
      {renderAPICall()}
      {renderRoleLabel()}
      {renderRoleButtons()}
    </>
  );
};

export default HomePage;
