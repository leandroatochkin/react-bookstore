import React, { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';
import styles from './events.module.css';
import { motion } from 'framer-motion';
import { index } from '../../../utils/endpointIndex.js';
import SimpleMessage from '../../../utils/SimpleMessage.jsx';

const Events = ({ profile }) => {
  const [events, setEvents] = useState([]);
  const [openEventModal, setOpenEventModal] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch(index.events);
      const data = await res.json();
      setEvents(data.map(event => ({
        ...event,
        assistingUsers: event.assistingUsers || []
      })));
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAssist = async (eventId) => {
    openEventModal === false ? setOpenEventModal(true) : setOpenEventModal(false);
    try {
      await fetch(`${index.events}/${eventId}/assist`, {
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
      ));
    } catch (error) {
      console.error('Failed to assist event', error);
    }
  };

  return (
    <div className={styles.eventsContainer} aria-label="Events container">
      {openEventModal && <SimpleMessage message={'Assistance confirmed!'} setFunction={setOpenEventModal} aria-label="Assistance confirmation modal" />}
      <div className={styles.eventList} aria-label="List of events">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div className={styles.event} key={index} id={event._id} aria-label={`Event ${event.title}`}>
              <div className={styles.topContainer} aria-label="Event title and date">
                <div className={styles.eventTitle} aria-label={`Event title: ${event.title}`}>{event.title}</div>
                <div className={styles.eventDate} aria-label={`Event date: ${event.date}`}>{event.date}</div>
              </div>
              <div className={styles.eventTime} aria-label={`Event time: ${event.startTime} to ${event.endTime}`}>
                {event.startTime} - {event.endTime}
              </div>
              <div className={styles.eventLocation} aria-label={`Event location: ${event.location}`}>{event.location}</div>
              <div className={styles.eventDescription} aria-label={`Event description: ${event.description}`}>{event.description}</div>
              <div className={styles.buttonsContainer}>
                <motion.button
                  onClick={() => handleAssist(event._id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.acceptButton}
                  disabled={event.assistingUsers && event.assistingUsers.some(user => user === profile.name)}
                  aria-label={`Assist button for event: ${event.title}`}
                >
                  I want to assist!
                </motion.button>
              </div>
              <div className={styles.separator}></div>
            </div>
          ))
        ) : (
          <div aria-label="Loading events">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
