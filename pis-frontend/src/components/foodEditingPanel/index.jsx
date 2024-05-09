import { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Container,
  Button,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import './FoodEditPanel.css';

const FoodEditPanel = ({
  onUpdate,
  onCancel,
  onDelete,
  item,
  lockFunction,
}) => {
  const clearedItem = {
    name: '',
    description: '',
    price: 0.0,
    type: '',
    allergens: '',
    grams: 0,
    volume: 0,
    category: 'food',
  };
  const [foodItem, setFoodItem] = useState(structuredClone(clearedItem));
  const [valid, setValid] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    resetState();
    setFoodItem(item || defaultItem());
  }, [item]);

  const defaultItem = () => {
    return structuredClone(clearedItem);
  };

  const handleChange = (e) => {
    if (!e.target.id) {
      return;
    }
    setEdit(true);
    lockFunction(false);
    const field = e.target.id;
    let value = e.target.value;
    if (['volume', 'grams'].includes(field)) {
      value = parseInt(e.target.value);
      if (isNaN(value)) {
        value = 0;
      }
    }
    const updateFoodItem = {
      ...foodItem,
      [field]: value,
    };
    setFoodItem(updateFoodItem);
  };

  const resetState = () => {
    setShowCancelModal(false);
    setShowDeleteModal(false);
    setFoodItem(defaultItem());
    setEdit(false);
    lockFunction(true);
    setValid(false);
  };

  const handleCancel = () => {
    if (edit) {
      setShowCancelModal(true);
    } else {
      setFoodItem(defaultItem());
      onCancel();
    }
  };

  const handleSubmit = (e) => {
    const form = e.target.parentElement;
    setValid(true);
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    foodItem.price = parseFloat(foodItem.price);
    onUpdate(foodItem);
    resetState();
  };

  const renderCancelModal = () => {
    const handleModal = () => {
      resetState();
      onCancel();
    };

    return (
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel the edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Do you really want to cancel? Your progress will be removed.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderDeleteModal = () => {
    const handleModal = () => {
      resetState();
      onDelete(foodItem);
    };
    return (
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete existing food item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Do you really want to delete this food item? Your progress will be
            removed.
          </div>
          <Container className="mt-3 border rounded">
            <Row>
              <Col>
                <strong>Food ID:</strong> {foodItem.id}
              </Col>
              <Col>
                <strong>Category:</strong> {foodItem.category}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Name:</strong> {foodItem.name}
              </Col>
              <Col>
                <strong>Description:</strong> {foodItem.description}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Type:</strong> {foodItem.type}
              </Col>
              <Col>
                {foodItem.category === 'food' ? (
                  <>
                    <strong>Weight:</strong> {foodItem.grams} g
                  </>
                ) : (
                  <>
                    <strong>Volume:</strong> {foodItem.volume} ml
                  </>
                )}
              </Col>
            </Row>
            {foodItem.category === 'food' && (
              <Row>
                <Col>
                  <strong>Allergens:</strong> {foodItem.allergens}
                </Col>
              </Row>
            )}
            <Row>
              <Col>
                <strong>Active:</strong> {foodItem.active}
              </Col>
              <Col>
                <strong>Price:</strong> {foodItem.price + ' EUR'}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <h2>Food Editing Panel</h2>
      <Container>
        {edit && <h4>Being edited</h4>}
        <Form noValidate validated={valid}>
          <Form.Group>
            <Form.Label>Item category:</Form.Label>
            <Form.Select
              value={foodItem.category}
              disabled={foodItem.id}
              key={foodItem.controlID}
              id="category"
              onChange={(e) => handleChange(e)}
            >
              <option value="food">Food</option>
              <option value="drink">Drink</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={foodItem.name}
              key={foodItem.controlID}
              required
              id="name"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={foodItem.description}
              key={foodItem.controlID}
              required
              id="description"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Type:</Form.Label>
            {/* TODO: select from a list */}
            <Form.Control
              type="text"
              placeholder="Type"
              value={foodItem.type}
              key={foodItem.controlID}
              required
              id="type"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          {foodItem.category === 'food' ? (
            <>
              <Form.Group>
                <Form.Label className="mt-2">Allergens:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Allergens"
                  value={foodItem.allergens}
                  key={foodItem.controlID}
                  id="allergens"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Weight:</Form.Label>
                {/* TODO: allow only numbers */}
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Weight"
                    value={foodItem.grams}
                    required
                    key={foodItem.controlID}
                    id="grams"
                    pattern="^\d+$"
                    onChange={(e) => handleChange(e)}
                  />
                  <InputGroup.Text>g</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </>
          ) : (
            <Form.Group>
              <Form.Label className="mt-2">Volume:</Form.Label>
              {/* TODO: select from a list */}
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Volume"
                  value={foodItem.volume}
                  required
                  key={foodItem.controlID}
                  id="volume"
                  onChange={(e) => handleChange(e)}
                />
                <InputGroup.Text>ml</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label className="mt-2">Price:</Form.Label>
            {/* TODO: allow only numbers */}
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Price"
                value={foodItem.price}
                required
                key={foodItem.controlID}
                id="price"
                pattern="^\d+(:?\.\d{1,2})?$"
                onChange={(e) => handleChange(e)}
              />
              <InputGroup.Text>EUR</InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                Wrong format. Float number is expected (max 2 decimal numbers).
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Missing price
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Check
              className="my-2"
              type="checkbox"
              label="active"
              id="active"
              onChange={(e) => handleChange(e)}
              // set value
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>{' '}
          {foodItem.id && (
            <>
              <Button
                variant="danger"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
                disabled={edit}
              >
                Delete
              </Button>{' '}
            </>
          )}
          <Button variant="success" onClick={handleSubmit} disabled={!edit}>
            {foodItem.id ? 'Update' : 'Create'}
          </Button>
        </Form>
      </Container>
      {renderCancelModal()}
      {renderDeleteModal()}
    </>
  );
};

export default FoodEditPanel;
