import { BookingFormsActionTypes } from './bookingforms.types';

const INITIAL_STATE = {
  toggleNewBooking: false,
  toggleUpdateDeleteBooking: false,
};

const bookingFormsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BookingFormsActionTypes.TOGGLE_NEW_BOOKING:
      return {
        ...state,
        toggleNewBooking: action.payload,
      };
    case BookingFormsActionTypes.TOGGLE_UPDATE_DELETE_BOOKING:
      return {
        ...state,
        toggleUpdateDeleteBooking: action.payload,
      };
    default:
      return state;
  }
};

export default bookingFormsReducer;
