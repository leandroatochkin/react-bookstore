import React from 'react'
import styles from './VerticalMenu.module.css'


const VerticalMenu = ({elements, setView}) => {

const handleClick = (element) => {
    setView(element.value)
}
  return (
    <div>
        <ul className={styles.menuContainer}>
            {elements.map((element, index) => {
                return <li key={index} className={styles.listItem} onClick={()=>handleClick(element)}><a className={styles.link}>{element.name}</a></li>
                })}
        </ul>
    </div>
  )
}

export default VerticalMenu