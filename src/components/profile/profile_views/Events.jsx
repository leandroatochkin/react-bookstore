import React, {useEffect, useState} from 'react'
import { Spinner } from '@nextui-org/spinner'
import styles from './events.module.css'
import { motion } from 'framer-motion'
import { DB_events_endpoint } from '../../../utils/utils.js'
import SimpleMessage from '../../../utils/SimpleMessage.jsx'

const Events = ({profile}) => {
const [events, setEvents] = useState([])
const [openEventModal, setOpenEventModal] = useState(false)


const fetchEvents = async () => {
    try {
      const res = await fetch(DB_events_endpoint);
      const data = await res.json();
      setEvents(data.map(event => ({
        ...event,
        assistingUsers: event.assistingUsers || [] // added this to make the disbled attr of the assist button to work when the button is pressed
      })));
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

useEffect(()=>{
    fetchEvents()
},[])

const handleAssist = async (eventId) => {
  openEventModal === false ? setOpenEventModal(true) : setOpenEventModal(false)
    try {
      await fetch(`${DB_events_endpoint}/${eventId}/assist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: profile.name }),
      });
      setEvents(prevEvents => prevEvents.map(event => 
        event._id === eventId ? 
          { ...event, assistingUsers: [...event.assistingUsers, profile.name] } : 
          event
      )); // once pressed the assist btn will be disabled, and the events state will be updated
    } catch (error) {
      console.error('Failed to assist event', error);
    }
  };

  return (
    <div className={styles.eventsContainer}>
      {openEventModal && <SimpleMessage message={'Assistance confirmed!'} setFunction={setOpenEventModal}/>}
        <div className={styles.eventList}>
             { events ? (events.map((event, index) => (
                <div className={styles.event} key={index} id={event._id}>
                    <div className={styles.eventDate}>{event.date}</div>
                    <div className={styles.eventTitle}>{event.title}</div>
                    <div className={styles.eventTime}>{event.startTime}-{event.endTime}</div>
                    <div className={styles.eventLocation}>{event.location}</div>
                    <div className={styles.eventDescription}>{event.description}</div>
                    <div className={styles.buttonsContainer}>
                    <motion.button 
                    onClick={()=>handleAssist(event._id)}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    className={styles.acceptButton}
                    disabled={event.assistingUsers && event.assistingUsers.some(user => user === profile.name)}
                    >
                    I want to assist!
                    </motion.button>
                    </div>
                    <div className={styles.separator}></div>
                    </div>
                    ))) : (
                        <div><Spinner /></div>
                    )
                    
                    }
        </div>
    </div>
  )
}

export default Events