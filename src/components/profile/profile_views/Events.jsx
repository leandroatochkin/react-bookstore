import React, {useEffect, useState} from 'react'
import events from '../../../assets/mock_data/mock_events.js'
import styles from './events.module.css'

const Events = () => {
useEffect(()=>{
    console.log(events)
}, [])
  return (
    <div className={styles.eventsContainer}>
        <div className={styles.eventList}></div>
    </div>
  )
}

export default Events