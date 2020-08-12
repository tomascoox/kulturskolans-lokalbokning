import React from 'react';

import MySchedule from '../../components/my-schedule/my-schedule.component';

import './my-schedule-page.styles.scss';

const MySchedulePage = (props) => {
  return (
    <div className="my-schedule-page">
      <MySchedule />
    </div>
  );
};

export default MySchedulePage;
