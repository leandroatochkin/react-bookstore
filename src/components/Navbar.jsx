import React from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'

const Navbar = () => {
  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};

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
            <li className='navbar-button'><GoogleLogin onSuccess={responseMessage} onError={errorMessage}/></li>
        </ul>
    </div>
  )
}

export default Navbar