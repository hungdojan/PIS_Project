import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  const [menuOffers, setMenuOffers] = useState([]);
  const [totalPricePerMenu, setTotalPricePerMenu] = useState({});

  useEffect(() => {
    document.title = 'Restaurant';

    axios
      .get('/api/menus')
      .then((resp) => {
        const offerItems = resp.data;
        setMenuOffers([...menuOffers, ...offerItems]);

        // Calculate total prices
        const calculatedTotalPrices = {};
        offerItems.forEach((menu) => {
          let totalPrice = 0;
          menu.foods.forEach((food) => {
            if (food.price) {
              totalPrice += food.price;
            }
          });
          menu.drinks.forEach((drink) => {
            if (drink.price) {
              totalPrice += drink.price;
            }
          });
          calculatedTotalPrices[menu.id] = totalPrice;
        });
        // Update total prices object
        setTotalPricePerMenu(calculatedTotalPrices);
      })
      .catch((err) => {
        alert(err); // TODO: delete this
      });
  }, []);

  const capitalToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const renderMenuOffers = () => {
    const desc = [];
    // console.log(menuOffers);

    menuOffers.forEach((menu) => {
      desc[menu.id] = [];
      // ----- Foods -----
      if (menu.foods.length == 0) {
        desc[menu.id].push({
          name: '',
          grams: '',
          allergens: ''
        });
      } else {
        menu.foods.forEach((food) => {
          let food_grams = food.grams || '';
          if (food_grams)
            food_grams += " g";
          let price = food.price || '';
          if (price)
            price += " €";
          desc[menu.id].push({
            name: food.name || '',
            grams: food_grams,
            price: price,
            allergens: food.allergens
          });
        });
      }

      // ----- Drinks -----
      if (menu.drinks.length == 0) {
        desc[menu.id].push({
          name: '',
          volume: ''
        });
      } else {
        menu.drinks.forEach((drink) => {
          let drink_volume = drink.volume || '';
          if (drink_volume)
            drink_volume += " ml";
          let price = drink.price || '';
          if (price)
            price += " €";
          desc[menu.id].push({
            name: drink.name || '',
            volume: drink_volume,
            price: price
          });
        });
      }
    });
    console.log(desc);
    console.log(totalPricePerMenu);

    function extractWeekdayAbbreviation(description) {
      const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      for (let i = 0; i < weekdays.length; i++) {
        if (description.toLowerCase().includes(weekdays[i])) {
          return weekdays[i].substring(0, 3).toUpperCase();
        }
      }
      return "";
    }

    return (
      <div>
        {menuOffers.map((item) => (
          <Row key={item.id} className="mb-2">
            <Col xs={4} md={3} lg={2} xl={2}>
              <div className="week-day">
                {extractWeekdayAbbreviation(item.description)}
              </div>
            </Col>
            <Col xs={8} md={9} lg={10} xl={10}>
              <Card className="mb-0 card-food card-menu">
                <Card.Body>
                  <Row>
                    <Card.Title className="food-name">{item.name}
                      <span className="total-menu-price">{totalPricePerMenu[item.id] > 0? totalPricePerMenu[item.id].toString() + " €": ""}</span></Card.Title>
                    {desc[item.id].map((item, index) => (
                      <Card.Text key={index} className="food-text food-menu-text">
                        <Row>
                          <Col md={4} lg={6} xl={8}>
                            {item.name}{item.allergens? " (" + item.allergens + ")": ""}
                          </Col>
                          <Col md={4} lg={3} xl={2} className="food-units">
                            {item.grams? item.grams: item.volume}
                          </Col>
                          <Col md={4} lg={3} xl={2} className="price-units">
                            {item.price}
                          </Col>
                        </Row>
                      </Card.Text>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    );
  };

  return (
    <Container className="main-container">
      <h1>Welcome to our Restaurant!</h1>
      <h2 className="pb-2">Check out our menu :)</h2>
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
