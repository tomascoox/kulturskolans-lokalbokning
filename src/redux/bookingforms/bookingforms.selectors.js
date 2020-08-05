import { createSelector } from 'reselect';

const selectBookingForms = (state) => state.bookingforms;

export const selectToggleNewBooking = createSelector(
  [selectBookingForms],
  (bookingforms) => bookingforms.toggleNewBooking
);

export const selectToggleUpdateDeleteBooking = createSelector(
  [selectBookingForms],
  (bookingforms) => bookingforms.toggleUpdateDeleteBooking
);
