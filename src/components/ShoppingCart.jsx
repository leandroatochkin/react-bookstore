// src/ShoppingCart.js
import React, { useState, useEffect } from 'react';
import { API_endpoint } from '../utils/utils';
import CheckoutButton from './CheckoutButton';

const ShoppingCart = ({ shoppingCart }) => {
  const [sessionId, setSessionId] = useState('');
  console.log(shoppingCart.title)
  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        const response = await fetch(API_endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [
              {
                name: shoppingCart.title,
                price: shoppingCart.price,
                quantity: 1 // You can adjust quantity as needed
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data); // Log session ID
        setSessionId(data.id);
      } catch (error) {
        console.error('Error fetching the session ID:', error);
      }
    };

    createCheckoutSession();
    console.log(sessionId)
  }, [shoppingCart, sessionId]);

  return sessionId ? <CheckoutButton sessionId={sessionId} /> : <div>Loading...</div>;
};

export default ShoppingCart;
