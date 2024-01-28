import React, { useState, useEffect, useRef } from 'react';
import styles from './Alert.module.css';

const Alert = ({ setGroupName, setShowAlert, setSelectedColor, onCreateButtonClick }) => {
  const [selectedColor, setColor] = useState(null);
  const [groupNameInput, setGroupNameInput] = useState('');
  const alertRef = useRef(null);

  const handleColorClick = (color) => {
    setColor(color);
  };

  const handleGroupNameChange = (e) => {
    setGroupNameInput(e.target.value);
  };

  const submitFunction = (e) => {
    e.preventDefault();
    setGroupName(groupNameInput);
    setSelectedColor(selectedColor);
    setShowAlert(false);
    onCreateButtonClick();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(`.${styles.form}`)) {
        setShowAlert(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setShowAlert, alertRef]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];

  const isCreateButtonEnabled = groupNameInput.trim() !== '' && selectedColor !== null;

  return (
    <div className={styles.alertcontainer} ref={alertRef} onClick={handleContainerClick}>
      <div className={styles.form}>
        <form onSubmit={submitFunction}>
          <p className={styles.para}>Create New group</p>
          <div className={styles.group}>
            Group name{' '}
            <input
              placeholder="Enter group name"
              type="text"
              name="nam"
              value={groupNameInput}
              onChange={handleGroupNameChange}
              className={styles.input}
            />
          </div>

          <div className={styles.req}>
            <p className={styles.sec}>Choose colour :</p>
            <div className={styles.colorButtons}>
              {colors.map((color) => (
                <div
                  key={color}
                  className={`${styles.colorButton} ${selectedColor === color ? styles.selected : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}
                ></div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={styles.curse}
            style={{
              cursor: isCreateButtonEnabled ? 'pointer' : 'not-allowed',
            }}
            disabled={!isCreateButtonEnabled}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Alert;
