import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentRoom } from '../../redux/user/user.actions';
import { selectRoomdata } from '../../redux/schedule/schedule.selectors';
import { selectBookings } from '../../redux/schedule/schedule.selectors';
import { selectRooms } from '../../redux/schedule/schedule.selectors';
import { selectCurrentRoom } from '../../redux/user/user.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { fetchBookingsStartAsync } from '../../redux/schedule/schedule.actions';

import Booking from '../booking/booking.component';

import { Dropdown } from 'semantic-ui-react';

import './schedule.styles.scss';

class Schedule extends React.Component {
  componentDidMount() {}

  render() {
    const {
      bookings,
      rooms,
      roomdata,
      currentRoom,
      setCurrentRoom,
      currentUser,
    } = this.props;

    let roomOptions = [];
    if (rooms) {
      Object.entries(rooms).map(([key, value]) => {
        let valueToPush = {};
        valueToPush['key'] = key;
        valueToPush['text'] = Object.values(value)[1];
        valueToPush['value'] = key;
        roomOptions.push(valueToPush);
      });
    }

    const updateBooking = () => {
      alert('I will update this booking now, woohoo!');
    };

    const onChangeRoom = (event, data) => {
      const { value } = data;

      let roomTitle = Object.entries(rooms)
        .map((el) => el[1])
        .map((el) => Object.values(el))
        .find((el) => el[0] === value)[1];

      const newCurrentRoom = {
        id: value,
        roomTitle: roomTitle,
      };

      setCurrentRoom(newCurrentRoom);
      const { fetchBookingsStartAsync } = this.props;
      fetchBookingsStartAsync();
    };

    const convertFirebaseTimestampToDate = (timeStamp) => {
      let firebaseSeconds = timeStamp.seconds;
      let firebasenanoseconds = timeStamp.nanoseconds;
      let date = new Date(
        firebaseSeconds * 1000 + firebasenanoseconds / 1000000
      );
      return date;
    };

    let defaultRoom = '';
    if (currentRoom) {
      defaultRoom = currentRoom.id;
    }

    return (
      <Fragment>
        <div className="chooser-container">
          <Dropdown
            inline
            defaultValue={defaultRoom}
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
          {bookings && currentRoom
            ? Object.values(bookings)
                .filter((booking) => booking.roomID === currentRoom.id)
                .map(
                  ({
                    id,
                    color,
                    startTime,
                    endTime,
                    userDisplayName,
                    weekDay,
                  }) => (
                    <Booking
                      key={id}
                      startTime={convertFirebaseTimestampToDate(startTime)}
                      endTime={convertFirebaseTimestampToDate(endTime)}
                      color={color}
                      userDisplayName={userDisplayName}
                      weekDay={weekDay}
                      onClick={updateBooking}
                    />
                  )
                )
            : ''}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom,
  roomdata: selectRoomdata,
  bookings: selectBookings,
  rooms: selectRooms,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
  fetchBookingsStartAsync: () => dispatch(fetchBookingsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
