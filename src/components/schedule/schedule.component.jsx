import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentRoom } from '../../redux/user/user.actions';
import { selectBookings } from '../../redux/schedule/schedule.selectors';
import { selectRooms } from '../../redux/schedule/schedule.selectors';
import { selectCurrentRoom } from '../../redux/user/user.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { fetchBookingsStartAsync } from '../../redux/schedule/schedule.actions';

import { setSelectedBooking } from '../../redux/user/user.actions';
import { selectSelectedBooking } from '../../redux/user/user.selectors';

import { setToggleUpdateDeleteBooking } from '../../redux/bookingforms/bookingforms.actions';
import { selectToggleUpdateDeleteBooking } from '../../redux/bookingforms/bookingforms.selectors';

import Booking from '../booking/booking.component';

import { deleteBooking, updateBooking } from '../../firebase/firebase.utils';

import { Dropdown, Button, Form } from 'semantic-ui-react';
import timePickerItems from './timePickerIItems';

import './schedule.styles.scss';

const weekDays = [
  { key: '2', value: '2', text: 'Måndag' },
  { key: '3', value: '3', text: 'Tisdag' },
  { key: '4', value: '4', text: 'Onsdag' },
  { key: '5', value: '5', text: 'Torsdag' },
  { key: '6', value: '6', text: 'Fredag' },
];

const convertFirebaseTimestampToDate = (timeStamp) => {
  let firebaseSeconds = timeStamp.seconds;
  let firebasenanoseconds = timeStamp.nanoseconds;
  let date = new Date(firebaseSeconds * 1000 + firebasenanoseconds / 1000000);
  return date;
};

