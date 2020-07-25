import ScheduleActionTypes from './schedule.types';

export const toggleBookingHandlerHidden = () => ({
  type: ScheduleActionTypes.TOGGLE_BOOKINGHANDLER_HIDDEN,
});

export const updateRoomdata = (roomdataMap) => ({
  type: ScheduleActionTypes.UPDATE_ROOMDATA,
  payload: roomdataMap,
});
