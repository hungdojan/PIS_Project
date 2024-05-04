import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

const RoomReservationForm = () => {
  // State to manage form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [guestsCount, setNumberOfGuests] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservationStatus, setReservationStatus] = useState('');

  // const [selectedTables, setSelectedTables] = useState([]);
  // const [selectedRoom, setSelectedRoom] = useState(null);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkInDate =
      date && timeFrom ? new Date(`${date}T${timeFrom}`) : null;
    const checkOutDate = date && timeTo ? new Date(`${date}T${timeTo}`) : null;

    if (!checkInDate || !checkOutDate) {
      console.log(checkInDate);
      console.log(checkOutDate);
      console.error('Invalid date format');
      return;
    }

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          at: checkInDate,
          until: checkOutDate,
          count: parseInt(guestsCount),
          phone: phoneNumber,
          createdByEmployeeId: 1, // Example employee ID
          tableIds: [],
          roomIds: [1],
        }),
      });
      if (response.ok) {
        // Success
        console.log('Reservation successful');
        setReservationStatus('Reservation successful');
        // Reset form fields after submission
        setName('');
        setEmail('');
        setDate('');
        setTimeFrom('');
        setTimeTo('');
        setNumberOfGuests('');
        setPhoneNumber('');
      } else {
        // Error handling
        console.error('Reservation failed');
        setReservationStatus('Reservation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setReservationStatus('Error occurred while making reservation');
    }
  };

  const handlePhoneNumberChange = (e) => {
    let formattedValue = e.target.value;
    // If the input is for phone number, format it with spaces after every three characters
    if (e.target.name === 'phone') {
      formattedValue = e.target.value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    e.target.value = formattedValue;
    setPhoneNumber(formattedValue);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTimeFrom">
              <Form.Label>Time From:</Form.Label>
              <Form.Control
                type="time"
                name="TimeFrom"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTimeTo">
              <Form.Label>Time To:</Form.Label>
              <Form.Control
                type="time"
                name="TimeTo"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
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
                value={guestsCount}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {reservationStatus && (
          <p
            className={
              reservationStatus === 'Reservation successful'
                ? 'text-success'
                : 'text-danger'
            }
          >
            {reservationStatus}
          </p>
        )}
      </Form>
    </Container>
  );
};

export { RoomReservationForm };
