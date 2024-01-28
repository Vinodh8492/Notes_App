import React from 'react';
import styles from './Groups.module.css';

const Groups = ({ groupName, selectedColor, groupNameStyle }) => {
  const displayLetters =
    groupName && groupName.split(' ').slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase();

  return (
    <div className={styles.container}>
      {selectedColor && (
        <div className={styles.colorCircle} style={{ backgroundColor: selectedColor }}>
          <div className={styles.centeredLetters}>
            {displayLetters}
          </div>
        </div>
      )}
      <p className={styles.para} style={{ marginLeft: selectedColor ? '1vw' : '0', ...groupNameStyle }}>
        {groupName}
      </p>
    </div>
  );
};

export default Groups;
