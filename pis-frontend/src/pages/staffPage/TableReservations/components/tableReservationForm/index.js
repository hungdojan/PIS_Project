import axios from 'axios';
import DatePicker from 'react-datepicker';

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import './reservationEditPanel.css'
const ReservationForm = ({ selectedTableId }) => {
  // State to manage form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  );
  const [guestsCount, setNumberOfGuests] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservationStatus, setReservationStatus] = useState('');
  const [reservations, setReservations] = useState([]);
  // const [selectedTables, setSelectedTables] = useState([]);
  // const [selectedRoom, setSelectedRoom] = useState(null);
  useEffect(() => {
    fetchReservations();
  }, [selectedTableId]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/api/reservations');
      setReservations(response.data); // Update reservations state
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkInDate = timeFrom ? timeFrom.toISOString() : null;
    const checkOutDate = timeTo ? timeTo.toISOString() : null;

    if (!checkInDate || !checkOutDate) {
      console.log(checkInDate);
      console.log(checkOutDate);
      console.error('Invalid date format');
      return;
    }

    if (timeFrom > timeTo) {
      console.log('Time from must be lower than time to');
      return;
    }

    if (!selectedTableId) {
      console.log('The table');
      return;
    }
    try {
      const response = await axios.post(
        '/api/reservations',
        {
          name: name,
          email: email,
          at: timeFrom,
          until: timeTo,
          count: parseInt(guestsCount),
          phone: phoneNumber,
          createdByEmployee: localStorage.getItem('user'), // Example employee ID
          tableIds: [selectedTableId],
          roomIds: [],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        // Success
        console.log('Reservation successful');
        setReservationStatus('Reservation successful');
        // Reset form fields after submission
        const newReservations = response.data;
        console.log([...reservations, newReservations]);
        setReservations([...reservations, newReservations]);

        setName('');
        setEmail('');
        setDate('');
        setTimeFrom(new Date());
        setTimeTo(new Date(new Date().getTime() + 60 * 60 * 1000));
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
  const handleTimeFromChange = (date) => {
    setTimeFrom(date);
    // Automatically adjust timeTo by adding one hour
    const newTimeTo = new Date(date);
    newTimeTo.setHours(newTimeTo.getHours() + 1);
    setTimeTo(newTimeTo);
  };
  const handleTimeToChange = (date) => {
    setTimeTo(date);
  };

  // Filter function to disable times earlier than timeFrom
  const filterPassedTime = (time) => {
    const selectedHour = timeFrom.getHours();
    const selectedMinutes = timeFrom.getMinutes();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    return (
      hour > selectedHour ||
      (hour === selectedHour && minutes > selectedMinutes)
    );
  };

  const timeSlotIsReserved = (time) => {
    const selectedTime = time.toISOString();
    const isReserved = reservations.some((reservation) => {
      // Check if the reservation has tables
      console.log(reservation.tables);
      // Check if the reservation has table IDs
      if (!reservation.tables || reservation.tables.length === 0) {
        return false; // Skip reservations without tables
      }

      // Check if the selected table ID matches any of the reservation's table IDs
      const reservationTableIds = reservation.tables.map((table) => table.id);
      if (!reservationTableIds.includes(selectedTableId)) {
        return false; // Skip reservations not for the selected table
      }
      // Extract the portion of the string without the [UTC] suffix
      const isoString = reservation.at.split('[UTC]')[0];

      // Create a new Date object from the ISO string
      const reservationTime = new Date(isoString);

      if (isNaN(reservationTime.getTime())) {
        // Handle invalid date
        console.error('Invalid date:', isoString);
        return false;
      }

      // Subtract one minute from reservationTime
      reservationTime.setMinutes(reservationTime.getMinutes() - 1);

      // Convert reservationTime back to ISO string for comparison
      const reservationTimeISO = reservationTime.toISOString();

      // Compare selectedTime with reservationTime
      return (
        selectedTime >= reservationTimeISO && selectedTime <= reservation.until
      );
    });
    return isReserved;
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
          {/* TIME FROM*/}
          <Col>
            <Form.Group controlId="form-TimeFrom">
              <Form.Label>Time from:</Form.Label>
              <DatePicker
                selected={timeFrom}
                onChange={(time) => handleTimeFromChange(time)}
                className="form-control"
                showTimeSelect
                timeIntervals={30}
                timeCaption="Time From"
                dateFormat="yyyy MMMM d, HH:mm"
                timeFormat="HH:mm"
                filterTime={(time) => !timeSlotIsReserved(time)}
                required
              />
            </Form.Group>
          </Col>
          {/* TIME TO */}
          <Col>
            <Form.Group controlId="form-TimeTo">
              <Form.Label>Time To:</Form.Label>
              <DatePicker
                selected={timeTo}
                onChange={(time) => handleTimeToChange(time)}
                className="form-control"
                showTimeSelect
                timeIntervals={30}
                timeCaption="Time To"
                dateFormat="yyyy MMMM d, HH:mm"
                timeFormat="HH:mm"
                minDate={timeFrom}
                filterTime={filterPassedTime}
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

        <Button variant="primary" type="submit" className='table-submit-btn'>
          Submit
        </Button>
        {selectedTableId === null && (
          <p className="text-danger">Please select a table</p>
        )}
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

export { ReservationForm };
