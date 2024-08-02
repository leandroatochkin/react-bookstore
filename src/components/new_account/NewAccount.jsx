import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './newaccount.module.css';
import { index } from '../../utils/endpointIndex.js'
import { isPasswordOk, isUsernameOk, _TOS } from '../../utils/utils.js';
import SimpleMessage from '../../utils/SimpleMessage.jsx';
import TOSmodal from '../../utils/TOSmodal.jsx';
import { motion } from 'framer-motion';


const NewAccount = () => {
  const [repeatPassword, setRepeatPassword] = useState('');
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    country: 'Argentina',
    picture: '',
    favs: [],
    purchases: [],
    settings: []
  });
  const [openModal, setOpenModal] = useState(false);
  const [openTOSModal, setOpenTOSModal] =useState(false)
  const [message, setMessage] = useState('');
  const [terms, setTerms] = useState(false)

  const navigate = useNavigate();

  const handleComparePassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitNewUser = () => {

    setOpenTOSModal(true)

    if (!terms || !newUserData) return;
    if (isPasswordOk(newUserData.password, repeatPassword) && isUsernameOk(newUserData.username) && newUserData.terms === true) {
      fetch(index.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...newUserData,
          terms: true,
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setMessage('User created successfully!');
          setOpenModal(true);
        })
        .catch(error => {
          console.error('Error adding user:', error.message);
          setMessage('Error creating user!');
          setOpenModal(true);
        });
    } else {
      setMessage('Please read and accept our terms.');
      setOpenModal(true);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    if(message === 'User created successfully!' || message === 'Error creating user!'){
        navigate('/login');
    } return
  };

  const deny_acceptFunction = (accept_deny) => {
    setOpenTOSModal(false);
    setTerms(accept_deny);
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <h1 className={style.title}>New Account</h1>
        <div className={style.info}>
          <div className={style.inputsContainer}>
            <form className={style.form}>
              <div className={style.formGroup}>
                <fieldset className={style.inputLine}>
                <legend htmlFor="username">Username</legend>
                <input type="text" name="username" id="username" placeholder="Username" onChange={handleInputChange} />
                </fieldset>
                <fieldset className={style.inputLine}>
                <legend htmlFor="password">Password</legend>
                <input type="password" name="password" id="password" placeholder="Password" onChange={handleInputChange} />
                </fieldset>
                <fieldset className={style.inputLine}>
                <legend htmlFor="confirmPassword">Repeat Password</legend>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" onChange={handleComparePassword} />
                </fieldset>
                <fieldset className={style.inputLine}>
                <legend htmlFor="email">Email</legend>
                <input type="email" name="email" id="email" placeholder="Email" onChange={handleInputChange} />
                </fieldset>
                <fieldset className={style.inputLine}>
                <legend htmlFor="name">Name</legend>
                <input type="text" name="name" id="name" placeholder="Name" onChange={handleInputChange} />
                </fieldset>
                <fieldset className={style.inputLine}>
                <legend htmlFor="phone">Phone</legend>
                <input type="text" name="phone" id="phone" placeholder="Phone" onChange={handleInputChange} />
                </fieldset>
                <fieldset className={style.inputLine}>
                <legend htmlFor="address">Address</legend>
                <input type="text" name="address" id="address" placeholder="Address" onChange={handleInputChange} />
                </fieldset>
                <fieldset className={style.inputLine}>
                <legend htmlFor="city">City</legend>
                <input type="text" name="city" id="city" placeholder="City" onChange={handleInputChange} />
                </fieldset>
                <fieldset className={style.inputLine}>
                <legend htmlFor="country">Country</legend>
                <select name="country" id="country" onChange={handleInputChange}>
                  <option value="Argentina">Argentina</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Chile">Chile</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Poland">Poland</option>
                  <option value="Russia">Russia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="United States">United States</option>
                </select>

                </fieldset>
              </div>
            </form>
          </div>
          {/* <div className={style.termsContainer}>
            <p>{_TOS}</p>
            <input type="checkbox" name="terms" id="terms" onChange={handleInputChange} />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div> */}
        </div>
        <div className={style.bottomContainer}>
        <motion.button 
        onClick={handleSubmitNewUser} 
        className={style.createAccBtn}
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        >
        Create Account</motion.button>
        <p>Already have an account? <Link to='/login'>LOGIN</Link></p>
        </div>
      </div>
      {openModal && <SimpleMessage message={message} setFunction={handleModalClose} />}
      {openTOSModal && <TOSmodal deny_acceptFunction={deny_acceptFunction}/>}
    </div>
  );
};

export default NewAccount;
