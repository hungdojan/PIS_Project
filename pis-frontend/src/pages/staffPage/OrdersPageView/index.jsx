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
import PrivateHeaderBar from '../../../components/privateHeaderBar';

const OrdersPageView = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  // Ordered food items
  const [orders, setOrders] = useState([]);
  // Table number list
  const [tables, setTables] = useState([]);
  // Predicate to show the default food order list, not the add-list
  const [showAddFoodForm, setShowAddFoodForm] = useState(true);
  // Food items to select from
  const [foodList, setFoodList] = useState([]);
  // Selected table
  const [selectedTable, setSelectedTable] = useState(null); // State to track selected table
  // Checked food items in an order list
  const [checkedItems, setCheckedItems] = useState({}); // State to store checked items
  // Summarized price
  const [sumPrice, setSumPrice] = useState(0);
  // Summarized price of checked items
  const [checkedSumPrice, setCheckedSumPrice] = useState(0);
  const [allDrink, setAllDrink] = useState([]);
  const [allFood, setAllFood] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [allFoodItems, setAllFoodItems] = useState([]);

  useEffect(() => {
    document.title = 'Orders Page';
    // Fetch initial ordered food

    fetchTables();
    fetchAllMenuItems();
    // fetchOrderedFood();
    // setFoodList(dummyFoodList);

    // // TODO
    // localStorage.setItem('role', 'staff');

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
        setAllFoodItems([...foodResp.data, ...drinkResp.data]);
      })
    );
    // // load food
    // axios
    //   .get('/api/foods')
    //   .then((resp) => {
    //     setAllFood(resp.data);
    //   })
    //   .catch((err) => {
    //     alert(err); // TODO: delete this
    //   });

    // // load drinks
    // axios
    //   .get('/api/drinks')
    //   .then((resp) => {
    //     setAllDrink(resp.data);
    //   })
    //   .catch((err) => {
    //     alert(err); // TODO: delete this
    //   });
  };

  const fetchOrderForTable = (table) => {
    axios
      .get(`/api/tables/${table.id}/orders`)
      .then((resp) => {
        setOrders(resp.data);
        // list of ordered items
        const foodItems = resp.data
          .map((order) => {
            return [...order.foods, ...order.drinks];
          })
          .flat();
        setOrderedItems(foodItems);
        updateSumOfOrder(resp.data);
      })
      .catch((err) => alert(err));
  };

  // const dummyFoodList = [
  //   {
  //     id: 1,
  //     name: 'Chicken soup',
  //     category: 'Appetizers',
  //     price: 229,
  //     weight: '150 g',
  //     description: 'Description for Item 1',
  //   },
  //   {
  //     id: 2,
  //     name: 'Stuffed mushrooms',
  //     category: 'Appetizers',
  //     price: 149,
  //     weight: '190 g',
  //     description: 'Description for Item 2',
  //   },
  //   {
  //     id: 3,
  //     name: 'Pork steak',
  //     category: 'Main Courses',
  //     price: 89,
  //     weight: '150 g',
  //     description: 'Description for Item 3',
  //   },
  //   {
  //     id: 4,
  //     name: 'Lemon salmon',
  //     category: 'Main Courses',
  //     price: 119,
  //     weight: '250 g',
  //     description: 'Description for Item 4',
  //   },
  //   {
  //     id: 5,
  //     name: 'Tiramisu',
  //     category: 'Desserts',
  //     price: 349,
  //     weight: '150 g',
  //     description: 'Description for Item 5',
  //   },
  //   {
  //     id: 6,
  //     name: 'Fries',
  //     category: 'Side dishes',
  //     price: 39,
  //     weight: '50 g',
  //     description: 'Description for Item 6',
  //   },
  //   {
  //     id: 7,
  //     name: 'Onion rings',
  //     category: 'Other',
  //     price: 39,
  //     weight: '50 g',
  //     description: 'Description for Item 7',
  //   },
  //   {
  //     id: 8,
  //     name: 'Coke',
  //     category: 'Beverages',
  //     price: 349,
  //     weight: '50 ml',
  //     description: 'Description for Item 8',
  //   },
  //   {
  //     id: 9,
  //     name: 'Beer',
  //     category: 'Beverages',
  //     price: 45,
  //     weight: '500 ml',
  //     description: 'Description for Item 9',
  //   },
  // ];

  // const fetchOrderedFood = () => {
  //   // Replace this with loading table names/ids
  //   const dummyTables = [[1], [2], [3]];

  //   // Load food items for a current table
  //   const orderedFoodObj = {};
  //   dummyTables.forEach((order) => {
  //     const [tableNumber, ...foodItems] = order;
  //     orderedFoodObj[tableNumber] = foodItems;
  //   });
  //   setOrderedFood(orderedFoodObj);

  //   // Set available table numbers based on the fetched data
  //   setTables(dummyTables.map((data) => data[0]));
  // };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    fetchOrderForTable(table);
  };

  // Open the food list on add-click
  const handleAddFood = () => {
    setShowAddFoodForm(false);
  };

  // Add food to list and go back to a previous window
  const handleFoodClick = (food) => {
    // const updatedOrderedFood = { ...orderedFood };
    // if (!updatedOrderedFood[selectedTable]) {
    //   updatedOrderedFood[selectedTable] = [];
    // }
    // updatedOrderedFood[selectedTable].push(food);
    // setOrderedFood(updatedOrderedFood);
    // setShowAddFoodForm(true);
    // setSumPrice(calcSumPrice(updatedOrderedFood[selectedTable]));
  };

  const handleCheckboxChange = (index) => {
    // setCheckedItems((prevItems) => {
    //   const updatedItems = {
    //     ...prevItems,
    //     [index]: !prevItems[index],
    //   };
    //   // Calculate sum price of checked items based on updated checkedItems
    //   const checkedIndexes = Object.keys(updatedItems).filter(
    //     (index) => updatedItems[index]
    //   );
    //   const allSelectedFood = checkedIndexes.map(
    //     (index) => orderedFood[selectedTable][index]
    //   );
    //   const checkedSumPrice = calcSumPrice(allSelectedFood);
    //   // Update state with checked sum price
    //   setCheckedSumPrice(checkedSumPrice);
    //   return updatedItems;
    // });
  };

  // Checkout checked food items
  const handleCheckout = () => {
    // const checkedIndexes = Object.keys(checkedItems).filter(
    //   (index) => checkedItems[index]
    // );
    // const allSelectedFood = checkedIndexes.map(
    //   (index) => orderedFood[selectedTable][index]
    // );
    // setCheckedItems([]);
    // alert(
    //   'Food to checkout: ' + allSelectedFood.map((food) => food.name).join(', ')
    // );
  };

  const updateSumOfOrder = (orders) => {
    // retrieve prices
    const foodPrices = orders
      .map((order) => {
        return [
          ...order.foods.map((i) => i.price),
          ...order.drinks.map((i) => i.price),
        ];
      })
      .flat();
    setSumPrice(
      (Math.round(foodPrices.reduce((a, b) => a + b, 0) * 100) / 100).toFixed(2)
    );
  };

  const handleCheckAll = () => {
    // Set/check all element indexes to true
    // const allChecked = orderedFood[selectedTable].map(() => true);
    // setCheckedItems(allChecked);
  };

  const handleUncheckAll = () => {
    setCheckedItems([]);
  };

  // Remove food from the list
  const handleRemove = () => {
    // const updatedOrderedFood = orderedFood[selectedTable].filter(
    //   (food, index) => !checkedItems[index]
    // );
    // setOrderedFood({
    //   ...orderedFood,
    //   [selectedTable]: updatedOrderedFood,
    // });
    // setCheckedItems([]);
    // setSumPrice(calcSumPrice(updatedOrderedFood));
  };

  const calcSumPrice = (o) => {
    let total = 0;
    if (o) {
      o.forEach((food) => {
        total += food.price;
      });
    }
    return total;
  };

  const renderOrderedFoodItem = () => {
    console.log(orderedItems);
    return orderedItems.map((item, index) => {
      return (
        <ListGroup.Item
          key={index}
          action
          onClick={() => handleCheckboxChange(index)}
          // active={index}
        >
          <Row>
            <Col md={6}>{item.name}</Col>
            <Col md={3} className="text-end">
              {item.allergens !== undefined
                ? `${item.grams} g`
                : `${item.volume / 1000} l`}
            </Col>
            <Col md={3} className="text-end">
              {item.price} EUR
            </Col>
          </Row>
        </ListGroup.Item>
      );
    });
  };

  const renderAddFoodForm = () => {
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

  const renderShowOrderedFood = () => {
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
      style={{ paddingTop: navbarHeight }}
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
            {selectedTable && showAddFoodForm
              ? renderAddFoodForm()
              : renderShowOrderedFood()}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersPageView;
