import { ScheduleActionTypes } from './schedule.types';
import BOOKINGS_DATA from '../../components/schedule/schedule-data';

const INITIAL_STATE = {
  hidden: true,
  currentRoom: 0,
  bookings: BOOKINGS_DATA,
};

const scheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ScheduleActionTypes.TOGGLE_BOOKINGHANDLER_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case ScheduleActionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload,
      };

    default:
      return state;
  }
};

export default scheduleReducer;
