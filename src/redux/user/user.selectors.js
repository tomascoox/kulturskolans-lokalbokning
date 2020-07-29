import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentRoom = createSelector(
  [selectUser],
  (user) => user.currentRoom
);

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
