import React from 'react';
import Schedule from '../../components/schedule/schedule.component';
import './homepage.styles.scss';

const HomePage = (props) => {
  return (
    <div className="homepage">
      <Schedule type="bookings" />
    </div>
  );
};

export default HomePage;
