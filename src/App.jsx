import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesView from './components/CategoriesView';
import GenreView from './components/GenreView';
import ShoppingCart from './components/ShoppingCart';
import StripeProvider from './components/StripeProvider'
import UserProfile from './components/profile/UserProfile';
import Home from './components/Home';
import NewAccount from './components/new_account/NewAccount';
import Login from './components/login/Login';


function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [response, setResponse] = useState(null)
const [genre, setGenre] = useState('')
const [shoppingCart, setShoppingCart] = useState([])
const [profileData, setProfileData] = useState({})

useEffect(()=>{
  console.log(profileData)
}, [profileData])



const handleRemoveFromCart = (id) =>{
  // implement remove from cart functionality
  setShoppingCart(shoppingCart.filter((item) => item.id !== id))
}

  return (
    <StripeProvider>
    <Router>
      <>  
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setResponse={setResponse}/>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/categories" element={<CategoriesView setGenre={setGenre}/>} />
      <Route path="/categories/:genre" element={<GenreView setShoppingCart={setShoppingCart}/>} />
      <Route path='/shopping-cart' element={<ShoppingCart shoppingCart={shoppingCart} onRemove={handleRemoveFromCart}/>}/>
      <Route path='/user-profile' element={<UserProfile response={response}/>} />
      <Route path='/create-account' element={<NewAccount />} />
      <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setResponse={setResponse} setProfileData={setProfileData}/>} />
      </Routes>
    </>

    </Router>
    </StripeProvider>
  )
}

export default App
//\react-bookstore\src\mockup_db> json-server --watch db.json --port 5000
