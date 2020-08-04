import { createSelector } from 'reselect';

const selectSchedule = (state) => state.schedule;

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
