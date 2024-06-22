import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesView from './components/CategoriesView';
import GenreView from './components/GenreView';

function App() {
const [genre, setGenre] = useState('')


  return (
    <Router>
      <>  
      <Navbar />
      <Routes>
      <Route path="/categories" element={<CategoriesView setGenre={setGenre}/>} />
      <Route path="/categories/:genre" element={<GenreView />} />

      </Routes>
    </>

    </Router>
    
  )
}

export default App
//\react-bookstore\src\mockup_db> json-server --watch db.json --port 5000
