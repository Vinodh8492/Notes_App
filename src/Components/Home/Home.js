import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Ellipse from '../../Assets/Images/Ellipse.png';
import Plus from '../../Assets/Images/Plus.png';
import Alert from '../Alert/Alert';
import Notes from '../Notes/Notes';
import Text from '../Text/Text';
import Groups from '../Groups/Groups';

function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem('groups')) || []);
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [groupNotes, setGroupNotes] = useState({});

  const handleEllipseClick = () => {
    setShowAlert(true);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setIsMobileView(window.innerWidth <= 600);
  };

  const handleBackArrowClick = () => {
    setSelectedGroup(null);
    setIsMobileView(false);
  };


  const addGroup = (name, color) => {
    const isGroupExists = groups.some((group) => group.name === name);
    let showAlert = false;

    if (isGroupExists) {
      showAlert = true;
    } else {
      const newGroup = { name, color };
      setGroups((prevGroups) => [...prevGroups, newGroup]);
      localStorage.setItem('groups', JSON.stringify([...groups, newGroup]));
      setGroupNotes((prevGroupNotes) => ({ ...prevGroupNotes, [name]: [] }));
    }

    if (!showAlert) {
      alert(`Group with name '${name}' created successfully. Dont use the same name again`);
    }

  };

  useEffect(() => {
    if (groupName && selectedColor) {
      addGroup(groupName, selectedColor);
    }
  }, [groupName, selectedColor, groups]);

  return (
    <div className={`${styles.container} ${isMobileView ? styles.mobileView : ''}`}>
      <div className={styles.left}>
        <h1 className={styles.heading}> Pocket Notes </h1>

        <div className={styles.groupListContainer}>
          {groups.map((group, index) => (
            <div
              key={index}
              className={`${styles.groupContainer} ${selectedGroup === group ? styles.selectedGroup : ''}`}
              onClick={() => handleGroupClick(group)}
            >
              <Groups groupName={group.name} selectedColor={group.color} />
            </div>
          ))}
        </div>


        <div className={styles.start}>
          <img onClick={handleEllipseClick} src={Ellipse} className={styles.ellipse} />
          <img onClick={handleEllipseClick} src={Plus} className={styles.plus} />
        </div>
      </div>

      <div className={styles.not}>
        {selectedGroup ? (
          <Text
            groupName={selectedGroup.name}
            selectedColor={selectedGroup.color}
            groupNotes={groupNotes[selectedGroup.name]}
            setGroupNotes={(notes) => setGroupNotes((prevGroupNotes) => ({ ...prevGroupNotes, [selectedGroup.name]: notes }))}
            onBackArrowClick={handleBackArrowClick}
          />
        ) : (
          <Notes />
        )}

        {showAlert ? (
          <Alert
            setGroupName={setGroupName}
            setShowAlert={setShowAlert}
            setSelectedColor={setSelectedColor}
            onCreateButtonClick={() => {
              setSelectedGroup(null);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
