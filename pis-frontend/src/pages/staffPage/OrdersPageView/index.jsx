import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Nav,
  ListGroup,
  Button,
  Card,
} from 'react-bootstrap'; // Import ListGroup, Button, and Card
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaRegCircleXmark, FaRegCircleCheck } from 'react-icons/fa6';
import './OrdersPageView.css';
// import PrivateHeaderBar from '../../../components/privateHeaderBar';

const OrdersPageView = () => {
  // const [navbarHeight, setNavbarHeight] = useState(0);
  // Orders for a table
  const [orders, setOrders] = useState([]);
  // Table number list
  const [tables, setTables] = useState([]);
  // Display orders for a selected table
  const [showOrderList, setShowOrderList] = useState(true);
  // Selected table
  const [selectedTable, setSelectedTable] = useState(null); // State to track selected table
  // Checked food items in an order list
  const [checkedItems, setCheckedItems] = useState({}); // State to store checked items
  // Summarized price
  const [sumPrice, setSumPrice] = useState(0);
  // Summarized price of checked items
  const [checkedSumPrice, setCheckedSumPrice] = useState(0);
  // A list of meals and beverages
  const [allFoodItems, setAllFoodItems] = useState([]);

  useEffect(() => {
    document.title = 'Orders Page';
    // Fetch initial ordered food

    fetchTables();
    fetchAllMenuItems();

    // // Handle correct 100% height with the navigation bar above the container
    // function handleResize() {
    //   const navbar = document.querySelector('.navbar-menu');
    //   if (navbar) {
    //     setNavbarHeight(navbar.offsetHeight);
    //   }
    // }
    // handleResize();
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchTables = () => {
    axios
      .get('/api/tables')
      .then((resp) => {
        setTables(resp.data);
      })
      .catch((err) => {
        alert(err); // TODO: delete this
      });
  };

  const fetchAllMenuItems = () => {
    axios.all([axios.get('/api/foods'), axios.get('/api/drinks')]).then(
      axios.spread((foodResp, drinkResp) => {
        setAllFoodItems([
          ...foodResp.data.map((item) => {
            return {
              ...item,
              category: 'food',
            };
          }),
          ...drinkResp.data.map((item) => {
            return {
              ...item,
              category: 'drink',
            };
          }),
        ]);
      })
    );
  };

  const fetchOrderForTable = (table) => {
    axios
      .get(`/api/tables/${table.id}/orders`, {
        params: {
          paidFilter: 'true',
        },
      })
      .then((resp) => {
        setOrders(resp.data);
        updateSumOfOrder(resp.data);
      })
      .catch((err) => alert(err));
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    fetchOrderForTable(table);
    setCheckedItems({});
    updateSelectedPrice({});
  };

  // Open the food list on add-click
  const handleAddFood = () => {
    setShowOrderList(false);
  };

  // Add food to list and go back to a previous window
  const handleFoodClick = (foodItem) => {
    const newOrder = {
      food: foodItem.category === 'food' ? foodItem.id : undefined,
      drink: foodItem.category === 'drink' ? foodItem.id : undefined,
      atTime: new Date().toISOString(),
      toTable: selectedTable.id,
    };
    axios
      .post('/api/orders', newOrder)
      .then((resp) => {
        handleTableSelect(selectedTable);
        setShowOrderList(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCheckboxChange = (target, index, item) => {
    target.className += ' active';
    const tempCheckItems = checkedItems;
    if (tempCheckItems.hasOwnProperty(index)) {
      delete tempCheckItems[index];
    } else {
      tempCheckItems[index] = item;
    }
    setCheckedItems(tempCheckItems);

    updateSelectedPrice(tempCheckItems);
  };

  // Checkout checked food items
  const handleCheckout = () => {
    const selectedItems = Object.values(checkedItems).map((item) => {
      return {
        ...item,
        food: item.food ? item.food.id : undefined,
        drink: item.drink ? item.drink.id : undefined,
        toTable: item.toTable ? item.toTable.id : undefined,
        toRoom: item.toRoom ? item.toRoom.id : undefined,
        payed: true,
      };
    });
    console.log(selectedItems);

    // TODO: a list endpoint
    selectedItems.forEach((item) => {
      axios
        .put('/api/orders', item)
        .then((resp) => {})
        .catch((err) => console.debug(err));
    });
    handleTableSelect(selectedTable);
  };

  const updateSumOfOrder = (orders) => {
    // retrieve prices
    const foodPrices = orders.map((order) => {
      return order.food !== undefined ? order.food.price : order.drink.price;
    });
    setSumPrice(
      (Math.round(foodPrices.reduce((a, b) => a + b, 0) * 100) / 100).toFixed(2)
    );
  };

  const updateSelectedPrice = (selectedItems) => {
    const prices = Object.values(selectedItems).map((item) => {
      return item.food ? item.food.price : item.drink.price;
    });
    console.log(prices);

    const totalPrice = (
      Math.round(prices.reduce((a, b) => a + b, 0) * 100) / 100
    ).toFixed(2);
    setCheckedSumPrice(totalPrice);
  };

  const handleCheckAll = () => {
    // Set/check all element indexes to true
    const newObj = Object.assign({}, orders);
    setCheckedItems(newObj);
    updateSelectedPrice(newObj);
  };

  const handleUncheckAll = () => {
    setCheckedItems({});
    updateSelectedPrice({});
  };

  // Remove food from the list
  const handleRemove = () => {
    const selectedItems = Object.values(checkedItems).map((item) => item.id);
    console.log(selectedItems);

    // TODO: a list endpoint
    selectedItems.forEach((id) => {
      axios
        .delete(`/api/orders/${id}`)
        .then((resp) => {})
        .catch((err) => console.debug(err));
    });
    handleTableSelect(selectedTable);
  };

  const handleRenderOrderList = () => {
    setShowOrderList(true);
  };

  const renderOrderedFoodItem = () => {
    return orders.map((item, index) => {
      const orderItem = item.food !== undefined ? item.food : item.drink;
      const orderPortion =
        item.food !== undefined
          ? `${orderItem.grams} g`
          : `${orderItem.volume / 1000} l`;
      return (
        <ListGroup.Item
          key={index}
          action
          onClick={(event) => {
            handleCheckboxChange(event.target, index, item);
          }}
          active={checkedItems.hasOwnProperty(index)}
        >
          <Row>
            <Col md={6}>{orderItem.name}</Col>
            <Col md={3} className="text-end">
              {orderPortion}
            </Col>
            <Col md={3} className="text-end">
              {orderItem.price} EUR
            </Col>
          </Row>
        </ListGroup.Item>
      );
    });
  };

  const renderShowOrderedList = () => {
    return (
      <>
        <h2>
          Ordered Food for{' '}
          <span className="table-title">Table {selectedTable.id}</span>
        </h2>
        <div className="order-list-box">
          <div className="order-list">
            <ListGroup>{renderOrderedFoodItem()}</ListGroup>
          </div>
        </div>

        <div className="box-summary">
          <span className="checked-sum-price">{checkedSumPrice}&nbsp;EUR</span>
          &nbsp;/&nbsp;
          <span className="sum-price">{sumPrice}&nbsp;EUR</span>
        </div>

        {/* Right bottom buttons */}
        <div className="div-buttons">
          <Button
            variant="primary"
            type="submit"
            className="btn-add-food"
            onClick={handleAddFood}
          >
            <FaPlus />
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="btn-add-food"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="btn-add-food"
            onClick={handleCheckAll}
          >
            <FaRegCircleCheck className="pb-1" />
            &nbsp;all
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="btn-add-food"
            onClick={handleUncheckAll}
          >
            <FaRegCircleXmark className="pb-1" />
            &nbsp;all
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="btn-add-food"
            onClick={handleRemove}
          >
            <FaTrash />
          </Button>
        </div>
      </>
    );
  };

  const renderShowFoodList = () => {
    return (
      <>
        {/* If a table is not selected, show the info text */}
        {!selectedTable && (
          <div className="null-text">
            Please select a table to view ordered food
          </div>
        )}

        {/* If the adding food page should be shown */}
        {selectedTable && (
          <>
            <div className="box-food-items">
              <Row>
                {allFoodItems.map((food, index) => (
                  <Col key={index} md={6} lg={4} xl={3} className="mb-3">
                    {/* Food item */}
                    <Card
                      className="food-card h-100"
                      onClick={() => handleFoodClick(food)}
                    >
                      <Card.Body>
                        <Card.Title>{food.name}</Card.Title>
                        <Card.Body className="p-0 text-end">
                          {food.allergens !== undefined
                            ? `${food.grams} g`
                            : `${food.volume / 1000} l`}
                        </Card.Body>
                        <Card.Body className="p-0 text-end">
                          <b>{food.price} EUR</b>
                        </Card.Body>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {/* TODO: css or change layout of this button */}
              <Button onClick={handleRenderOrderList}>Back</Button>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <Container
      fluid
      className="staff-main-container"
      // style={{ paddingTop: navbarHeight }}
    >
      <Row className="panel">
        {/*Left side - tables */}
        <Col sm={3} className="p-0">
          <div className="left-panel">
            <Nav className="flex-column">
              {/* Render tables as links */}
              {tables.map((table) => (
                <Nav.Item key={table} className="nav-table-item">
                  <Nav.Link
                    className="nav-table-link"
                    active={selectedTable === table}
                    onClick={() => handleTableSelect(table)}
                  >
                    Table {table.id}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </Col>
        {/* Right side - Ordered food list */}
        <Col sm={9} className="p-0">
          <div className="right-panel">
            {/* If a table is selected and the list windows is showed */}
            {selectedTable && showOrderList
              ? renderShowOrderedList()
              : renderShowFoodList()}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersPageView;
