export const createTimeList = (
  bookings,
  currentRoom,
  selectedBooking,
  type
) => {
  let timeList = [];
  Object.values(bookings)
    .filter(
      (booking) =>
        booking.roomID === currentRoom.id &&
        booking.weekDay === selectedBooking.weekDay
    )
    .map(({ startTime, endTime, userID, roomID, id }) =>
      timeList.push({
        userID: userID,
        bookingID: id,
        startTime: convertFirebaseTimestampToDate(startTime)
          .toTimeString()
          .slice(0, 5),
        endTime: convertFirebaseTimestampToDate(endTime)
          .toTimeString()
          .slice(0, 5),
        roomID: roomID,
      })
    );
  return timeList;
};

export const checkIfOccupied = (sTime, eTime, timeList, selectedBooking) => {
  let occupied = false;

  if (timeList.length === 0) occupied = false;

  timeList.forEach(({ startTime, endTime, bookingID }) => {
    let startTimeToDate = getDate(startTime);
    let startTimePlusOneMin = new Date(startTimeToDate.getTime() + 60000);
    let endTimeToDate = getDate(endTime);
    let endTimeMinusOneMin = new Date(endTimeToDate.getTime() - 60000);

    // skip checks if user owns the bookings
    if (selectedBooking.bookingID !== bookingID) {
      // new booking inside booked item
      if (
        sTime > startTimePlusOneMin &&
        sTime < endTimeMinusOneMin &&
        eTime > startTimePlusOneMin &&
        eTime < endTimeMinusOneMin
      ) {
        occupied = true;
      }
      // new booking overlaps booked item from top
      if (
        sTime < startTimePlusOneMin &&
        sTime < endTimeMinusOneMin &&
        eTime > startTimePlusOneMin &&
        eTime < endTimeMinusOneMin
      ) {
        occupied = true;
      }
      // new booking overlaps booked item from bottom
      if (
        sTime > startTimePlusOneMin &&
        sTime < endTimeMinusOneMin &&
        eTime > startTimePlusOneMin &&
        eTime > endTimeMinusOneMin
      ) {
        occupied = true;
      }
      // new booking encompasses booked item
      if (
        sTime < startTimePlusOneMin &&
        sTime < endTimeMinusOneMin &&
        eTime > startTimePlusOneMin &&
        eTime > endTimeMinusOneMin
      ) {
        occupied = true;
      }
    }
  });

  return occupied;
};

export const getDate = (time) => {
  let workDate = new Date('June 22, 2020 00:00:00');
  let _t = time.split(':');
  workDate.setHours(_t[0], _t[1], 0, 0);
  return workDate;
};

export const convertFirebaseTimestampToDate = (timeStamp) => {
  let firebaseSeconds = timeStamp.seconds;
  let firebasenanoseconds = timeStamp.nanoseconds;
  let date = new Date(firebaseSeconds * 1000 + firebasenanoseconds / 1000000);
  return date;
};
