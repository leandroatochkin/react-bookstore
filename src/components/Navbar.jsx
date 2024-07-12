import React from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { DB_checkUser_endpoint, DB_register_endpoint } from '../utils/utils'

const Navbar = ({isLoggedIn, setIsLoggedIn, setResponse, setProfileData, setNewUserData}) => {
  const responseMessage = async (response) => {
    setResponse(response);
    setIsLoggedIn(true)
    const tokenData = jwtDecode(response.credential)
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
        }

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
        // User does not exist, register them
        fetch(DB_register_endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(userData)
        })
          .then(response => response.json())
          .then(data => {
            console.log('User created successfully!');
            setProfileData(prevData => ({
              ...prevData,
              user: data.user
            }));
            setIsLoggedIn(true);
          })
          .catch(error => {
            console.error('Error adding user:', error.message);
          });
      }
    })
    .catch(error => {
      console.error('Error checking user existence:', error.message);
    });
};
const errorMessage = (error) => {
    console.log(error);
};

const handleLogOut = () =>{
  setIsLoggedIn(false)
  googleLogout();
  console.log(isLoggedIn)
}

  return (
    <div className='navbar'>
        <Link to="/"><h1>book store</h1></Link>
        <ul>
            <li className='navbar-button'>
            <Link to="/categories">Categories</Link>
            </li>
            <li className='navbar-button'>Favorites</li>
            <li className='navbar-button'>
            <Link to="/shopping-cart">Shopping Cart</Link>
            </li>
            <li className='navbar-button'>
            <Link to="/user-profile">Profile</Link>
            </li>
            {isLoggedIn ? (
          <li className="navbar-button">
            <button onClick={handleLogOut}>LOGOUT</button>
          </li>
        ) : (
          <li className="navbar-login">
            <GoogleLogin 
            onSuccess={responseMessage} 
            onError={errorMessage} 
            scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
            />
            <h3>or <Link to="/create-account">Create Account</Link></h3>
          </li>
        )}

        </ul>
    </div>
  )
}

export default Navbar