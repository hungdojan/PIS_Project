import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const RevenueLineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get('/api/orders'); // Fetch all orders
        const orders = response.data;

        // Process orders to create data for the chart
        const data = {
          labels: [],
          datasets: [
            {
              label: 'Revenue',
              data: [],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };

        // Group revenue by date
        const revenueByDate = {};
        orders.forEach((order) => {
          const date = new Date(order.atTime.substring(0, 10)); // Parse date with Date object
          const formattedDate = formatDate(date); // Format date for Chart.js
          if (!revenueByDate[formattedDate]) {
            revenueByDate[formattedDate] = 0;
          }
          if (order.food) {
            revenueByDate[formattedDate] += order.food.price;
          }
          if (order.drink) {
            revenueByDate[formattedDate] += order.drink.price;
          }
        });

        // Populate chart data
        Object.keys(revenueByDate).forEach((date) => {
          data.labels.push(date);
          data.datasets[0].data.push(revenueByDate[date]);
        });

        setChartData(data);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchRevenueData(); // Fetch revenue data when component mounts
  }, []); // Run effect only once when component mounts

  // Function to format date for Chart.js
  const formatDate = (date) => {
    // Return in 'YYYY-MM-DD' format
    return date.toISOString().split('T')[0];
  };
  // Function to format ticks on y-axis (display actual value in euros)
  const formatYTicks = (value) => {
    return `${value}€`; // Adding euro symbol to actual values
  };
  const options = {
    scales: {
      y: {
        ticks: {
          callback: function(value, index, values) {
            // Format y-axis ticks as actual values in euros
            return formatYTicks(value);
          }
        }
      }
    }
  }
  return (
    <div>
      <h2>Revenue Over Time</h2>
      {chartData && <Line data={chartData} options={options}></Line>}
    </div>
  );
};

export { RevenueLineChart };
