import { createSelector } from 'reselect';

const selectRoom = (state) => state.schedule;

export const selectCurrentRoom = createSelector(
  [selectRoom],
  (schedule) => schedule.currentRoom
);
