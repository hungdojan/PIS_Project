import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodayOrdersCount = () => {
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    // Function to fetch all orders and count orders placed today
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Fetch all orders
        const orders = response.data;
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        let count = 0;
        orders.forEach(order => {
          // Check if order was placed today
          if (order.atTime.startsWith(today)) {
            count++; // Increment count for each order placed today
          }
        });
        setOrdersCount(count);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchAllOrders(); // Call the function when component mounts

  }, []); // Run effect only once when component mounts

  return (
    <div>
      <h2>Total Orders Placed Today: {ordersCount}</h2>
    </div>
  );
};

export {TodayOrdersCount};