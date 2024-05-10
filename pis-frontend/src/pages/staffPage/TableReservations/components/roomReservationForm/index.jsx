import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// 0. Priprav boxes
// 1. Set up the filters
// 1.1 TimeFrom < TimeTo
// 1.2 Block Time range according to reservation for given room.

const RoomReservationForm = ({ selectedRoom }) => {
  // State to manage form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  );
  const [guestsCount, setNumberOfGuests] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservationStatus, setReservationStatus] = useState('');
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
    console.log("Fetching room ids");
  }, [selectedRoom]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/api/reservations');
      setReservations(response.data); // Update reservations state
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  // ========= SUBMIT FORM =========
  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkInDate = timeFrom ? timeFrom.toISOString() : null;
    const checkOutDate = timeTo ? timeTo.toISOString() : null;
    if (!checkInDate || !checkOutDate) {
      console.error('Invalid date format');
      return;
    }
    if (!selectedRoom.id) {
      console.log('Select the room');
      return;
    }
    try {
      const response = await axios.post('/api/reservations', {
        name: name,
        email: email,
        at: timeFrom,
        until: timeTo,
        count: parseInt(guestsCount),
        phone: phoneNumber,
        createdByEmployee: localStorage.getItem('user'), // Example employee ID
        tableIds: [],
        roomIds: [selectedRoom.id],
      });

      if (response.status === 201) {
        setReservationStatus('Reservation successful');
        console.log(reservations);
        console.log('=====================');

        const newReservations = response.data;
        console.log([...reservations, newReservations]);
        setReservations([...reservations, newReservations]);

        // setReservations(prevReservations => [...prevReservations, newReservations]);
        console.log(reservations);
        // Reset form fields after submission
        setName('');
        setEmail('');
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
    const selectedRoomId = selectedRoom.id;
    console.log('Selected time:');
    console.log(selectedTime);

    const isReserved = reservations.some((reservation) => {
      // Check if the reservation has roomIds
      
      if (!reservation.roomIds || reservation.roomIds.length === 0) {
        return false; // Skip reservations without roomIds
      }

      const reservationRoomIds = reservation.roomIds.map((room) => room.id);
      if (!reservationRoomIds.includes(selectedRoomId)) {
        return false; // Skip reservations not for the selected table
      }

      // Check if the selected room ID is in the reservation's roomIds
      // if (!reservation.roomIds.includes(selectedRoomId)) {
      //   return false; // Skip reservations not for the selected room
      // }
      console.log(reservation.roomIds);

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

    console.log('Is reserved:', isReserved);

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
                filterTime={(time) => !filterPassedTime(time) && !timeSlotIsReserved(time)}
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

        <Button variant="primary" type="submit" className='room-submit-btn'>
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
