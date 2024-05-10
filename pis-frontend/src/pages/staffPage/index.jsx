import './StaffPage.css';
// import './OrdersPage.css';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap'; // Import ListGroup, Button, and Card
import FoodOrders from './FoodOrders';
import OrdersPageView from './OrdersPageView';
import { TableReservationsList } from './TableReservationList';
import { CreateTableReservations } from './TableReservations';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../router/AuthProvider';

// =========== MAIN STUFF VIEW ===========
const StaffPage = () => {
  const { token } = useAuth();
  useEffect(() => {
    document.title = 'Staff page';
  }, []);

  const [activeNavItem, setActiveNavItem] = useState('staff-create-food-order');

  const handleNavItemClick = (eventKey) => {
    setActiveNavItem(eventKey);
  };

  const renderActiveComponent = () => {
    switch (activeNavItem) {
      case 'staff-create-food-order':
        return <OrdersPageView />;
      case 'staff-get-food-reservations':
        return <FoodOrders />;
      case 'staff-get-table-reservations':
        return <TableReservationsList />;
      case 'staff-create-table-reservations':
        return <CreateTableReservations />;
      default:
        return null;
    }
  };
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

  return (
    <>
      {/* <PrivateHeaderBar /> */}

      <Container fluid>
        <Row>
          <StaffSidebar
            handleNavItemClick={handleNavItemClick}
            activeNavItem={activeNavItem}
          />
          <Col className="staff-view">{renderActiveComponent()}</Col>
        </Row>
      </Container>
    </>
  );
};

const StaffSidebar = ({
  handleNavItemClick = () => {},
  activeNavItem = '',
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here
    // For example, redirect the user to the logout endpoint
    navigate('/logout');
  };

  const role = localStorage.getItem('role');
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
        <span className="fs-4">Staff</span>
      </a>
      <hr />

      <Nav
        variant="pills"
        defaultActiveKey={activeNavItem}
        className="mt-3"
        onSelect={handleNavItemClick}
      >
        <Nav.Item>
          <Nav.Link eventKey="staff-create-food-order">
            Create Food Order
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="staff-get-food-reservations">
            Food orders list
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="staff-create-table-reservations">
            Reserve Table
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="staff-get-table-reservations">
            Table Reservations List
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      {role === 'manager' && (
        <Button
          className="mb-2"
          variant="primary"
          onClick={() => navigate('/staff/manager')}
        >
          Manager page
        </Button>
      )}
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

//============== FOOD RESERVATIONS ==============

export default StaffPage;
