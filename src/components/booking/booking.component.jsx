import React from 'react';

import './booking.styles.scss';

const Booking = ({ id, user, day, start, end, color }) => (
  <div
    key={id}
    className="booked-item"
    style={{
      backgroundColor: `${color}`,
      gridColumn: `${day}`,
      gridRow: `t${start
        .toTimeString()
        .slice(0, 5)
        .replace(':', '')} / t${end
        .toTimeString()
        .slice(0, 5)
        .replace(':', '')}`,
    }}
  >
    <div className="booked-item-container">
      <div className="start-time">{start.toTimeString().slice(0, 5)}</div>
      <div className="item-info">{user}</div>
      <div className="end-time">{end.toTimeString().slice(0, 5)}</div>
    </div>
  </div>
);

export default Booking;
