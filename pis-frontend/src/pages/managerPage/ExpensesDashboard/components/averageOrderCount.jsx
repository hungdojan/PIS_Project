import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AverageOrderCount = () => {
  const [averageOrderCount, setAverageOrderCount] = useState(0);

  useEffect(() => {
    // Function to fetch all orders and calculate average order count per day
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Fetch all orders
        const orders = response.data;
        
        // Calculate total number of days and total number of orders
        const uniqueDays = new Set(orders.map(order => order.atTime.substring(0, 10))); // Extracting date part from atTime
        const totalDays = uniqueDays.size;
        const totalOrders = orders.length;

        // Calculate average order count per day
        const average = totalOrders / totalDays;

        setAverageOrderCount(Math.round(average)); // Round to the nearest whole number
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchAllOrders(); // Call the function when component mounts

  }, []); // Run effect only once when component mounts

  return (
    <div>
      <h2>Average Order Count Per Day: {averageOrderCount}</h2>
    </div>
  );
};

export  {AverageOrderCount};