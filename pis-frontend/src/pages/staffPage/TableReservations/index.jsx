import {
  Row,
  Col,
} from 'react-bootstrap'; // Import `ListGroup, Button, and Card
import { ReservationEditPanel } from './components/reservationEditPanel';
import { SelectRooms } from './components/reservationSelectTables';

function CreateTableReservations() {
  return (
    <Row>
      <Col className="rooms-reservation">
        <SelectRooms/>
      </Col>
      <Col md={3} className="editing-tool">
        <ReservationEditPanel />
      </Col>
    </Row>
  );
}


export { CreateTableReservations };
