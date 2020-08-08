export const checkIfOccupied = (sTime, eTime, timeList, currentUserID) => {
  let occupied = false;

  if (timeList.length === 0) occupied = false;

  timeList.forEach(({ userID, startTime, endTime }) => {
    let startTimeToDate = getDate(startTime);
    let startTimePlusOneMin = new Date(startTimeToDate.getTime() + 60000);
    let endTimeToDate = getDate(endTime);
    let endTimeMinusOneMin = new Date(endTimeToDate.getTime() - 60000);

    // skip checks if booking is owned by user
    if (currentUserID !== userID) {
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
