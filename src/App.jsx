import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesView from './components/CategoriesView';
import GenreView from './components/GenreView';
import ShoppingCart from './components/ShoppingCart';
import StripeProvider from './components/StripeProvider'

function App() {
const [genre, setGenre] = useState('')
const [shoppingCart, setShoppingCart] = useState([])

const handleRemoveFromCart = (id) =>{
  // implement remove from cart functionality
  setShoppingCart(shoppingCart.filter((item) => item.id !== id))
}

  return (
    <StripeProvider>
    <Router>
      <>  
      <Navbar />
      <Routes>
      <Route path="/"/>
      <Route path="/categories" element={<CategoriesView setGenre={setGenre}/>} />
      <Route path="/categories/:genre" element={<GenreView setShoppingCart={setShoppingCart}/>} />
      <Route path='/shopping-cart' element={<ShoppingCart shoppingCart={shoppingCart} onRemove={handleRemoveFromCart}/>}/>
      </Routes>
    </>

    </Router>
    </StripeProvider>
  )
}

export default App
//\react-bookstore\src\mockup_db> json-server --watch db.json --port 5000
