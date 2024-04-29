import React, {useEffect, useState} from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import './ReservationPage.css';


const ReservationPage = () => {
  useEffect(() => {
    document.title = 'Reservation Page';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: '',
    reservationDate: '',
    reservationTimeFrom: '',
    reservationTimeTo: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send to staff
    console.log(formData);
  };

  return (
    <Container className="main-container">
      <h1>Make a reservation</h1>
      <h3>Reserve a table:</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mt-2">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" name="name" value={formData.name}
                        onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email}
                        onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder="Enter your phone number" name="phone" value={formData.phone}
                        onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formNumberOfGuests" className="mt-3">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control type="number" placeholder="Enter number of guests" name="numberOfGuests"
                        value={formData.numberOfGuests} onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formReservationDate" className="mt-3">
          <Form.Label>Reservation Date</Form.Label>
          <Form.Control type="date" name="reservationDate" value={formData.reservationDate} onChange={handleChange}/>
        </Form.Group>

        <Row className="mt-3">
          <Form.Group as={Col} controlId="formReservationTimeFrom">
            <Form.Label>From</Form.Label>
            <Form.Control type="time" name="reservationTimeFrom" value={formData.reservationTimeFrom}
                          onChange={handleChange}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formReservationTimeTo">
            <Form.Label>To</Form.Label>
            <Form.Control type="time" name="reservationTimeTo" value={formData.reservationTimeTo}
                          onChange={handleChange}/>
          </Form.Group>
        </Row>

        <Form.Group controlId="formNote" className="mt-3">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Add any message for us"
                        name="note" value={formData.note} onChange={handleChange}/>
        </Form.Group>

        <div className="text-center">
          <p className="info mt-4">After making a reservation, please wait for a confirmation email from the staff, or contact us directly by phone to make one.</p>
          <Button variant="primary" type="submit" className="mt-3 btn-send-reservation" onSubmit={handleSubmit}>
            Request a reservation
          </Button>
        </div>
      </Form>
      <h3>Reserve a room:</h3>
      <p>Looking to reserve an entire restaurant room for a special event or gathering? Please dial <b>+420 541 141 298</b> to arrange further information</p>
    </Container>
  );
};

export default ReservationPage;
