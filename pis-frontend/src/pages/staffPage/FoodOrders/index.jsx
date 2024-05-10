import './FoodOrders.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Form, Modal, Container } from 'react-bootstrap'; // Import ListGroup, Button, and Card

const FoodOrders = () => {
  const [orders, setOrders] = useState({});
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    table: 'all',
    room: 'all',
  });
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState();

  useEffect(() => {
    fetchFoodOrders(); // Call fetchTables when the component mounts
    fetchTables();
    fetchRooms();
  }, []); // Empty dependency array to mimic componentDidMount

  const fetchFoodOrders = () => {
    axios
      .get('/api/orders')
      .then((resp) => {
        const _orders = {};
        resp.data.forEach((item) => {
          _orders[item.id] = {
            ...item,
            atTime: item.atTime
              ? new Date(item.atTime.replace('[UTC]', ''))
              : undefined,
            preparedTime: item.preparedTime
              ? new Date(item.preparedTime.replace('[UTC]', ''))
              : undefined,
          };
        });
        setOrders(_orders); // Update the tables state with the fetched data
        applyFilters(Object.values(_orders), filters);
      })
      .catch((err) => {
        console.error('Error fetching food orders:', err);
        alert(err); // Display an alert for the error (temporary)
      });
  };

  const fetchTables = () => {
    axios
      .get('/api/tables')
      .then((resp) => setTables(['all', ...resp.data.map((table) => table.id)]))
      .catch((err) => alert(err));
  };
  const fetchRooms = () => {
    axios
      .get('/api/rooms')
      .then((resp) => setRooms(['all', ...resp.data.map((room) => room.id)]))
      .catch((err) => alert(err));
  };

  const handleStatusChange = (e) => {
    const newFilterState = {
      ...filters,
      status: e.target.value,
    };
    setFilters(newFilterState);
    applyFilters(Object.values(orders), newFilterState);
  };

  const handleTypeChange = (e) => {
    const newFilterState = {
      ...filters,
      type: e.target.value,
    };
    setFilters(newFilterState);
    applyFilters(Object.values(orders), newFilterState);
  };

  const handleTableChange = (e) => {
    const newFilterState = {
      ...filters,
      table: e.target.value,
    };
    setFilters(newFilterState);
    applyFilters(Object.values(orders), newFilterState);
  };

  const handleRoomChange = (e) => {
    const newFilterState = {
      ...filters,
      room: e.target.value,
    };
    setFilters(newFilterState);
    applyFilters(Object.values(orders), newFilterState);
  };

  const handlePay = (orderId) => {
    const order = orders[orderId];
    const modifiedOrder = {
      ...order,
      atTime: order.atTime ? order.atTime.toISOString() : undefined,
      preparedTime: order.preparedTime
        ? order.preparedTime.toISOString()
        : undefined,
      payed: true,
      food: order.food ? order.food.id : undefined,
      drink: order.drink ? order.drink.id : undefined,
      toTable: order.toTable ? order.toTable.id : undefined,
      toRoom: order.toRoom ? order.toRoom.id : undefined,
    };

    axios
      .put(`/api/orders/${modifiedOrder.id}`, modifiedOrder)
      .then(() => {
        fetchFoodOrders();
      })
      .catch((err) => alert(err));
  };

  const handleServe = (orderId) => {
    const order = orders[orderId];
    const modifiedOrder = {
      ...order,
      atTime: order.atTime ? order.atTime.toISOString() : undefined,
      preparedTime: new Date().toISOString(),
      prepared: true,
      food: order.food ? order.food.id : undefined,
      drink: order.drink ? order.drink.id : undefined,
      toTable: order.toTable ? order.toTable.id : undefined,
      toRoom: order.toRoom ? order.toRoom.id : undefined,
    };

    axios
      .put(`/api/orders/${modifiedOrder.id}`, modifiedOrder)
      .then(() => {
        fetchFoodOrders();
      })
      .catch((err) => alert(err));
  };

  const handleDelete = () => {
    axios
      .delete(`/api/orders/${selectedDelete.id}`)
      .then(() => {
        setShowModal(false);
        fetchFoodOrders();
      })
      .catch((err) => alert(err));
  };

  const applyFilters = (_data, _filters) => {
    const _filteredItems = _data
      // status
      .filter((item) => {
        if (_filters.status === 'pending' && !item.payed && !item.prepared) {
          return true;
        } else if (
          _filters.status === 'prepared' &&
          item.prepared &&
          !item.payed
        ) {
          return true;
        } else if (_filters.status === 'paid' && item.payed) {
          return true;
        } else if (_filters.status === 'all') {
          return true;
        }
        return false;
      })
      // meal type
      .filter((item) => {
        return (
          (_filters.type === 'food' && item.food) ||
          (_filters.type === 'drink' && item.drink) ||
          _filters.type === 'all'
        );
      })
      // table
      .filter((item) => {
        return (
          _filters.room === 'all' ||
          (item.toRoom && parseInt(_filters.room) === item.toRoom.id)
        );
      })
      .filter((item) => {
        return (
          _filters.table === 'all' ||
          (item.toTable && parseInt(_filters.table) === item.toTable.id)
        );
      });
    setFilteredOrders(_filteredItems);
  };

  const renderOrderCard = () => {
    return filteredOrders.map((order) => (
      <div key={order.id} className="mb-3 border rounded p-3">
        <Row>
          <Col>
            <strong>Order ID:</strong> {order.id}
          </Col>
          {order.toTable ? (
            <Col>
              <strong>Table ID:</strong> {order.toTable.id}
            </Col>
          ) : (
            <Col>
              <strong>Room ID:</strong> {order.toRoom.id}
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <strong>Order Time:</strong>{' '}
            {order.atTime ? order.atTime.toUTCString() : 'Not ordered yet'}
          </Col>
          <Col>
            <strong>Prepared Time:</strong>{' '}
            {order.preparedTime
              ? order.preparedTime.toUTCString()
              : 'Not prepared yet'}
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
              disabled={order.prepared}
            >
              Served
            </Button>{' '}
            <Button
              variant="success"
              onClick={() => handlePay(order.id)}
              disabled={order.payed}
            >
              Pay
            </Button>{' '}
            <Button
              variant="danger"
              onClick={() => {
                setSelectedDelete(order);
                setShowModal(true);
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </div>
    ));
  };

  return (
    <>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Label>Status: </Form.Label>
          <Form.Select value={filters.status} onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="prepared">Prepared</option>
            <option value="paid">Paid</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label>Type of meal: </Form.Label>
          <Form.Select value={filters.type} onChange={handleTypeChange}>
            <option value="all">All</option>
            <option value="food">Foods</option>
            <option value="drink">Drinks</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label>Table: </Form.Label>
          <Form.Select value={filters.table} onChange={handleTableChange}>
            {tables.map((tableOpt) => {
              return (
                <option value={tableOpt}>
                  {tableOpt === 'all' ? 'All' : tableOpt}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label>Room: </Form.Label>
          <Form.Select value={filters.room} onChange={handleRoomChange}>
            {rooms.map((tableOpt) => {
              return (
                <option value={tableOpt}>
                  {tableOpt === 'all' ? 'All' : tableOpt}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-column">{renderOrderCard()}</div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete an order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div>Do you really want to delete this order?</div>
            {selectedDelete && (
              <Container className="mt-3">
                <Row>
                  <Col>
                    <strong>Order ID:</strong> {selectedDelete.id}
                  </Col>
                  <Col>
                    <strong>Table ID:</strong> {selectedDelete.toTable.id}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Order Time:</strong>{' '}
                    {selectedDelete.atTime
                      ? selectedDelete.atTime.toUTCString()
                      : 'Not ordered yet'}
                  </Col>
                  <Col>
                    <strong>Prepared Time:</strong>{' '}
                    {selectedDelete.preparedTime
                      ? selectedDelete.preparedTime.toUTCString()
                      : 'Not prepared yet'}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Prepared:</strong>{' '}
                    {selectedDelete.prepared ? 'Yes' : 'No'}
                  </Col>
                  <Col>
                    <strong>Payed:</strong>{' '}
                    {selectedDelete.payed ? 'Yes' : 'No'}
                  </Col>
                </Row>
              </Container>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FoodOrders;
