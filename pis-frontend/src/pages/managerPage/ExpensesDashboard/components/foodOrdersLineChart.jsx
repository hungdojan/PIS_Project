import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const OrdersLineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('/api/orders'); // Fetch all orders
        const orders = response.data;

        // Process orders to create data for the chart
        const data = {
          labels: [],
          datasets: [
            {
              label: 'Orders',
              data: [],
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
          ],
        };

        // Group orders by date
        const ordersByDate = {};
        orders.forEach((order) => {
          const date = new Date(order.atTime.substring(0, 10)); // Parse date with Date object
          const formattedDate = formatDate(date); // Format date for Chart.js
          if (!ordersByDate[formattedDate]) {
            ordersByDate[formattedDate] = 0;
          }
          ordersByDate[formattedDate]++;
        });

        // Populate chart data
        Object.keys(ordersByDate).forEach((date) => {
          data.labels.push(date);
          data.datasets[0].data.push(ordersByDate[date]);
        });

        setChartData(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData(); // Fetch order data when component mounts
  }, []); // Run effect only once when component mounts

  // Function to format date for Chart.js
  const formatDate = (date) => {
    // Return in 'YYYY-MM-DD' format
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <h2>Orders Over Time</h2>
      {chartData && <Line data={chartData} />}
    </div>
  );
};

export {OrdersLineChart};
