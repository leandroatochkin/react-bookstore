import React, {useState} from 'react'
import style from './home.module.css'
import { dropIn } from '../../utils/utils'
import {motion} from 'framer-motion'


const Home = () => {
const [showAbout, setShowAbout] = useState(false)

const handleFooterAbout = () =>{
  setShowAbout(!showAbout)
}
  return (
    <div className={style.homeContainer}>
      <h1>All the books you're looking for, right here...</h1>
      <footer className={style.footer}>
        <ul className={style.footerUL}>
          <li onClick={handleFooterAbout}>About</li>
          <li>Contact</li>
        </ul>
        <p>© 2024 Bookstore</p>
      </footer>
      {showAbout && 
      <motion.div 
      className={style.about}
      variants={dropIn}
    initial='hidden'
    animate='visible'
    exit='exit'
      >
        <h2>About this project</h2>
        <p>MERN stack project for an e-commerce platform using Stripe integration for payment operations.</p>
        <p>Created by <a href="https://github.com/leandroatochkin
        ">Leandro Atochkin</a></p>
        <ul className=''>
          <li>React<img src='../../../public/react-logo-svgrepo-com.png' className={style.abtIcon}/></li>
          <li>Zustand</li>
          <li>Node<img src='../../../public/node-js-svgrepo-com.png' className={style.abtIcon}/></li>
          <li>Express<img src='../../../public/express-svgrepo-com.png' className={style.abtIcon}/></li>
          <li>MongoDB<img src='../../../public/mongodb-svgrepo-com.png' className={style.abtIcon}/></li>
          <li>Stripe<img src='../../../public/stripe-svgrepo-com.png' className={style.abtIcon}/></li>
          <li>Framer.motion<img src='../../../public/framer-svgrepo-com.png' className={style.abtIcon}/></li>
          <li>CSS modules<img src='../../../public/css-3-svgrepo-com.png' className={style.abtIcon}/></li>
        </ul>
        </motion.div>}
    </div>
  )
}

export default Home