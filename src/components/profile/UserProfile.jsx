import React, { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import styles from './userProfile.module.css'
import { CircularProgress } from '@mui/material';
import VerticalMenu from './VerticalMenu';
import Events from './profile_views/Events';

const UserProfile = ({ response }) => {
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState('')

  useEffect(() => {
      if (response && response.credential) {
        const info = jwtDecode(response.credential)
        setProfile(info)
      }
    
  }, [response]);



  const handleLogOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div className={styles.userContainer}>
      {profile ? (
        <>
          <div className={styles.leftSide}>
          <div className={styles.userCard}>
              <img src={profile.picture} alt="User Profile"  className={styles.userImg}/>
              <h2>Hi!, {profile.name}</h2>
              <button onClick={handleLogOut}>Log Out</button>  
          </div>
          <div>
          <VerticalMenu 
            elements={[
              {name: "Events", value: 'events'},
              {name: "My Purchases", value: 'purchases'},
              {name: "Settings", value: 'settings'}]}
            setView={setView}
              />
          </div>   
          </div>
          <div className={styles.rightSide}>
              {view && view === 'events' ? <Events /> : null}

          </div>
        </>
      ) : (
        <p><CircularProgress /></p>
      )}
    </div>
  );
};

export default UserProfile;
