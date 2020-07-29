import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setCurrentRoom = (room) => ({
  type: UserActionTypes.SET_CURRENT_ROOM,
  payload: room,
});
