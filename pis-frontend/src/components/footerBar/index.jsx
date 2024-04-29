import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './FooterBar.css';
import {FaFacebook, FaInstagram, FaPhone, FaAt} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";


const FooterBar = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col sm={6} md={3}>
            <h5>About Us</h5>
            <p>We're more than just a&nbsp;meal, we're an experience that brings people together</p>
          </Col>
          <Col sm={6} md={3}>
            <h5>Contact Us</h5>
            <p>Božetěchova 1/2, 612 00<br/>Brno-Královo Pole</p>
            <p><FaAt/>&nbsp;&nbsp;info@restaurant.com</p>
            <p><FaPhone/>&nbsp;&nbsp;+420 541 141 298</p>
          </Col>
          <Col sm={7} md={4}>
            <h5>Opening Hours</h5>
            <Row className="opening-hours">
              <Row>
                <Col md={5}>
                  <div>Monday</div>
                  <div>Tuesday</div>
                  <div>Wednesday</div>
                  <div>Thursday</div>
                  <div>Friday</div>
                  <div>Saturday</div>
                </Col>
                <Col md={7}>
                  <div>10:00 - 22:00</div>
                  <div>10:00 - 23:00</div>
                  <div>10:00 - 23:00</div>
                  <div>10:00 - 23:00</div>
                  <div>10:00 - 01:00</div>
                  <div>08:00 - 01:00</div>
                </Col>
              </Row>
            </Row>
          </Col>
          <Col sm={5} md={2} className="contacts">
            <h5>Follow Us</h5>
              <a href="https://www.instagram.com"><FaInstagram/></a>
              <a href="https://www.facebook.com"><FaFacebook/></a>
              <a href="https://www.x.com"><FaXTwitter/></a>
          </Col>
        </Row>
      </Container>
      <div className="copyright text-center">
        <p>&copy; {new Date().getFullYear()} PIS Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterBar;
