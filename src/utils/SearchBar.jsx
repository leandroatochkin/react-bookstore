import React, { useEffect, useState } from 'react';
import style from './searchbar.module.css';
import IconSearch from './icons/SearchIcon';
import BookView from '../components/books/BookView';

const SearchBar = ({ results, setSearchValue, setSearchKey, handleSearch, setShoppingCart, profileData }) => {
    const [result, setResult] = useState(null);
    const [openBuyModal, setOpenBuyModal] = useState(false);

    const handleResultClick = (title) => {
        setResult(results.filter((book) => book.title === title));
        setOpenBuyModal(true);
    };

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <div className={style.categoriesSearchbarContainer}>
            {(openBuyModal && result) && <BookView book={result[0]} setOpenBuyModal={setOpenBuyModal} setShoppingCart={setShoppingCart} profileData={profileData} />}

            <div className={style.container}>
            <input
                className={style.categoriesSearchbar}
                type="text"
                placeholder="Search for books"
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <select className={style.select} onChange={(e) => setSearchKey(e.target.value)}>
                <option value="author">author</option>
                <option value="title">title</option>
                <option value="genre">genre</option>
            </select>
            <button className={style.categoriesSearchButton} onClick={handleSearch}>
                <IconSearch height='30px' width='30px' />
            </button>
            </div>
            {/* Only render resultsContainer when there are results */}
            {results.length > 0 && (
                <div className={style.resultsContainer}>
                    {results.map((item, index) => (
                        <div key={index} onClick={() => handleResultClick(item.title)} className={style.resultLine}>
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
