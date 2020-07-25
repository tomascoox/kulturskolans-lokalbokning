import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUserCurrentroom = createSelector(
  [selectUser],
  (user) => user.currentroom
);

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
