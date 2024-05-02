import { useEffect, useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownButton,
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import './ManagerPage.css';

const ManagerDahsboard = () => {
  useEffect(() => {
    document.title = 'Manager page';
  }, []);

  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <Col className="main-dashboard-content">
          <ManageRooms />
        </Col>
        <Col md={3} className="editing-tool">
          <ElementForm />
        </Col>
      </Row>
    </Container>
  );
};

function Sidebar() {
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

      <Nav variant="pills" defaultActiveKey="home">
        <Nav.Item>
          <Nav.Link eventKey="manager-room-reservations">
            Manage room reservations
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="manager-expenses-dashboard">
            Expenses Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="manager-expenses-pricing">Manage prices</Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      <DropdownButton
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
      </DropdownButton>
    </div>
  );
}

function ManageRooms() {
  return (
    <>
      <Row>
        <Col className="d-flex align-items-center">
          {/* Dropdown */}
          <DropdownButton id="dropdown-basic-button" title="Dropdown">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          {/* Delete Button */}
          <Button variant="danger">Delete</Button>
        </Col>
      </Row>
      <Row>
        <TableManagement />
      </Row>
      <Row>
        <Col className="bottom-row">All tables count</Col>
        <Col className="bottom-row">Total capacity</Col>
      </Row>
    </>
  );
}

function TableManagement() {
  const [components, setComponents] = useState([]);

  const addComponent = () => {
    setComponents((prevComponents) => [
      ...prevComponents,
      <div className="rectangle">Table</div>,
    ]);
  };

  return (
    <>
      <div className="container">
        {components.map((component, index) => (
          <div key={index} className="row">
            {component}
          </div>
        ))}
      </div>
      <button onClick={addComponent}>Add Rectangle</button>
    </>
  );
}

function ElementForm({ onSave, onDelete }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    // Check if required fields are not empty
    if (
      name.trim() === '' ||
      description.trim() === '' ||
      amount.trim() === '' ||
      price.trim() === '' ||
      category.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }

    // Create an object representing the element
    const element = {
      name: name.trim(),
      description: description.trim(),
      amount: amount.trim(),
      price: price.trim(),
      category: category.trim(),
    };

    // Call onSave function from parent component with the element object
    onSave(element);

    // Clear input fields
    setName('');
    setDescription('');
    setAmount('');
    setPrice('');
    setCategory('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Row>
        <button onClick={handleSave}>Save</button>
        <button onClick={onDelete}>Delete</button>
      </Row>
    </div>
  );
}
// export default Sidebar;

export default ManagerDahsboard;
