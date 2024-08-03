import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import style from './home.module.css'
import { dropIn } from '../../utils/utils'
import {motion} from 'framer-motion'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'


const Home = ({isLoggedIn}) => {
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
            {isLoggedIn ? <Link to='/user-profile'>Profile</Link> : <Link to='/login'>Log in</Link>}
          </motion.li>
        </ul>
      </div>
      <img src='../../../public/logo_logoonly.png' className={style.logo}/>
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