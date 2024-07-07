import React, { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const UserProfile = ({ response }) => {
  const [profile, setProfile] = useState(null);

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
    <div>
      {profile ? (
        <div className='user-island'>
          <div className='user-card'>
          <img src={profile.picture} alt="User Profile" />
          <h2>Hi!, {profile.name}</h2>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
        <ul className='tabs group'>
          <li className='active'><span>one</span></li>
          <li><span>two</span></li>
          <li><span>three</span></li>
        </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
