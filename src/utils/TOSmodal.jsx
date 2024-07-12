import React from 'react'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import style from './TOSmodal.module.css'
import { dropIn, _TOS } from './utils'

const TOSmodal = ({deny_acceptFunction}) => {
  return (
    <Backdrop>
    <motion.div 
    className={style.TOSContainer}
    variants={dropIn}
    initial='hidden'
    animate='visible'
    exit='exit'
    >
        <h2>Please read our TOS</h2>
        <p className={style.TOSText}>{_TOS}</p> 
        <div className={style.buttonContainer}>
        <button onClick={() => deny_acceptFunction(false)} className={style.denyButton}>Deny</button>  
        <button onClick={() => deny_acceptFunction(true)} className={style.acceptButton}>Accept</button>
        </div>
    </motion.div>
</Backdrop>
  )
}

export default TOSmodal