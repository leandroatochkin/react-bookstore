import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.css';
import { motion } from 'framer-motion';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import rocket from '../../assets/images/fire-space.gif';
import logo from '../../assets/images/logo_logoonly.png'


const Home = ({ isLoggedIn }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [animateText, setAnimateText] = useState(false);



  const animationText = "All the books you're looking for, right here...".split(' ');

  const handleFooterAbout = () => {
    setShowAbout(!showAbout);
  };

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(2); // Adjust this value if needed
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollTop = ref.current.container.current.scrollTop;
        if (scrollTop === 0) {
          setAnimateText(true);
        } else {
          setAnimateText(false);
        }
      }
    };

    const parallax = ref.current.container.current;
    parallax.addEventListener('scroll', handleScroll);
    return () => parallax.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-label="Home page background"
      className={style.container}
    >
      <Parallax pages={3} ref={ref} aria-label="Parallax scrolling sections">
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          onLoad={() => ref.current.scrollTo(3)}
          aria-label="Nebula background layer"
          className={style.topLayer}
        >
          <div className={style.textContainer} aria-label="Main animated text">
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
                aria-label={`Text part: ${el}`}
              >
                {el}{' '}
              </motion.span>
            ))}
          </div>
          <div>
            <ul className={style.topUL} aria-label="Navigation options">
              <motion.li
                className={style.linkLI}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={animateText ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                aria-label="Browse books link"
              
              >
                <Link to="/categories" aria-label="Browse books" className={style.link}>Browse Books</Link>
              </motion.li>

              <motion.li
                className={style.linkLI}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={animateText ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                aria-label={isLoggedIn ? "Go to user profile" : "Login link"}
              >
                {isLoggedIn ? <Link to="/user-profile" className={style.link}>Profile</Link> : <Link to="/login" className={style.link}>Log in</Link>}
              </motion.li>
            </ul>
          </div>
          <div className={style.logoContainer}>
          <img src={logo} className={style.logo} alt="Website logo" aria-hidden="true" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={1}
          factor={4}
          className={style.bottomContainer}
          aria-label="Clouds background layer"
        />

        <ParallaxLayer sticky={{ start: 0.9, end: 2.5 }} style={{ textAlign: 'center' }} aria-label="Rocket animation">
          <img src={`${rocket}`} alt="Rocket flying animation"  className={style.rocket}/>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
