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

// =========== MAIN MANAGER VIEW ===========
const ManagerDahsboard = () => {
  useEffect(() => {
    document.title = 'Manager page';
  }, []);
  const [activeNavItem, setActiveNavItem] = useState(
    'manager-room-reservations'
  );

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

        {/* <ManageRoomsDashboard /> */}
      </Row>
    </Container>
  );
};

const Sidebar = ({ handleNavItemClick = () => {}, activeNavItem = '' }) => {
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
};

// =========== VIEW 1 ===========
function ManageRoomsDashboard() {
  const onSave = (table) => {
    // Handle save logic here
    console.log('Saving table:', table);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log(`Deleting table with ID: ${id}`);
  };

  return (
    <Row>
      <Col className="manage-rooms">
        <ManageRooms />
      </Col>
      {/* <Col md={3} className="editing-tool"> */}
      <Col md={3} className="editing-tool">
        <TableEditForm onDelete={handleDelete} onSave={onSave}/>
      </Col>
    </Row>
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
      <div className="table-management-container">
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

const TableEditForm = ({ onSave, onDelete, table= {}, room = {} }) => {
  const [roomName, setRoomName] = useState(room.roomName || '');
  const [tableName, setTableName] = useState(table.name || '');
  const [capacity, setCapacity] = useState(table.capacity || '');

  const handleSave = () => {
    // Check if required fields are not empty
    if (roomName.trim() === '' || tableName.trim() === '' || capacity.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    // Create an object representing the table
    const editedTable = {
      id: table.id || null, 
      name: tableName.trim(),
      capacity: capacity.trim(),
    };

    // Create an object representing the table
    const editedRoom = {
      id: room.id || null, // assuming table has an id
      roomName: roomName.trim(),
      capacity: capacity.trim(),
    };

    // Call onSave function from parent component with the table object
    onSave(editedTable);

    // Clear input fields
    setRoomName('');
    setTableName('');
    setCapacity('');
  };

  const handleDelete = () => {
    // Call onDelete function from parent component
    onDelete(table.id);
  };

  return (
    <div>
      <Row>
        <Col>
          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </Col>
        <Col>
          <input
            type="text"
            placeholder="Table Name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </Col>
        <Col>
          <input
            type="text"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </Col>
        <Col>
          <Button onClick={handleSave}>Save</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Col>
      </Row>
    </div>
  );
};


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

// =========== VIEW 3 ===========
const FoodPricing = () => {
  // Sample data for food items
  const foodItems = [
    { id: 1, name: 'Food 1', portionSize: 'Medium', price: '$10' },
    { id: 2, name: 'Food 2', portionSize: 'Large', price: '$15' },
    { id: 3, name: 'Food 3', portionSize: 'Small', price: '$8' },
    // Add more food items as needed
  ];

  // State for selected food category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filtered food items based on selected category
  const filteredFoodItems =
    selectedCategory === 'All'
      ? foodItems
      : foodItems.filter((item) => item.category === selectedCategory);

  // Sample categories for dropdown
  const categories = ['All', 'Category 1', 'Category 2', 'Category 3']; // Add more categories as needed

  // Handler for selecting a category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Food Overview</h2>
          <Row>
            <Col>
              {/* Dropdown for filtering food categories */}
              <DropdownButton title={`Filter by Category: ${selectedCategory}`}>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col>ID</Col>
            <Col>Name</Col>
            <Col>Portion Size</Col>
            <Col>Price per Portion</Col>
          </Row>
          {filteredFoodItems.map((food) => (
            <Row key={food.id}>
              <Col>{food.id}</Col>
              <Col>{food.name}</Col>
              <Col>{food.portionSize}</Col>
              <Col>{food.price}</Col>
            </Row>
          ))}
        </Col>
        <Col>
          <h2>Food Editing Panel</h2>
          <ElementForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ManagerDahsboard;
