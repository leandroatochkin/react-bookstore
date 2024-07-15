import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './settings.module.css';
import { DB_updateUser_endpoint, DB_deleteUser_endpoint } from '../../../utils/utils';

const Settings = ({ user, setIsLoggedIn }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    address: user.address,
    city: user.city,
    country: user.country,
    picture: user.picture
  });



  const navigate = useNavigate();

  const handleUpdateUser = async () => {
    if(!user) return;
    const updatedData = {};
    for (const key in formData) {
      if (formData[key] !== user[key]) {
        updatedData[key] = formData[key];
      }
    }
    console.log(updatedData)
    console.log(user)

    fetch(`${DB_updateUser_endpoint}/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        const updatedProfile = { ...user, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedProfile));
      })
      .catch(error => {
        console.error('Error updating user:', error.message);
      });
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDeleteUser = () => {
    fetch(`${DB_deleteUser_endpoint}/${user._id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error deleting user:', error.message);
      });
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      username: user.username,
      address: user.address,
      city: user.city,
      country: user.country,
      picture: user.picture
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
            <div className={style.editLine}>
              {editMode ? (
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p className={style.title}>Name: {user.name}</p>
              )}
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className={style.editLine}>
              {editMode ? (
                <input
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              ) : (
                <p className={style.title}>Username: {user.username}</p>
              )}
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className={style.editLine}>
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
                  Address: {user.address}, {user.city}, {user.country}
                </p>
              )}
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className={style.editLine}>
              {editMode ? (
                <input
                  name="picture"
                  placeholder="Picture Link"
                  value={formData.picture}
                  onChange={handleInputChange}
                />
              ) : (
                <p className={style.title}>Picture: <img src={user.picture} alt="profile" /></p>
              )}
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Change'}
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
          <p>Are you sure you want to delete your account?</p>
          <button onClick={handleDeleteUser}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
