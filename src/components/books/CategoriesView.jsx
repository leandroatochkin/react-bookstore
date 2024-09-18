import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bookGenres } from '../../utils/utils';
import { index } from '../../utils/endpointIndex.js';
import style from './categoriesview.module.css';
import SearchBar from '../../utils/SearchBar';
import IconArrowRightSquareFill from '../../utils/icons/ArrowRight';
import SimpleMessage from '../../utils/SimpleMessage.jsx';

const CategoriesView = ({ profileData, setGenre, setShoppingCart }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchKey, setSearchKey] = useState('title');
    const [results, setResults] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${index.search_book}?${searchKey}=${searchValue}`);
            if (!response.ok) {
                setOpenModal(true);
            }
            const result = await response.json();
            setResults(result);
        } catch (err) {
            setOpenModal(true);
        }
    };

    const navigate = useNavigate();

    const handleClick = (genre) => {
        setGenre(genre);
        navigate(`/categories/${genre}`);
    };

    return (
        <div className={style.categoriesDisplay} aria-label="Book Categories View">
            <div className={style.categoriesHeader} aria-label="Categories Header"></div>
            
            {openModal && (
                <SimpleMessage
                    setFunction={setOpenModal}
                    message="There was an error retrieving books. Please try again later."
                    aria-live="assertive"
                />
            )}

            <div className={style.searchbarContainer} aria-label="Search Bar Container">
                <SearchBar
                    results={results}
                    setSearchValue={setSearchValue}
                    setSearchKey={setSearchKey}
                    handleSearch={handleSearch}
                    setShoppingCart={setShoppingCart}
                    profileData={profileData}
                    aria-label="Search Bar"
                />
            </div>

            <div className={style.categoriesContainer} aria-label="Book Categories Container">
                {bookGenres.map((genre, index) => (
                    <motion.div
                        key={index}
                        className={style.categoryButton}
                        aria-label={`Category: ${genre}`}
                        whileTap={{scale: 0.95}}
                        whileHover={{scale:1.05}}
                    >
                        <div className={style.categoryTitle} onClick={() => handleClick(genre)} aria-label={`Select ${genre} category`}>
                            <Link
                                to={`/categories/${genre}`}
                                
                                aria-label={`Link to ${genre} category`}
                                className={style.link}
                            >
                                {genre}
                                <IconArrowRightSquareFill aria-label="Arrow Right Icon" className={style.arrow}/>
                            </Link>
                        </div>
                        <div className={style.separator} aria-hidden="true"></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesView;
