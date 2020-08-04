import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  currentRoom: {
    id: '1SvJOLBYz4kfRyx9hdie',
    roomTitle: 'Ekohuset-Söråker',
  },
  selectedBooking: {
    showBookingHandler: false,
    bookingID: '',
    startTime: '',
    endTime: '',
    weekDay: '',
    userDisplayName: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload,
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SET_SELECTED_BOOKING:
      return {
        ...state,
        selectedBooking: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
