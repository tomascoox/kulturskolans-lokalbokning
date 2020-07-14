import React from 'react';

import newBookingButton from '../../assets/newBookingButton.svg';
import './create-booking.styles.scss';

export default function CreateBooking() {
  return (
    <div>
      <button className="booking-button-container">
        <img
          alt="new booking"
          src={newBookingButton}
          className="newBookingButton"
        />
      </button>
      <div className="modal-container">
        <div className="backdrop" />
        <div className="modal">
          <h2>BOKA LOKAL</h2>
          <form className="form-group">
            <label>VÄLJ LOKAL</label>
            <input
              className="form-input"
              placeholder="Musiksalen-Bergeforsen"
              type="text"
            />
            <label>VÄLJ DAG</label>
            <input className="form-input" placeholder="Onsdag" type="text" />
            <label>VÄLJ TID</label>
            <input
              className="form-input"
              placeholder="10:00-11:30"
              type="text"
            />
            <div className="center">
              <button className="form-button" type="submit">
                BOKA
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
