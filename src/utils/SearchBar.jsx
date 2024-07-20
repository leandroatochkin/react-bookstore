import React from 'react'
import style from './searchbar.module.css'
import IconSearch from './icons/SearchIcon'


const SearchBar = ({results, setSearchValue, setSearchKey, handleSearch}) => {
  return (
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
            <button className={style.categoriesSearchButton} onClick={handleSearch}><IconSearch height='30px' width='30px'/></button>
            <div className={style.resultsContainer}>
                {results.map((item, index)=>(
                    <div key={index}>{item.title}</div> 
                ))}
            </div>
        </div>
  )
}

export default SearchBar