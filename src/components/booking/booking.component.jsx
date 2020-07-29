import React from 'react';

import './booking.styles.scss';

const Booking = ({
  id,
  userDisplayName,
  weekDay,
  startTime,
  endTime,
  color,
}) => {
  return (
    <div
      key={id}
      className="booked-item"
      style={{
        backgroundColor: `${color}`,
        gridColumn: `${weekDay}`,
        gridRow: `t${startTime
          .toTimeString()
          .slice(0, 5)
          .replace(':', '')} / t${endTime
          .toTimeString()
          .slice(0, 5)
          .replace(':', '')}`,
      }}
    >
      <div className="booked-item-container">
        <div className="start-time">{startTime.toTimeString().slice(0, 5)}</div>
        <div className="item-info">{userDisplayName}</div>
        <div className="end-time">{endTime.toTimeString().slice(0, 5)}</div>
      </div>
    </div>
  );
};
export default Booking;
