import { createSelector } from 'reselect';

const selectSchedule = (state) => state.schedule;

export const selectScheduleRoomdata = createSelector(
  [selectSchedule],
  (schedule) => schedule.roomdata
);

export const selectScheduleCurrentroom = createSelector(
  [selectSchedule],
  (schedule) => schedule.currentroom
);
