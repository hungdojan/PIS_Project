import { Row, Col } from 'react-bootstrap'; // Import `ListGroup, Button, and Card
import { SelectRooms } from './components/reservationSelectTables';

const CreateTableReservations = () => {
  return (
    <Row>
      <Col className="rooms-reservation">
        <SelectRooms />
      </Col>
    </Row>
  );
};

export { CreateTableReservations };
