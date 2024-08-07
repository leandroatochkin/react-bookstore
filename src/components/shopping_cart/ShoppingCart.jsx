import React, { useState, useEffect, useCallback } from 'react';
import { index } from '../../utils/endpointIndex.js'
import { debounce } from '../../utils/utils';
import CheckoutButton from './CheckoutButton';
import { motion } from 'framer-motion';
import { Spinner } from '@nextui-org/spinner';
import style from './shoppingcart.module.css'


const ShoppingCart = ({ shoppingCart, onRemove, isLoggedIn, profileData }) => {
  const [sessionId, setSessionId] = useState('');
  console.log(profileData)
  const updatePurchasesInDatabase = useCallback(debounce(async (items, userId) => {//Added a debounce function to delay the execution bc it was execution twice when a purchase was made
    try {

      const response = await fetch(index.update_purchases, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: userId,
          update: items.map(item => ({
            name: item.title,
            price: item.price,
            quantity: item.quantity,
            timestamp: new Date().toISOString()
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Update response:', data);
    } catch (error) {
      console.error("Error updating user's purchases:", error);
    }
  }, 100), []);

  useEffect(() => {
    console.log(profileData.user._id);
  }, [profileData]);

  useEffect(() => {
    if (!isLoggedIn || shoppingCart.length === 0) return;

    const createCheckoutSession = async () => {
      try {
        console.log('Creating checkout session...');
        const response = await fetch(index.stripe, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: shoppingCart.map(item => ({
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
        console.log('Checkout session created:', data);
        setSessionId(data.id);

        // Update the user's purchases in the database
        updatePurchasesInDatabase(shoppingCart, profileData.user._id);
      } catch (error) {
        console.error('Error fetching the session ID:', error);
      }
    };

    createCheckoutSession();
  }, [shoppingCart, isLoggedIn, profileData, updatePurchasesInDatabase]);

  return (
    <div className={style.shoppingCartDisplay}>
      {shoppingCart.length > 0 ? (
        shoppingCart.map((item, i) => (
          <div key={i} className={style.shoppingCartCard}>
            <img src={item.cover} alt={item.title} className={style.shoppingCartCardImg}/>
            <div className={style.shoppingCartCardInfo}>
              <h2>{item.title.length < 20 ? item.title : item.title.slice(0,19) + '...'}</h2>
              <p>Quantity: {item.quantity}</p>
              <div className={style.shoppingCartCardBottomContainer}>
                <p>Price: ${item.price}</p>
                <motion.button className={style.removeFromCart} onClick={() => onRemove(item.id)}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="1.25" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    <line x1="10" x2="10" y1="11" y2="17"/>
                    <line x1="14" x2="14" y1="11" y2="17"/>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        ))
      ) : (
        ''
      )}
      {sessionId ? <CheckoutButton sessionId={sessionId} /> : <div className='loader-container'><Spinner /></div>}
    </div>
  );
};

export default ShoppingCart;
