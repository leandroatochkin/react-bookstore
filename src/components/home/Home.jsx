import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import style from './home.module.css'
import { dropIn } from '../../utils/utils'
import {motion} from 'framer-motion'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'


const Home = () => {
const [showAbout, setShowAbout] = useState(false)
const [animateText, setAnimateText] = useState(false)

const nebula = '../../../public/nebula.png'
const clouds = '../../../public/clouds.png'
const rocket = '../../../public/fire-space.gif'
const sky = '../../../public/sky.jpg'

const animationText = "All the books you're looking for, right here...".split(' ')

const handleFooterAbout = () =>{
  setShowAbout(!showAbout)
} 

const ref = useRef()

useEffect(() => {
  if (ref.current) {
    ref.current.scrollTo(2) // Adjust this value if needed
  }
}, [])

useEffect(() => {
  const handleScroll = () => {
    if (ref.current) {
      const scrollTop = ref.current.container.current.scrollTop
      if (scrollTop === 0) {
        setAnimateText(true)
      } else {
        setAnimateText(false)
      }
    }
  }

  const parallax = ref.current.container.current
  parallax.addEventListener('scroll', handleScroll)
  return () => parallax.removeEventListener('scroll', handleScroll)
}, [])
  return (
    // <div className={style.homeContainer}>
    //   <div className={style.textContainer}>
    //   {animationText.map((el, i) => (
    //     <motion.span
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{
    //         duration: 0.25,
    //         delay: i / 10,
    //       }}
    //       key={i}
    //       className={style.animationText}
    //     >
    //       {el}{" "}
    //     </motion.span>
    //   ))}
    //   </div>
    //   <div>
    //     <ul className={style.topUL}>
    //       <motion.li 
    //       className={style.linkLI}
    //       whileHover={{scale: 1.05}}
    //       whileTap={{scale: 0.95}}
    //       >
    //         <Link to='/categories'>Browse Books</Link>
    //       </motion.li>
    //       <motion.li 
    //       className={style.linkLI}
    //       whileHover={{scale: 1.05}}
    //       whileTap={{scale: 0.95}}
    //       >Deals
    //       </motion.li>
    //       <motion.li 
    //       className={style.linkLI}
    //       whileHover={{scale: 1.05}}
    //       whileTap={{scale: 0.95}}
    //       >Create Account</motion.li>
    //     </ul>
    //   </div>
    //   <footer className={style.footer}>
    //     <ul className={style.footerUL}>
    //       <motion.li 
    //       onClick={handleFooterAbout} 
    //       className={style.footerBtn}
    //       whileHover={{scale: 1.05}}
    //       whileTap={{scale: 0.95}}
    //       >
    //         About
    //       </motion.li>
    //       <motion.li 
    //       className={style.footerBtn}
    //       whileHover={{scale: 1.05}}
    //       whileTap={{scale: 0.95}}
    //       >
    //         Contact
    //       </motion.li>
    //     </ul>
    //     <p>© 2024 Bookstore</p>
    //   </footer>
    //   {showAbout && 
    //   <motion.div 
    //   className={style.about}
    //   variants={dropIn}
    // initial='hidden'
    // animate='visible'
    // exit='exit'
    //   >
    //     <h2>About this project</h2>
    //     <p>MERN stack project for an e-commerce platform using Stripe integration for payment operations.</p>
    //     <p>Created by <a href="https://github.com/leandroatochkin
    //     ">Leandro Atochkin</a></p>
    //     <ul className={style.abtUL}>
    //       <li className={style.abtLI}>React<img src='../../../public/react-logo-svgrepo-com.png' className={style.abtIcon}/></li>
    //       <li className={style.abtLI}>Zustand</li>
    //       <li className={style.abtLI}>Node<img src='../../../public/node-js-svgrepo-com.png' className={style.abtIcon}/></li>
    //       <li className={style.abtLI}>Express<img src='../../../public/express-svgrepo-com.png' className={style.abtIcon}/></li>
    //       <li className={style.abtLI}>MongoDB<img src='../../../public/mongodb-svgrepo-com.png' className={style.abtIcon}/></li>
    //       <li className={style.abtLI}>Stripe<img src='../../../public/stripe-svgrepo-com.png' className={style.abtIcon}/></li>
    //       <li className={style.abtLI}>Framer.motion<img src='../../../public/framer-svgrepo-com.png' className={style.abtIcon}/></li>
    //       <li className={style.abtLI}>CSS modules<img src='../../../public/css-3-svgrepo-com.png' className={style.abtIcon}/></li>
    //     </ul>
    //     </motion.div>}
    // </div>


    <div 
    style={{
      backgroundImage: `url(${sky})`,
      backgroundSize: 'cover',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: '0'

    }}
    >
      <Parallax 
      pages={3}
      ref={ref}
      >
        <ParallaxLayer 
        offset={0} 
        speed={1}
        factor={2}
        style={{
          backgroundImage: `url(${nebula})`,
          backgroundSize: 'cover',
          backgroundColor: 'transparent'
        }}
        onLoad={()=>ref.current.scrollTo(3)}
        >
<div className={style.textContainer}>
       {animationText.map((el, i) => (
         <motion.span
           initial={{ opacity: 0 }}
           animate={animateText ? { opacity: 1 } : { opacity: 0 }}
           transition={{
             duration: 0.5,
             delay: i / 10,
           }}
           key={i}
           className={style.animationText}
         >
           {el}{" "}
         </motion.span>
       ))}
      </div>
      <div>
         <ul className={style.topUL}>
           <motion.li 
          className={style.linkLI}
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          initial={{ opacity: 0 }}
           animate={animateText ? { opacity: 1 } : { opacity: 0 }}
           transition={{duration: 2.0}}
          >
            <Link to='/categories'>Browse Books</Link>
          </motion.li>

          <motion.li 
          className={style.linkLI}
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          initial={{ opacity: 0 }}
           animate={animateText ? { opacity: 1 } : { opacity: 0 }}
           transition={{duration: 2.0}}
          >
            <Link to='/login'>Log in</Link>
          </motion.li>
        </ul>
      </div>

        </ParallaxLayer>
        <ParallaxLayer 
        offset={2} 
        speed={1}
        factor={4}
        style={{
          backgroundImage: `url(${clouds})`,
          backgroundSize: '100vh',
          backgroundColor: 'transparent'
        }}
        >


        </ParallaxLayer>
        <ParallaxLayer
             sticky={{ start: 0.9, end: 2.5 }}
             style={{ textAlign: 'center' }}
        >
          <img 
          src={`${rocket}`}
          />
        </ParallaxLayer>

      </Parallax>
    </div>
  )
}

export default Home