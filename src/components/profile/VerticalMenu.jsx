import React from 'react';
import styles from './VerticalMenu.module.css';
import IconArrowRightSquareFill from '../../utils/icons/ArrowRight';
import { easeIn, motion } from 'framer-motion';

const VerticalMenu = ({ elements, setView }) => {

  const handleClick = (element) => {
    setView(element.value);
  };

  return (
    <div aria-label="Vertical navigation menu">
      <ul className={styles.menuContainer}>
        {elements.map((element, index) => {
          return (
            <React.Fragment key={index}>
              <motion.li
                initial={{ backgroundColor: 'transparent' }}
                whileHover={{
                  backgroundColor: 'white',
                  color: 'black',
                  scale: 1.05,
                  borderRadius: 8,
                  transition: { duration: 0.2, ease: easeIn },
                }}
                className={styles.listItem}
                onClick={() => handleClick(element)}
                aria-label={`Navigate to ${element.name}`}
              >
                <a className={styles.link} href="#" aria-label={element.name}>
                  {element.name}
                </a>
                <IconArrowRightSquareFill aria-hidden="true" />
              </motion.li>
              <div className={styles.separator} aria-hidden="true"></div>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default VerticalMenu;

