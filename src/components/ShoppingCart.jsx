// src/ShoppingCart.js
import React, { useState, useEffect } from 'react';
import { API_endpoint } from '../utils/utils';
import CheckoutButton from './CheckoutButton';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';

const ShoppingCart = ({ shoppingCart, onRemove }) => {

const [sessionId, setSessionId] = useState('');




useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        const response = await fetch(API_endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: shoppingCart.map(item =>({
              name: item.title,
              price: item.price,
              quantity: item.quantity
            }))
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
     
     
        setSessionId(data.id);
      } catch (error) {
        console.error('Error fetching the session ID:', error);
      }
    };

    if (shoppingCart.length > 0) {
      createCheckoutSession();
    } else {
      setSessionId('');
    }
  }, [shoppingCart, sessionId]);

  

  return (
  <div className='shopping-cart-display'>
    {shoppingCart.length > 0 ? (
        shoppingCart.map((item, i) => (
          <div key={i} className='shopping-cart-card'>
            <img src={item.cover} alt={item.title} />
            <div className='shoppingcart-card-info'>
            <h2>{item.title.length < 20 ? item.title : item.title.slice(0,19) + '...'}</h2>
            <p>Quantity: {item.quantity}</p>
            <div className='shoppingcart-card-bottom-container'>
            <p>Price: ${item.price}</p>
            <motion.button  className='remove-from-cart' onClick={()=>onRemove(item.id)}><svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.25" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="lucide lucide-trash-2">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" x2="10" y1="11" y2="17"/>
              <line x1="14" x2="14" y1="11" y2="17"/>
              </svg></motion.button>
            </div>
            </div>
          </div>
        ))
      ) : (
        ''
      )}
    {sessionId ? <CheckoutButton sessionId={sessionId} /> : <div className='loader-container'><CircularProgress /></div>}
  </div>)
};

export default ShoppingCart;
