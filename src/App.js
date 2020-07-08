import React from 'react';
import './App.css';
import newBookingButton from './newBookingButton.svg';
import { WeekHeadlines } from './components/weekheadlines/weekheadlines.component';
import Schedule from './components/schedule/schedule.component';

export default function App() {
  return (
    <div className="container">
      <div className="chooser-container">
        <span className="lokal">Musiksalen</span>
        <span className="skola">Bergeforsens skola</span>
      </div>
      <WeekHeadlines />
      <Schedule />
      <div className="footer-container">
        <img
          alt="new booking"
          src={newBookingButton}
          className="newBookingButton"
        />
      </div>
    </div>
  );
}
