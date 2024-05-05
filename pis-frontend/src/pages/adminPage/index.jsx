import axios from 'axios';
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
import { useAuth } from '../../router/AuthProvider';

const RegisteredWindow = (props) => {
  const [user, setUser] = useState({
    id: 0,
    login: '',
    password: '',
    role: 'staff',
  });
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setUser(props.selectedUser);
    setValid(false);
  }, [props]);

  const handleClose = (event) => {
    // close button
    if (event.target.id === 'close') {
      setUser({
        id: 0,
        login: '',
        password: '',
        role: 'staff',
      });
      props.setShow(false);
      return;
    }

    // form validation
    const form =
      event.currentTarget.parentElement.parentElement.children[1].children[0];
    setValid(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // create/update action
    props.onSave(user, user.id);
    setUser({
      id: 0,
      login: '',
      password: '',
      role: 'staff',
    });
    props.setShow(false);
  };

  const handleUsernameChange = (event) => {
    setUser({
      ...user,
      login: event.target.value,
    });
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
          <Form autoComplete="off" noValidate validated={valid}>
            <Form.Group className="mb-3" controlId="username-input">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                onChange={handleUsernameChange}
                pattern="^[a-zA-Z][\w]{4,}$"
                value={user.login}
                key={user.id + '-login'}
                disabled={user.id !== -1}
              />
              <Form.Control.Feedback type="invalid">
                Username must be at least 5 characters long and must not contain
                any special characters (apart from underscore symbol).
              </Form.Control.Feedback>
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
              <Form.Label>New password</Form.Label>
              <Form.Control
                required={user.id === -1}
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                pattern={
                  user.id === -1
                    ? '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&]).{8,}$'
                    : '^(?:|(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&]).{8,})$'
                }
                value={user.password}
                key={user.id + '-password'}
              />
              <Form.Control.Feedback type="invalid">
                Password must contain at least one upper case, one lower case,
                one special character, one digit and be at least 8 characters
                long.
              </Form.Control.Feedback>
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
          <FormText autoFocus={true} autoComplete="false">
            {user.login}
          </FormText>
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
  const { token } = useAuth();
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

  useEffect(() => {
    document.title = 'Admin page';
    fetchUsers();
  }, []);

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

  const fetchUsers = () => {
    axios
      .get('/api/employees')
      .then((resp) => {
        const _users = {};
        resp.data.forEach((item) => {
          _users[item.id] = item;
        });
        setUsers(_users);
      })
      .catch((err) => {
        alert(err); // TODO:
      });
  };

  const handleOnEdit = (event) => {
    const userId = parseInt(event.target.id);
    const user = users[userId];
    setSelectedUser(user);
    setShow(true);
  };

  const handleOnDelete = (event) => {
    const userId = parseInt(event.target.id);
    axios
      .delete(`/api/employees/${userId}`)
      .then(() => fetchUsers())
      .catch((err) => alert(err));
  };

  const registerUserButtonOnClick = (event) => {
    setSelectedUser({
      id: -1,
      username: '',
      password: '',
      role: 'staff',
    });
    setShow(true);
  };

  const handleOnSave = (user, userId) => {
    if (userId === -1) {
      addNewUser(user);
    } else {
      updateUser(user);
    }
  };

  const addNewUser = (user) => {
    axios
      .post('/api/employees', user)
      .then((resp) => {
        fetchUsers();
      })
      .catch((err) => alert(err));
  };

  const updateUser = (user) => {
    axios
      .put('/api/employees', user)
      .then((resp) => fetchUsers())
      .catch((err) => alert(err));
  };

  return (
    <Container>
      {Object.values(users).map((user) => (
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
