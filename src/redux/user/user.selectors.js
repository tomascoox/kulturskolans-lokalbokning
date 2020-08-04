import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentRoom = createSelector(
  [selectUser],
  (user) => user.currentRoom
);

export const selectSelectedBooking = createSelector(
  [selectUser],
  (user) => user.selectedBooking
);

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
