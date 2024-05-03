import { useState } from 'react';
import axios from 'axios';
import { Row, Col, Dropdown, Button, Form } from 'react-bootstrap'; // Import ListGroup, Button, and Card

// ============== FOOD ORDERS ==============
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

  const filteredOrders = orders.filter((order) => {
    return (
      (categoryFilter === '' ||
        order.status.toLowerCase() === categoryFilter.toLowerCase()) &&
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
          <Form.Control
            type="date"
            value={dateFilter}
            onChange={handleDateChange}
            placeholder="Filter by Date"
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="time"
            value={timeFilter}
            onChange={handleTimeChange}
            placeholder="Filter by Time"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-column">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="mb-3 p-3 border rounded">
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Table Name:</strong> {order.tableName}
                </p>
                <p>
                  <strong>Order Date:</strong> {order.orderDate}
                </p>
                <p>
                  <strong>Order Time:</strong> {order.orderTime}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total Summary:</strong> {order.totalSummary}
                </p>
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
// const sampleOrders = [
//   {
//     id: 1,
//     tableName: 'Table 1',
//     orderDate: '2024-05-01',
//     orderTime: '12:30 PM',
//     status: 'Pending',
//     totalSummary: '$50.00'
//   },
//   {
//     id: 2,
//     tableName: 'Table 2',
//     orderDate: '2024-05-01',
//     orderTime: '1:45 PM',
//     status: 'Completed',
//     totalSummary: '$65.00'
//   },
//   {
//     id: 3,
//     tableName: 'Table 3',
//     orderDate: '2024-05-02',
//     orderTime: '11:00 AM',
//     status: 'Pending',
//     totalSummary: '$30.00'
//   },
//   // Add more sample orders as needed
// ];

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
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select room
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <h1>Name</h1>
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

export default TableOrders;
