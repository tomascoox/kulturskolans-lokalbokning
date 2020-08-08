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
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { checkIfOccupied } from '../../utility-functions';
import { getDate } from '../../utility-functions';
import { convertFirebaseTimestampToDate } from '../../utility-functions';

const weekDays = [
  { key: '2', value: '2', text: 'Måndag' },
  { key: '3', value: '3', text: 'Tisdag' },
  { key: '4', value: '4', text: 'Onsdag' },
  { key: '5', value: '5', text: 'Torsdag' },
  { key: '6', value: '6', text: 'Fredag' },
];
class BookingForm extends React.Component {
  state = {
    startTime: '',
    endTime: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async () => {
    const { weekDay, startTime, endTime } = this.state;

    const currentUserID = this.props.currentUser
      ? this.props.currentUser.id
      : null;

    let timeList = [];

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

    if (
      !checkIfOccupied(
        getDate(startTime),
        getDate(endTime),
        timeList,
        currentUserID
      )
    ) {
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
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setToggleNewBooking: (bookingforms) =>
    dispatch(setToggleNewBooking(bookingforms)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
