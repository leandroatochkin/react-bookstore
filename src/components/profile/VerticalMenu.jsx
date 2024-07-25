import React from 'react'
import styles from './VerticalMenu.module.css'
import IconArrowRightSquareFill from '../../utils/icons/ArrowRight'
import { easeIn, motion } from 'framer-motion'


const VerticalMenu = ({elements, setView}) => {

const handleClick = (element) => {
    setView(element.value)
}
  return (
    <div>
        <ul className={styles.menuContainer}>
            {elements.map((element, index) => {
                return <>
                <motion.li
                        initial={{backgroundColor: 'transparent'}} 
                        whileHover={{
                          backgroundColor: 'white',
                          color: 'black',
                          scale: 1.05,
                          borderRadius: 8,
                          transition: {duration: 0.2, ease: easeIn}
                        }}
                        key={index} 
                        className={styles.listItem} 
                        onClick={()=>handleClick(element)}>
                          <a className={styles.link}>{element.name}</a><IconArrowRightSquareFill/>
                        </motion.li>
                        <div className={styles.separator}></div>
                </>
                })}
        </ul>
    </div>
  )
}

export default VerticalMenu