import { useEffect, useState } from 'react';
import './AdminPage.css';
import {
  Container,
  Button,
  ListGroupItem,
  ListGroup,
  FormText,
  Modal,
  Form,
  ButtonGroup,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisteredWindow = (props) => {
  const [user, setUser] = useState({
    id: 0,
    username: '',
    password: '',
    role: 'staff',
  });

  useEffect(() => {
    setUser(props.selectedUser);
  }, [props]);

  const handleClose = (event) => {
    props.onSave(event.target.id === 'save', user);
    setUser({
      id: 0,
      username: '',
      password: '',
      role: 'staff',
    });
    props.setShow(false);
  };

  const handleUsernameChange = (event) => {
    setUser({
      ...user,
      username: event.target.value,
    });
    console.log(user);
  };
  const handlePasswordChange = (event) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };
  const handleRoleChange = (event) => {
    setUser({
      ...user,
      role: event.target.value,
    });
  };

  // console.log(user.id);

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        onEscapeKeyDown={(event) => {
          event.preventDefault();
        }}
      >
        <Modal.Header>
          <Modal.Title>User info</Modal.Title>
        </Modal.Header>
        <Modal.Body key={'modal-body-' + user.id}>
          <Form>
            <Form.Group className="mb-3" controlId="username-input">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                autoFocus
                onChange={handleUsernameChange}
                value={user.username}
                key={user.id + '-username'}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role-select">
              <Form.Label>Role</Form.Label>
              <Form.Select onChange={handleRoleChange} value={user.role}>
                <option value="admin">admin</option>
                <option value="manager">manager</option>
                <option value="chef">chef</option>
                <option value="staff">staff</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password-input">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={user.password}
                key={user.id + '-password'}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} id="close">
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} id="save">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const UserList = (props) => {
  const user = props.user;
  const handleOnEdit = props.handleOnEdit;
  const handleOnDelete = props.handleOnDelete;
  return (
    <ListGroup>
      <ListGroupItem key={'item' + user.username}>
        <div className="user-list-item">
          <FormText>{user.username}</FormText>
          <FormText>{user.role}</FormText>
          <ButtonGroup>
            <Button id={user.id} onClick={handleOnEdit}>
              Edit
            </Button>
            <Button id={user.id} onClick={handleOnDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </ListGroupItem>
    </ListGroup>
  );
};

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: 0,
    username: '',
    password: '',
    role: 'staff',
  });
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    navigate('/staff');
  }
  const [lastID, setLastID] = useState(0);

  useEffect(() => {
    document.title = 'Admin page';
    const tempUsers = [
      { id: 1, username: 'test', role: 'staff', password: 'pass1' },
      { id: 2, username: 'test2', role: 'staff', password: 'pass2' },
      { id: 3, username: 'test3', role: 'staff', password: 'pass3' },
    ];
    setUsers(tempUsers);
    setLastID(Math.max(...tempUsers.map((a) => a.id)) + 1);
  }, []);

  // console.log(lastID);

  const handleOnEdit = (event) => {
    const row = parseInt(event.target.id);
    const index = users.findIndex((item) => item.id === row);
    setSelectedUser(users[index]);
    setShow(true);
  };

  const handleOnDelete = (event) => {
    const row = parseInt(event.target.id);
    setUsers(users.filter((item) => item.id !== row));
  };

  const registerUserButtonOnClick = (event) => {
    setSelectedUser({
      id: lastID,
      username: '',
      password: '',
      role: 'staff',
    });
    setShow(true);
  };

  const handleOnSave = (save, user) => {
    if (!save) {
      return;
    }
    console.log(lastID);
    console.log(user.id);
    if (lastID === user.id) {
      users.push(user);
      setLastID(lastID + 1);
    } else {
      const index = users.findIndex((item) => item.id === user.id);
      users[index] = {
        ...user,
      };
    }
    setSelectedUser({
      id: lastID,
      username: '',
      password: '',
      role: 'staff',
    });
  };

  return (
    <Container>
      {users.map((user) => (
        <UserList
          user={user}
          handleOnEdit={handleOnEdit}
          handleOnDelete={handleOnDelete}
          key={user.id}
        />
      ))}
      <Button onClick={registerUserButtonOnClick}>Add new user</Button>
      <RegisteredWindow
        show={show}
        setShow={setShow}
        onSave={handleOnSave}
        selectedUser={selectedUser}
      />
    </Container>
  );
};

export default AdminPage;
