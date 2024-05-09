import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Form,
} from 'react-bootstrap'; // Import `ListGroup, Button, and Card

const TableReservationsList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
        fetch();
  }, []);

    const fetch = () => {
      axios
          .get('/api/reservations')
          .then((resp) => {
              const data = resp.data;
              setReservations([...data]);
        })
          .catch((err) => {
              alert(err); // TODO: delete this?
        });
    }

  const handleDelete = (id) => {
    axios
    .delete(`/api/reservations/${id}`)
    .then((response) => {
        fetch();
    })
    .catch((err) => {
      alert(err);
    });
  }

//if (!reservations || reservations.length === 0) {
//  return <div>No orders available</div>;
//}

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
          <Button variant="info"
                  className="me-2">
            Edit
          </Button>
          <Button variant="danger"
                  onClick={() => handleDelete(reservation.id)}>
            Delete
          </Button>
        </Col>
      </Row>
    ))}
  </Container>
);
};

export { TableReservationsList };
