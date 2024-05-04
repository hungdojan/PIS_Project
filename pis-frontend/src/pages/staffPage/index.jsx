import './StaffPage.css';
// import './OrdersPage.css';
import axios from 'axios'; // Import Axios
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  DropdownButton,
  Dropdown,
  ListGroup,
  Button,
  Card,
  Form,
} from 'react-bootstrap'; // Import ListGroup, Button, and Card
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaRegCircleXmark, FaRegCircleCheck } from 'react-icons/fa6';
import PrivateHeaderBar from '../../components/privateHeaderBar';
import FoodOrders from './FoodOrders';
import OrdersPageView from './OrdersPageView';
import TableOrders from './TableOrders';
import { TableReservationsList } from './TableReservationList';
import { CreateTableReservations } from './TableReservations';
// =========== MAIN STUFF VIEW ===========
const StaffPage = () => {
  useEffect(() => {
    document.title = 'Staff page';
  }, []);

  const role = localStorage.getItem('role');
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
  const handleLogout = () => {
    // Add your logout logic here
    // For example, redirect the user to the logout endpoint
    window.location.href = '/logout';
  };
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
        <span className="fs-4">Sidebar</span>
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

//============== FOOD RESERVATIONS ==============

export default StaffPage;
