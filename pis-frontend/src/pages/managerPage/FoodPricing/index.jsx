import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  FormSelect,
} from 'react-bootstrap';
import { capitalToUpperCase } from '../../../utils/constants';
import './FoodPricing.css';

function ElementForm({ onSave, onDelete, item }) {
  const clearedItem = {
    id: -1,
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

  useEffect(() => {
    setFoodItem(item || defaultItem());
    setValid(false);
    setEdit(false);
  }, [item]);

  const defaultItem = () => {
    return structuredClone(clearedItem);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFoodItem({
      ...foodItem,
      category: value,
    });
  };

  return (
    <Container>
      <Form noValidate validated={valid}>
        <Form.Group>
          <Form.Label>Item category:</Form.Label>
          <Form.Select
            onChange={handleCategoryChange}
            value={foodItem.category}
            disabled={foodItem.id !== -1}
            key={foodItem.controlID}
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
            />
            <InputGroup.Text>EUR</InputGroup.Text>
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Missing price
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="secondary">Cancel</Button>{' '}
        <Button variant="success">Create</Button>
      </Form>
    </Container>
  );
}

const FilterPanel = ({ filter, filterVals, onUpdate, onAddNew }) => {
  const handleOnChange = () => {
    onUpdate(filter);
  };
  return (
    <Row className="my-3">
      {/* Dropdown for filtering food categories */}
      {Object.keys(filterVals).map((_filterKey) => {
        return (
          <>
            <Col className="">
              <Container className="justify-content-center text-center">
                {capitalToUpperCase(_filterKey) + ':'}
              </Container>
            </Col>
            <Col>
              <FormSelect
                value={filter[_filterKey]}
                onChange={(e) => {
                  filter[_filterKey] = e.target.value;
                  handleOnChange();
                }}
              >
                {filterVals[_filterKey].map((value) => {
                  return (
                    <option value={value}>{capitalToUpperCase(value)}</option>
                  );
                })}
              </FormSelect>
            </Col>
          </>
        );
      })}
      <Col>
        <Button onClick={onAddNew}>Add new item</Button>
      </Col>
    </Row>
  );
};

const FoodItemRow = ({ item, onChange }) => {
  let cn = 'food-values border p-1 rounded my-1 ';
  cn += item.isActive ? 'active' : '';

  return (
    <Row
      key={item.controlID}
      className={cn}
      onClick={() => onChange(item.controlID)}
    >
      <Col className="text-center">{item.category}</Col>
      <Col className="text-center">{item.controlID}</Col>
      <Col className="text-center">{item.name}</Col>
      <Col className="text-center">{capitalToUpperCase(item.type)}</Col>
      <Col className="text-center">
        {item.category === 'food' ? `${item.grams} g` : `${item.volume} ml`}
      </Col>
      <Col className="text-center">{item.price}</Col>
    </Row>
  );
};

// =========== VIEW 3 ===========
const FoodPricing = () => {
  const [foodItems, setFoodItems] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    priceLeftRange: 0,
    priceRightRange: Infinity,
  });
  const [filterValues, setFilterValues] = useState({
    category: ['all', 'food', 'drink'],
    type: ['all'],
  });
  const [foodToDisplay, setFoodToDisplay] = useState([]);

  useEffect(() => {
    axios.all([axios.get('/api/foods'), axios.get('/api/drinks')]).then(
      axios.spread((foodResp, drinkResp) => {
        const _foodItems = {};
        foodResp.data.forEach((item) => {
          _foodItems[`F${item.id}`] = {
            ...item,
            category: 'food',
            controlID: `F${item.id}`,
            isActive: false,
          };
        });
        drinkResp.data.forEach((item) => {
          _foodItems[`D${item.id}`] = {
            ...item,
            category: 'drink',
            controlID: `D${item.id}`,
            isActive: false,
          };
        });
        setFoodItems(_foodItems);
        applyFilters(Object.values(_foodItems), filters);
      })
      // TODO: reset selected meal
    );
    // TODO: fill food and drink types
  }, []);

  const resetSelectedItem = () => {
    // TODO:
    setSelectedItem();
  };

  const setActiveItem = (itemID) => {
    const item = foodItems[itemID];

    selectedItem.isActive = false;
    if (selectedItem.controlID !== item.controlID) {
      item.isActive = true;
      setSelectedItem(item);
    } else {
      setSelectedItem({});
    }
  };

  const applyFilters = (_data, _filters) => {
    const filteredItems = Object.values(_data).filter((item) => {
      return _filters.category === 'all' || _filters.category === item.category;
    });
    setFoodToDisplay(filteredItems);
  };

  const handleOnUpdate = (_filter) => {
    applyFilters(foodItems, _filter);
  };

  const renderFoodItem = () => {};

  return (
    <Container fluid className="pl-3 pe-0 pt-0">
      <Row>
        <Col sm={12} md={9} className="pt-3 pe-4">
          <h2>Food Overview</h2>
          <FilterPanel
            filter={filters}
            filterVals={filterValues}
            onUpdate={handleOnUpdate}
          />
          <Row className="food-headers mb-2">
            <Col className="text-center">Category</Col>
            <Col className="text-center">Control ID</Col>
            <Col className="text-center">Name</Col>
            <Col className="text-center">Type</Col>
            <Col className="text-center">Weight/Volume</Col>
            <Col className="text-center">Price (EUR)</Col>
          </Row>
          {foodToDisplay.map((food) => (
            <FoodItemRow item={food} onChange={setActiveItem} />
          ))}
          {renderFoodItem()}
        </Col>
        <Col sm={0} md={3} className="food-edit-panel p-3">
          <h2>Food Editing Panel</h2>
          <ElementForm item={selectedItem} />
        </Col>
      </Row>
    </Container>
  );
};

export default FoodPricing;
