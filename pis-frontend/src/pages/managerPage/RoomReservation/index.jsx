import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Dropdown,
  Form,
  DropdownButton,
  Container,
  Button,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa6';
import axios from 'axios';

// =========== VIEW 1 ===========
const ManageRoomsDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectTable, setSelectTable] = useState();
  const [selectRoom, setSelectRoom] = useState();

  const _selectRoom = (_room) => {
    setSelectRoom(_room);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = () => {
    axios
      .get('/api/rooms')
      .then((resp) => {
        setRooms(resp.data);
      })
      .catch((err) => alert(err));
    axios
      .get('/api/tables')
      .then((resp) => {
        setTables(resp.data);
      })
      .catch((err) => alert(err));
  };

  const handleUpdateRoom = () => {
    // axios.put('/api/rooms', selectRoom).then(() => fetchAll());
    // setSelectRoom();
  };

  const handleUpdateTable = () => {
    // axios.put('/api/tables', selectTable).then(() => fetchAll());
    // setSelectTable();
  };

  return (
    <Row>
      <Col className="manage-rooms ps-3">
        <MainContainer
          rooms={rooms}
          tables={tables}
          fetchAll={fetchAll}
          setSelectRoom={_selectRoom}
          setSelectTable={setSelectTable}
        />
      </Col>
      <Col md={3} className="editing-tool">
        <TableEditForm
          room={selectRoom}
          table={selectTable}
          onUpdateRoom={handleUpdateRoom}
          onUpdateTable={handleUpdateTable}
        />
      </Col>
    </Row>
  );
};

const MainContainer = ({
  rooms,
  tables,
  fetchAll,
  setSelectRoom,
  setSelectTable,
}) => {
  return (
    <>
      <Row className="pt-4 pe-3">
        <h4>Room overview</h4>
        <RoomOverview
          rooms={rooms}
          fetchAll={fetchAll}
          setSelectRoom={setSelectRoom}
        />
      </Row>
      <Row>
        <h4 className="mt-1 pt-4">Table overview</h4>
        <TableManagement
          tables={tables}
          fetchAll={fetchAll}
          setSelectTable={setSelectTable}
        />
      </Row>
    </>
  );
};

const RoomOverview = ({ rooms, fetchAll, setSelectRoom }) => {
  const handleDelete = (room) => {
    axios
      .delete(`/api/rooms/${room.id}`)
      .then(() => fetchAll())
      .catch((err) => alert(err));
  };

  const addRoom = () => {
    axios
      .post('/api/rooms', { capacity: 20, description: 'The Room' })
      .then(() => fetchAll())
      .catch((err) => alert(err));
  };

  return (
    <>
      <Container fluid className="container-tables mt-2">
        <Button onClick={addRoom} className="btn-add-table">
          Add Room
        </Button>
        <Row>
          {rooms.map((room, index) => {
            return (
              <Col key={index} xs={12} sm={6} md={4} lg={2} className="mt-4">
                <TableComponent
                  isTable={false}
                  onDelete={() => {
                    handleDelete(room);
                  }}
                  onSelect={setSelectRoom}
                  data={room}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

const TableComponent = ({ data, isTable = true, onDelete, onSelect }) => {
  return (
    <div className="table" onClick={() => onSelect(data)}>
      <div className="table-id">
        {isTable ? 'Table' : 'Room'} <b className="text-primary">{data.id}</b>
      </div>
      <div>
        Capacity:&nbsp;
        <span className="text-danger fw-bold">{data.capacity}</span>
      </div>
      <button className="btn-trash text-danger" onClick={onDelete}>
        <FaTrash />
      </button>
    </div>
  );
};

const TableManagement = ({ tables, fetchAll, setSelectTable }) => {
  const addTable = () => {
    // TODO
    axios
      .post('/api/tables', { capacity: 5 })
      .then(() => fetchAll())
      .catch((err) => alert(err));
  };

  const handleRemoveTable = (table_id) => {
    // TODO
    axios
      .delete(`/api/tables/${table_id}`)
      .then(() => {
        fetchAll();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Container fluid className="container-tables mt-2">
        <Button onClick={addTable} className="btn-add-table">
          Add Table
        </Button>
        <Row className="table-management-container">
          {tables.map((table, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={2} className="mt-4">
              <TableComponent
                data={table}
                onSelect={setSelectTable}
                onDelete={() => handleRemoveTable(table.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

const TableEditForm = ({ onUpdateRoom, onUpdateTable, table, room }) => {
  const [_room, setRoom] = useState({
    capacity: 0,
    description: '',
  });
  const [_table, setTable] = useState({
    capacity: 0,
  });

  useEffect(() => {
    setRoom(
      room || {
        capacity: 0,
        description: '',
      }
    );
    setTable(table || { capacity: 0 });
  }, [table, room]);

  const handleRoomChange = (e) => {
    const id = e.target.id;
    setRoom({
      ..._room,
      [id]: e.target.value,
    });
  };
  const handleTableChange = (e) => {
    const id = e.target.id;
    setTable({
      ..._table,
      [id]: e.target.value,
    });
  };
  const handleRoomSave = () => {
    onUpdateRoom();
  };
  const handleTableSave = () => {
    onUpdateTable();
  };

  return (
    <>
      <div className="p-4">
        <h4>Room info</h4>
        <div>
          <input
            id="description"
            type="text"
            placeholder="Room Description"
            value={_room.description}
            className="input-field m-0 mb-2"
            onChange={handleRoomChange}
            disabled
          />
        </div>
        <div>
          <input
            id="capacity"
            type="number"
            placeholder="Capacity"
            value={_room.capacity}
            className="input-field m-0"
            onChange={handleRoomChange}
            disabled
          />
        </div>
        {/* <div className="pt-3">
          <Button onClick={handleRoomSave} className="me-2">
            Save
          </Button>
        </div> */}
      </div>

      <div className="p-4">
        <h4>Table info</h4>
        <div>
          <input
            id="capacity"
            type="number"
            placeholder="Capacity"
            value={_table.capacity}
            className="input-field m-0"
            onChange={handleTableChange}
            disabled
          />
        </div>
        {/* <div className="pt-3">
          <Button onClick={handleTableSave} className="me-2">
            Save
          </Button>
        </div> */}
      </div>
    </>
  );
};

export default ManageRoomsDashboard;
