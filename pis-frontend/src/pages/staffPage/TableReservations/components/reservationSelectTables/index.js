import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'; // Import `ListGroup, Button, and Card
import { RoomReservationForm } from '../roomReservationForm';

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
          <RoomReservationForm/>
        </Row>

      </Row>
      <Row>
        <TablesLayout />
      </Row>
      <Row>
        <Col className="bottom-row">All tables count</Col>
        <Col className="bottom-row">Total capacity</Col>
      </Row>
    </>
  );
}

function TablesLayout() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableClick = (table) => {
    setSelectedTable(selectedTable === table ? null : table);
    console.log('You clicked on', table.name);
  };

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
          className={`table-row ${selectedTable && selectedTable.id === table.id ? 'selected' : ''}`}
          onClick={() => handleTableClick(table)}
        >
          {table.name}
        </div>
      ))}
    </div>
  );
}

export { SelectRooms };
