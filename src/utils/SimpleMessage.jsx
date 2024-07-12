import React from 'react'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import style from './simplemessage.module.css'
import { dropIn } from './utils'



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