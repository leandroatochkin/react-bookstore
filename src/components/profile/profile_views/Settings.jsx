import React, { useState } from 'react';
import style from './settings.module.css';
import { DB_updateUser_endpoint } from '../../../utils/utils';

const Settings = ({ profile, onUpdateProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    username: profile.username,
    address: profile.address,
    city: profile.city,
    country: profile.country,
    picture: profile.picture
  });

const handleUpdateUser = async () => {
    fetch(`${DB_updateUser_endpoint}/${profile._id}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error updating user:', error.message);
        });
        setEditMode(false);
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleCancel = () => {
    setFormData({
      name: profile.name,
      username: profile.username,
      address: profile.address,
      city: profile.city,
      country: profile.country
    });
    setEditMode(false);
  };

  return (
    <div className={style.settingsContainer}>
      <div className={style.settingsList}>
        <div className={style.titleContainer}>
          <h2 className={style.title}>Settings</h2>
        </div>
        <div className={style.separator}></div>
        <div className={style.personalInfo}>
          <h3>Personal Information</h3>
          <div className={style.dataDisplay}>
            <div>
              {editMode ? (
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p className={style.title}>Name: {profile.name}</p>
              )}
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div>
              {editMode ? (
                <input
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              ) : (
                <p className={style.title}>Username: {profile.username}</p>
              )}
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div>
              {editMode ? (
                <>
                  <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <p className={style.title}>
                  Address: {profile.address}, {profile.city}, {profile.country}
                </p>
              )}
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>
          {editMode && (
            <div>
              <button onClick={handleUpdateUser}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
        <div className={style.separator}></div>
        <div>
          <h3>Delete Account</h3>
        </div>
      </div>
    </div>
  );
};

export default Settings;
