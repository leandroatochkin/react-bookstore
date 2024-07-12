import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './newaccount.module.css';
import { isPasswordOk, isUsernameOk, DB_register_endpoint } from '../../utils/utils.js';
import SimpleMessage from '../../utils/SimpleMessage.jsx';


const NewAccount = () => {
  const [repeatPassword, setRepeatPassword] = useState('');
  const [newUserData, setNewUserData] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    country: 'Argentina',
    picture: '',
    terms: null,
    purchases: [],
    settings: []
  });
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');

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
    if (isPasswordOk(newUserData.password, repeatPassword) && isUsernameOk(newUserData.username) && newUserData.terms === true) {
      fetch(DB_register_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newUserData)
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

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <h1 className={style.title}>New Account</h1>
        <div className={style.info}>
          <div className={style.inputsContainer}>
            <form className={style.form}>
              <div className={style.formGroup}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Username" onChange={handleInputChange} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" onChange={handleInputChange} />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" onChange={handleComparePassword} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" onChange={handleInputChange} />
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Name" onChange={handleInputChange} />
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id="phone" placeholder="Phone" onChange={handleInputChange} />
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" placeholder="Address" onChange={handleInputChange} />
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" placeholder="City" onChange={handleInputChange} />
                <label htmlFor="country">Country</label>
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
              </div>
            </form>
          </div>
          <div className={style.termsContainer}>
            <p>Sint magna ipsum ullamco tempor ipsum nostrud cillum reprehenderit id nisi non in eu. Mollit elit incididunt aliquip aliquip aliqua consectetur anim sit duis. Consequat aliquip ad minim fugiat veniam ea et. Velit culpa cillum in commodo cillum id consectetur proident minim ut. Laboris ipsum ipsum officia minim incididunt nostrud non nostrud commodo sint esse. Nulla officia laborum deserunt quis in Lorem cillum qui aliquip aute adipisicing. Nisi ipsum eu ad quis irure adipisicing id excepteur ullamco officia. Velit pariatur aliquip amet fugiat laborum ipsum sint ut consequat officia in dolor. Consectetur sit laboris minim pariatur amet aute est. Esse aliqua Lorem dolore ut sint qui nisi nulla est. Magna non occaecat velit quis labore ex dolor consectetur duis tempor sunt reprehenderit enim. Sunt duis occaecat quis et tempor occaecat irure do nostrud. Labore voluptate anim ut cupidatat reprehenderit sit cillum anim do veniam nostrud commodo irure aute. Pariatur sit anim magna incididunt proident exercitation labore fugiat do id mollit. Esse do exercitation nostrud nisi velit est quis mollit aliqua aute Lorem dolore. Ea veniam duis dolor occaecat. Elit nostrud officia minim nostrud veniam occaecat cupidatat aliqua deserunt cillum tempor.</p>
            <input type="checkbox" name="terms" id="terms" onChange={handleInputChange} />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
        </div>
        <div>
        <button onClick={handleSubmitNewUser}>Create Account</button>
        <p>Already have an account? <Link to='/login'>LOGIN</Link></p>
        </div>
      </div>
      {openModal && <SimpleMessage message={message} setFunction={handleModalClose} />}
    </div>
  );
};

export default NewAccount;
