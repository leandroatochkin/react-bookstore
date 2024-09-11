import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './settings.module.css';
import { Spinner } from '@nextui-org/spinner';
import IconCancelSquared from '../../../utils/icons/CancelIcon';
import SimpleMessage from '../../../utils/SimpleMessage.jsx';
import { deleteUser, updateUser } from '../../../utils/APIfunctions.js';

const Settings = ({ user, setIsLoggedIn, updateProfileData }) => {
  const [editMode, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')
  const [msg, setMsg] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    address: user.address,
    city: user.city,
    country: user.country,
    picture: user.picture
  });

  const navigate = useNavigate();

  useEffect(()=>console.log(user), [user])
  const handleUpdateUser = async () => {
    if (!user) return;
    const updatedData = {};
    for (const key in formData) {
      if (formData[key] !== user[key]) {
        updatedData[key] = formData[key];
      }
    }
    console.log(user)
    const success = await updateUser(user, updatedData, setErrorMsg, setOpenModal)
    if(success){
      setMsg('Info updated correctly.')
    setOpenEditModal(true)
    setEditMode(false);
    updateProfileData(updatedData)
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDeleteUser = () => {
    deleteUser(user, setErrorMsg, setOpenModal)
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
    <div className={style.settingsContainer} aria-label="Settings Container">
      {openModal && <SimpleMessage message={errorMsg} setFunction={setOpenModal}/>}
      {openEditModal && <SimpleMessage message={msg}  setFunction={setOpenEditModal}/>}
      {user ? (
        <div className={style.settingsList} aria-label="Settings List">
          <div className={style.titleContainer}>
            <h2 className={style.title} aria-label="Settings Title">Settings</h2>
          </div>
          <div className={style.separator} aria-hidden="true"></div>
          <div className={style.personalInfo} aria-label="Personal Information Section">
            <h3 aria-label="Personal Information Title">Personal Information</h3>
            <div className={editMode ? style.dataDisplayOpen : style.dataDisplayClosed} aria-expanded={editMode} aria-label="Editable User Data">
              <div className={editMode ? style.dataLinesOpen : style.dataLinesClosed}>
                <div className={editMode ? style.editLineOpen : style.editLineClosed} aria-label="Name Field">
                  {editMode ? (
                    <input
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      aria-label="Edit Name"
                    />
                  ) : (
                    <p className={style.title}><strong>Name:</strong> {user.name}</p>
                  )}
                  <button onClick={() => setEditMode(!editMode)} className={style.editBtn} aria-label={editMode ? 'Cancel Editing Name' : 'Edit Name'}>
                    {editMode ? <IconCancelSquared /> : 'Edit'}
                  </button>
                </div>

                <div className={editMode ? style.editCountry : style.editLine} aria-label="Address Section">
                  {editMode ? (
                    <div className={style.countryInputs} aria-label="Editable Address Fields">
                      <input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        aria-label="Edit Address"
                      />
                      <input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        aria-label="Edit City"
                      />
                      <input
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        aria-label="Edit Country"
                      />
                    </div>
                  ) : (
                    <p className={style.title}>
                      <strong>Address:</strong> {user.address}, {user.city}, {user.country}
                    </p>
                  )}
                  <div className={style.contryBtn}>
                    <button onClick={() => setEditMode(!editMode)} className={style.editBtn} aria-label={editMode ? 'Cancel Editing Address' : 'Edit Address'}>
                      {editMode ? <IconCancelSquared /> : 'Edit'}
                    </button>
                  </div>
                </div>
              </div>
              <div className={style.pictureLine} aria-label="Profile Picture">
                {editMode ? (
                  <>
                    <img src={user.picture} alt="profile" className={style.previewPicture} aria-label="Current Profile Picture"/>
                    <input
                      name="picture"
                      placeholder="Picture Link"
                      value={formData.picture}
                      onChange={handleInputChange}
                      aria-label="Edit Profile Picture Link"
                    />
                  </>
                ) : (
                  <p className={style.pictureP}>
                    <strong>Picture:</strong> 
                    <img src={user.picture} alt="profile" className={style.previewPicture} aria-label="Profile Picture"/>
                  </p>
                )}
                <button onClick={() => setEditMode(!editMode)} aria-label={editMode ? 'Cancel Picture Edit' : 'Change Picture'}>
                  {editMode ? 'Cancel' : 'Change'}
                </button>
              </div>
            </div>
            {editMode && (
              <div className={style.btnContainer} aria-label="Action Buttons">
                <button onClick={handleUpdateUser} className={style.saveBtn} aria-label="Save Changes">Save</button>
                <button onClick={handleCancel} className={style.cancelBtn} aria-label="Cancel Changes">Cancel</button>
              </div>
            )}
          </div>
          <div className={style.separator} aria-hidden="true"></div>
          <div aria-label="Delete Account Section" className={style.deleteAccountContainer}>
            <h3 aria-label="Delete Account Title">Delete Account</h3>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={handleDeleteUser} aria-label="Delete Account Button">Delete Account</button>
          </div>
        </div>
      ) : (
        <Spinner aria-label="Loading Spinner" />
      )}
    </div>
  );
};

export default Settings;

