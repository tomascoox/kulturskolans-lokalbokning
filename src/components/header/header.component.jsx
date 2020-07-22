import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className="header">
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
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
