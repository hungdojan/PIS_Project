import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./MenuPage.css"

const MenuPage = () => {
  useEffect(() => {
    document.title = 'Menu Page';
    fetchMenu(); // Simulate fetching menu data when component mounts
  }, []);

  const [menuData, setMenuData] = useState([]); // State to store menu data

  // TODO Function to simulate fetching menu data
  const fetchMenu = () => {
    // Dummy menu data for testing
    const dummyMenuData = [
      { id: 1, name: "Chicken soup", category: "Appetizers", price: 229, weight: "150 g", description: "Description for Item 1" },
      { id: 2, name: "Stuffed mushrooms", category: "Appetizers", price: 149, weight: "190 g", description: "Description for Item 2" },
      { id: 3, name: "Pork steak", category: "Main Courses", price: 89, weight: "150 g", description: "Description for Item 3" },
      { id: 4, name: "Lemon salmon", category: "Main Courses", price: 119, weight: "250 g", description: "Description for Item 4" },
      { id: 5, name: "Tiramisu", category: "Desserts", price: 349, weight: "150 g", description: "Description for Item 5" },
      { id: 6, name: "Fries", category: "Side dishes", price: 39, weight: "50 g", description: "Description for Item 6" },
      { id: 7, name: "Onion rings", category: "Other", price: 39, weight: "50 g", description: "Description for Item 7" },
      { id: 8, name: "Coke", category: "Beverages", price: 349, weight: "50 ml", description: "Description for Item 8" }
    ];
    setMenuData(dummyMenuData); // TODO dummy data
  };

  const renderMenu = () => {
    // Group menu items by food categories
    const groupedMenu = {};
    menuData.forEach(item => {
      if (!groupedMenu[item.category]) {
        groupedMenu[item.category] = [];
      }
      groupedMenu[item.category].push(item);
    });

    // Render each category with its items
    return Object.entries(groupedMenu).map(([category, items]) => (
      <div>
        <h2 className="category">{category}</h2>
          {items.map(item => (
            <Card className="mb-2 card-food">
              <Card.Body>
                <Row>
                  <Col md={10}>
                    <Card.Title className="food-name">{item.name}</Card.Title>
                    <Card.Text className="food-text">{item.description}</Card.Text>
                  </Col>
                  <Col md={2} className="right-info">
                    <Card.Text className="food-price">{item.price} CZK</Card.Text>
                    <Card.Text className="food-text">{item.weight}</Card.Text>
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
