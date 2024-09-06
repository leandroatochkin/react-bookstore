import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { index } from '../../utils/endpointIndex.js';
import { debounce } from '../../utils/utils';
import CheckoutButton from './CheckoutButton';
import { motion } from 'framer-motion';
import style from './shoppingcart.module.css';


const ShoppingCart = ({ shoppingCart, onRemove, isLoggedIn, profileData }) => {
  const [sessionId, setSessionId] = useState(''); 

  const updatePurchasesInDatabase = useCallback(debounce(async (items, userId) => {
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
    if (!isLoggedIn || shoppingCart.length === 0) return;

    const createCheckoutSession = async () => {
      try {
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
    <div className={style.shoppingCartDisplay} aria-label="Shopping Cart Overview">
      {shoppingCart.length > 0 ? (
        <div className={style.shoppingCartContainer}>
        {shoppingCart.map((item, i) => (
          <div key={i} className={style.shoppingCartCard} aria-label={`Item: ${item.title}`}>
            <img src={item.cover} alt={`Cover of ${item.title}`} className={style.shoppingCartCardImg}/>
            <div className={style.shoppingCartCardInfo}>
              <h2 aria-label={`Title: ${item.title}`}>{item.title.length < 20 ? item.title : item.title.slice(0, 19) + '...'}</h2>
              <p aria-label={`Quantity: ${item.quantity}`}>Quantity: {item.quantity}</p>
              <div className={style.shoppingCartCardBottomContainer} aria-label="Item price and remove button">
                <p aria-label={`Price: $${item.price}`}>Price: ${item.price}</p>
                <motion.button 
                  className={style.removeFromCart} 
                  onClick={() => onRemove(item.id)} 
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.25" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-trash-2"
                    aria-hidden="true"
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
            
        ))}
        </div>
      ) : (
        <div className={style.starsPlaceholder} aria-label="Empty cart message">
          <div className={style.menuContainer}>
            <div>
              <h2 aria-label="No items in cart">You don't have any items yet...</h2>
              <motion.div 
                className={style.shopButton} 
                whileTap={{ scale: 0.95 }} 
                aria-label="Shop Now button"
              >
                <Link to='/categories' aria-label="Go to categories to shop">Shop Now</Link>
              </motion.div>
            </div>
          </div>
        </div>
      )}
      {sessionId && <CheckoutButton sessionId={sessionId} aria-label="Proceed to checkout button" />}
    </div>
  );
};

export default ShoppingCart;
