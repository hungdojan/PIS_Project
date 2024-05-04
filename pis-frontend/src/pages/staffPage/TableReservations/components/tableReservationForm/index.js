// import { useState } from 'react';
import { Row, Col, Form, Button, Dropdown, Container } from 'react-bootstrap'; // Import `ListGroup, Button, and Card
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';

const TableReservationForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reservationDate: '',
    numberOfGuests: '',
    phone: '',
  });

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/table-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          reservationDate: new Date(formData.reservationDate),
          numberOfGuests: parseInt(formData.numberOfGuests),
          phone: formData.phone,
        }),
      });
      if (response.ok) {
        // Success
        console.log('Reservation successful');
        // Reset form fields after submission
        setFormData({
          name: '',
          email: '',
          reservationDate: '',
          numberOfGuests: '',
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
      <h2>Table Reservation Form</h2>
      <Form onSubmit={handleSubmit}>
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

        <Form.Group controlId="formReservationDate">
          <Form.Label>Reservation Date:</Form.Label>
          <Form.Control
            type="date"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formNumberOfGuests">
          <Form.Label>Number of Guests:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of guests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            min="1"
            required
          />
        </Form.Group>

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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

// export default TableReservationForm;

function ReservationEditPanel() {
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
          <Button onClick={handleReservationConfirm}>
            Confirm Reservation
          </Button>
        </Col>
      </Row>
    </div>
  );
}
const ReservationForm = () => {
  const tables = [
    { id: 1, description: 'Table 1', capacity: 4 },
    { id: 2, description: 'Table 2', capacity: 6 },
    { id: 3, description: 'Table 3', capacity: 2 },
  ];

  const rooms = [
    { id: 1, description: 'Room A', capacity: 10 },
    { id: 2, description: 'Room B', capacity: 20 },
    { id: 3, description: 'Room C', capacity: 15 },
  ];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestsCount, setNumberOfGuests] = useState('');
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission, e.g., send data to a backend
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Selected Tables:', selectedTables);
    console.log('Selected Room:', selectedRoom);

    // Reset form fields
    setName('');
    setEmail('');
    setDate('');
    setTime('');
    setNumberOfGuests('');
    setSelectedTables([]);
    setSelectedRoom(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="fromTime">
        <Form.Label>Time From</Form.Label>
        <Form.Control
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="toTime">
        <Form.Label>Time To</Form.Label>
        <Form.Control
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Group>

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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const ReservationForm2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission, e.g., send data to a backend
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Date:', date);
    console.log('Time:', time);
    // Reset form fields
    setName('');
    setEmail('');
    setDate('');
    setTime('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formTime">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export { ReservationEditPanel, ReservationForm };
