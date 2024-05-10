import { Container, Row, Col } from 'react-bootstrap';
import TodayRevenue from './components/todaysRevenue';
import { TodayOrdersCount } from './components/todaysOrderCount';
import { AverageOrderCount } from './components/averageOrderCount';
import { AverageRevenue } from './components/averageRevenue';
import { RevenueLineChart } from './components/revenueLineChart';
import { FoodDrinkPieChart } from './components/drinksFoodPieChart';
import { OrdersLineChart } from './components/foodOrdersLineChart';
// =========== VIEW 2 ===========
const Expenses = () => {
  return (
    <Container fluid>
      {/* First row with 4 elements */}
      <Row className="mb-3">
        <Col>
          <TodayRevenue />
        </Col>
        <Col>
          <TodayOrdersCount />
        </Col>
        <Col>
          <AverageOrderCount />
        </Col>
        <Col>
          <AverageRevenue />
        </Col>
      </Row>
      {/* Second row with 2 elements */}
      <Row className="mb-3">
        <Col md={9}>
          <RevenueLineChart />
        </Col>
        <Col md={3}>
          <FoodDrinkPieChart />
        </Col>
      </Row>
      {/* Third row with 3 elements */}
      <Row>
        <Col md={6}>
          <OrdersLineChart />
        </Col>
      </Row>
    </Container>
  );
};

export { Expenses };
