import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  const [menuOffers, setMenuOffers] = useState([]);

  useEffect(() => {
    document.title = 'Restaurant';

    axios
      .get('/api/menus')
      .then((resp) => {
        const offerItems = resp.data;
        setMenuOffers([...menuOffers, ...offerItems]);
      })
      .catch((err) => {
        alert(err); // TODO: delete this
      });
  }, []);

  const capitalToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderMenuOffers = () => {
      // build description string
      const desc = {};
      menuOffers.forEach((menu) => {
        desc[menu.id] = "";
        menu.foods.forEach((food) => {
            desc[menu.id] += food.name;
            desc[menu.id] += " ";
            desc[menu.id] += food.grams;
            desc[menu.id] += "g (";
            desc[menu.id] += food.allergens;
            desc[menu.id] += "), ";
        });
        menu.drinks.forEach((drink) => {
            desc[menu.id] += drink.name;
            desc[menu.id] += " ";
            desc[menu.id] += drink.volume / 1000;
            desc[menu.id] += "L, ";
        });
        // strip the last comma and space
        desc[menu.id] = desc[menu.id].substring(0, desc[menu.id].length - 2);
      });

    return (
      <div>
        {menuOffers.map((item) => (
          <Card className="mb-2 card-food">
            <Card.Body>
              <Row>
                  <Card.Title className="food-name">{item.name}</Card.Title>
                  <Card.Text className="food-text">{item.description}</Card.Text>
                  <Card.Text className="food-text">{desc[item.id]}</Card.Text>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Container className="main-container">
      <h1>Welcome to our Restaurant!</h1>
      <h2>Check out our menu :)</h2>
        {renderMenuOffers()}

      <a
        href="/reservation"
        className="btn btn-primary btn-reservation"
        role="button"
      >
        Create&nbsp;a&nbsp;reservation
      </a>
    </Container>
  );
};

export default HomePage;
