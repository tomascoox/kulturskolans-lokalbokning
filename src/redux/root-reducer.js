import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import scheduleReducer from './schedule/schedule.reducer';

export default combineReducers({
  user: userReducer,
  schedule: scheduleReducer,
});
