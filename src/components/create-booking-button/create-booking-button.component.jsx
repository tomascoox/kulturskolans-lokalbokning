import React from 'react';
import { connect } from 'react-redux';

import { toggleBookingHandlerHidden } from '../../redux/schedule/schedule.actions';

import { ReactComponent as BluePlusButton } from '../../assets/blue-plusbutton.svg';

import './create-booking-button.styles.scss';

const CreateBookingButton = ({ toggleBookingHandlerHidden }) => (
  <div className="create-booking-button" onClick={toggleBookingHandlerHidden}>
    <BluePlusButton className="blue-plusbutton" />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleBookingHandlerHidden: () => dispatch(toggleBookingHandlerHidden()),
});

export default connect(null, mapDispatchToProps)(CreateBookingButton);
