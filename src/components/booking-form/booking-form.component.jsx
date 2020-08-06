import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import './booking-form.styles.scss';

import { createNewBooking } from '../../firebase/firebase.utils';

import { Button, Form } from 'semantic-ui-react';

import timePickerItems from './timePickerIItems';

import { setToggleNewBooking } from '../../redux/bookingforms/bookingforms.actions';
import { selectToggleNewBooking } from '../../redux/bookingforms/bookingforms.selectors';
import { selectBookings } from '../../redux/schedule/schedule.selectors';

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

class BookingForm extends React.Component {
  state = {
    startTime: '',
    endTime: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async () => {
    const { weekDay, startTime, endTime } = this.state;

    // START CHECK ALREADY BOOKED
    let timeList = [];

    function getDate(time) {
      let workDate = new Date('June 22, 2020 00:00:00');
      let _t = time.split(':');
      workDate.setHours(_t[0], _t[1], 0, 0);
      return workDate;
    }

    function validate(sTime, eTime) {
      if (timeList.length === 0) return true;
      let occupied = true;
      timeList.forEach(({ startTime, endTime }) => {
        let startTimeToDate = getDate(startTime);
        let startTimePlusOneMin = new Date(startTimeToDate.getTime() + 60000);
        let endTimeToDate = getDate(endTime);
        let endTimeMinusOneMin = new Date(endTimeToDate.getTime() - 60000);

        if (
          getDate(sTime) > startTimePlusOneMin &&
          getDate(sTime) < endTimeMinusOneMin
        ) {
          occupied = false;
        } else if (
          getDate(eTime) > startTimePlusOneMin &&
          getDate(eTime) < endTimeMinusOneMin
        ) {
          occupied = false;
        } else {
          console.log('This booking does not conflict with the new booking');
        }
      });

      return occupied;
    }

    Object.values(this.props.bookings)
      .filter(
        (booking) =>
          booking.roomID === this.props.currentRoom.id &&
          booking.weekDay === weekDay
      )
      .map(({ startTime, endTime }) =>
        timeList.push({
          startTime: convertFirebaseTimestampToDate(startTime)
            .toTimeString()
            .slice(0, 5),
          endTime: convertFirebaseTimestampToDate(endTime)
            .toTimeString()
            .slice(0, 5),
        })
      );

    if (validate(startTime, endTime)) {
      const convertedStartTime = new Date('June 22, 2020 ' + startTime + ':00');
      const convertedEndTime = new Date('June 22, 2020 ' + endTime + ':00');

      await createNewBooking(
        weekDay,
        convertedStartTime,
        convertedEndTime,
        this.props.currentUser,
        this.props.currentRoom
      );
    } else {
      alert('Tid redan bokad! Välj ny!');
    }

    // END CHECK ALREADY BOOKED

    this.props.setToggleNewBooking({
      toggleNewBooking: false,
    });
  };

  render() {
    const { weekDay, startTime, endTime } = this.state;

    return (
      <div className="booking-container">
        <h2>NY BOKNING</h2>
        <Form
          onSubmit={this.handleSubmit}
          size="large"
          className="bookingForm"
          unstackable
        >
          <Form.Select
            name="weekDay"
            value={weekDay}
            label="Veckodag"
            placeholder="Välj veckodag"
            options={weekDays}
            onChange={this.handleChange}
          />
          <Form.Select
            type="time"
            name="startTime"
            value={startTime}
            label="Start-tid"
            placeholder="Välj start-tid"
            options={timePickerItems}
            onChange={this.handleChange}
          />
          <Form.Select
            type="time"
            name="endTime"
            value={endTime}
            label="Slut-tid"
            placeholder="Välj slut-tid"
            options={timePickerItems}
            onChange={this.handleChange}
          />
          <Button.Group>
            <Button primary content="BOKA" type="submit" />
            <Button
              onClick={this.props.onToggleNewBookingForm()}
              content="STÄNG"
            />
          </Button.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  toggleNewBooking: selectToggleNewBooking,
  bookings: selectBookings,
});

const mapDispatchToProps = (dispatch) => ({
  setToggleNewBooking: (bookingforms) =>
    dispatch(setToggleNewBooking(bookingforms)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
