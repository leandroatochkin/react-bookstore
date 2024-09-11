import React, { useState, useEffect, Suspense } from 'react';
import style from './favorites.module.css';
import BookView from '../../books/BookView';
import {motion} from 'framer-motion'
import { MoonLoader } from 'react-spinners';
import { loadFavs, removeFav } from '../../../utils/APIfunctions.js';


const Favorites = ({ user, setShoppingCart }) => {
  const [books, setBooks] = useState([]);
  const [openBuyModal, setOpenBuyModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  


  useEffect(() => {
    loadFavs(user, setBooks)
  }, [user]);


  const handleOpenBuyModal = (book) =>{
    openBuyModal === false ? setOpenBuyModal(true) : setOpenBuyModal(false)
    setSelectedBook(book)
  }

  const handleRemoveFromFavs =  async (user, book)  => {
    if (!user) return;

    // Remove the book from the backend
    const success =  removeFav(user, book);

    if (success) {
      // Optimistically update the UI by removing the book from the `books` state
      setBooks(prevBooks => prevBooks.filter(b => b._id !== book._id));
    }
    
  }



  return (
    <Suspense fallback={<MoonLoader />}>
        <div className={style.favoritesContainer}>
        
        {books.length > 0 ? (
          <>
         
  
          <div className={style.favoritesList}>
          <h2 className={style.title}>Favorites</h2>
            <div className={style.separator}></div>
            <div className={style.display}>
            {books.map((book, index) => (
              <div key={index} className={style.bookContainer}>
                <div className={style.bookImageContainer}>
                  <img src={book.coverImageUrl} alt={book.title} className={style.bookImage} />
                </div>
                <div className={style.rightContainer}>
                <div className={style.bookInfoContainer}>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
                 <div className={style.buttonContainer}>
                 <motion.button
                 onClick={()=>handleOpenBuyModal(book)}
                 whileHover={{scale: 1.05}} 
                 whileTap={{scale: 0.85}}
                 className={style.button}
                 > buy</motion.button>
                 <motion.button
                onClick={()=>handleRemoveFromFavs(user,book)}
             
                 whileHover={{scale: 1.05}} 
                 whileTap={{scale: 0.85}}
                 className={style.button}
                 > remove</motion.button>
                 
                 </div>
                 </div>
                 
                 </div>     
            
            ))}
            </div>
          </div>
          </>
        ) : (
          <MoonLoader />
        )}
      {openBuyModal && <BookView profileData={user} book={selectedBook} setShoppingCart={setShoppingCart} setOpenBuyModal={setOpenBuyModal} origin={'profile'}/>}
      </div>
    </Suspense>
  );
};

export default Favorites;
