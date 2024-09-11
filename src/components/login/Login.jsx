import React, { useState, useEffect } from 'react';
import style from './login.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { index } from '../../utils/endpointIndex.js';
import { useNavigate } from 'react-router-dom';
import TOSmodal from '../../utils/TOSmodal';
import SimpleMessage from '../../utils/SimpleMessage';
import { registerUser, loginUser, decodeGoogleResponse } from '../../utils/APIfunctions.js';
import { v4 } from 'uuid';

const Login = ({ isLoggedIn, setIsLoggedIn, setResponse, setProfileData, setNewUserData }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [terms, setTerms] = useState(false);
  const [newUserData, setNewUserDataState] = useState(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [inputError, setInputError] = useState(false);

  const navigate = useNavigate();

  const uuid = v4()

  useEffect(() => {
    if (!terms || !newUserData) return;
    registerUser(newUserData, terms, navigate, setProfileData, setIsLoggedIn);
    navigate('/');
  }, [terms, newUserData]);

  const handleLogin = (loginData, setOpenErrorModal, setInputError, setProfileData, setIsLoggedIn) => {
    loginUser(loginData, setOpenErrorModal, setInputError, setProfileData, setIsLoggedIn);
    navigate('/');
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const deny_acceptFunction = (accept_deny) => {
    setOpenModal(false);
    setTerms(accept_deny);
  };

  const responseMessage = async (response) => {
    setResponse(response);
    setIsLoggedIn(true);
    decodeGoogleResponse(response, setNewUserData, setProfileData, setIsLoggedIn, navigate, setNewUserDataState, setOpenModal)
  };

  return (
    <div className={style.container} aria-label="Login container">
      <div className={style.login} aria-label="Login form">
        <div className={style.title} aria-label="Welcome Back!"><h3 className={style.h3}>Welcome Back!</h3></div>
        <fieldset className={inputError ? style.fieldsetError : style.fieldset} aria-label="Email input field">
          <legend className={inputError ? style.legendError : ''}>email</legend>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleInputChange}
            className={style.inputCorrect}
            aria-label="Email input"
          />
        </fieldset>
        <fieldset className={inputError ? style.fieldsetError : style.fieldset} aria-label="Password input field">
          <legend className={inputError ? style.legendError : ''}>password</legend>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleInputChange}
            className={style.inputCorrect}
            aria-label="Password input"
          />
        </fieldset>
        <div>
          <button
            className={style.button}
            onClick={() => handleLogin(loginData, setOpenErrorModal, setInputError, setProfileData, setIsLoggedIn)}
            aria-label="Login button"
          >
            login
          </button>
        </div>
        <h3 aria-label="Or login with Google">or</h3>
        <div className={style.loginBtnContainer} aria-label="Google login button container">
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
            aria-label="Google login button"
          />
        </div>
      </div>
      {openModal && <TOSmodal deny_acceptFunction={deny_acceptFunction} />}
      {openErrorModal && <SimpleMessage message="Incorrect email or password" setFunction={setOpenErrorModal} />}
    </div>
  );
};

export default Login;
