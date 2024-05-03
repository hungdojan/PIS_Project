import { useState } from 'react';
import {
    Row,
    Col,
    Button,
  } from 'react-bootstrap'; // Import `ListGroup, Button, and Card

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

export { ReservationEditPanel };
  