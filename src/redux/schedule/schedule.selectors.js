import { createSelector } from 'reselect';

const selectSchedule = (state) => state.schedule;

export const selectScheduleRoomdata = createSelector(
  [selectSchedule],
  (schedule) => schedule.roomdata
);

export const selectRoomdataForPreview = createSelector(
  [selectScheduleRoomdata],
  (roomdata) =>
    roomdata ? Object.keys(roomdata).map((key) => roomdata[key]) : []
);
