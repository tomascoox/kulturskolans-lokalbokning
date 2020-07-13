import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className="header">
    <div className="options">
      <Link className="option" to="/">
        BERGEFORSEN
      </Link>
      <Link className="option" to="/">
        BÖLE
      </Link>
      <Link className="option" to="/">
        ARENA
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          LOGOUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          LOGIN
        </Link>
      )}
    </div>
  </div>
);

export default Header;
