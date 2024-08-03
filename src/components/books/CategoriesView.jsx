import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bookGenres } from '../../utils/utils';
import { index } from '../../utils/endpointIndex.js';
import style from './categoriesview.module.css'
import IconSearch from '../../utils/icons/SearchIcon';
import SearchBar from '../../utils/SearchBar';




const CategoriesView = ({profileData, setGenre}) => {
    const[visibleGenres, setVisibleGenres] = useState(20)
    const[searchValue, setSearchValue] = useState('')
    const[searchKey, setSearchKey] = useState('title')
    const[results, setResults] = useState([])

    useEffect(()=>{
        console.log(results)
    },[results])

const handleSearch = async () =>{
    try{
        const response = await fetch(`${index.search_book}?${searchKey}=${searchValue}`)
        if(!response.ok){
            console.error('error')
        }
        const result = await response.json()
        setResults(result)
        }catch(err){
            console.log(err)
    } 
}
    
const navigate = useNavigate()

const handleClick = (genre) =>{
    setGenre(genre)
    navigate(`/categories/${genre}`);
}


  return (
    <div className={style.categoriesDisplay}>
        <SearchBar results={results} setSearchValue={setSearchValue} setSearchKey={setSearchKey} handleSearch={handleSearch}/>
        <div className={style.categoriesContainer}>
        {bookGenres.slice(0, visibleGenres).map((genre, index) => (
            <motion.div 
            key={index} 
            className={style.categoryButton} 
            whileHover={{scale: 1.1}}
            >
               
                <div className={style.categoryTitle} onClick={()=>handleClick(genre)}>
                <Link to={`/categories/${genre}`} style={{color: '#212427', fontWeight: 'bolder', fontSize: '24px'}}>{genre}</Link>
                
                </div>
                <div className={style.separator}></div>
                </motion.div>
                )
            )}
            <button onClick={()=>{visibleGenres === 20 ? setVisibleGenres(bookGenres.length - 1) : setVisibleGenres(20)}} className={style.moreButton}>
                {visibleGenres === 20 ? 'More' : 'Less'}</button>
        </div>
    </div>
  )
}

export default CategoriesView