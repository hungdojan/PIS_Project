import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink,
  Form,
  Dropdown,
  DropdownButton,
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import './ManagerPage.css';
import { FaTrash } from 'react-icons/fa';
import FoodPricing from './FoodPricing';
import ManageRoomsDashboard from './RoomReservation';

// =========== MAIN MANAGER VIEW ===========
const ManagerDashboard = () => {
  useEffect(() => {
    document.title = 'Manager page';
  }, []);

  const [activeNavItem, setActiveNavItem] = useState(
    'manager-room-reservations'
  );

  // check role permissions
  const role = localStorage.getItem('role');
  if (role !== 'manager') {
    return <Navigate to="/staff" />;
  }

  const handleNavItemClick = (eventKey) => {
    setActiveNavItem(eventKey);
  };

  const renderActiveComponent = () => {
    switch (activeNavItem) {
      case 'manager-room-reservations':
        return <ManageRoomsDashboard />;
      case 'manager-expenses-dashboard':
        return <Expenses />;
      case 'manager-expenses-pricing':
        return <FoodPricing />;
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Sidebar
          handleNavItemClick={handleNavItemClick}
          activeNavItem={activeNavItem}
        />
        <Col className="manager-view">{renderActiveComponent()}</Col>
      </Row>
    </Container>
  );
};

const Sidebar = ({ handleNavItemClick = () => {}, activeNavItem = '' }) => {
  const handleLogout = () => {
    // Add your logout logic here
    // For example, redirect the user to the logout endpoint
    window.location.href = '/logout';
  };
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: '280px', height: '100vh' }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">Manager</span>
      </a>
      <hr />

      <Nav
        variant="pills"
        defaultActiveKey={activeNavItem}
        className="mt-3"
        onSelect={handleNavItemClick}
      >
        <Nav.Item>
          <Nav.Link eventKey="manager-room-reservations">
            Room reservations & tables
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="manager-expenses-dashboard">
            Expenses Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="manager-expenses-pricing">
            Manage food & prices
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      <Button
        className="mb-2"
        variant="primary"
        onClick={() => navigate('/staff')}
      >
        Staff page
      </Button>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>

      {/* <DropdownButton
          id="dropdownUser2"
          title={
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
          }
        >
          <Dropdown.Item href="#">New project...</Dropdown.Item>
          <Dropdown.Item href="#">Settings</Dropdown.Item>
          <Dropdown.Item href="#">Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Sign out</Dropdown.Item>
        </DropdownButton> */}
    </div>
  );
};

// =========== VIEW 2 ===========
const Expenses = () => {
  return (
    <Container fluid>
      {/* First row with 4 elements */}
      <Row className="mb-3">
        <Col>Element 1</Col>
        <Col>Element 2</Col>
        <Col>Element 3</Col>
        <Col>Element 4</Col>
      </Row>
      {/* Second row with 2 elements */}
      <Row className="mb-3">
        <Col md={9}>Element 5</Col>
        <Col md={3}>Element 6</Col>
      </Row>
      {/* Third row with 3 elements */}
      <Row>
        <Col md={6}>Element 7</Col>
        <Col md={3}>Element 8</Col>
        <Col md={3}>Element 9</Col>
      </Row>
    </Container>
  );
};

export default ManagerDashboard;
