import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import styles from './userProfile.module.css';
import { Spinner } from '@nextui-org/spinner';
import VerticalMenu from './VerticalMenu';
import Events from './profile_views/Events';
import Purchases from './profile_views/Purchases';
import Settings from './profile_views/Settings';
import { index } from '../../utils/endpointIndex.js';
import Favorites from './profile_views/Favorites';
import { MoonLoader } from 'react-spinners';

const UserProfile = ({ profileData, setProfileData, setIsLoggedIn, setShoppingCart }) => {
  const [view, setView] = useState('events');
  const navigate = useNavigate();

  useEffect(() => {
    if (profileData && profileData.email) {
      fetch(`${index.check_user}/${profileData.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.user);
          setProfileData(prevData => ({
            ...prevData,
            user: data.user
          }));
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [profileData.email, setProfileData]);

  useEffect(() => {
    if (!profileData || !profileData.user) {
      navigate('/');
    }
  }, [profileData, navigate]);

  const handleLogOut = () => {
    googleLogout();
    setProfileData(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    navigate('/');
  };

  const updateProfileData = (updatedData) => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      user: { ...prevProfileData.user, ...updatedData }
    }));
    localStorage.setItem('user', JSON.stringify({
      ...profileData,
      user: { ...profileData.user, ...updatedData }
    }));
  };

  return (
    <div className={styles.userContainer}>
      {profileData && profileData.user ? (
        <>
          <div className={styles.leftSide}>
            <Suspense fallback={<MoonLoader />}>
            <div className={styles.upperSpace}></div>
            <div className={styles.userCard}>
              <img src={profileData.user.picture} alt="User Profile" className={styles.userImg} />
              <div className={styles.cardRight}>
              <h2>Hi!, {profileData.user.name}</h2>
              <button onClick={handleLogOut} className={styles.logoutBtn}>Log Out</button>
              </div>
            </div>
            </Suspense>
            <div>
              <VerticalMenu
                elements={[
                  { name: "Events", value: 'events' },
                  { name: "My Purchases", value: 'purchases' },
                  { name: "Settings", value: 'settings' },
                  { name: "Favorites", value: 'favorites' }
                ]}
                setView={setView}
              />
            </div>
          </div>
          <div className={styles.rightSide}>
            {view === 'events' && <Events profile={profileData.user} />}
            {view === 'purchases' && <Purchases profile={profileData.user} />}
            {view === 'settings' && <Settings user={profileData.user} setIsLoggedIn={setIsLoggedIn} updateProfileData={updateProfileData}/>}
            {view === 'favorites' && <Favorites user={profileData.user} setIsLoggedIn={setIsLoggedIn} updateProfileData={updateProfileData} setShoppingCart={setShoppingCart}/>}
          </div>
        </>
      ) : (
        <p><Spinner /></p>
      )}
    </div>
  );
};

export default UserProfile;
