import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { index } from '../../utils/endpointIndex.js';
import TOSmodal from '../../utils/TOSmodal';
import SimpleMessage from '../../utils/SimpleMessage';
import { saveUser } from '../../utils/utils';
import style from './navbar.module.css';
import { motion } from 'framer-motion';
import { PanelTopOpen, PanelTopClose, LogOut } from 'lucide-react';
import { registerUser, decodeGoogleResponse } from '../../utils/APIfunctions.js';

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  setResponse,
  setProfileData,
  setNewUserData,
  pageLocation,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [msgModal, setMsgModal] = useState(false);
  const [googleError, setGoogleError] = useState(false);
  const [error, setError] = useState('');
  const [terms, setTerms] = useState(false);
  const [newUserData, setNewUserDataState] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!terms || !newUserData) return;

    registerUser(newUserData, terms, setProfileData, setIsLoggedIn, setMsgModal);
    navigate('/')
  }, [terms, newUserData]);

  const deny_acceptFunction = (accept_deny) => {
    setOpenModal(false);
    setTerms(accept_deny);
  };

  const responseMessage = async (response) => {
    setResponse(response);
    decodeGoogleResponse(response, setNewUserData, setProfileData, setIsLoggedIn, navigate, setNewUserDataState, setOpenModal, setError, setMsgModal)
  };

  const errorMessage = (error) => {
    console.log(error);
    setGoogleError(true);
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
    <div
      className={
        pageLocation !== 'home'
          ? collapsed
            ? pageLocation === 'user-profile'
              ? style.navbarCollapsedProfile
              : style.navbarCollapsed
            : pageLocation === 'user-profile'
            ? style.profileNavbar
            : style.navbar
          : style.hidden
      }
      aria-label="Navigation bar"
    >
      <div className={style.topContainer}>
        <Link to="/" aria-label="Go to home page">
          {collapsed ? (
            <img
              src={'../../../public/logo_logoonly.png'}
              className={style.logoSmall}
              alt="Small logo"
              aria-label="Small logo"
            />
          ) : (
            <img
              src={'../../../public/logo_horizontal.png'}
              className={style.logoBig}
              alt="Large logo"
              aria-label="Large logo"
            />
          )}
        </Link>
        <button
          className={style.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <PanelTopOpen size={48} /> : <PanelTopClose size={48} />}
        </button>
      </div>
      <ul className={collapsed ? style.collapsedUl : style.ul} aria-label="Navigation menu">
        <motion.li
          className={style.li}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
        >
          <Link
            to="/categories"
            className={style.link}
            style={pageLocation === 'user-profile' ? { color: 'white' } : { color: '#F896D8' }}
            aria-label="Go to categories"
          >
            Categories
          </Link>
        </motion.li>
        <motion.li
          className={style.li}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
        >
          {isLoggedIn ? (
            <Link
              to="/shopping-cart"
              className={style.link}
              style={pageLocation === 'user-profile' ? { color: 'white' } : { color: '#F896D8' }}
              aria-label="Go to shopping cart"
            >
              Shopping Cart
            </Link>
          ) : (
            <Link to="/login" 
            aria-label="Log in to view shopping cart"
            className={style.link}
            style={pageLocation === 'user-profile' ? { color: 'white' } : { color: '#F896D8' }}
            >
              Shopping Cart
            </Link>
          )}
        </motion.li>
        <motion.li
          className={style.li}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoggedIn ? (
            <Link
              to="/user-profile"
              className={style.link}
              style={pageLocation === 'user-profile' ? { color: 'white' } : { color: '#F896D8' }}
              aria-label="Go to user profile"
            >
              Profile
            </Link>
          ) : (
            <Link to="/login" 
            className={style.link}
              style={pageLocation === 'user-profile' ? { color: 'white' } : { color: '#F896D8' }}
            aria-label="Log in to view profile">
              Login
            </Link>
          )}
        </motion.li>
      </ul>
      {isLoggedIn ? (
        <div className={collapsed ? style.collapsedNavbarLogout : style.navbarLogout}>
          <button onClick={handleLogOut} className={style.logoutBtn} aria-label="Log out">
            <LogOut />
          </button>
        </div>
      ) : (
        <div className={collapsed ? style.collapsedNavbarLogin : style.navbarLogin}>
          <div style={{ colorScheme: 'light' }}>
            <GoogleLogin
              onSuccess={responseMessage}
              onError={errorMessage}
              scope={index.google_scope}
              aria-label="Google login button"
            />
          </div>
          <h3>
            or <Link to="/create-account" aria-label="Create an account">Create Account</Link>
          </h3>
        </div>
      )}
      {msgModal && <SimpleMessage message={error} setFunction={() => setMsgModal(false)} />}
      {googleError && (
        <SimpleMessage
          message="Google Login is not available at the moment. Please, try again later."
          setFunction={() => setGoogleError(false)}
        />
      )}
      {openModal && <TOSmodal deny_acceptFunction={deny_acceptFunction} />}
    </div>
  );
};

export default Navbar;
