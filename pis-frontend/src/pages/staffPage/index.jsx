import './StaffPage.css';
// import './OrdersPage.css';
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
        return <OrdersPage2 />;
      case 'staff-get-food-reservations':
        return <TableOrders2 orders={sampleOrders} />;
      case 'staff-get-table-reservations':
        return <TableReservations reservations={sampleReservations}/>;
      case 'staff-create-table-reservations':
        return <CreateTableReservations2/>
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
// ============== FOOD ORDERS ==============
const TableOrders2 = ({ orders }) => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const filteredOrders = orders.filter(order => {
    return (
      (categoryFilter === '' || order.status.toLowerCase() === categoryFilter.toLowerCase()) &&
      (dateFilter === '' || order.orderDate === dateFilter) &&
      (timeFilter === '' || order.orderTime === timeFilter)
    );
  });

  return (
    <>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Select value={categoryFilter} onChange={handleCategoryChange}>
            <option value="">Filter by Category</option>
            <option value="pending">Pending</option>
            <option value="served">Served</option>
            <option value="paid">Paid</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control type="date" value={dateFilter} onChange={handleDateChange} placeholder="Filter by Date" />
        </Col>
        <Col md={2}>
          <Form.Control type="time" value={timeFilter} onChange={handleTimeChange} placeholder="Filter by Time" />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-column">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="mb-3 border rounded p-3">
                <Row>
                  <Col><strong>Order ID:</strong> {order.orderId}</Col>
                  <Col><strong>Table Name:</strong> {order.tableName}</Col>
                  <Col><strong>Order Date:</strong> {order.orderDate}</Col>
                </Row>
                <Row>
                  <Col><strong>Order Time:</strong> {order.orderTime}</Col>
                  <Col><strong>Status:</strong> {order.status}</Col>
                  <Col><strong>Total Summary:</strong> {order.totalSummary}</Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="danger">Delete</Button>{' '}
                    <Button variant="primary">Edit</Button>{' '}
                    <Button variant="success">Pay</Button>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};
const TableOrders = ({ orders }) => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const filteredOrders = orders.filter(order => {
    return (
      (categoryFilter === '' || order.status.toLowerCase() === categoryFilter.toLowerCase()) &&
      (dateFilter === '' || order.orderDate === dateFilter) &&
      (timeFilter === '' || order.orderTime === timeFilter)
    );
  });

  return (
    <>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Select value={categoryFilter} onChange={handleCategoryChange}>
            <option value="">Filter by Category</option>
            <option value="pending">Pending</option>
            <option value="served">Served</option>
            <option value="paid">Paid</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control type="date" value={dateFilter} onChange={handleDateChange} placeholder="Filter by Date" />
        </Col>
        <Col md={2}>
          <Form.Control type="time" value={timeFilter} onChange={handleTimeChange} placeholder="Filter by Time" />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-column">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="mb-3 p-3 border rounded">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Table Name:</strong> {order.tableName}</p>
                <p><strong>Order Date:</strong> {order.orderDate}</p>
                <p><strong>Order Time:</strong> {order.orderTime}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Summary:</strong> {order.totalSummary}</p>
                <Button variant="danger">Delete</Button>{' '}
                <Button variant="primary">Edit</Button>{' '}
                <Button variant="success">Pay</Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
}; 
const sampleOrders = [
  {
    id: 1,
    tableName: 'Table 1',
    orderDate: '2024-05-01',
    orderTime: '12:30 PM',
    status: 'Pending',
    totalSummary: '$50.00'
  },
  {
    id: 2,
    tableName: 'Table 2',
    orderDate: '2024-05-01',
    orderTime: '1:45 PM',
    status: 'Completed',
    totalSummary: '$65.00'
  },
  {
    id: 3,
    tableName: 'Table 3',
    orderDate: '2024-05-02',
    orderTime: '11:00 AM',
    status: 'Pending',
    totalSummary: '$30.00'
  },
  // Add more sample orders as needed
];

