import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import QuantityPicker from './QuantityPicker'


const BookView = ({book, setShoppingCart}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [value, setValue] = useState(0);
    const [pushingItem, setPushingItem] = useState({
        id: book.id,
        title: book.title,
        price: book.price,
        quantity: 1
    })

    useEffect(() => {
        setPushingItem(prevItem => ({
          ...prevItem,
          quantity: value
        }));
      }, [value]);


    const modal = document.querySelector('.modal')

    const handleClose = () =>{
        setIsModalOpen(false);
    }
    
    const handleBuyBtn = (book) =>{
        if(book){

            console.log(pushingItem)
            setShoppingCart((prevItems) => [...prevItems, pushingItem]);
            setIsModalOpen(false)
        }
    }

    if (!isModalOpen) {
        return null; // Return null to not render the modal if it's closed
    }

    const dropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0
        },
        visible: {
            y: '0',
            opacity: 1,
            trasition: {
                duration: 0.1,
                type: 'spring',
                damping: 25,
                stifness: 500
            }

        },
        exit: {
            y: '100vh',
            opacity: 0
        }
    }

  return (
    <Backdrop>
        <motion.div 
        className='book-view'
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        >
            <div className='modal-book-image' style={{background: `url(${book.coverImageUrl})`, backgroundSize: 'cover'}}>
            </div>
            <div className='modal-book-info'>
            <div className='close-button-container'>
                <h1 className='dialogue-title'>{book.title.length < 10 ? book.title : book.title.slice(0, 17) + '...' }</h1>
                <motion.button 
                className='close-form-button' 
                onClick={handleClose}
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
               </motion.button>
            </div>
            <p className='book-modal-description'>{book.description}</p>
            <p style={{fontWeight: 'bolder'}}>{book.author}</p>
            <p><span style={{fontWeight: 'bolder'}}>Publishing year:</span> {book.publishedYear}</p>
            <p><span style={{fontWeight: 'bolder'}}>Price: </span> {book.price}</p>
            <div className='operation-btn-container'>
            <QuantityPicker min={1} max={10} value={value} setValue={setValue}/>
            <motion.button 
            className='add-to-favs-btn'
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            >Favs</motion.button>
            <motion.button 
            className='add-to-cart-btn'
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={()=>handleBuyBtn(book)}
            >Add to cart</motion.button>
            </div>
            </div>
        </motion.div>
        </Backdrop>
  )
}

export default BookView