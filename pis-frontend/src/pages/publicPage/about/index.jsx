import React, {useEffect, useState} from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import './AboutPage.css';


const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Page';
  }, []);

  return (
    <Container className="main-container about-container">
      <h1>About Us</h1>
      <Card className="card-about">
        <Card.Body>
          <Card.Text className="card-text">
            Step into our restaurant, nestled at the heart of Božetěchova 1/2, 612 00 Brno-Královo Pole, and embark on a culinary journey like no other. We're dedicated to crafting mouthwatering dishes using only the freshest, locally-sourced ingredients. Our menu is a delightful fusion of beloved classics and daring innovations, ensuring there's something to satisfy every palate. Whether it's the break of dawn, the midday sun, or the tranquil evening hours, our promise remains the same: an unforgettable dining experience awaits. Come and indulge your senses today — discover the essence of culinary excellence!
          </Card.Text>
        </Card.Body>
      </Card>
      <img className="restaurant-image mt-3"/>
    </Container>
  );
};

export default AboutPage;
