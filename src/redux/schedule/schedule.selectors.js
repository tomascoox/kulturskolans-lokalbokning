import { createSelector } from 'reselect';

const selectSchedule = (state) => state.schedule;

export const selectRoomdata = createSelector(
  [selectSchedule],
  (schedule) => schedule.roomdata
);
export const selectRoomdataForPreview = createSelector(
  [selectRoomdata],
  (roomdata) =>
    roomdata ? Object.keys(roomdata).map((key) => roomdata[key]) : []
);

export const selectIsRoomdataFetching = createSelector(
  [selectSchedule],
  (schedule) => schedule.isFetching
);

export const selectIsRoomdataLoaded = createSelector(
  [selectSchedule],
  (schedule) => !!schedule.roomdata
);

// BOOKINGS
export const selectIsBookingsLoaded = createSelector(
  [selectSchedule],
  (schedule) => !!schedule.bookings
);
export const selectIsBookingsFetching = createSelector(
  [selectSchedule],
  (schedule) => schedule.isFetching
);
export const selectBookings = createSelector(
  [selectSchedule],
  (schedule) => schedule.bookings
);

// ROOMS
export const selectRooms = createSelector(
  [selectSchedule],
  (schedule) => schedule.rooms
);
export const selectIsRoomsLoaded = createSelector(
  [selectSchedule],
  (schedule) => !!schedule.rooms
);
export const selectIsRoomsFetching = createSelector(
  [selectSchedule],
  (schedule) => schedule.isFetching
);
