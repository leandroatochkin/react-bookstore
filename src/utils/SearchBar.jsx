import React, { useEffect, useState } from 'react';
import style from './searchbar.module.css';
import IconSearch from './icons/SearchIcon';
import BookView from '../components/books/BookView';

const SearchBar = ({ results, setSearchValue, setSearchKey, handleSearch, setShoppingCart, profileData }) => {
    const [result, setResult] = useState(null);
    const [openList, setOpenList] = useState(false);
    const [openBuyModal, setOpenBuyModal] = useState(false);

    const handleResultClick = (title) => {
        setResult(results.filter((book) => book.title === title));
        setOpenBuyModal(true);
    };

    return (
        <div className={style.categoriesSearchbarContainer}>
            {(openBuyModal && result) && (
                <BookView
                    book={result[0]}
                    setOpenBuyModal={setOpenBuyModal}
                    setShoppingCart={setShoppingCart}
                    profileData={profileData}
                />
            )}

            <div className={style.container}>
                <input
                    className={style.categoriesSearchbar}
                    type="text"
                    placeholder="Search for books"
                    onChange={(e) => setSearchValue(e.target.value)}
                    aria-label="Search input for books"
                />
                <select
                    className={style.select}
                    onChange={(e) => setSearchKey(e.target.value)}
                    aria-label="Search by"
                >
                    <option value="author">author</option>
                    <option value="title">title</option>
                    <option value="genre">genre</option>
                </select>
                <button
                    className={style.categoriesSearchButton}
                    onClick={() => {
                        handleSearch();
                        setOpenList(true);
                    }}
                    aria-label="Search button"
                >
                    <IconSearch height="30px" width="30px" />
                </button>
            </div>

            {(results.length > 0 && openList) && (
                <div
                    className={style.resultsContainer}
                    role="list"
                    aria-label="Search results list"
                >
                    {results.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleResultClick(item.title)}
                            className={style.resultLine}
                            role="listitem"
                            tabIndex="0"
                            aria-label={`Result item: ${item.title}`}
                        >
                            {item.title}
                        </div>
                    ))}
                    <button
                        className={style.closeButton}
                        onClick={() => {
                            setOpenList(false);
                        }}
                        aria-label="Close search results"
                    >
                        x
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
