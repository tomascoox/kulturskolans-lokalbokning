import { ScheduleActionTypes } from './schedule.types';

const INITIAL_STATE = {
  roomdata: [
    {
      id: 1,
      title: 'Musiksalen-Bergeforsen',
      bookings: [
        {
          id: 1,
          user: 'Daniel',
          day: 3,
          start: new Date('2020/06/22 09:00:00'),
          end: new Date('2020/06/22 10:30:00'),
          color: '#CE4CD3',
        },
        {
          id: 2,
          user: 'Tomas',
          day: 6,
          start: new Date('2020/06/22 08:00:00'),
          end: new Date('2020/06/22 12:00:00'),
          color: '#4D6EFF',
        },
        {
          id: 3,
          user: 'Fredrik',
          day: 2,
          start: new Date('2020/06/22 08:00:00'),
          end: new Date('2020/06/22 08:20:00'),
          color: '#777777',
        },
      ],
    },
    {
      id: 2,
      title: 'Musiksalen-Böle',
      bookings: [
        {
          id: 4,
          user: 'Marit',
          day: 2,
          start: new Date('2020/06/22 09:00:00'),
          end: new Date('2020/06/22 10:00:00'),
          color: '#42B9DD',
        },
        {
          id: 5,
          user: 'BOKAD',
          day: 2,
          start: new Date('2020/06/22 13:00:00'),
          end: new Date('2020/06/22 14:00:00'),
          color: '#ff0000',
        },
        {
          id: 6,
          user: 'Daniel',
          day: 2,
          start: new Date('2020/06/22 15:00:00'),
          end: new Date('2020/06/22 17:00:00'),
          color: '#CE4CD3',
        },
      ],
    },
    {
      id: 3,
      title: 'Musiksalen-Arena',
      bookings: [
        {
          id: 7,
          user: 'Ingela',
          day: 3,
          start: new Date('2020/06/22 11:00:00'),
          end: new Date('2020/06/22 12:00:00'),
          color: '#6CB75A',
        },
        {
          id: 8,
          user: 'Simon',
          day: 3,
          start: new Date('2020/06/22 14:00:00'),
          end: new Date('2020/06/22 16:00:00'),
          color: '#A85252',
        },
        {
          id: 9,
          user: 'BOKAD',
          day: 4,
          start: new Date('2020/06/22 09:30:00'),
          end: new Date('2020/06/22 13:00:00'),
          color: '#ff0000',
        },
        {
          id: 10,
          user: 'Ingela',
          day: 4,
          start: new Date('2020/06/22 16:00:00'),
          end: new Date('2020/06/22 20:00:00'),
          color: '#6CB75A',
        },
        {
          id: 11,
          user: 'Urban',
          day: 5,
          start: new Date('2020/06/22 08:00:00'),
          end: new Date('2020/06/22 11:00:00'),
          color: '#E69B0D',
        },
        {
          id: 12,
          user: 'Johan',
          day: 5,
          start: new Date('2020/06/22 12:30:00'),
          end: new Date('2020/06/22 14:00:00'),
          color: '#C91C6C',
        },
        {
          id: 13,
          user: 'Mia',
          day: 6,
          start: new Date('2020/06/22 15:00:00'),
          end: new Date('2020/06/22 17:00:00'),
          color: '#C9c111',
        },
      ],
    },
    {
      id: 4,
      title: 'Musiksalen-Laggarberg',
      bookings: [
        {
          id: 14,
          user: 'Ingela',
          day: 3,
          start: new Date('2020/06/22 11:00:00'),
          end: new Date('2020/06/22 12:00:00'),
          color: '#6CB75A',
        },
        {
          id: 15,
          user: 'Mia',
          day: 5,
          start: new Date('2020/06/22 14:00:00'),
          end: new Date('2020/06/22 14:30:00'),
          color: '#C9c111',
        },
        {
          id: 16,
          user: 'BOKAD',
          day: 2,
          start: new Date('2020/06/22 08:00:00'),
          end: new Date('2020/06/22 17:00:00'),
          color: '#ff0000',
        },
        {
          id: 17,
          user: 'Simon',
          day: 3,
          start: new Date('2020/06/22 09:45:00'),
          end: new Date('2020/06/22 10:05:00'),
          color: '#A85252',
        },
      ],
    },
  ],
  currentroom: 3,
};

const scheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default scheduleReducer;