class Schedule extends React.Component {
  render() {
    const {
      selectedBooking,
      bookings,
      rooms,
      currentRoom,
      setCurrentRoom,
      currentUser,
    } = this.props;

    function sortOptions(a, b) {
      if (a.text < b.text) {
        return -1;
      }
      if (a.text > b.text) {
        return 1;
      }
      return 0;
    }

    let roomOptions = [];
    if (rooms) {
      Object.entries(rooms).map(([key, value]) => {
        let valueToPush = {};
        valueToPush['key'] = key;
        valueToPush['text'] = Object.values(value)[1];
        valueToPush['value'] = key;
        roomOptions.push(valueToPush);
        roomOptions.sort();
      });
    }

    roomOptions.sort(sortOptions);

    const handleDelete = async () => {
      const { bookingID } = this.props.selectedBooking;
      await deleteBooking(bookingID);
      this.props.setToggleUpdateDeleteBooking({
        toggleUpdateDeleteBooking: false,
      });
    };

    const someFunction = () => {
      console.log('Some function');
    };

    const handleSubmit = async () => {
      const {
        bookingID,
        startTime,
        endTime,
        weekDay,
      } = this.props.selectedBooking;

      // START CHECK ALREADY BOOKED
      let timeListUpdate = [];

      function getDateUpdate(clock) {
        let workDateUpdate = new Date('June 22, 2020 00:00:00');
        let _t = clock.split(':');
        workDateUpdate.setHours(_t[0], _t[1], 0, 0);
        return workDateUpdate;
      }

      function validateUpdate(sTime, eTime) {
        if (timeListUpdate.length === 0) return true;
        let notOccupied = true;
        timeListUpdate.forEach(({ startTime, endTime }) => {
          let startTimeToDate = getDateUpdate(startTime);
          let startTimePlusOneMin = new Date(startTimeToDate.getTime() + 60000);
          let endTimeToDate = getDateUpdate(endTime);
          let endTimeMinusOneMin = new Date(endTimeToDate.getTime() - 60000);

          if (sTime > startTimePlusOneMin && sTime < endTimeMinusOneMin) {
            notOccupied = false;
          } else if (
            eTime > startTimePlusOneMin &&
            eTime < endTimeMinusOneMin
          ) {
            notOccupied = false;
          } else {
            console.log('This booking does not conflict with the new booking');
          }
        });

        return notOccupied;
      }

      Object.values(this.props.bookings)
        .filter(
          (booking) =>
            booking.roomID === this.props.currentRoom.id &&
            booking.weekDay === weekDay
        )
        .map(({ startTime, endTime }) =>
          timeListUpdate.push({
            startTime: convertFirebaseTimestampToDate(startTime)
              .toTimeString()
              .slice(0, 5),
            endTime: convertFirebaseTimestampToDate(endTime)
              .toTimeString()
              .slice(0, 5),
          })
        );
      console.log(startTime);

      if (validateUpdate(startTime, endTime)) {
        await updateBooking(bookingID, startTime, endTime, weekDay);
      } else {
        alert('Tid redan bokad! Välj ny!');
      }

      // END CHECK ALREADY BOOKED

      this.props.setToggleUpdateDeleteBooking({
        toggleUpdateDeleteBooking: false,
      });
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
    };

    const convertTimeToDate = (value) => {
      return new Date('June 22, 2020 ' + value + ':00');
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
            scrolling
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
                    userID,
                    userDisplayName,
                    weekDay,
                  }) => (
                    <Booking
                      key={id}
                      bookingID={id}
                      startTime={convertFirebaseTimestampToDate(startTime)}
                      endTime={convertFirebaseTimestampToDate(endTime)}
                      color={color}
                      userID={userID}
                      userDisplayName={userDisplayName}
                      weekDay={weekDay}
                      currentUser={currentUser}
                    />
                  )
                )
            : ''}
        </div>

        {/* UPDATE/DELETE BOOKINGHANDLER */}

        {this.props.toggleUpdateDeleteBooking ? (
          <div className="booking-container">
            <h2>ÄNDRA/RADERA BOKNING</h2>
            <Form size="large" className="bookingForm" unstackable>
              <Form.Select
                name="weekDay"
                value={selectedBooking.weekDay}
                label="VECKODAG"
                placeholder="Välj veckodag"
                options={weekDays}
                onChange={(e, { name, value }) =>
                  this.props.setSelectedBooking({
                    bookingID: selectedBooking.bookingID,
                    startTime: selectedBooking.startTime,
                    endTime: selectedBooking.endTime,
                    weekDay: value,
                    userDisplayName: selectedBooking.userDisplayName,
                  })
                }
              />
              <Form.Select
                type="time"
                name="startTime"
                value={selectedBooking.startTime.toTimeString().slice(0, 5)}
                label="START"
                placeholder="Välj start-tid"
                options={timePickerItems}
                onChange={(e, { name, value }) =>
                  this.props.setSelectedBooking({
                    bookingID: selectedBooking.bookingID,
                    startTime: convertTimeToDate(value),
                    endTime: selectedBooking.endTime,
                    weekDay: selectedBooking.weekDay,
                    userDisplayName: selectedBooking.userDisplayName,
                  })
                }
              />
              <Form.Select
                type="time"
                name="endTime"
                value={selectedBooking.endTime.toTimeString().slice(0, 5)}
                label="SLUT"
                placeholder="Välj slut-tid"
                options={timePickerItems}
                onChange={(e, { name, value }) =>
                  this.props.setSelectedBooking({
                    bookingID: selectedBooking.bookingID,
                    startTime: selectedBooking.startTime,
                    endTime: convertTimeToDate(value),
                    weekDay: selectedBooking.weekDay,
                    userDisplayName: selectedBooking.userDisplayName,
                  })
                }
              />
              <Button.Group size="small">
                <Button primary content="ÄNDRA" onClick={handleSubmit} />
                <Button color="red" content="RADERA" onClick={handleDelete} />
                <Button
                  content="STÄNG"
                  onClick={() =>
                    this.props.setToggleUpdateDeleteBooking({
                      toggleUpdateDeleteBooking: false,
                    })
                  }
                />
              </Button.Group>
            </Form>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom,
  bookings: selectBookings,
  rooms: selectRooms,
  selectedBooking: selectSelectedBooking,
  toggleUpdateDeleteBooking: selectToggleUpdateDeleteBooking,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
  fetchBookingsStartAsync: () => dispatch(fetchBookingsStartAsync()),
  setSelectedBooking: (booking) => dispatch(setSelectedBooking(booking)),
  setToggleUpdateDeleteBooking: (bookingforms) =>
    dispatch(setToggleUpdateDeleteBooking(bookingforms)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
