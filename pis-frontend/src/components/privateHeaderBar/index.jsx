import './PrivateHeaderBar.css';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { FaHamburger } from 'react-icons/fa';
import { FaRightFromBracket } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrivateHeaderBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [_, setNavbarHeight] = useState(0);
  const [role, setRole] = useState('');

  useEffect(() => {
    // TODO
    const _role = localStorage.getItem('role');
    if (_role === null) {
      setRole('user');
    } else {
      setRole(_role);
    }

    // Measure the navbar height on component mount and window resize
    function handleResize() {
      const navbar = document.querySelector('.navbar-menu');
      if (navbar) {
        // Padding to keep the size of the fixed navbar (-1 to suppress the gap)
        setNavbarHeight(navbar.offsetHeight - 1);
      }
    }
    handleResize(); // Call it initially
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogOut = (_) => {
    navigate('/logout');
  };

  return (
    <>
      <Navbar bg="dark" expand="md" className="navbar-menu fixed-top">
        <Navbar.Brand as={Link} to="/">
          Restaurant <FaHamburger className="private icon" />
        </Navbar.Brand>
        <Navbar id="basic-navbar-nav" className="buttons-private-bar">
          <Nav>
            {role === 'user' && <></>}

            {role === 'admin' && (
              <>
                <Nav.Link
                  as={Link}
                  to="/manage-users"
                  className={
                    location.pathname === '/manage-users'
                      ? 'active nav-link'
                      : 'nav-link'
                  }
                >
                  Manage Users
                </Nav.Link>
              </>
            )}

            {role === 'staff' && (
              <>
                <Nav.Link
                  as={Link}
                  to="/orders"
                  className={
                    location.pathname === '/orders'
                      ? 'active nav-link'
                      : 'nav-link'
                  }
                >
                  Orders
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>

        {role !== 'user' && (
          <Nav className="nav-login">
            <Nav.Link className="nav-link" onClick={handleLogOut}>
              <FaRightFromBracket />
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default PrivateHeaderBar;
