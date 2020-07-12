import React from 'react';
import './booking-button.styles.scss';
import newBookingButton from './newBookingButton.svg';

const BookingButton = () => (
  <div className="booking-button-container">
    <img
      alt="new booking"
      src={newBookingButton}
      className="newBookingButton"
    />
  </div>
);

export default BookingButton;
