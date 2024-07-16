import React, {useState} from 'react'
import style from './home.module.css'


const Home = () => {
const [showAbout, setShowAbout] = useState(false)
  return (
    <div className={style.homeContainer}>
      <h1>All the books you're looking for, right here...</h1>
      <footer className={style.footer}>
        <ul className={style.footerUL}>
          <li onClick={()=>setShowAbout(true)}>About</li>
          <li>Contact</li>
        </ul>
        <p>© 2024 Bookstore</p>
      </footer>
      {showAbout && <div className={style.about}></div>}
    </div>
  )
}

export default Home