import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setSelectedBooking } from '../../redux/user/user.actions';
import { selectSelectedBooking } from '../../redux/user/user.selectors';

import './booking.styles.scss';

const Booking = (props) => {
  return (
    <div
      key={props.id}
      className={`booked-item ${
        props.currentUser && props.userID === props.currentUser.id
          ? 'updateCursor'
          : ''
      }`}
      style={{
        backgroundColor: `${props.color}`,
        gridColumn: `${props.weekDay}`,
        gridRow: `t${props.startTime
          .toTimeString()
          .slice(0, 5)
          .replace(':', '')} / t${props.endTime
          .toTimeString()
          .slice(0, 5)
          .replace(':', '')}`,
      }}
      onClick={() =>
        props.currentUser && props.userID === props.currentUser.id
          ? props.setSelectedBooking({
              bookingID: props.bookingID,
              startTime: props.startTime,
              endTime: props.endTime,
              weekDay: props.weekDay,
              userDisplayName: props.userDisplayName,
              showBookingHandler: true,
            })
          : null
      }
    >
      <div className="booked-item-container">
        <div className="start-time">
          {props.startTime.toTimeString().slice(0, 5)}
        </div>
        <div className="item-info">{props.userDisplayName}</div>
        <div className="end-time">
          {props.endTime.toTimeString().slice(0, 5)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedBooking: selectSelectedBooking,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedBooking: (booking) => dispatch(setSelectedBooking(booking)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
