import ScheduleActionTypes from './schedule.types';

import {
  firestore,
  convertRoomdataSnapshotToMap,
  convertBookingsSnapshotToMap,
  convertRoomsSnapshotToMap,
} from '../../firebase/firebase.utils';

// ROOMDATA
export const fetchRoomdataStart = (roomdataMap) => ({
  type: ScheduleActionTypes.FETCH_ROOMDATA_START,
});

export const fetchRoomdataSuccess = (roomdataMap) => ({
  type: ScheduleActionTypes.FETCH_ROOMDATA_SUCCESS,
  payload: roomdataMap,
});

export const fetchRoomdataFailure = (errorMessage) => ({
  type: ScheduleActionTypes.FETCH_ROOMDATA_FAILURE,
  payload: errorMessage,
});

export const fetchRoomdataStartAsync = () => {
  return (dispatch) => {
    const roomRef = firestore.collection('roomdata');
    dispatch(fetchRoomdataStart());

    roomRef
      .get()
      .then((snapshot) => {
        const roomdataMap = convertRoomdataSnapshotToMap(snapshot);
        dispatch(fetchRoomdataSuccess(roomdataMap));
      })
      .catch((error) => dispatch(fetchRoomdataFailure(error.message)));
  };
};

// BOOKINGS
export const fetchBookingsStart = (bookingsMap) => ({
  type: ScheduleActionTypes.FETCH_BOOKINGS_START,
});

export const fetchBookingsSuccess = (bookingsMap) => ({
  type: ScheduleActionTypes.FETCH_BOOKINGS_SUCCESS,
  payload: bookingsMap,
});

export const fetchBookingsFailure = (errorMessage) => ({
  type: ScheduleActionTypes.FETCH_BOOKINGS_FAILURE,
  payload: errorMessage,
});

export const fetchBookingsStartAsync = () => {
  return (dispatch) => {
    const bookingRef = firestore.collection('bookings');
    dispatch(fetchBookingsStart());

    bookingRef
      .get()
      .then((snapshot) => {
        const bookingsMap = convertBookingsSnapshotToMap(snapshot);

        dispatch(fetchBookingsSuccess(bookingsMap));
      })
      .catch((error) => dispatch(fetchBookingsFailure(error.message)));
  };
};

// ROOMS
export const fetchRoomsStart = (roomsMap) => ({
  type: ScheduleActionTypes.FETCH_ROOMS_START,
});

export const fetchRoomsSuccess = (roomsMap) => ({
  type: ScheduleActionTypes.FETCH_ROOMS_SUCCESS,
  payload: roomsMap,
});

export const fetchRoomsFailure = (errorMessage) => ({
  type: ScheduleActionTypes.FETCH_ROOMS_FAILURE,
  payload: errorMessage,
});

export const fetchRoomsStartAsync = () => {
  return (dispatch) => {
    const roomsRef = firestore.collection('rooms');
    dispatch(fetchRoomsStart());

    roomsRef
      .get()
      .then((snapshot) => {
        const roomsMap = convertRoomsSnapshotToMap(snapshot);

        dispatch(fetchRoomsSuccess(roomsMap));
      })
      .catch((error) => dispatch(fetchRoomsFailure(error.message)));
  };
};
