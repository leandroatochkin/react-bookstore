import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './newaccount.module.css';
import { index } from '../../utils/endpointIndex.js'
import { isPasswordOk, isUsernameOk, _TOS } from '../../utils/utils.js';
import SimpleMessage from '../../utils/SimpleMessage.jsx';
import TOSmodal from '../../utils/TOSmodal.jsx';
import { motion } from 'framer-motion';
import { submitNewUser } from '../../utils/APIfunctions.js';

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
  const [openTOSModal, setOpenTOSModal] = useState(false);
  const [message, setMessage] = useState('');
  const [terms, setTerms] = useState(false);

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
    setOpenTOSModal(true);

    if (!terms || !newUserData) return;

    if (isPasswordOk(newUserData.password, repeatPassword) && isUsernameOk(newUserData.username)) {
      submitNewUser(newUserData, setMessage, setOpenModal)
    } else {
      setMessage('Please read and accept our terms.');
      setOpenModal(true);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    if (message === 'User created successfully!' || message === 'Error creating user!') {
      navigate('/login');
    }
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
            <form className={style.form} aria-label="Create New Account Form">
              <div className={style.formGroup}>
                <fieldset className={style.inputLine}>
                  <legend htmlFor="username">Username</legend>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                    aria-label="Username"
                    aria-describedby="username-desc"
                  />
                  <small id="username-desc" className={style.inputDescription} style={{display: 'none'}}>
                    Username must be at least 6 characters long.
                  </small>
                </fieldset>

                <fieldset className={style.inputLine}>
                  <legend htmlFor="password">Password</legend>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    aria-label="Password"
                    aria-describedby="password-desc"
                  />
                  <small id="password-desc" className={style.inputDescription} style={{display: 'none'}}>
                    Password must be at least 8 characters long, with one uppercase letter and one number.
                  </small>
                </fieldset>

                <fieldset className={style.inputLine}>
                  <legend htmlFor="confirmPassword">Repeat Password</legend>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleComparePassword}
                    aria-label="Repeat Password"
                  />
                </fieldset>

                <fieldset className={style.inputLine}>
                  <legend htmlFor="email">Email</legend>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    aria-label="Email Address"
                  />
                </fieldset>

                <fieldset className={style.inputLine}>
                  <legend htmlFor="name">Name</legend>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={handleInputChange}
                    aria-label="Full Name"
                  />
                </fieldset>

                <fieldset className={style.inputLine}>
                  <legend htmlFor="phone">Phone</legend>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={handleInputChange}
                    aria-label="Phone Number"
                  />
                </fieldset>

                <fieldset className={style.inputLine}>
                  <legend htmlFor="address">Address</legend>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    onChange={handleInputChange}
                    aria-label="Address"
                  />
                </fieldset>

                <fieldset className={style.inputLine}>
                  <legend htmlFor="city">City</legend>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    onChange={handleInputChange}
                    aria-label="City"
                  />
                </fieldset>

                <fieldset className={style.inputLine}>
                  <legend htmlFor="country">Country</legend>
                  <select
                    name="country"
                    id="country"
                    onChange={handleInputChange}
                    aria-label="Country"
                  >
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
        </div>

        <div className={style.bottomContainer}>
          <motion.button
            onClick={handleSubmitNewUser}
            className={style.createAccBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Create Account"
          >
            Create Account
          </motion.button>
          <p>
            Already have an account? <Link to="/login">LOGIN</Link>
          </p>
        </div>
      </div>

      {openModal && <SimpleMessage message={message} setFunction={handleModalClose} />}
      {openTOSModal && <TOSmodal deny_acceptFunction={deny_acceptFunction} />}
    </div>
  );
};

export default NewAccount;
