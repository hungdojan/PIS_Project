import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

const RoomReservationForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
    count: '',
    phone: '',
  });

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkInDate = formData.checkInDate
      ? new Date(formData.checkInDate)
      : null;
    const checkOutDate = formData.checkOutDate
      ? new Date(formData.checkOutDate)
      : null;

    if (!checkInDate || !checkOutDate) {
      console.error('Invalid date format');
      return;
    }

    try {
      const response = await fetch('/api/room-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          at: checkInDate,
          until: checkOutDate,
          count: parseInt(formData.count),
          phone: formData.phone,
          createdByEmployeeId: 123, // Example employee ID
          tableIds: [],
          roomIds: [],
        }),
      });
      if (response.ok) {
        // Success
        console.log('Reservation successful');
        // Reset form fields after submission
        setFormData({
          name: '',
          email: '',
          checkInDate: '',
          checkOutDate: '',
          count: '',
          phone: '',
        });
      } else {
        // Error handling
        console.error('Reservation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <h2>Room Registration Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // Example phone number pattern
                required
              />
              <Form.Text className="text-muted">Format: 123-456-7890</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="formCheckIn">
              <Form.Label>Check-in Date:</Form.Label>
              <Form.Control
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCheckInTimeFrom">
              <Form.Label>Check-in Time From:</Form.Label>
              <Form.Control
                type="time"
                name="checkInTimeFrom"
                value={formData.checkInTimeFrom}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCheckInTimeTo">
              <Form.Label>Check-in Time To:</Form.Label>
              <Form.Control
                type="time"
                name="checkInTimeTo"
                value={formData.checkInTimeTo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="formCount">
              <Form.Label>Number of Guests:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of guests"
                name="count"
                value={formData.count}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export { RoomReservationForm };
