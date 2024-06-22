import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
            <li className='navbar-button'>Profile</li>
        </ul>
    </div>
  )
}

export default Navbar