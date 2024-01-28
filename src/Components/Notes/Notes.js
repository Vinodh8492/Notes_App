import React from 'react'
import BigImage from '../../Assets/Images/BigImage.png';
import Lock from '../../Assets/Images/Lock.png';
import styles from './Notes.module.css'

const Notes = () => {
  return (
    <div className={styles.right}>
      <img src={BigImage} className={styles.big} />
      <h1 className={styles.head}>Pocket Notes </h1>
      <p className={styles.para1}>
        Send and receive messages without keeping your phone online
      </p>
      <p className={styles.para2}>Use Pocket Notes on up to 4 linked devices and 1 mobile phone </p>

      <div className={styles.divi}>
        <img src={Lock} className={styles.end} />
        <h3 className={styles.final}>end-to-end encrypted </h3>
      </div>
    </div>
  )
}

export default Notes