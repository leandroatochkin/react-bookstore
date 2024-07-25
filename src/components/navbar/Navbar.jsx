import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { DB_checkUser_endpoint, DB_register_endpoint, google_scope } from '../../utils/endpointIndex';
import TOSmodal from '../../utils/TOSmodal';
import SimpleMessage from '../../utils/SimpleMessage'
import { saveUser } from '../../utils/utils';
import style from './navbar.module.css'
import IconMenu from '../../utils/icons/MenuIcon';
import { motion } from 'framer-motion';



const Navbar = ({ 
  isLoggedIn, 
  setIsLoggedIn, 
  setResponse, 
  setProfileData, 
  setNewUserData,
  isHome }) => {
  const [openModal, setOpenModal] = useState(false)
  const [msgModal, setMsgModal] = useState(false)
  const [googleError, setGoogleError] = useState(false)
  const [error, setError] = useState('') 
  const [terms, setTerms] = useState(false)
  const [newUserData, setNewUserDataState] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate();

  console.log(isHome)

  useEffect(() => {
    if (!terms || !newUserData) return

    const registerUser = async () => {
      fetch(DB_register_endpoint, {
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
          setProfileData(prevData => ({
            ...prevData,
            user: newUserData
          }));
          setIsLoggedIn(true);
          saveUser(navigate, newUserData); // Navigate to user profile after registration
        })
        .catch(error => {
          console.error('Error adding user:', error.message);
          setError('Error logging in. Please, try again later.')
          setMsgModal(true)
        });
      }
      registerUser()
    }, [terms, newUserData]);

  const deny_acceptFunction = (accept_deny) => {
    setOpenModal(false);
    setTerms(accept_deny);
  };

  const responseMessage = async (response) => {
    setResponse(response);
    const tokenData = jwtDecode(response.credential);
    const userData = {
      username: tokenData.name,
      password: tokenData.jti,
      email: tokenData.email,
      name: tokenData.name,
      phone: '',
      address: '',
      city: '',
      country: '',
      picture: tokenData.picture,
      terms: null,
      purchases: [],
      settings: [],
      favs: [],
    };
    
    setNewUserData(userData);

    // Check if user exists
    fetch(`${DB_checkUser_endpoint}/${tokenData.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          // User exists, log them in
          setProfileData(prevData => ({
            ...prevData,
            user: data.user
          }));
          saveUser(navigate, data.user)
          setIsLoggedIn(true);
        } else {
          // User does not exist, show terms modal for registration
          setNewUserDataState(userData); // Set new user data state for use in useEffect
          setOpenModal(true);
        }
      })
      .catch(error => {
        console.error('Error checking user existence:', error.message);
        setError("There's an error with our server. Please, try again later.")
        setMsgModal(true)
      });
  };

  const errorMessage = (error) => {
    console.log(error);
    setGoogleError(true)
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    googleLogout();
    setProfileData(null);
    localStorage.removeItem('user');
    navigate('/'); // Navigate to home after logout
  };

  return (
    <div className={!isHome ? (collapsed ? style.navbarCollapsed : style.navbar) : style.hidden}>
      <div className={style.topContainer}>
      <Link to="/" ><h1>Book Store</h1></Link> 
      <button className={style.collapseBtn} onClick={()=>setCollapsed(!collapsed)}><IconMenu /></button>
      </div>
      <ul className={collapsed ? style.collapsedUl : style.ul}>
        <motion.li 
        className={style.li}
        whileHover={{scale: 1.05}}
        whileTap={{scale:0.85}}
        >
        <Link to="/categories" className={style.link}>Categories</Link>
        </motion.li>
        <motion.li 
        className={style.li}
        whileHover={{scale: 1.05}}
        whileTap={{scale:0.85}}
        >
          {isLoggedIn ? <Link to="/shopping-cart" className={style.link}>Shopping Cart</Link> : <Link to="/login">Shopping Cart</Link>}
        </motion.li>
        <motion.li 
        className={style.li}
        whileHover={{scale: 1.05}}
        whileTap={{scale:0.95}}
        >
          {isLoggedIn ? <Link to="/user-profile" className={style.link}>Profile</Link> : <Link to="/login">Profile</Link>}
        </motion.li>
        </ul>
        {isLoggedIn ? (
          <div className={collapsed ? style.collapsedNavbarLogout : style.navbarLogout}>
            <button onClick={handleLogOut} className={style.logoutBtn}>LOGOUT</button>
          </div>
        ) : (
          <div className={style.navbarLogin} >
            <div style={{ colorScheme: 'light' }}>
            <GoogleLogin
              onSuccess={responseMessage}
              onError={errorMessage}
              scope={google_scope}
            />
            
          </div>
          <h3>or <Link to="/create-account">Create Account</Link></h3>
          </div>
        )}
        
      
      {msgModal && <SimpleMessage message={error} setFunction={()=>setMsgModal(false)}/>}
      {googleError && <SimpleMessage message={'Google Login is not available at the moment. Please, try again later.'} setFunction={()=>setGoogleError(false)}/>}
      {openModal && <TOSmodal deny_acceptFunction={deny_acceptFunction} />}
    </div>
  );
};

export default Navbar;