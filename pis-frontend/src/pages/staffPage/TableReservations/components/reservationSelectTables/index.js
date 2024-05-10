import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Dropdown, Container, Button } from 'react-bootstrap'; // Import `ListGroup, Button, and Card
import { RoomReservationForm } from '../roomReservationForm';
import { ReservationForm } from '../tableReservationForm';

function SelectRooms() {
  // =========== CLICK EVENTS ===========
  const [selectedRoomDescription, setSelectedRoomDescription] = useState('');
  const [selectedTableId, setSelectedTableId] = useState(null);

  const handleRoomSelect = (room) => {
    setSelectedRoomDescription(room.description);
    setSelectedRoom(room);
  };
  // ============= FETCHING =============
  // 1. Get rooms
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios
      .get('/api/rooms')
      .then((response) => {
        setRooms(response.data);
        if (response.data.length > 0) {
          setSelectedRoomDescription(response.data[0].description); // Initialize with the first room description
          setSelectedRoom(response.data[0]); // Initialize with the first room
        }
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  };
  // 2. Get list of  tables
  return (
    <>
      <Row>
        <h2>Room Registration</h2>
      </Row>
      <Row>
        <Col className="d-flex align-items-center">
          {/* Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-room">
              {selectedRoom ? selectedRoom.description : 'Select Room'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* Assuming rooms is an array of room objects */}
              {rooms.map((room) => (
                <Dropdown.Item
                  key={room.id}
                  onClick={() => handleRoomSelect(room)}
                >
                  {room.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <h2> {selectedRoomDescription} </h2>
        </Col>
        <Col>
          <h2> Capacity: {selectedRoom ? selectedRoom.capacity : '-'} </h2>
        </Col>

        <Row>
          {/* Room reservation form */}
          <RoomReservationForm selectedRoom={selectedRoom} />
        </Row>
      </Row>
      <Row>
        <Col>
          <Row>
            <h2>Table Reservation</h2>
            <DisplayTables
              setSelectedTableId={setSelectedTableId}
              selectedTableId={selectedTableId}
            />
          </Row>
        </Col>
        <Col>
          {/* Table reservation form */}
          <ReservationForm selectedTableId={selectedTableId} />
        </Col>
      </Row>
    </>
  );
}

const DisplayTables = ({ setSelectedTableId, selectedTableId }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    axios
      .get('/api/tables')
      .then((resp) => {
        const tableData = resp.data;
        // Assuming the response data structure is an array of table objects with 'id' and 'capacity' properties
        const tablesWithCapacity = tableData.map((table) => ({
          id: table.id,
          capacity: table.capacity,
        }));
        setTables(tablesWithCapacity);
      })
      .catch((err) => alert(err));
  };

  const handleTableClick = (tableId) => {
    setSelectedTableId(tableId);
  };

  return (
    <Container>
      <Row>
        {tables.map((table) => (
          <Col key={table.id}>
            <div
              style={{
                position: 'relative', // Ensure capacity text stays within the square
                margin: '15px',
                width: '150px',
                height: '150px',
                backgroundColor:
                  selectedTableId === table.id ? 'lightgreen' : 'lightblue',
                borderRadius: '20px',
                textAlign: 'center',
                lineHeight: '100px', // Center content vertically
                cursor: 'pointer',
              }}
              onClick={() => handleTableClick(table.id)}
            >
              <div style={{ marginBottom: '-50px' }}>{`Table ${table.id}`}</div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '0  px',
                  left: '0',
                  right: '0',
                }}
              >
                {' '}
                {/* Adjust position of capacity text */}
                {`Capacity: ${table.capacity}`}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export { SelectRooms };
