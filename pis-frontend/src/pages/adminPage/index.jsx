import axios from 'axios';
import { useEffect, useState } from 'react';
import './AdminPage.css';
import { Container, Button, Modal, Form, Row, Col } from 'react-bootstrap';
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
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setUser(props.selectedUser);
    setValid(false);
    axios
      .get('/api/employees/roles')
      .then((resp) => {
        setRoles(resp.data);
      })
      .catch((err) => alert(err));
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
                {roles.map((r) => {
                  return <option value={r}>{r}</option>;
                })}
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
    <Row className="border mb-1">
      <Col className="text-center my-auto">{user.login}</Col>
      <Col className="text-center my-auto">{user.role}</Col>
      <Col className="float-end text-end">
        <Button id={user.id} onClick={handleOnEdit} variant="success">
          Edit
        </Button>{' '}
        <Button id={user.id} onClick={handleOnDelete} variant="danger">
          Delete
        </Button>
      </Col>
    </Row>
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    const user = users[userId];
    setSelectedUser(user);
    setShowDeleteModal(true);
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

  const renderDeleteModal = () => {
    const handleConfirm = () => {
      axios
        .delete(`/api/employees/${selectedUser.id}`)
        .then(() => {
          fetchUsers();
          setShowDeleteModal(false);
        })
        .catch((err) => alert(err));
    };

    return (
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Do you really want to delete this user?</div>
          <Container className="mt-3 border rounded">
            <Row>
              <Col>
                <strong>ID:</strong>
              </Col>
              <Col>{selectedUser.id}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Username:</strong>
              </Col>
              <Col>{selectedUser.login}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Role:</strong>
              </Col>
              <Col>{selectedUser.role}</Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Row>
        <Col></Col>
        <Col>
          <h1 className="text-center mb-3">Admin page</h1>
        </Col>
        <Col className="my-auto text-center">
          <Button variant="danger" onClick={() => navigate('/logout')}>
            Logout
          </Button>
        </Col>
      </Row>
      <Container>
        <Row className="mb-3 border-bottom">
          <Col className="text-center">Username</Col>
          <Col className="text-center">Role</Col>
          <Col></Col>
        </Row>
        {Object.values(users).map((user) => (
          <UserList
            user={user}
            handleOnEdit={handleOnEdit}
            handleOnDelete={handleOnDelete}
            key={user.id}
          />
        ))}
        <div className="text-end mt-3">
          <Button onClick={registerUserButtonOnClick}>Add new user</Button>
        </div>
        <RegisteredWindow
          show={show}
          setShow={setShow}
          onSave={handleOnSave}
          selectedUser={selectedUser}
        />
        {renderDeleteModal()}
      </Container>
    </>
  );
};

export default AdminPage;
