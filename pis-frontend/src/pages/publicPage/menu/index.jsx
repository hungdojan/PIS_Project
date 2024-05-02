import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './MenuPage.css';

const MenuPage = () => {
  const [menuData, setMenuData] = useState([]); // State to store menu data

  useEffect(() => {
    document.title = 'Menu Page';
    // Simulate fetching menu data when component mounts
    axios.all([axios.get('/api/foods'), axios.get('/api/drinks')]).then(
      axios.spread((foodResp, drinkResp) => {
        setMenuData([...menuData, ...foodResp.data, ...drinkResp.data]);
      })
    );
  }, []);

  const capitalToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderMenu = () => {
    // Group menu items by food categories
    const groupedMenu = {};
    menuData.forEach((item) => {
      if (!groupedMenu[item.type]) {
        groupedMenu[item.type] = [];
      }
      groupedMenu[item.type].push(item);
    });

    // Render each category with its items
    return Object.entries(groupedMenu).map(([category, items]) => (
      <div>
        <h2 className="category">{capitalToUpperCase(category)}</h2>
        {items.map((item) => (
          <Card className="mb-2 card-food">
            <Card.Body>
              <Row>
                <Col md={10}>
                  <Card.Title className="food-name">{item.name}</Card.Title>
                  <Card.Text className="food-text">
                    {item.description}
                  </Card.Text>
                </Col>
                <Col md={2} className="right-info">
                  <Card.Text className="food-price">{item.price} €</Card.Text>
                  <Card.Text className="food-text">
                    {item.grams !== undefined && `${item.grams} g`}
                    {item.volume !== undefined && `${item.volume / 1000} l`}
                  </Card.Text>
                  {/* item.allergens */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    ));
  };

  return (
    <Container className="main-container">
      <h1>Food Menu</h1>
      {renderMenu()}
    </Container>
  );
};

export default MenuPage;