const OrdersTable = ({ orders }) => {
  // Check if orders is undefined or empty
  if (!orders || orders.length === 0) {
    return <div>No orders available</div>;
  }
  return (
    <div className="orders-table">
      {/* Filtering row */}
      <Row className="filter-row">
        <Col>
          {/* Dropdown for picking category */}
          <Dropdown>
            {/* Dropdown.Toggle */}
            {/* Dropdown.Menu */}
          </Dropdown>
        </Col>
        {/* Date and time filtering */}
        {/* Additional filtering options */}
      </Row>

      {/* Other rows */}
      {orders.map((order) => (
        <Row key={order.id} className="order-row">
          <Col>{order.id}</Col>
          <Col>{order.tableName}</Col>
          <Col>{order.orderDate}</Col>
          <Col>{order.orderTime}</Col>
          <Col>{order.status}</Col>
          <Col>{order.totalSummary}</Col>
          <Col>
            <Button variant="danger">Delete</Button>
          </Col>
          <Col>
            <Button variant="primary">Edit</Button>
          </Col>
          <Col>
            <Button variant="success">Pay</Button>
          </Col>
        </Row>
      ))}
    </div>
  );
};

const OrdersPage2 = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  // Ordered food items
  const [orderedFood, setOrderedFood] = useState({});
  // Table number list
  const [tables, setTables] = useState([]);
  // Predicate to show the default food order list, not the add-list
  const [showAddFoodForm, setShowAddFoodForm] = useState(true);
  // Food items to select from
  const [foodList, setFoodList] = useState([]);
  // Selected table
  const [selectedTable, setSelectedTable] = useState(null); // State to track selected table
  // Checked food items in an order list
  const [checkedItems, setCheckedItems] = useState({}); // State to store checked items
  // Summarized price
  const [sumPrice, setSumPrice] = useState(0);
  // Summarized price of checked items
  const [checkedSumPrice, setCheckedSumPrice] = useState(0);

  useEffect(() => {
    document.title = 'Orders Page';
    // Fetch initial ordered food
    fetchOrderedFood();
    setFoodList(dummyFoodList);

    // TODO
    localStorage.setItem('role', 'staff');

    // Handle correct 100% height with the navigation bar above the container
    function handleResize() {
      const navbar = document.querySelector('.navbar-menu');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dummyFoodList = [
    {
      id: 1,
      name: 'Chicken soup',
      category: 'Appetizers',
      price: 229,
      weight: '150 g',
      description: 'Description for Item 1',
    },
    {
      id: 2,
      name: 'Stuffed mushrooms',
      category: 'Appetizers',
      price: 149,
      weight: '190 g',
      description: 'Description for Item 2',
    },
    {
      id: 3,
      name: 'Pork steak',
      category: 'Main Courses',
      price: 89,
      weight: '150 g',
      description: 'Description for Item 3',
    },
    {
      id: 4,
      name: 'Lemon salmon',
      category: 'Main Courses',
      price: 119,
      weight: '250 g',
      description: 'Description for Item 4',
    },
    {
      id: 5,
      name: 'Tiramisu',
      category: 'Desserts',
      price: 349,
      weight: '150 g',
      description: 'Description for Item 5',
    },
    {
      id: 6,
      name: 'Fries',
      category: 'Side dishes',
      price: 39,
      weight: '50 g',
      description: 'Description for Item 6',
    },
    {
      id: 7,
      name: 'Onion rings',
      category: 'Other',
      price: 39,
      weight: '50 g',
      description: 'Description for Item 7',
    },
    {
      id: 8,
      name: 'Coke',
      category: 'Beverages',
      price: 349,
      weight: '50 ml',
      description: 'Description for Item 8',
    },
    {
      id: 9,
      name: 'Beer',
      category: 'Beverages',
      price: 45,
      weight: '500 ml',
      description: 'Description for Item 9',
    },
  ];

  const fetchOrderedFood = () => {
    // Replace this with loading table names/ids
    const dummyTables = [[1], [2], [3]];

    // Load food items for a current table
    const orderedFoodObj = {};
    dummyTables.forEach((order) => {
      const [tableNumber, ...foodItems] = order;
      orderedFoodObj[tableNumber] = foodItems;
    });
    setOrderedFood(orderedFoodObj);

    // Set available table numbers based on the fetched data
    setTables(dummyTables.map((data) => data[0]));
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  // Open the food list on add-click
  const handleAddFood = () => {
    setShowAddFoodForm(false);
  };

  // Add food to list and go back to a previous window
  const handleFoodClick = (food) => {
    const updatedOrderedFood = { ...orderedFood };
    if (!updatedOrderedFood[selectedTable]) {
      updatedOrderedFood[selectedTable] = [];
    }

    updatedOrderedFood[selectedTable].push(food);
    setOrderedFood(updatedOrderedFood);
    setShowAddFoodForm(true);
    setSumPrice(calcSumPrice(updatedOrderedFood[selectedTable]));
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevItems) => {
      const updatedItems = {
        ...prevItems,
        [index]: !prevItems[index],
      };

      // Calculate sum price of checked items based on updated checkedItems
      const checkedIndexes = Object.keys(updatedItems).filter(
        (index) => updatedItems[index]
      );
      const allSelectedFood = checkedIndexes.map(
        (index) => orderedFood[selectedTable][index]
      );
      const checkedSumPrice = calcSumPrice(allSelectedFood);

      // Update state with checked sum price
      setCheckedSumPrice(checkedSumPrice);

      return updatedItems;
    });
  };

  // Checkout checked food items
  const handleCheckout = () => {
    const checkedIndexes = Object.keys(checkedItems).filter(
      (index) => checkedItems[index]
    );
    const allSelectedFood = checkedIndexes.map(
      (index) => orderedFood[selectedTable][index]
    );
    setCheckedItems([]);
    alert(
      'Food to checkout: ' + allSelectedFood.map((food) => food.name).join(', ')
    );
  };

  const handleCheckAll = () => {
    // Set/check all element indexes to true
    const allChecked = orderedFood[selectedTable].map(() => true);
    setCheckedItems(allChecked);
  };

  const handleUncheckAll = () => {
    setCheckedItems([]);
  };

  // Remove food from the list
  const handleRemove = () => {
    const updatedOrderedFood = orderedFood[selectedTable].filter(
      (food, index) => !checkedItems[index]
    );
    setOrderedFood({
      ...orderedFood,
      [selectedTable]: updatedOrderedFood,
    });
    setCheckedItems([]);
    setSumPrice(calcSumPrice(updatedOrderedFood));
  };

  const calcSumPrice = (o) => {
    let total = 0;
    if (o) {
      o.forEach((food) => {
        total += food.price;
      });
      // setSumPrice(total);
    }
    return total;
  };

  return (
    <Container
      fluid
      className="staff-main-container"
      style={{ paddingTop: navbarHeight }}
    >
      <Row className="panel">
        {/*Left side - tables */}
        <Col sm={3} className="p-0">
          <div className="left-panel">
            <Nav className="flex-column">
              {/* Render tables as links */}
              {tables.map((table) => (
                <Nav.Item key={table} className="nav-table-item">
                  <Nav.Link
                    className="nav-table-link"
                    active={selectedTable === table}
                    onClick={() => handleTableSelect(table)}
                  >
                    Table {table}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </Col>

        {/* Right side - Ordered food list */}
        <Col sm={9} className="p-0">
          <div className="right-panel">
            {/* If a table is selected and the list windows is showed */}
            {selectedTable && showAddFoodForm ? (
              <>
                <h2>
                  Ordered Food for{' '}
                  <span className="table-title">Table {selectedTable}</span>
                </h2>
                <div className="order-list-box">
                  <div className="order-list">
                    <ListGroup>
                      {orderedFood[selectedTable].map((food, index) => (
                        <ListGroup.Item
                          key={index}
                          action
                          onClick={() => handleCheckboxChange(index)}
                          active={checkedItems[index]}
                        >
                          <Row>
                            <Col md={6}>{food.name}</Col>
                            <Col md={3} className="text-end">
                              {food.weight}
                            </Col>
                            <Col md={3} className="text-end">
                              {food.price} CZK
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </div>

                <div className="box-summary">
                  <span className="checked-sum-price">
                    {checkedSumPrice}&nbsp;CZK
                  </span>
                  &nbsp;/&nbsp;
                  <span className="sum-price">{sumPrice}&nbsp;CZK</span>
                </div>

                {/* Right bottom buttons */}
                <div className="div-buttons">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-add-food"
                    onClick={handleAddFood}
                  >
                    <FaPlus />
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-add-food"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-add-food"
                    onClick={handleCheckAll}
                  >
                    <FaRegCircleCheck className="pb-1" />
                    &nbsp;all
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-add-food"
                    onClick={handleUncheckAll}
                  >
                    <FaRegCircleXmark className="pb-1" />
                    &nbsp;all
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-add-food"
                    onClick={handleRemove}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* If a table is not selected, show the info text */}
                {!selectedTable && (
                  <div className="null-text">
                    Please select a table to view ordered food
                  </div>
                )}

                {/* If the adding food page should be shown */}
                {selectedTable && (
                  <>
                    <div className="box-food-items">
                      <Row>
                        {foodList.map((food, index) => (
                          <Col
                            key={index}
                            md={6}
                            lg={4}
                            xl={3}
                            className="mb-3"
                          >
                            {/* Food item */}
                            <Card
                              className="food-card h-100"
                              onClick={() => handleFoodClick(food)}
                            >
                              <Card.Body>
                                <Card.Title>{food.name}</Card.Title>
                                <Card.Body className="p-0 text-end">
                                  {food.weight}
                                </Card.Body>
                                <Card.Body className="p-0 text-end">
                                  <b>{food.price} CZK</b>
                                </Card.Body>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

//============== FOOD RESERVATIONS ==============
function CreateTableReservations() {
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
      <Col className="rooms-reservation">
        <ManageRooms />
      </Col>
      {/* <Col md={3} className="editing-tool"> */}
      <Col md={3} className="editing-tool">
        <TableEditForm onDelete={handleDelete} onSave={onSave}/>
      </Col>
    </Row>
  );
}


function CreateTableReservations2() {
  return (
    <Row>
      <Col className="rooms-reservation">
        <ManageRooms2 />
      </Col>
      <Col md={3} className="editing-tool">
        <TableEditForm2 />
      </Col>
    </Row>
  );
}

function ManageRooms2() {
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
      </Row>
      <Row>
        <TableManagement2 />
      </Row>
      <Row>
        <Col className="bottom-row">All tables count</Col>
        <Col className="bottom-row">Total capacity</Col>
      </Row>
    </>
  );
}

function TableManagement2() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  // Assuming data is an array of table objects with id and name properties
  const tables = [
    { id: 1, name: 'Table 1' },
    { id: 2, name: 'Table 2' },
    { id: 3, name: 'Table 3' },
  ];

  return (
    <div className="table-management-container">
      {tables.map((table) => (
        <div
          key={table.id}
          className={`row ${selectedTable && selectedTable.id === table.id ? 'selected' : ''}`}
          onClick={() => handleTableClick(table)}
        >
          {table.name}
        </div>
      ))}
    </div>
  );
}

function TableEditForm2() {
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  const handleReservationConfirm = () => {
    // Handle reservation confirmation logic here
    console.log('Reservation confirmed for:', reservationDate, reservationTime);
  };

  return (
    <div>
      <Row>
        <Col>
          <input
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
        </Col>
        <Col>
          <input
            type="time"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
          />
        </Col>
        <Col>
          <Button onClick={handleReservationConfirm}>Confirm Reservation</Button>
        </Col>
      </Row>
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


const sampleReservations = [
  {
    id: 1,
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    time: '10:00 AM - 12:00 PM',
    tableId: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    phoneNumber: '987-654-3210',
    time: '12:30 PM - 2:30 PM',
    tableId: 3,
  },
  // Add more sample reservations if needed
];

const TableReservations = ({ reservations }) => {
  if (!reservations || reservations.length === 0) {
    return <div>No orders available</div>;
  }

  return (
    <Container>
      {/* Filtering Row */}
      <Row className="mb-3">
        {/* Category dropdown */}
        <Col sm={3}>
          <Form.Select>
            <option value="">Select Category</option>
            {/* Add dropdown options for categories */}
          </Form.Select>
        </Col>
        {/* Date input */}
        <Col sm={3}>
          <Form.Control type="date" />
        </Col>
        {/* Time input */}
        <Col sm={3}>
          <Form.Control type="time" />
        </Col>
        {/* Filter button */}
        <Col sm={3}>
          <Button variant="primary">Filter</Button>
        </Col>
      </Row>

      {/* Table */}
      <Row>
        {/* Table Header */}
        <Col>
          <Row className="fw-bold">
            <Col>Ordering Number</Col>
            <Col>Reservation ID</Col>
            <Col>Name</Col>
            <Col>Phone Number</Col>
            <Col>Time</Col>
            <Col>Table ID</Col>
            <Col>Actions</Col>
          </Row>
        </Col>
      </Row>

      {/* Table Rows */}
      {reservations.map((reservation, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col>{index + 1}</Col>
          <Col>{reservation.id}</Col>
          <Col>{reservation.name}</Col>
          <Col>{reservation.phoneNumber}</Col>
          <Col>{reservation.time}</Col>
          <Col>{reservation.tableId}</Col>
          <Col>
            <Button variant="info" className="me-2">Edit</Button>
            <Button variant="danger">Delete</Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default StaffPage;
