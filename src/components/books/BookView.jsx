import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import Backdrop from '../../utils/Backdrop'
import QuantityPicker from '../../utils/QuantityPicker'
import { dropIn } from '../../utils/utils'
import { DB_addToFavs_endpoint } from '../../utils/endpointIndex';
import IconCheckCircle from '../../utils/icons/CheckIcon'


const BookView = ({profileData, book, setShoppingCart, setOpenBuyModal}) => {
    
    const [value, setValue] = useState(1);
    const [pushingItem, setPushingItem] = useState({
        id: book.id,
        title: book.title,
        price: book.price,
        cover: book.coverImageUrl,
        quantity: 1
    })

    const[favSent, setFavSent] = useState(false)

    console.log(profileData.user._id)
    console.log(book.id)

    useEffect(() => {
        setPushingItem(prevItem => ({
          ...prevItem,
          quantity: value
        }));
      }, [value]);


    const modal = document.querySelector('.modal')

    const handleClose = () =>{
        setOpenBuyModal(false);
    }
    
    const handleBuyBtn = (book) =>{
        if(book){
            setShoppingCart((prevItems) => [...prevItems, pushingItem]);
            setOpenBuyModal(false)
        }
    }

    const handleFavs = async () => {
      if(!profileData) return
      console.log(profileData)
      setFavSent(!favSent)
          fetch(DB_addToFavs_endpoint,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                user_id: profileData.user._id,
                book_id: book.id
                })
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err=>console.log(err))
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
            onClick={handleFavs}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            >{favSent ? <IconCheckCircle/> : 'Favs'}</motion.button>
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