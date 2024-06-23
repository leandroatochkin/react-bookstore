import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DB_API_endpoint } from '../utils/utils';
import BookView from './BookView';

const GenreView = ({setShoppingCart}) => {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openBuyModal, setOpenBuyModal] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)
    
    const {genre} = useParams()

    const handleOpenBuyModal = (book) =>{
        openBuyModal === false ? setOpenBuyModal(true) : setOpenBuyModal(false)
        setSelectedBook(book)
      }
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(DB_API_endpoint);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
        if (data) {
          const filtered = data.filter((book) => book.genre === genre);
          setFilteredData(filtered);
        }
      }, [data, genre]);


      useEffect(() => {
        // Toggle body scroll when modal is open/closed
        if (openBuyModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [openBuyModal]);

      if (loading) {
        return <div>Loading...</div>;
      }
  
      if (error) {
        return <div>Error: {error.message}</div>;
      }

      
      

  return (
    <div className='cards-container' style={{marginTop: filteredData.length > 5 ? '10%' : ''}}>
        {openBuyModal && <BookView book={selectedBook} setShoppingCart={setShoppingCart}/>}
        {filteredData.map((book, index)=>(
        <motion.div 
        key={index} 
        className='book-card' 
        style={{backgroundImage: `url(${book.coverImageUrl})`, backgroundSize: 'cover'}}
        whileHover={{scale: 1.05}}
        >
            <motion.div 
            className='card-info-background'
            initial={{opacity: '0'}}
            whileHover={{opacity: '1'}}
            onClick={()=>handleOpenBuyModal(book)}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Year: {book.publishedYear}</p>
            <p>Price: {book.price}</p>
            </motion.div>
        </motion.div>
    ))}</div>
  )
}

export default GenreView