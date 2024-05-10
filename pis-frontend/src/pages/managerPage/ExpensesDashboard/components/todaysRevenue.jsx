import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodayRevenue = () => {
  const [todayRevenue, setTodayRevenue] = useState(0);

  useEffect(() => {
    // Function to fetch all orders and calculate today's revenue
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Fetch all orders
        const orders = response.data;

        // Calculate today's revenue
        let revenue = 0;
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        orders.forEach((order) => {
          if (order.atTime.startsWith(today)) {
            if (order.food) {
              revenue += order.food.price;
            }
            if (order.drink) {
              revenue += order.drink.price;
            }
          }
        });

        setTodayRevenue(revenue.toFixed(2)); // Format revenue to two decimal places
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchAllOrders(); // Call the function when component mounts
  }, []); // Run effect only once when component mounts

  return (
    <div>
      <h3>{todayRevenue} €</h3>
      <h4>Today's Revenue</h4>
    </div>
  );
};

export default TodayRevenue;
