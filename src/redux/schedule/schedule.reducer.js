import ScheduleActionTypes from './schedule.types';

const INITIAL_STATE = {
  bookings: null,
  rooms: null,
  isFetching: false,
  errorMessage: undefined,
};

const scheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // BOOKINGS
    case ScheduleActionTypes.FETCH_BOOKINGS_START:
      return {
        ...state,
        isFetching: true,
      };

    case ScheduleActionTypes.FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookings: action.payload,
      };

    case ScheduleActionTypes.FETCH_BOOKINGS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    // ROOMS
    case ScheduleActionTypes.FETCH_ROOMS_START:
      return {
        ...state,
        isFetching: true,
      };

    case ScheduleActionTypes.FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        rooms: action.payload,
      };

    case ScheduleActionTypes.FETCH_ROOMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default scheduleReducer;
