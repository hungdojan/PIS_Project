import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, FormSelect } from 'react-bootstrap';
import { capitalToUpperCase } from '../../../utils/constants';
import './FoodPricing.css';
import FoodEditPanel from '../../../components/foodEditingPanel';

const FilterPanel = ({ filter, filterVals, onUpdate }) => {
  const handleOnChange = () => {
    onUpdate(filter);
  };
  return (
    <Row className="my-3">
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
    </Row>
  );
};

const FoodItemRow = ({ item, onChange, selectable }) => {
  let cn = 'food-values border p-1 rounded my-1 ';
  cn += item.isActive ? 'active' : '';

  const handleOnClick = () => {
    if (!selectable) return;

    onChange(item.controlID);
  };

  return (
    <Row key={item.controlID} className={cn} onClick={handleOnClick}>
      <Col className="text-center my-auto">{item.category}</Col>
      <Col className="text-center my-auto">{item.controlID}</Col>
      <Col className="text-center my-auto">{item.name}</Col>
      <Col className="text-center my-auto">{capitalToUpperCase(item.type)}</Col>
      <Col className="text-center my-auto">{item.price}</Col>
      <Col className="text-center my-auto">
        {/* TODO: */}
        {item.active ? 'Active' : 'Inactive'}
      </Col>
    </Row>
  );
};

// =========== VIEW 3 ===========
const FoodPricing = () => {
  const [foodItems, setFoodItems] = useState({});
  const [selectedItem, setSelectedItem] = useState();
  const [filters] = useState({
    category: 'all',
    type: 'all',
    active: 'all',
    sort: 'ID (Asc)',
  });
  const [filterValues, setFilterValues] = useState({
    category: ['all', 'food', 'drink'],
    type: ['all'],
    active: ['all', 'active', 'inactive'],
    sort: [
      'Category (Asc)',
      'Category (Desc)',
      'ID (Asc)',
      'ID (Desc)',
      'Name (Asc)',
      'Name (Desc)',
      'Price (Asc)',
      'Price (Desc)',
      'Type (Asc)',
      'Type (Desc)',
      'Active (Asc)',
      'Active (Desc)',
    ],
  });
  const [foodToDisplay, setFoodToDisplay] = useState([]);
  const [isSelectable, setIsSelectable] = useState(true);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchFoodItems();
    fetchTypeListing();
  }, []);

  const fetchFoodItems = () => {
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
    );
    setSelectedItem();
  };

  const fetchTypeListing = () => {
    axios
      .all([axios.get('/api/foods/types'), axios.get('/api/drinks/types')])
      .then(
        axios.spread((foodResp, drinkResp) => {
          let _types = ['all'].concat(foodResp.data).concat(drinkResp.data);
          // setTypes(_types);
          setFilterValues({
            ...filterValues,
            type: _types,
          });
        })
      );
  };

  const setActiveItem = (itemID) => {
    const item = foodItems[itemID];

    if (selectedItem) {
      selectedItem.isActive = false;
      if (selectedItem.controlID !== item.controlID) {
        item.isActive = true;
        setSelectedItem(item);
      } else {
        setSelectedItem();
      }
    } else {
      item.isActive = true;
      setSelectedItem(item);
    }
  };

  const handleOnDelete = (foodItem) => {
    const apiEndpoint =
      foodItem.category === 'food' ? '/api/foods' : '/api/drinks';
    axios.delete(`${apiEndpoint}/${foodItem.id}`).then(() => {
      fetchFoodItems();
    });
  };

  const handleOnFoodUpdate = (foodItem) => {
    const apiEndpoint =
      foodItem.category === 'food' ? '/api/foods' : '/api/drinks';
    if (foodItem.id) {
      axios.put(`${apiEndpoint}/${foodItem.id}`, foodItem).then(() => {
        fetchFoodItems();
      });
    } else {
      axios.post(apiEndpoint, foodItem).then(() => {
        fetchFoodItems();
      });
    }
  };

  const handleOnFoodCancel = () => {
    if (selectedItem) {
      selectedItem.isActive = false;
      setSelectedItem();
    }
  };

  const applyFilters = (_data, _filters) => {
    const filteredItems = Object.values(_data)
      .filter((item) => {
        return (
          _filters.category === 'all' || _filters.category === item.category
        );
      })
      .filter((item) => {
        return (
          _filters.active === 'all' ||
          (_filters.active === 'active' && item.active) ||
          (_filters.active === 'inactive' && !item.active)
        );
      })
      .filter((item) => {
        return _filters.type === 'all' || _filters.type === item.type;
      })
      .sort((a, b) => {
        switch (_filters.sort) {
          case 'Category (Desc)':
            return a.category < b.category;
          case 'Category (Asc)':
            return a.category > b.category;
          case 'ID (Desc)':
            return a.controlID < b.controlID;
          case 'ID (Asc)':
            return a.controlID > b.controlID;
          case 'Name (Desc)':
            return a.name < b.name;
          case 'Name (Asc)':
            return a.name > b.name;
          case 'Price (Desc)':
            return a.price < b.price;
          case 'Price (Asc)':
            return a.price > b.price;
          case 'Type (Desc)':
            return a.type < b.type;
          case 'Type (Asc)':
            return a.type > b.type;
          case 'Active (Desc)':
            return a.active < b.active;
          case 'Active (Asc)':
            return a.active > b.active;
          default:
            return a.name > b.name;
        }
      });
    setFoodToDisplay(filteredItems);
  };

  const handleOnFilterUpdate = (_filter) => {
    applyFilters(foodItems, _filter);
  };

  return (
    <Container fluid className="pl-3 pe-0 pt-0">
      <Row>
        <Col sm={12} md={9} className="pt-3 pe-4">
          <h2>Food Overview</h2>
          <FilterPanel
            filter={filters}
            filterVals={filterValues}
            onUpdate={handleOnFilterUpdate}
          />
          <Row className="food-headers mb-2">
            <Col className="text-center">Category</Col>
            <Col className="text-center">Control ID</Col>
            <Col className="text-center">Name</Col>
            <Col className="text-center">Type</Col>
            <Col className="text-center">Price (EUR)</Col>
            <Col className="text-center">Active</Col>
          </Row>
          {foodToDisplay.map((food) => (
            <FoodItemRow
              item={food}
              selectable={isSelectable}
              onChange={setActiveItem}
            />
          ))}
        </Col>
        <Col sm={0} md={3} className="food-edit-panel p-3">
          <FoodEditPanel
            item={selectedItem}
            onUpdate={handleOnFoodUpdate}
            onDelete={handleOnDelete}
            onCancel={handleOnFoodCancel}
            lockFunction={setIsSelectable}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FoodPricing;
