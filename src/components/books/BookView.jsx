import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../../utils/Backdrop';
import QuantityPicker from '../../utils/QuantityPicker';
import { dropIn } from '../../utils/utils';
import IconCheckCircle from '../../utils/icons/CheckIcon';
import SimpleMessage from '../../utils/SimpleMessage';
import style from './bookview.module.css';
import { addFav } from '../../utils/APIfunctions';

const BookView = ({ profileData, book, setShoppingCart, setOpenBuyModal, origin }) => {
  const [value, setValue] = useState(1);
  const [pushingItem, setPushingItem] = useState({
    id: book.id,
    title: book.title,
    price: book.price,
    cover: book.coverImageUrl,
    quantity: 1,
  });

  const [favSent, setFavSent] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);

  useEffect(() => {
    setPushingItem((prevItem) => ({
      ...prevItem,
      quantity: value,
    }));
  }, [value]);

  const handleClose = () => {
    setOpenBuyModal(false);
  };

  const handleBuyBtn = (book) => {
    if (book) {
      setShoppingCart((prevItems) => [...prevItems, pushingItem]);
      setOpenMsg(true);
    }
  };

  const handleFavs = async () => {
    addFav(profileData, book, favSent, setFavSent);
  };

  return (
    <Backdrop>
      <motion.div
        className={style.bookView}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div
          className={style.modalBookImage}
          style={{ background: `url(${book.coverImageUrl})`, backgroundSize: 'cover' }}
          aria-label={`Cover image of ${book.title}`}
        ></div>
        <div className={style.modalBookInfo}>
          <div className={style.closeButtonContainer}>
            <h1 className={style.dialogueTitle} aria-label={`Title: ${book.title}`}>
              {book.title.length < 10 ? book.title : book.title.slice(0, 17) + '...'}
            </h1>
            <motion.button
              className={style.closeFormButton}
              onClick={handleClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close book details"
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
                className="lucide lucide-circle-x"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </motion.button>
          </div>
          <p className={style.bookModalDescription} aria-label={`Description: ${book.description}`}>
            {book.description}
          </p>
          <p style={{ fontWeight: 'bolder' }} aria-label={`Author: ${book.author}`}>
            {book.author}
          </p>
          <p>
            <span style={{ fontWeight: 'bolder' }}>Publishing year:</span> {book.publishedYear}
          </p>
          <p>
            <span style={{ fontWeight: 'bolder' }}>Price: </span> {book.price}
          </p>
          <div className="operation-btn-container">
            <div className={style.pickerContainer}>
              <QuantityPicker min={1} max={10} value={value} setValue={setValue} aria-label="Select quantity" />
            </div>
            <motion.button
              className={style.addToFavsBtn}
              onClick={() => handleFavs(profileData, book)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Add ${book.title} to favorites`}
              style={origin === 'profile' ? { display: 'none' } : ''}
            >
              {favSent ? <IconCheckCircle /> : 'Favs'}
            </motion.button>
            <motion.button
              className={style.addToCartBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBuyBtn(book)}
              aria-label={`Add ${book.title} to shopping cart`}
            >
              Add to cart
            </motion.button>
          </div>
        </div>
      </motion.div>
      {openMsg && <SimpleMessage message={'Item added to your shopping cart'} setFunction={setOpenBuyModal} />}
    </Backdrop>
  );
};

export default BookView;
