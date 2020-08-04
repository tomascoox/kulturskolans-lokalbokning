import React from 'react';
import ReactDOM from 'react-dom';

import './modal.scss';

const UpdateModal = ({ children }) =>
  ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
export default UpdateModal;
