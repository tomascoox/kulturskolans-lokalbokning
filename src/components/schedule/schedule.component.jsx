import React, { Component } from 'react';
import './schedule.styles.css';

let bookingsData = [
  {
    id: 1,
    user: 'Daniel',
    day: 3,
    start: new Date('2020/06/22 09:00:00'),
    end: new Date('2020/06/22 10:30:00'),
    color: '#CE4CD3',
  },
  {
    id: 2,
    user: 'Tomas',
    day: 6,
    start: new Date('2020/06/22 08:00:00'),
    end: new Date('2020/06/22 12:00:00'),
    color: '#4D6EFF',
  },
  {
    id: 3,
    user: 'Fredrik',
    day: 2,
    start: new Date('2020/06/22 08:00:00'),
    end: new Date('2020/06/22 08:20:00'),
    color: '#777777',
  },
  {
    id: 4,
    user: 'Marit',
    day: 2,
    start: new Date('2020/06/22 09:00:00'),
    end: new Date('2020/06/22 10:00:00'),
    color: '#42B9DD',
  },
  {
    id: 5,
    user: 'Skolan',
    day: 2,
    start: new Date('2020/06/22 13:00:00'),
    end: new Date('2020/06/22 14:00:00'),
    color: '#ff0000',
  },
  {
    id: 6,
    user: 'Daniel',
    day: 2,
    start: new Date('2020/06/22 15:00:00'),
    end: new Date('2020/06/22 17:00:00'),
    color: '#CE4CD3',
  },
  {
    id: 7,
    user: 'Ingela',
    day: 3,
    start: new Date('2020/06/22 11:00:00'),
    end: new Date('2020/06/22 12:00:00'),
    color: '#6CB75A',
  },
  {
    id: 8,
    user: 'Simon',
    day: 3,
    start: new Date('2020/06/22 14:00:00'),
    end: new Date('2020/06/22 16:00:00'),
    color: '#A85252',
  },
  {
    id: 9,
    user: 'Skolan',
    day: 4,
    start: new Date('2020/06/22 09:30:00'),
    end: new Date('2020/06/22 13:00:00'),
    color: '#ff0000',
  },
  {
    id: 10,
    user: 'Ingela',
    day: 4,
    start: new Date('2020/06/22 16:00:00'),
    end: new Date('2020/06/22 20:00:00'),
    color: '#6CB75A',
  },
  {
    id: 11,
    user: 'Urban',
    day: 5,
    start: new Date('2020/06/22 08:00:00'),
    end: new Date('2020/06/22 11:00:00'),
    color: '#E69B0D',
  },
  {
    id: 12,
    user: 'Johan',
    day: 5,
    start: new Date('2020/06/22 12:30:00'),
    end: new Date('2020/06/22 14:00:00'),
    color: '#C91C6C',
  },
  {
    id: 13,
    user: 'Mia',
    day: 6,
    start: new Date('2020/06/22 15:00:00'),
    end: new Date('2020/06/22 17:00:00'),
    color: '#C9c111',
  },
];

function startTime(start) {
  return (
    (start.getHours() < 10 ? '0' : '') +
    start.getHours() +
    '' +
    (start.getMinutes() < 10 ? '0' : '') +
    start.getMinutes()
  );
}

function endTime(end) {
  return (
    (end.getHours() < 10 ? '0' : '') +
    end.getHours() +
    '' +
    (end.getMinutes() < 10 ? '0' : '') +
    end.getMinutes()
  );
}

class Schedule extends Component {
  render() {
    const bookingsHTML = bookingsData.map((booking) => (
      <div
        key={booking.id}
        className="booked-item"
        style={{
          backgroundColor: booking.color,
          gridColumn: booking.day,
          gridRow:
            't' + startTime(booking.start) + ' / t' + endTime(booking.end),
        }}
      >
        <div className="booked-item-container">
          <div className="start-time">
            {[
              startTime(booking.start).slice(0, 2),
              ':',
              startTime(booking.start).slice(2),
            ].join('')}
          </div>
          <div className="item-info">{booking.user}</div>
          <div className="end-time">
            {[
              endTime(booking.end).slice(0, 2),
              ':',
              endTime(booking.end).slice(2),
            ].join('')}
          </div>
        </div>
      </div>
    ));

    return (
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
        {bookingsHTML}
      </div>
    );
  }
}

export default Schedule;
