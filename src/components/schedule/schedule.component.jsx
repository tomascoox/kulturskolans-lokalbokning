import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectScheduleRoomdata } from '../../redux/schedule/schedule.selectors';
import { selectScheduleCurrentroom } from '../../redux/schedule/schedule.selectors';

import Booking from '../booking/booking.component';
import BookingHandler from '../booking-handler/booking-handler.component';

import newBookingButton from '../../assets/newBookingButton.svg';
import { Dropdown } from 'semantic-ui-react';

import './schedule.styles.scss';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingHandlerActive: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
  };

  showBookingHandler = () => {
    this.setState({
      bookingHandlerActive: true,
    });
  };

  hideBookingHandler = () => {
    this.setState({
      bookingHandlerActive: false,
    });
  };

  render() {
    const { roomdata, currentroom } = this.props;

    let roomOptions = [];
    for (let index = 0; index < roomdata.length; index++) {
      let valueToPush = {};
      valueToPush['key'] = roomdata[index]['id'];
      valueToPush['text'] = roomdata[index]['title'];
      valueToPush['value'] = roomdata[index]['title'];
      roomOptions.push(valueToPush);
    }

    return (
      <Fragment>
        <div className="chooser-container">
          <Dropdown
            inline
            options={roomOptions}
            defaultValue={roomdata[currentroom]['title']}
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
            ({ id, ...otherBookingProps }) => (
              <Booking key={id} {...otherBookingProps} />
            )
          )}
        </div>
        <button className="booking-button-container">
          <img
            alt="new booking"
            src={newBookingButton}
            className="newBookingButton"
            onClick={this.showBookingHandler}
          />
        </button>
        {this.state.bookingHandlerActive ? (
          <BookingHandler
            title="BOKA LOKAL"
            hideBookingHandler={this.hideBookingHandler}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  roomdata: selectScheduleRoomdata,
  currentroom: selectScheduleCurrentroom,
});

export default connect(mapStateToProps)(Schedule);
