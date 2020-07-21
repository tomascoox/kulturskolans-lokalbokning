import { ScheduleActionTypes } from './schedule.types';

export const toggleBookingHandlerHidden = () => ({
  type: ScheduleActionTypes.TOGGLE_BOOKINGHANDLER_HIDDEN,
});

export const setCurrentRoom = (room) => ({
  type: ScheduleActionTypes.SET_CURRENT_ROOM,
  payload: room,
});
