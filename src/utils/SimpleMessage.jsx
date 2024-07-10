import React from 'react'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import style from './simplemessage.module.css'


const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: '0',
        opacity: 1,
        trasition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stifness: 500
        }

    },
    exit: {
        y: '100vh',
        opacity: 0
    }
}

const SimpleMessage = ({message, setFunction}) => {
  return (
<Backdrop>
    <motion.div 
    className={style.messageContainer}
    variants={dropIn}
    initial='hidden'
    animate='visible'
    exit='exit'
    >
        <h1>{message}</h1>
        <button onClick={() => setFunction(false)} className={style.button}>Ok</button>
    </motion.div>
</Backdrop>
  )
}

export default SimpleMessage