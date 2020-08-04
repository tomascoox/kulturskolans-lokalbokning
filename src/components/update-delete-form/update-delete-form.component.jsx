import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './update-delete-form.styles.scss';

import { updateOrDeleteBooking } from '../../firebase/firebase.utils';

import { selectSelectedBooking } from '../../redux/user/user.selectors';
import { setSelectedBooking } from '../../redux/user/user.actions';

import { Button, Form, Popup } from 'semantic-ui-react';

import timePickerItems from './timePickerIItems';

const weekDays = [
  { key: '2', value: '2', text: 'Måndag' },
  { key: '3', value: '3', text: 'Tisdag' },
  { key: '4', value: '4', text: 'Onsdag' },
  { key: '5', value: '5', text: 'Torsdag' },
  { key: '6', value: '6', text: 'Fredag' },
];

class UpdateDeleteForm extends React.Component {
  updateSelectedBookingState = (e, { name, value }) =>
    this.props.setSelectedBooking({ [name]: value });

  handleSubmit = () => {
    // const convertedStartTime = new Date('June 22, 2020 ' + startTime + ':00');
    // const convertedEndTime = new Date('June 22, 2020 ' + endTime + ':00');

    updateOrDeleteBooking();
    // weekDay,
    // convertedStartTime,
    // convertedEndTime,
    // this.props.currentUser,
    // this.props.currentRoom
  };

  render() {
    const {
      bookingID,
      startTime,
      endTime,
      weekDay,
      userDisplayName,
    } = this.props.selectedBooking;

    let convertedStartTimestampFromState = new Date(startTime);
    console.log(startTime);

    let convertedEndTimestampFromState = new Date(endTime);
    console.log(convertedEndTimestampFromState.getHours());

    return (
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
          onChange={this.updateSelectedBookingState}
        />
        <Form.Select
          type="time"
          name="startTime"
          value={startTime}
          label="Start-tid"
          placeholder="Välj start-tid"
          options={timePickerItems}
          onChange={this.updateSelectedBookingState}
        />
        <Form.Select
          type="time"
          name="endTime"
          value={endTime}
          label="Slut-tid"
          placeholder="Välj slut-tid"
          options={timePickerItems}
          onChange={this.updateSelectedBookingState}
        />

        <Form.Button primary content="BOKA" type="submit" />
        <Button content="STÄNG" />
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedBooking: selectSelectedBooking,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedBooking: (booking) => dispatch(setSelectedBooking(booking)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDeleteForm);
