import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Dropdown, Container, Button } from 'react-bootstrap'; // Import `ListGroup, Button, and Card
import { RoomReservationForm } from '../roomReservationForm';
import { ReservationForm } from '../tableReservationForm';

function SelectRooms() {
  // =========== CLICK EVENTS ===========
  const [selectedRoomDescription, setSelectedRoomDescription] = useState('');

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
          <RoomReservationForm />
        </Row>
      </Row>
      <Row>
       <Col>
       <Row>
          <Col className="bottom-row">All tables count</Col>
          <Col className="bottom-row">Total capacity</Col>
        </Row>
        <Row>
          <DisplayTables />
        </Row>
        </Col>
        <Col>
          {/* Table reservation form */}
          <ReservationForm/>
        </Col>
      </Row>
    </>
  );
}

const DisplayTables = () => {
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('/api/tables');
        if (response.ok) {
          const tableData = await response.json();
          setTables(tableData);
        } else {
          console.error('Failed to fetch tables');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTables();
  }, []);

  const handleTableClick = (tableId) => {
    setSelectedTableId(tableId);
  };

  return (
    <Container>
      <h2>Table Layout</h2>
      <Row>
        {tables.map((table) => (
          <Col key={table.id}>
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: selectedTableId === table.id ? 'lightgreen' : 'lightblue',
                border: '1px solid black',
                textAlign: 'center',
                lineHeight: '100px', // Center content vertically
                cursor: 'pointer',
              }}
              onClick={() => handleTableClick(table.id)}
            >
              {`Table ${table.id}`}
              <br />
              {`Capacity: ${table.capacity}`}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export { SelectRooms };
