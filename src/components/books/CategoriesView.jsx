import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bookGenres } from '../../utils/utils';
import { index } from '../../utils/endpointIndex.js';
import style from './categoriesview.module.css'
import IconSearch from '../../utils/icons/SearchIcon';
import SearchBar from '../../utils/SearchBar';
import IconArrowRightSquareFill from '../../utils/icons/ArrowRight'
import SimpleMessage from '../../utils/SimpleMessage.jsx';




const CategoriesView = ({profileData, setGenre, setShoppingCart}) => {
    const[searchValue, setSearchValue] = useState('')
    const[searchKey, setSearchKey] = useState('title')
    const[results, setResults] = useState([])
    const[openModal, setOpenModal] = useState(false)

const handleSearch = async () =>{
    try{
        const response = await fetch(`${index.search_book}?${searchKey}=${searchValue}`)
        if(!response.ok){
            console.error('error')
            setOpenModal(true)
        }
        const result = await response.json()
        setResults(result)
        }catch(err){
            console.log(err)
            setOpenModal(true)
    } 
}
    
const navigate = useNavigate()

const handleClick = (genre) =>{
    setGenre(genre)
    navigate(`/categories/${genre}`);
}


  return (
    <div className={style.categoriesDisplay}>
        <div className={style.categoriesHeader}></div>
        {openModal  && <SimpleMessage setOpenModal={setOpenModal} message="There was an error retrieving books. Please try again later" />}

        <div className={style.searchbarContainer}>
        <SearchBar results={results} setSearchValue={setSearchValue} setSearchKey={setSearchKey} handleSearch={handleSearch} setShoppingCart={setShoppingCart} profileData={profileData}/>
        </div>
        <div className={style.categoriesContainer}>
        {bookGenres.map((genre, index) => (
            <motion.div 
            key={index} 
            className={style.categoryButton} 
            >
               
                <div className={style.categoryTitle} onClick={()=>handleClick(genre)}>
                <Link to={`/categories/${genre}`} style={{color: '#212427', fontWeight: 'bolder', fontSize: '24px', display: 'flex', justifyContent: 'space-between'}}>{genre}<IconArrowRightSquareFill/></Link>
                
                </div>
                <div className={style.separator}></div>
                </motion.div>
                )
            )}
            
        </div>
    </div>
  )
}

export default CategoriesView