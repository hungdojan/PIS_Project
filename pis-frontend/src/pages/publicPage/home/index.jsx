import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Container, Card, Row, Col } from "react-bootstrap";
import './HomePage.css';


const HomePage = () => {
  return (
    <>
      <Container className="main-container">
        <h1>Welcome to our Restaurant!</h1>
        <Row className="mt-5">
          <Col>
            <Card className="card-daily-offer">
              <Card.Body>
                <Card.Title>Daily Offer</Card.Title>
                <Card.Text>
                  <Row>
                    <Col md={3}>
                      Menu 1:
                    </Col>
                    <Col md={9}>
                      Fried Chicken with Caesar Salad
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      Menu 2:
                    </Col>
                    <Col md={9}>
                      Spaghetti Carbonara with Garlic Bread
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      Today's Special:
                    </Col>
                    <Col md={9}>
                      Grilled Salmon with Seasonal Vegetables
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Button className="btn-reservation">Create a reservation</Button>
      </Container>
    </>
  );
};

export default HomePage;
