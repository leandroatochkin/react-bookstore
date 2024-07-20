import React, {useState, useEffect, isValidElement} from 'react'
import style from './favorites.module.css'
import { DB_findUserFavs_endpoint } from '../../../utils/endpointIndex'

const Favorites = ({user}) => {
 
const [books, setBooks] = useState([])
const [userFavs, setUserFavs] = useState([])

// useEffect(()=>{
//     fetch(`${DB_findUserFavs_endpoint}?ids=${}`)
//     .then(res => res.json())
//     .then(data => {
//         setBooks(data)
//         console.log(books)
//     })
//     .catch(err => console.log(err))
// },[user])

useEffect(()=>{
    if(!user || !user.favs) return
    setUserFavs(prevData =>({
        ...prevData,
        favs: [...(prevData.favs || []), ...(user.favs || [])]
    }))
},[user])

useEffect(() => {
    console.log(userFavs);
  }, [userFavs]);

  return (
    <div className={style.favoritesContainer}>
        <div className={style.purchasesList}>
            Favor
        </div>
    </div>
  )
}

export default Favorites