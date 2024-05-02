import './FoodOrders.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Form } from 'react-bootstrap'; // Import ListGroup, Button, and Card

const FoodOrders = () => {
  const [orders, setOrders] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  useEffect(() => {
    fetchFoodOrders(); // Call fetchTables when the component mounts
  }, []); // Empty dependency array to mimic componentDidMount

  const fetchFoodOrders = () => {
    axios
      .get('/api/orders')
      .then((resp) => {
        setOrders(resp.data); // Update the tables state with the fetched data
        console.log(resp.data);
      })
      .catch((err) => {
        console.error('Error fetching food orders:', err);
        alert(err); // Display an alert for the error (temporary)
      });
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const handlePay = (orderId) => {
    updateOrderPayment(orderId, 'payed');
  };

  const handleServe = (orderId) => {
    updateOrderServed(orderId, 'served');
  };
  const updateOrderPayment = (orderId, status) => {
    // Find the order to update
    const orderToUpdate = orders.find((order) => order.id === orderId);
    const modifiedOrderToUpdate = {
      ...orderToUpdate, // Keep all existing properties
      drinks: orderToUpdate.drinks.map((drink) => drink.id), // Map drinks array to contain only IDs
      foods: orderToUpdate.foods.map((food) => food.id),
      // toTable: orderToUpdate.drinks.map(toTable => toTable.id),
      toTable: orderToUpdate.toTable.id,
      payed: true, // Map drinks array to contain only IDs
      // Map drinks array to contain only IDs
    };
    console.log(modifiedOrderToUpdate);
    // // Update the order status locally
    // const updatedOrders = orders.map((order) => {
    //   if (order.id === orderId) {
    //     return { ...order, [status]: true };
    //   }
    //   return order;
    // });
    // setOrders(updatedOrders);
    // console.log(updatedOrders);
    // Send PUT request to update the order on the server
    axios
      .put(`/api/orders/`, modifiedOrderToUpdate)
      .then((resp) => {
        // Handle success if needed
        console.log(resp);
      })
      .catch((err) => {
        console.error('Error updating order:', err);
        // Handle error if needed
      });
  };

  const updateOrderServed = (orderId, status) => {
    // Find the order to update
    const orderToUpdate = orders.find((order) => order.id === orderId);
    const modifiedOrderToUpdate = {
      ...orderToUpdate, // Keep all existing properties
      drinks: orderToUpdate.drinks.map((drink) => drink.id), // Map drinks array to contain only IDs
      foods: orderToUpdate.foods.map((food) => food.id),
      // toTable: orderToUpdate.drinks.map(toTable => toTable.id),
      toTable: orderToUpdate.toTable.id,
      prepared: true, // Map drinks array to contain only IDs
      // Map drinks array to contain only IDs
    };
    console.log(modifiedOrderToUpdate);
    // // Update the order status locally
    // const updatedOrders = orders.map((order) => {
    //   if (order.id === orderId) {
    //     return { ...order, [status]: true };
    //   }
    //   return order;
    // });
    // setOrders(updatedOrders);
    // console.log(updatedOrders);
    // Send PUT request to update the order on the server
    axios
      .put(`/api/orders/`, modifiedOrderToUpdate)
      .then((resp) => {
        // Handle success if needed
        console.log(resp);
      })
      .catch((err) => {
        console.error('Error updating order:', err);
        // Handle error if needed
      });
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
            <option value="false">Pending</option>
            <option value="true">Prepared</option>
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
              <div key={order.id} className="mb-3 border rounded p-3">
                <Row>
                  <Col>
                    <strong>Order ID:</strong> {order.id}
                  </Col>
                  <Col>
                    <strong>Table ID:</strong> {order.toTable.id}
                  </Col>
                  <Col>
                    <strong>Order Time:</strong> {order.atTime}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Prepared:</strong> {order.prepared ? 'Yes' : 'No'}
                  </Col>
                  <Col>
                    <strong>Payed:</strong> {order.payed ? 'Yes' : 'No'}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="info"
                      onClick={() => handleServe(order.id)}
                    >
                      Served
                    </Button>{' '}
                    <Button variant="primary">Edit</Button>{' '}
                    <Button
                      variant="success"
                      onClick={() => handlePay(order.id)}
                    >
                      Pay
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </>

    // {/* <>
    //   <Row className="mb-3">
    //     <Col md={2}>
    //       <Form.Select value={categoryFilter} onChange={handleCategoryChange}>
    //         <option value="">Filter by Category</option>
    //         <option value="pending">Pending</option>
    //         <option value="served">Served</option>
    //         <option value="paid">Paid</option>
    //       </Form.Select>
    //     </Col>
    //     <Col md={2}>
    //       <Form.Control
    //         type="date"
    //         value={dateFilter}
    //         onChange={handleDateChange}
    //         placeholder="Filter by Date"
    //       />
    //     </Col>
    //     <Col md={2}>
    //       <Form.Control
    //         type="time"
    //         value={timeFilter}
    //         onChange={handleTimeChange}
    //         placeholder="Filter by Time"
    //       />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col>
    //       <div className="d-flex flex-column">
    //         {filteredOrders.map((order) => (
    //           <div key={order.orderId} className="mb-3 border rounded p-3">
    //             <Row>
    //               <Col>
    //                 <strong>Order ID:</strong> {order.orderId}
    //               </Col>
    //               <Col>
    //                 <strong>Table Name:</strong> {order.tableName}
    //               </Col>
    //               <Col>
    //                 <strong>Order Date:</strong> {order.orderDate}
    //               </Col>
    //             </Row>
    //             <Row>
    //               <Col>
    //                 <strong>Order Time:</strong> {order.orderTime}
    //               </Col>
    //               <Col>
    //                 <strong>Status:</strong> {order.status}
    //               </Col>
    //               <Col>
    //                 <strong>Total Summary:</strong> {order.totalSummary}
    //               </Col>
    //             </Row>
    //             <Row>
    //               <Col>
    //                 <Button variant="danger">Delete</Button>{' '}
    //                 <Button variant="primary">Edit</Button>{' '}
    //                 <Button variant="success">Pay</Button>
    //               </Col>
    //             </Row>
    //           </div>
    //         ))}
    //       </div>
    //     </Col>
    //   </Row>
    // </> */}
  );
};

export default FoodOrders;
