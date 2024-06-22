import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoriesView = ({setGenre}) => {

    const bookGenres = [
        "Fantasy",
        "Science Fiction",
        "Mystery",
        "Thriller",
        "Romance",
        "Historical Fiction",
        "Horror",
        "Adventure",
        "Dystopian",
        "Steampunk",
        "Paranormal",
        "Urban Fantasy",
        "Detective",
        "Crime",
        "Spy Fiction",
        "Military Fiction",
        "Western",
        "Young Adult",
        "Children's Fiction",
        "Literary Fiction",
        "Classic Literature",
        "Graphic Novel",
        "Comic Book",
        "Contemporary Fiction",
        "Magical Realism",
        "Gothic",
        "Psychological Thriller",
        "Cozy Mystery",
        "Supernatural",
        "Epic Fantasy",
        "High Fantasy",
        "Low Fantasy",
        "Hard Science Fiction",
        "Soft Science Fiction",
        "Space Opera",
        "Time Travel",
        "Alternate History",
        "Apocalyptic",
        "Post-Apocalyptic",
        "Cyberpunk",
        "Biopunk",
        "Technothriller",
        "Legal Thriller",
        "Political Thriller",
        "Medical Thriller",
        "Erotic Romance",
        "Regency Romance",
        "Historical Romance",
        "Paranormal Romance",
        "Christian Fiction",
        "Spiritual Fiction",
        "Metaphysical Fiction",
        "Satire",
        "Anthology",
        "Short Stories",
        "Novella",
        "Poetry",
        "Memoir",
        "Biography",
        "Non-Fiction"
    ];
 
const navigate = useNavigate()

const handleClick = (genre) =>{
    setGenre(genre)
    navigate(`/categories/${genre}`);
}

  return (
    <div className='categories-display'>{
        bookGenres.map((genre, index) => (
            <motion.div key={index} className='category-button' whileHover={{
                scale: 1.1
            }}>
                <div className='category-thumb'></div>
                <div className='category-title' onClick={()=>handleClick(genre)}>
                <Link to={`/categories/${genre}`}>{genre}</Link>
                </div>
                </motion.div>
                )
                )

    }</div>
  )
}

export default CategoriesView