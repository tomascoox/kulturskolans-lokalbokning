import React from 'react';
import './booking-form.styles.scss';
import { connect } from 'react-redux';

import { createNewBooking } from '../../firebase/firebase.utils';
import { fetchBookingsStartAsync } from '../../redux/schedule/schedule.actions';

import { Grid, Button, Form, Sidebar, Segment } from 'semantic-ui-react';

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
    formWeekDay: '',
    submittedWeekDay: '',
    startTime: '',
    submittedStartTime: '',
    endTime: '',
    submittedEndTime: '',
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

    const { fetchBookingsStartAsync } = this.props;
    fetchBookingsStartAsync();
  };

  render() {
    const {
      weekDay,
      startTime,
      endTime,
      submittedWeekDay,
      submittedStartTime,
    } = this.state;

    return (
      <Sidebar
        className="bookingFormContainer"
        as={Segment}
        animation={this.props.animation}
        direction={this.props.direction}
        visible={this.props.visible}
      >
        <Grid textAlign="center">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form
              onSubmit={this.handleSubmit}
              size="large"
              className="bookingForm"
            >
              <Form.Select
                fluid
                name="weekDay"
                value={weekDay}
                label="Veckodag"
                placeholder="Välj veckodag"
                options={weekDays}
                onChange={this.handleChange}
              />
              <Form.Select
                fluid
                type="time"
                name="startTime"
                value={startTime}
                label="Start-tid"
                placeholder="Välj start-tid"
                options={timePickerItems}
                onChange={this.handleChange}
              />
              <Form.Select
                fluid
                type="time"
                name="endTime"
                value={endTime}
                label="Slut-tid"
                placeholder="Välj slut-tid"
                options={timePickerItems}
                onChange={this.handleChange}
              />
              <Form.Button
                content="BOKA"
                type="submit"
                onClick={this.props.onToggleForm()}
              />
              <Button onClick={this.props.onToggleForm()} content="STÄNG" />
            </Form>
          </Grid.Column>
        </Grid>
      </Sidebar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchBookingsStartAsync: () => dispatch(fetchBookingsStartAsync()),
});
export default connect(null, mapDispatchToProps)(BookingForm);
