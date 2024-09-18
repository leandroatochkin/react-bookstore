import React from 'react';
import { Link } from 'react-router-dom';
import styles from './purchases.module.css';

const Purchases = ({ profile, setShoppingCart }) => {
  const purchases = profile ? profile.purchases : [];

  return (
    <div className={styles.purchasesContainer} aria-label="Purchases section">
      <div className={styles.purchasesList}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title} aria-label="Purchases Title">Purchases</h2>
        </div>
        {purchases.length > 0 ? (
          purchases.map((purchase, outerIndex) => (
            <div key={outerIndex} aria-label={`Purchase ${outerIndex + 1}`}>
              {purchase.map((item, innerIndex) => (
                <div className={styles.purchase} key={`${outerIndex}-${innerIndex}`} aria-label={`Purchase item ${innerIndex + 1}`}>
                  <div className={styles.purchaseDate} aria-label={`Purchase date: ${new Date(item.timestamp).toLocaleString()}`}>
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                  <div className={styles.purchaseTitle} aria-label={`Book title: ${item.name}`}>
                    {item.name}
                  </div>
                  <div className={styles.eventTime} aria-label={`Quantity: ${item.quantity}`}>
                    Quantity: {item.quantity}
                  </div>
                  <div className={styles.eventLocation} aria-label={`Price: $${item.price.toFixed(2)}`}>
                    Price: ${item.price.toFixed(2)}
                  </div>
                  <div className={styles.buttonsContainer}>
                    {/* Add buttons here if needed with appropriate aria-labels */}
                  </div>
                  <div className={styles.separator} aria-hidden="true"></div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div aria-live="polite">
            <h3>You have no purchases yet. Wanna give it a <Link to="/categories">try</Link>?</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
