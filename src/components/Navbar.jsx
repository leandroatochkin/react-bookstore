import React from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

const Navbar = ({isLoggedIn, setIsLoggedIn, setResponse}) => {
  const responseMessage = (response) => {
    setResponse(response);
    setIsLoggedIn(true)
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
        <h1>book store</h1>
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
          <li className="navbar-button">
            <GoogleLogin 
            onSuccess={responseMessage} 
            onError={errorMessage} 
            scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
            />
          </li>
        )}

        </ul>
    </div>
  )
}

export default Navbar