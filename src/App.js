import React, { Component, Fragment } from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignupPage from './pages/sign-in-and-signup/sign-in-and-signup.component';
import Help from './pages/help/help.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser, setCurrentRoom } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCurrentRoom } from './redux/user/user.selectors';

import { fetchBookingsStartAsync } from './redux/schedule/schedule.actions';
import { fetchRoomsStartAsync } from './redux/schedule/schedule.actions';

import {
  selectIsBookingsLoaded,
  selectIsRoomsLoaded,
} from './redux/schedule/schedule.selectors';

import { createStructuredSelector } from 'reselect';

import WithSpinner from './components/with-spinner/with-spinner.component';

import BookingForm from './components/booking-form/booking-form.component';

import { Menu } from 'semantic-ui-react';

const HomePageWithSpinner = WithSpinner(HomePage);

class App extends Component {
  state = {
    showNewBookingHandler: false,
  };

  handleBookingHandler = () => () =>
    this.setState((prevState) => ({
      showNewBookingHandler: !prevState.showNewBookingHandler,
    }));

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    const { fetchBookingsStartAsync } = this.props;
    fetchBookingsStartAsync();

    const { fetchRoomsStartAsync } = this.props;
    fetchRoomsStartAsync();

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { showNewBookingHandler } = this.state;

    const {
      activeItem,
      currentUser,
      currentRoom,
      isBookingsLoaded,
    } = this.props;

    console.log(this.props.location.pathname);

    return (
      <Fragment>
        <Menu inverted compact fluid>
          <Menu.Item
            as="a"
            href="/"
            name="schema"
            active={activeItem === 'schema'}
            onClick={this.handleItemClick}
          >
            VISA SCHEMAN
          </Menu.Item>
          {this.props.currentUser && this.props.location.pathname === '/' ? (
            <Menu.Item
              name="newbooking"
              active={activeItem === 'newbooking'}
              onClick={this.handleBookingHandler()}
            >
              NY BOKNING
            </Menu.Item>
          ) : null}
          <Menu.Item
            as="a"
            href="/help"
            name="help"
            active={activeItem === 'help'}
            onClick={this.handleItemClick}
          >
            HJÄLP
          </Menu.Item>

          {!this.props.currentUser ? (
            <Menu.Item
              as="a"
              href="/signin"
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
              LOGIN
            </Menu.Item>
          ) : (
            <Menu.Item onClick={() => auth.signOut()}>LOGOUT</Menu.Item>
          )}
        </Menu>
        {showNewBookingHandler ? (
          <BookingForm
            currentUser={currentUser}
            currentRoom={currentRoom}
            onToggleForm={this.handleBookingHandler}
          />
        ) : null}
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <HomePageWithSpinner isLoading={!isBookingsLoaded} {...props} />
            )}
          />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignupPage />
              )
            }
          />
          <Route exact path="/help" component={Help} />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom,
  isBookingsLoaded: selectIsBookingsLoaded,
  isRoomsLoaded: selectIsRoomsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
  fetchBookingsStartAsync: () => dispatch(fetchBookingsStartAsync()),
  fetchRoomsStartAsync: () => dispatch(fetchRoomsStartAsync()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
