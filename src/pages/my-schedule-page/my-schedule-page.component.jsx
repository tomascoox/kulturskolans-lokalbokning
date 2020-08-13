import React from 'react';

import Schedule from '../../components/schedule/schedule.component';

import './my-schedule-page.styles.scss';

const MySchedulePage = (props) => {
  return (
    <div className="my-schedule-page">
      <Schedule type="my-schedule" />
    </div>
  );
};

export default MySchedulePage;
