import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bookGenres } from '../../utils/utils';
import { DB_searchBook_endpoint } from '../../utils/endpointIndex';
import style from './categoriesview.module.css'
import IconSearch from '../../utils/icons/SearchIcon';
import { Db } from 'mongodb';


const CategoriesView = ({setGenre}) => {
    const[visibleGenres, setVisibleGenres] = useState(20)
    const[searchValue, setSearchValue] = useState('')
    const[searchKey, setSearchKey] = useState('title')

    useEffect(()=>{
        const body = {
            [searchKey]: searchValue,
        }

    },[searchValue,searchKey])

const handleSearch = () =>{
    try{
        fetch(DB_searchBook_endpoint,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => console.log(data))
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
        <div className={style.categoriesSearchbarContainer}>
            <input className={style.categoriesSearchbar} 
            type="text" 
            placeholder="Search for books" 
            onChange={(e)=>setSearchValue(e.target.value)}
            />
            <select className={style.select} onChange={(e)=>setSearchKey(e.target.value)}>
                <option value="author">author</option>
                <option value="title">title</option>
                <option value="genre">genre</option>   
            </select>
            <button className={style.categoriesSearchButton}><IconSearch height='30px' width='30px'/></button>
        </div>
        <div className={style.categoriesContainer}>
        {bookGenres.slice(0, visibleGenres).map((genre, index) => (
            <motion.div 
            key={index} 
            className={style.categoryButton} 
            whileHover={{scale: 1.1}}
            >
                <div className={style.categoryThumb}></div>
                <div className={style.categoryTitle} onClick={()=>handleClick(genre)}>
                <Link to={`/categories/${genre}`} style={{color: '#EDF67D', fontWeight: 'bolder'}}>{genre}</Link>
                </div>
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