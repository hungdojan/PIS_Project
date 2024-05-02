import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Form,
} from 'react-bootstrap'; // Import `ListGroup, Button, and Card

function CreateTableReservations2() {
  return (
    <Row>
      <Col className="rooms-reservation">
        <SelectRooms />
      </Col>
      <Col md={3} className="editing-tool">
        <TableEditForm2 />
      </Col>
    </Row>
  );
}

function SelectRooms() {
  // =========== CLICK EVENTS ===========
  const [selectedRoomDescription, setSelectedRoomDescription] = useState('');

  const handleRoomSelect = (room) => {
    setSelectedRoomDescription(room.description);
  };
  // ============= FETCHING =============
  // 1. Get rooms
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios
      .get('/api/rooms')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  };
  // 2. Get list of  tables
  return (
    <>
      <Row>
        <Col className="d-flex align-items-center">
          {/* Dropdown */}
          <DropdownButton id="dropdown-basic-button" title="Select room">
            {rooms.map((room) => (
              <Dropdown.Item
                key={room.id}
                onClick={() => handleRoomSelect(room)}
                href={`#/room/${room.id}`}
              >
                {room.description}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col>
          <h2> {selectedRoomDescription} </h2>
        </Col>
      </Row>
      <Row>
        <TableManagement2 />
      </Row>
      <Row>
        <Col className="bottom-row">All tables count</Col>
        <Col className="bottom-row">Total capacity</Col>
      </Row>
    </>
  );
}

function TableManagement2() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  // Assuming data is an array of table objects with id and name properties
  const tables = [
    { id: 1, name: 'Table 1' },
    { id: 2, name: 'Table 2' },
    { id: 3, name: 'Table 3' },
  ];

  return (
    <div className="table-management-container">
      {tables.map((table) => (
        <div
          key={table.id}
          className={`row ${selectedTable && selectedTable.id === table.id ? 'selected' : ''}`}
          onClick={() => handleTableClick(table)}
        >
          {table.name}
        </div>
      ))}
    </div>
  );
}

function TableEditForm2() {
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

const TableReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        axios
            .get('/api/reservations')
            .then((resp) => {
                const data = resp.data;
                setReservations([...reservations, ...data]);
            })
            .catch((err) => {
                alert(err); // TODO: delete this?
            });
    }, []);

    const handleDelete = (id) => {
      axios
      .delete(`/api/reservations/${id}`)
      .then((response) => {
      })
      .catch((err) => {
        alert(err);
      });
    }

  //if (!reservations || reservations.length === 0) {
  //  return <div>No orders available</div>;
  //}

  return (
    <Container>
      {/* Filtering Row */}
      <Row className="mb-3">
        {/* Category dropdown */}
        <Col sm={3}>
          <Form.Select>
            <option value="">Select Category</option>
            {/* Add dropdown options for categories */}
          </Form.Select>
        </Col>
        {/* Date input */}
        <Col sm={3}>
          <Form.Control type="date" />
        </Col>
        {/* Time input */}
        <Col sm={3}>
          <Form.Control type="time" />
        </Col>
        {/* Filter button */}
        <Col sm={3}>
          <Button variant="primary">Filter</Button>
        </Col>
      </Row>

      {/* Table */}
      <Row>
        {/* Table Header */}
        <Col>
          <Row className="fw-bold">
            <Col>Ordering Number</Col>
            <Col>Reservation ID</Col>
            <Col>Name</Col>
            <Col>Phone Number</Col>
            <Col>Time</Col>
            <Col>Table ID</Col>
            <Col>Actions</Col>
          </Row>
        </Col>
      </Row>

      {/* Table Rows */}
      {reservations.map((reservation, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col>{index + 1}</Col>
          <Col>{reservation.id}</Col>
          <Col>{reservation.name}</Col>
          <Col>{reservation.phoneNumber}</Col>
          <Col>{reservation.time}</Col>
          <Col>{reservation.tableId}</Col>
          <Col>
            <Button variant="info"
                    className="me-2">
              Edit
            </Button>
            <Button variant="danger"
                    onClick={() => handleDelete(reservation.id)}>
              Delete
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export { CreateTableReservations2, TableReservations };
