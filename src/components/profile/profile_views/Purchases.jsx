import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './purchases.module.css';
import { Spinner } from '@nextui-org/spinner';
import { motion } from 'framer-motion';
import BookView from '../../BookView';

const Purchases = ({ profile, setShoppingCart }) => {


  const purchases = profile ? profile.purchases : [];

  return (
    <div className={styles.purchasesContainer}>
      <div className={styles.purchasesList}>
        {profile.purchases.length > 0 ? (
          purchases.map((purchase, outerIndex) => (//Remember: purchases is an array of arrays that contains objects
            <div key={outerIndex}>
              {purchase.map((item, innerIndex) => (
                <div className={styles.event} key={`${outerIndex}-${innerIndex}`}>
                  <div className={styles.purchaseDate}>{new Date(item.timestamp).toLocaleString()}</div>
                  <div className={styles.eventTitle}>{item.name}</div>
                  <div className={styles.eventTime}>Quantity: {item.quantity}</div>
                  <div className={styles.eventLocation}>Price: ${item.price.toFixed(2)}</div>
                  <div className={styles.buttonsContainer}>
                  </div>
                  <div className={styles.separator}></div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div><h3>You have no purchases yet. Wanna give it a <Link to="/categories">try</Link>?</h3></div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
