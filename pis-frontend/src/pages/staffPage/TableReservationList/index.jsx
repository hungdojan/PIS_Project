import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const TableReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('');
  const [selectedTimeTo, setSelectedTimeTo] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = () => {
    axios
      .get('/api/reservations')
      .then((resp) => {
        setReservations(resp.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        fetchAllReservations();
        alert("Reservation deleted successfully.");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTimeFromChange = (event) => {
    setSelectedTimeFrom(event.target.value);
  };

  const handleTimeToChange = (event) => {
    setSelectedTimeTo(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTimeFrom('');
    setSelectedTimeTo('');
    setSearchName('');
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (selectedCategory === 'table' && reservation.tables.length === 0) {
      return false;
    }
    if (selectedCategory === 'room' && reservation.roomIds.length === 0) {
      return false;
    }
    if (selectedTimeFrom && new Date(reservation.at.split('[UTC]')[0]).getTime() < new Date(selectedTimeFrom).getTime()) {
      return false;
    }
    if (selectedTimeTo && new Date(reservation.until.split('[UTC]')[0]).getTime() > new Date(selectedTimeTo).getTime()) {
      return false;
    }
    if (searchName && !reservation.name.toLowerCase().includes(searchName.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <Container>
      <Row className="mb-3">
        <Col sm={3}>
          <Form.Select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">Select Category</option>
            <option value="table">Table</option>
            <option value="room">Room</option>
          </Form.Select>
        </Col>
        <Col sm={3}>
          <Form.Control type="datetime-local" onChange={handleTimeFromChange} value={selectedTimeFrom} />
        </Col>
        <Col sm={3}>
          <Form.Control type="datetime-local" onChange={handleTimeToChange} value={selectedTimeTo} />
        </Col>
        <Col sm={3}>
          <Form.Control type="text" placeholder="Search by Name" onChange={handleSearchNameChange} value={searchName} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Row className="fw-bold">
            <Col>Ordering Number</Col>
            <Col>Reservation ID</Col>
            <Col>Name</Col>
            <Col>Phone Number</Col>
            <Col>From</Col>
            <Col>To</Col>
            <Col>Resource</Col>
            <Col>Actions</Col>
          </Row>
        </Col>
      </Row>

      {filteredReservations.map((reservation, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col>{index + 1}</Col>
          <Col>{reservation.id}</Col>
          <Col>{reservation.name}</Col>
          <Col>{reservation.phone}</Col>
          <Col>{new Date(reservation.at.split('[UTC]')[0]).toLocaleString()}</Col>
          <Col>{new Date(reservation.until.split('[UTC]')[0]).toLocaleString()}</Col>
          <Col>
            {reservation.tables.length > 0 ? (
              <span>Table {reservation.tables[0].id}</span>
            ) : (
              reservation.roomIds.length > 0 ? (
                <span>Room {reservation.roomIds[0].id}</span>
              ) : (
                <span>No Resource</span>
              )
            )}
            {reservation.roomIds.length > 0 && reservation.roomIds[0].description && (
              <span> - {reservation.roomIds[0].description}</span>
            )}
          </Col>
          <Col>
            <Button
              variant="danger"
              onClick={() => handleDelete(reservation.id)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export { TableReservationsList };

