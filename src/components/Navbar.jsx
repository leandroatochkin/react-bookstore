import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { DB_checkUser_endpoint, DB_register_endpoint } from '../utils/utils';
import TOSmodal from '../utils/TOSmodal';

const Navbar = ({ isLoggedIn, setIsLoggedIn, setResponse, setProfileData, setNewUserData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [terms, setTerms] = useState(false);
  const [newUserData, setNewUserDataState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (terms && newUserData) {
      // Register the new user when terms are accepted
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
          navigate('/user-profile'); // Navigate to user profile after registration
        })
        .catch(error => {
          console.error('Error adding user:', error.message);
        });
    }
  }, [terms, newUserData]);

  const deny_acceptFunction = (accept_deny) => {
    setOpenModal(false);
    setTerms(accept_deny);
  };

  const responseMessage = async (response) => {
    setResponse(response);
    const tokenData = jwtDecode(response.credential);
    const userData = {
      id: '',
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
      settings: []
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
          setIsLoggedIn(true);
        } else {
          // User does not exist, show terms modal for registration
          setNewUserDataState(userData); // Set new user data state for use in useEffect
          setOpenModal(true);
        }
      })
      .catch(error => {
        console.error('Error checking user existence:', error.message);
      });
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    googleLogout();
    setProfileData(null);
    navigate('/'); // Navigate to home after logout
  };

  return (
    <div className='navbar'>
      <Link to="/"><h1>Book Store</h1></Link>
      <ul>
        <li className='navbar-button'>
          <Link to="/categories">Categories</Link>
        </li>
        <li className='navbar-button'>Favorites</li>
        <li className='navbar-button'>
          <Link to="/shopping-cart">Shopping Cart</Link>
        </li>
        <li className='navbar-button'>
          {isLoggedIn ? <Link to="/user-profile">Profile</Link> : <Link to="/login">Login</Link>}
        </li>
        {isLoggedIn ? (
          <li className="navbar-button">
            <button onClick={handleLogOut}>LOGOUT</button>
          </li>
        ) : (
          <li className="navbar-login" style={{ colorScheme: 'light' }}>
            <GoogleLogin
              onSuccess={responseMessage}
              onError={errorMessage}
              scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
            />
            <h3>or <Link to="/create-account">Create Account</Link></h3>
          </li>
        )}
      </ul>
      {openModal && <TOSmodal deny_acceptFunction={deny_acceptFunction} />}
    </div>
  );
};

export default Navbar;
