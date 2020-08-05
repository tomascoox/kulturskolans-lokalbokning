import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import scheduleReducer from './schedule/schedule.reducer';
import bookingFormsReducer from './bookingforms/bookingforms.reducer';

export default combineReducers({
  user: userReducer,
  schedule: scheduleReducer,
  bookingforms: bookingFormsReducer,
});
