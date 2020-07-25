import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setCurrentRoom = (item) => ({
  type: UserActionTypes.SET_CURRENT_ROOM,
  payload: item,
});
