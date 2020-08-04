import React from 'react';
import './booking-form.styles.scss';

import { createNewBooking } from '../../firebase/firebase.utils';

import { Button, Form } from 'semantic-ui-react';

import timePickerItems from './timePickerIItems';

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

  handleSubmit = () => {
    const { weekDay, startTime, endTime } = this.state;

    const convertedStartTime = new Date('June 22, 2020 ' + startTime + ':00');
    const convertedEndTime = new Date('June 22, 2020 ' + endTime + ':00');

    createNewBooking(
      weekDay,
      convertedStartTime,
      convertedEndTime,
      this.props.currentUser,
      this.props.currentRoom
    );
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
            search
          />
          <Button.Group>
            <Button primary content="BOKA" type="submit" />
            <Button onClick={this.props.onToggleForm()} content="STÄNG" />
          </Button.Group>
        </Form>
      </div>
    );
  }
}

export default BookingForm;
