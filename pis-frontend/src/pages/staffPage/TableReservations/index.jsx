import { Row, Col, Form, Button, Table, Container } from 'react-bootstrap'; // Import `ListGroup, Button, and Card
import {
  ReservationEditPanel,
  ReservationForm,
} from './components/tableReservationForm';
import {SelectRooms} from './components/reservationSelectTables';

function CreateTableReservations() {
  return (
    <Row>
      <Col className="rooms-reservation">
        <SelectRooms />
      </Col>
      <Col md={3} className="editing-tool">
        <ReservationForm/>
      </Col>
      
    </Row>
  );
}

export { CreateTableReservations };
