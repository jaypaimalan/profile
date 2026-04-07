import React, { useEffect, useState } from 'react';
import { Counter } from 'counterapi'; // Official JS client

const PageCounter = () => {
  const [count, setCount] = useState(0);

  // Initialize the counter client
  const counter = new Counter({
    workspace: 'francis-jay-paimalans-team-3630', // Replace with your actual workspace
  });

  useEffect(() => {
    // Increment the counter on page load
    const incrementCounter = async () => {
      try {
        const res = await counter.up('page-view');
        setCount(res.value);
      } catch (err) {
        console.error("CounterAPI error:", err);
      }
    };
    incrementCounter();
  }, []);

  return <div>Total Page Views: {count}</div>;
};

export default Visitors;
