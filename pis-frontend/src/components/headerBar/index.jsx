import './HeaderBar.css';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import {FaHamburger, FaUser} from "react-icons/fa";


const HeaderBar = () => {
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
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

  return (
    <>
      <Navbar bg="dark" expand="md" className="navbar-menu fixed-top">
        <Navbar.Brand as={Link} to="/">Restaurant <FaHamburger className="icon"/></Navbar.Brand>
        <Navbar id="basic-navbar-nav" className="buttons-bar">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active nav-link' : 'nav-link'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/menu" className={location.pathname === '/menu' ? 'active nav-link' : 'nav-link'}>Menu</Nav.Link>
            {/* <Nav.Link as={Link} to="/reservation" className={location.pathname === '/reservation' ? 'active nav-link' : 'nav-link'}>Reservation</Nav.Link> */}
            <Nav.Link as={Link} to="/about" className={location.pathname === '/about' ? 'active nav-link' : 'nav-link'}>About</Nav.Link>
          </Nav>
        </Navbar>
        <Nav className="nav-login">
          <Nav.Link href="/login" className="nav-link"><FaUser/></Nav.Link>
        </Nav>
      </Navbar>

        <div style={{ paddingTop: navbarHeight }}>
      </div>
    </>
  );
}

export default HeaderBar;