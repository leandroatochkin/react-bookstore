import { useEffect, useState, Suspense } from 'react'
import Navbar from './components/navbar/Navbar'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesView from './components/books/CategoriesView';
import GenreView from './components/books/GenreView';
import ShoppingCart from './components/shopping_cart/ShoppingCart';
import StripeProvider from './components/StripeProvider'
import UserProfile from './components/profile/UserProfile';
import Home from './components/home/Home';
import NewAccount from './components/new_account/NewAccount';
import Login from './components/login/Login';
import { MoonLoader } from 'react-spinners';


function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [response, setResponse] = useState(null)
const [genre, setGenre] = useState('')
const [shoppingCart, setShoppingCart] = useState([])
const [profileData, setProfileData] = useState({})
const [newUserData, setNewUserData] = useState({});



useEffect(()=>{
  console.log(profileData)
}, [profileData])

const[loading, setLoading] = useState(false)


useEffect(() => {

  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000); // 2 seconds delay

  return () => clearTimeout(timer); // Clean up the timer on unmount
}, []);

useEffect(() => {

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setIsLoggedIn(true)
    const parsedUser = JSON.parse(storedUser)

    setProfileData(prevData => ({
      ...prevData,
      user: parsedUser
    }));
    
  }
}, []);


const handleRemoveFromCart = (id) =>{
  // implement remove from cart functionality
  setShoppingCart(shoppingCart.filter((item) => item.id !== id))
}

  return (
    <>
    {loading ? (
      <MoonLoader/>
    ) : (
      <StripeProvider>
    <Router>
      <>  
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setResponse={setResponse} setProfileData={setProfileData} setNewUserData={setNewUserData}/>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/categories" element={<CategoriesView profileData={profileData} setGenre={setGenre}/>} />
      <Route path="/categories/:genre" element={<GenreView profileData={profileData} setShoppingCart={setShoppingCart}/>} />
      <Route path='/shopping-cart' element={<ShoppingCart shoppingCart={shoppingCart} onRemove={handleRemoveFromCart} isLoggedIn={isLoggedIn} profileData={profileData}/>}/>
      <Route path='/user-profile' element={<UserProfile profileData={profileData} setProfileData={setProfileData} setIsLoggedIn={setIsLoggedIn} setShoppingCart={setShoppingCart}/>} />
      <Route path='/create-account' element={<NewAccount />} />
      <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setResponse={setResponse} profileData={profileData} setProfileData={setProfileData} setNewUserData={setNewUserData}/>} />
      </Routes>
    </>
    </Router>
    </StripeProvider>
    )}
    </>
  )
}

export default App
//\react-bookstore\src\mockup_db> json-server --watch db.json --port 5000
