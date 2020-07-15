import React from 'react';

import './booking-handler.styles.scss';

import { FaBuilding } from 'react-icons/fa';
import { BsCalendar } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

export default function BookingHandler(props) {
  return (
    <div>
      <div className="modal-container">
        <div className="backdrop" onClick={props.hideBookingHandler} />
        <div className="modal">
          <MdClose className="close" onClick={props.hideBookingHandler} />
          <h2>{props.title}</h2>
          <form className="form-group" onSubmit={props.handleSubmit}>
            <label>VÄLJ LOKAL</label>
            <div className="input-container">
              <input
                className="form-input"
                placeholder="Musiksalen-Bergeforsen"
                type="text"
              />
              <FaBuilding className="icon" />
            </div>
            <label>VÄLJ DAG</label>
            <div className="input-container">
              <input className="form-input" placeholder="Onsdag" type="text" />
              <BsCalendar className="icon" />
            </div>
            <label>VÄLJ TID</label>
            <div className="input-container">
              <input
                className="form-input"
                placeholder="10:00-11:30"
                type="text"
              />
              <FaRegClock className="icon" />
            </div>
            <div className="center">
              <button className="form-button" type="submit">
                BOKA
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
