import { BookingFormsActionTypes } from './bookingforms.types';

export const setToggleNewBooking = (booking) => ({
  type: BookingFormsActionTypes.TOGGLE_NEW_BOOKING,
  payload: booking.toggleNewBooking,
});

export const setToggleUpdateDeleteBooking = (booking) => ({
  type: BookingFormsActionTypes.TOGGLE_UPDATE_DELETE_BOOKING,
  payload: booking.toggleUpdateDeleteBooking,
});
