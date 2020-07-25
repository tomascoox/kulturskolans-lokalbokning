import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentRoom } from '../../redux/user/user.actions';
import { selectScheduleRoomdata } from '../../redux/schedule/schedule.selectors';
import { selectUserCurrentroom } from '../../redux/user/user.selectors';

import Booking from '../booking/booking.component';
import BookingHandler from '../booking-handler/booking-handler.component';

import newBookingButton from '../../assets/newBookingButton.svg';
import { Dropdown } from 'semantic-ui-react';

import './schedule.styles.scss';

const handleSubmit = async (event) => {
  event.preventDefault();
};

const showBookingHandler = () => {
  console.log('Show bookinghandler!');
};

const hideBookingHandler = () => {
  console.log('Hide bookinghandler!');
};

class Schedule extends React.Component {
  render() {
    const { roomdata, currentroom, setCurrentRoom } = this.props;

    let roomOptions = [];
    for (const [key, value] of Object.entries(roomdata)) {
      let valueToPush = {};
      valueToPush['key'] = key;
      valueToPush['text'] = key;
      valueToPush['value'] = key;
      roomOptions.push(valueToPush);
    }

    const onChangeRoom = (event, data) => {
      const { value } = data;
      setCurrentRoom(value);
    };

    const convertFirebaseTimestampToDate = (timeStamp) => {
      let firebaseSeconds = timeStamp.seconds;
      let firebasenanoseconds = timeStamp.nanoseconds;
      let date = new Date(
        firebaseSeconds * 1000 + firebasenanoseconds / 1000000
      );
      return date;
    };

    return (
      <Fragment>
        <div className="chooser-container">
          <Dropdown
            inline
            defaultValue={currentroom}
            options={roomOptions}
            onChange={onChangeRoom}
          />
        </div>

        <div className="weekdays-container">
          <div className="week-label monday">MÅNDAG</div>
          <div className="week-label tuesday">TISDAG</div>
          <div className="week-label wednesday">ONSDAG</div>
          <div className="week-label thursday">TORSDAG</div>
          <div className="week-label friday">FREDAG</div>
        </div>
        <div className="schedule-container" id="schedule-container">
          <div className="time-divider-0800"></div>
          <div className="time-legend time-0800">08:00</div>
          <div className="time-divider-0900"></div>
          <div className="time-legend time-0900">09:00</div>
          <div className="time-divider-1000"></div>
          <div className="time-legend time-1000">10:00</div>
          <div className="time-divider-1100"></div>
          <div className="time-legend time-1100">11:00</div>
          <div className="time-divider-1200"></div>
          <div className="time-legend time-1200">12:00</div>
          <div className="time-divider-1300"></div>
          <div className="time-legend time-1300">13:00</div>
          <div className="time-divider-1400"></div>
          <div className="time-legend time-1400">14:00</div>
          <div className="time-divider-1500"></div>
          <div className="time-legend time-1500">15:00</div>
          <div className="time-divider-1600"></div>
          <div className="time-legend time-1600">16:00</div>
          <div className="time-divider-1700"></div>
          <div className="time-legend time-1700">17:00</div>
          <div className="time-divider-1800"></div>
          <div className="time-legend time-1800">18:00</div>
          <div className="time-divider-1900"></div>
          <div className="time-legend time-1900">19:00</div>
          <div className="time-divider-2000"></div>
          <div className="time-legend time-2000">20:00</div>
          {roomdata[currentroom].bookings.map(
            ({ id, color, start, end, user, day }) => (
              <Booking
                key={id}
                start={convertFirebaseTimestampToDate(start)}
                end={convertFirebaseTimestampToDate(end)}
                color={color}
                user={user}
                day={day}
              />
            )
          )}
        </div>
        <button className="booking-button-container">
          <img
            alt="new booking"
            src={newBookingButton}
            className="newBookingButton"
            onClick={showBookingHandler()}
          />
        </button>
        {false ? (
          <BookingHandler
            title="BOKA LOKAL"
            hideBookingHandler={hideBookingHandler()}
            handleSubmit={handleSubmit()}
          />
        ) : null}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentRoom: (item) => dispatch(setCurrentRoom(item)),
});

const mapStateToProps = createStructuredSelector({
  currentroom: selectUserCurrentroom,
  roomdata: selectScheduleRoomdata,
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
