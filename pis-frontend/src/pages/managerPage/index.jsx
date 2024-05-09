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

// =========== VIEW 1 ===========
function ManageRoomsDashboard() {
  const onSave = (table) => {
    // TODO Handle save logic here
    console.log('Saving table:', table);
  };

  const handleDelete = (id) => {
    // TODO Handle delete logic here
    console.log(`Deleting table with ID: ${id}`);
  };

  return (
    <Row>
      <Col className="manage-rooms ps-3">
        <ManageRooms />
      </Col>
      <Col md={3} className="editing-tool">
        <TableEditForm onDelete={handleDelete} onSave={onSave} />
      </Col>
    </Row>
  );
}

function ManageRooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationDate, setReservationDate] = useState(null);
  const [reservationTime, setReservationTime] = useState(null);
  // TODO load and remove room reservations
  const rooms = [
    {
      id: 1,
      name: 'Room 1',
      description: 'Description for Room 1',
      reservationDate: '2024-05-20',
      reservationTime: '10:00',
    }, // Example reservation date and time
    {
      id: 2,
      name: 'Room 2',
      description: 'Description for Room 2',
      reservationDate: null,
      reservationTime: null,
    },
    {
      id: 3,
      name: 'Room 3',
      description: 'Description for Room 3',
      reservationDate: '2024-06-10',
      reservationTime: '14:00',
    }, // Example reservation date and time
  ];

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setReservationDate(room.reservationDate);
  };

  const handleDateChange = (e) => {
    setReservationDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setReservationTime(e.target.value);
  };

  return (
    <>
      <Row className="pt-4 pe-3">
        <h4>Room reservations</h4>
        <Col className="d-flex align-items-center">
          {/* Dropdown */}
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedRoom ? selectedRoom.name : 'Select Room'}
          >
            {rooms.map((room) => (
              <Dropdown.Item
                key={room.id}
                onClick={() => handleRoomSelect(room)}
              >
                Room {room.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col className="text-danger">
          {reservationDate && reservationTime ? 'The room is reserved' : ''}
        </Col>
        <Col>
          <Form.Control
            type="date"
            value={reservationDate || ''}
            onChange={handleDateChange}
            disabled={!selectedRoom}
          />
        </Col>
        <Col>
          <Form.Control
            type="time"
            value={reservationTime || ''}
            onChange={handleTimeChange}
            disabled={!selectedRoom}
          />
        </Col>
      </Row>
      <h4 className="mt-5 pt-4">Table overview</h4>
      <Row className="pe-3">
        <TableManagement />
      </Row>
    </>
  );
}

function TableManagement() {
  // const [components, setComponents] = useState([]);

  const [tables, setTables] = useState([]);

  // todo
  useEffect(() => {
    // Initialize tables when component mounts
    const initialTables = [
      { id: 1, capacity: 4 },
      { id: 2, capacity: 6 },
      { id: 3, capacity: 2 },
      { id: 4, capacity: 8 },
      { id: 5, capacity: 3 },
    ];
    setTables(initialTables);
  }, []);

  const addTable = () => {
    // TODO
    const id = tables.length + 1;
    const capacity = 4;

    setTables((prevTables) => [...prevTables, { id: id, capacity: capacity }]);
  };

  const handleRemoveTable = (table_id) => {
    // TODO
    setTables((prevTables) =>
      prevTables.filter((table) => table.id !== table_id)
    );
  };

  return (
    <>
      <Container fluid className="container-tables mt-2">
        <Button onClick={addTable} className="btn-add-table">
          Add Table
        </Button>
        <Row className="table-management-container">
          {tables.map((table, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={2} className="mt-4">
              <div className="table">
                <div className="table-id">
                  Table <b className="text-primary">{table.id}</b>
                </div>
                <div>
                  Capacity:&nbsp;
                  <span className="text-danger fw-bold">{table.capacity}</span>
                </div>
                <button
                  className="btn-trash text-danger"
                  onClick={() => handleRemoveTable(table.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

const TableEditForm = ({ onSave, onDelete, table = {}, room = {} }) => {
  // const [roomName, setRoomName] = useState(room.roomName || '');
  const [tableName, setTableName] = useState(table.name || '');
  const [capacity, setCapacity] = useState(table.capacity || '');

  const handleSave = () => {
    // Create an object representing the table
    const editedTable = {
      id: table.id || null,
      name: tableName.trim(),
      capacity: capacity.trim(),
    };

    // Create an object representing the table
    const editedRoom = {
      id: room.id || null, // assuming table has an id
      // roomName: roomName.trim(),
      capacity: capacity.trim(),
    };

    // Call onSave function from parent component with the table object
    onSave(editedTable);

    // Clear input fields
    setTableName('');
    setCapacity('');
  };

  const handleDelete = () => {
    // Call onDelete function from parent component
    onDelete(table.id);
  };

  return (
    <div className="p-4">
      <h4>Edit table</h4>
      <div>
        <input
          type="text"
          placeholder="Table ID"
          value={tableName}
          className="input-field m-0 mb-2"
          onChange={(e) => setTableName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Capacity"
          value={capacity}
          className="input-field m-0"
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>
      <div className="pt-3">
        <Button onClick={handleSave} className="me-2">
          Save
        </Button>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </div>
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
