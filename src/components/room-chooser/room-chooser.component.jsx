import React from 'react';

import './room-chooser.styles.scss';

const RoomChooser = ({ currentRoom, schedule }) => {
  console.log(schedule);
  console.log(currentRoom);

  return <div className="chooser-container">{schedule[currentRoom].title}</div>;
};

export default RoomChooser;
