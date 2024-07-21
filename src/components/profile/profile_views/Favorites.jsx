import React, { useState, useEffect, Suspense } from 'react';
import style from './favorites.module.css';
import { DB_findUserFavs_endpoint } from '../../../utils/endpointIndex';
import BookView from '../../books/BookView';
import {motion} from 'framer-motion'
import { MoonLoader } from 'react-spinners';

const Favorites = ({ user, setShoppingCart }) => {
  const [books, setBooks] = useState([]);
  const [userFavs, setUserFavs] = useState([]);
  const [openBuyModal, setOpenBuyModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)


  useEffect(()=>{
    console.log(selectedBook)
  },[selectedBook])

  useEffect(() => {
    if (user && user.favs.length > 0) {
      const fetchBooks = async () => {
        const favs = user.favs.map(id => `${id}`).join(',');
        try {
          const response = await fetch(`${DB_findUserFavs_endpoint}?ids=${favs}`);
          const data = await response.json();
          setBooks(data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchBooks();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.favs) {
      setUserFavs(user.favs);
    }
  }, [user]);


  const handleOpenBuyModal = (book) =>{
    openBuyModal === false ? setOpenBuyModal(true) : setOpenBuyModal(false)
    setSelectedBook(book)
  }


  return (
    <Suspense fallback={<MoonLoader />}>
        <div className={style.favoritesContainer}>
        
        {books.length > 0 ? (
          <>
         
  
          <div className={style.favoritesList}>
          <h2 className={style.title}>Favorites</h2>
            <div className={style.separator}></div>
            {books.map((book, index) => (
              <div key={index} className={style.bookContainer}>
                <div className={style.bookImageContainer}>
                  <img src={book.coverImageUrl} alt={book.title} className={style.bookImage} />
                </div>
                <div className={style.bookInfoContainer}>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
                <motion.button
                 onClick={()=>handleOpenBuyModal(book)}
                 whileHover={{scale: 1.05}}
                 whileTap={{scale: 0.85}}
                 className={style.button}
                 > buy</motion.button>    
              </div>
            ))}
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
