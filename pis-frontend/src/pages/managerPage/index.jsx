import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Nav, Container, Row, Col, Button } from 'react-bootstrap';
import './ManagerPage.css';
import { Expenses } from './ExpensesDashboard';
import FoodPricing from './FoodPricing';
import ManageRoomsDashboard from './RoomReservation';
import axios from 'axios';
import { useAuth } from '../../router/AuthProvider';

// =========== MAIN MANAGER VIEW ===========
const ManagerDashboard = () => {
  const { token } = useAuth();
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

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
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
    </div>
  );
};

export default ManagerDashboard;
