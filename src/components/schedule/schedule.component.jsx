import React, { Component, Fragment } from 'react';

import BookingButton from '../booking-button/booking-button.component';

import BOOKINGS_DATA from './schedule-data.js';

import './schedule.styles.scss';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: BOOKINGS_DATA,
    };
  }

  startTime = (start) => {
    return (
      (start.getHours() < 10 ? '0' : '') +
      start.getHours() +
      '' +
      (start.getMinutes() < 10 ? '0' : '') +
      start.getMinutes()
    );
  };

  endTime = (end) => {
    return (
      (end.getHours() < 10 ? '0' : '') +
      end.getHours() +
      '' +
      (end.getMinutes() < 10 ? '0' : '') +
      end.getMinutes()
    );
  };

  render() {
    const { bookings } = this.state;

    return (
      <Fragment>
        <div className="chooser-container">{bookings[0].room}</div>
        <div className="weekdays-container">
          <div className="week-label monday">MÅNDAG</div>
          <div className="week-label tuesday">TISDAG</div>
          <div className="week-label wednesday">ONSDAG</div>
          <div className="week-label thursday">TORSDAG</div>
          <div className="week-label friday">FREDAG</div>
        </div>
        <div id="schedule-container" className="schedule-container">
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
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="booked-item"
              style={{
                backgroundColor: booking.color,
                gridColumn: booking.day,
                gridRow:
                  't' +
                  this.startTime(booking.start) +
                  ' / t' +
                  this.endTime(booking.end),
              }}
            >
              <div className="booked-item-container">
                <div className="start-time">
                  {[
                    this.startTime(booking.start).slice(0, 2),
                    ':',
                    this.startTime(booking.start).slice(2),
                  ].join('')}
                </div>
                <div className="item-info">{booking.user}</div>
                <div className="end-time">
                  {[
                    this.endTime(booking.end).slice(0, 2),
                    ':',
                    this.endTime(booking.end).slice(2),
                  ].join('')}
                </div>
              </div>
            </div>
          ))}
        </div>
        <BookingButton />
      </Fragment>
    );
  }
}

export default Schedule;
