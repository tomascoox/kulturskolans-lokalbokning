import ScheduleActionTypes from './schedule.types';

const INITIAL_STATE = {
  roomdata: null,
};

const scheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ScheduleActionTypes.UPDATE_ROOMDATA:
      return {
        ...state,
        roomdata: action.payload,
      };

    default:
      return state;
  }
};

export default scheduleReducer;
