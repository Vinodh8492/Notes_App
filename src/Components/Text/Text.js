import React, { useState, useEffect } from 'react';
import styles from './Text.module.css';
import Groups from '../Groups/Groups';
import Enter from '../../Assets/Images/Enter.png';
import BackArrow from '../../Assets/Images/BackArrow.png';
import { format } from 'date-fns';

const Text = ({ groupName, selectedColor, groupNotes, setGroupNotes, onBackArrowClick }) => {
  const [userInput, setUserInput] = useState('');
  const [textList, setTextList] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const getCurrentTime = () => {
    return format(new Date(), 'dd MMM yyyy . h:mm a');
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleDisplayButtonClick = () => {
    if (userInput.trim() !== '') {
      const formattedTime = getCurrentTime();
      const newText = userInput;
      const newTime = formattedTime;
      setTextList([...textList, { text: newText, time: newTime }]);
      setUserInput('');
      const updatedNotes = [...textList, { text: newText, time: newTime }];
      setGroupNotes(updatedNotes);
      localStorage.setItem(groupName, JSON.stringify(updatedNotes));
    }
  };

  const isEnterButtonEnabled = userInput.trim() !== '';

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(groupName)) || [];
    setTextList(storedNotes);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [groupName]);

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobileView : ''}`}>
      <div className={styles.top}>
        {isMobile && (
          <div className={styles.backArrowContainer} onClick={onBackArrowClick}>
            <img src={BackArrow} alt="Back Arrow" className={styles.backArrow} />
          </div>
        )}
        <Groups groupName={groupName} selectedColor={selectedColor} groupNameStyle={{ color: 'white' }} />
      </div>
      <div className={styles.textList}>
        {textList.map((item, index) => (
          <div key={index} className={styles.row}>
            <p>{item.text}</p>
            <p className={styles.Time}>{item.time}</p>
          </div>
        ))}
      </div>
      <div className={styles.box}>
        <div className={styles.textAreaContainer}>
          <textarea
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your text here ....."
            className={styles.textAreaField}
          />
          <img
            onClick={isEnterButtonEnabled ? handleDisplayButtonClick : null}
            src={Enter}
            className={`${styles.enterImage} ${isEnterButtonEnabled ? styles.enabled : styles.disabled}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Text;
