import React from 'react'
import styles from './VerticalMenu.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const VerticalMenu = ({elements, setView}) => {

const handleClick = (element) => {
    setView(element.value)
}
  return (
    <div>
        <ul className={styles.menuContainer}>
            {elements.map((element, index) => {
                return <li key={index} className={styles.listItem} onClick={()=>handleClick(element)}><a className={styles.link}>{element.name}</a><ArrowForwardIosIcon /></li>
                })}
        </ul>
    </div>
  )
}

export default VerticalMenu