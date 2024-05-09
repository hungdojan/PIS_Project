import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const FoodDrinkPieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchFoodDrinkData = async () => {
      try {
        const response = await axios.get('/api/orders'); // Fetch all orders
        const orders = response.data;

        // Count the number of food and drink orders
        let foodCount = 0;
        let drinkCount = 0;
        orders.forEach(order => {
          if (order.food) {
            foodCount++;
          }
          if (order.drink) {
            drinkCount++;
          }
        });

        // Create data for the pie chart
        const data = {
          labels: ['Food', 'Drink'],
          datasets: [
            {
              label: 'Food vs Drink',
              data: [foodCount, drinkCount],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)', // Red for food
                'rgba(54, 162, 235, 0.6)'  // Blue for drink
              ]
            }
          ]
        };

        setChartData(data);
      } catch (error) {
        console.error('Error fetching food and drink data:', error);
      }
    };

    fetchFoodDrinkData(); // Fetch food and drink data when component mounts
  }, []); // Run effect only once when component mounts

  return (
    <div>
      <h2>Food vs Drink Ratio</h2>
      {chartData && chartData.datasets && (
        <Pie data={chartData} />
      )}
    </div>
  );
};

export {FoodDrinkPieChart};
