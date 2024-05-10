import { Container, Row, Col } from 'react-bootstrap';
import TodayRevenue from './components/todaysRevenue';
import { TodayOrdersCount } from './components/todaysOrderCount';
import { AverageOrderCount } from './components/averageOrderCount';
import { AverageRevenue } from './components/averageRevenue';
import { RevenueLineChart } from './components/revenueLineChart';
import { FoodDrinkPieChart } from './components/drinksFoodPieChart';
import { OrdersLineChart } from './components/foodOrdersLineChart';
import './components/components.css';
// =========== VIEW 2 ===========
const Expenses = () => {
  return (
    <Container fluid>
      {/* First row with 4 elements */}
      <Row className="mb-3">
        <Col className='expenses-col'>
          <TodayRevenue />
        </Col>
        <Col className='expenses-col'>
          <TodayOrdersCount />
        </Col>
        <Col className='expenses-col'>
          <AverageOrderCount />
        </Col>
        <Col className='expenses-col'>
          <AverageRevenue />
        </Col>
      </Row>
      {/* Second row with 2 elements */}
      <Row className="mb-3">
        <Col className='expenses-col'>
          <RevenueLineChart />
        </Col>
        <Col md={3} className='expenses-col'>
          <FoodDrinkPieChart />
        </Col>
      </Row>
      {/* Third row with 3 elements */}
      <Row>
        <Col md={6} className='expenses-col'>
          <OrdersLineChart />
        </Col>
      </Row>
    </Container>
  );
};

export { Expenses };
