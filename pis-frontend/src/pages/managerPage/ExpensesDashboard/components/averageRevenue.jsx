import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AverageRevenue = () => {
  const [averageRevenue, setAverageRevenue] = useState(0);

  useEffect(() => {
    // Function to fetch all orders and calculate average revenue
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Fetch all orders
        const orders = response.data;
        
        // Calculate total revenue
        let totalRevenue = 0;
        orders.forEach(order => {
          if (order.food) {
            totalRevenue += order.food.price;
          }
          if (order.drink) {
            totalRevenue += order.drink.price;
          }
        });

        // Calculate average revenue
        const average = totalRevenue / orders.length;

        setAverageRevenue(average.toFixed(2)); // Format average revenue to two decimal places
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchAllOrders(); // Call the function when component mounts

  }, []); // Run effect only once when component mounts

  return (
    <div>
    <h3>{averageRevenue}€</h3>
      <h4>Average Revenue</h4>
    </div>
  );
};

export {AverageRevenue};
