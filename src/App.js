import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignupPage from './pages/sign-in-and-signup/sign-in-and-signup.component';

import {
  auth,
  createUserProfileDocument,
  createNewBooking,
} from './firebase/firebase.utils';
import { setCurrentUser, setCurrentRoom } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCurrentRoom } from './redux/user/user.selectors';

import { fetchRoomdataStartAsync } from './redux/schedule/schedule.actions';
import { fetchBookingsStartAsync } from './redux/schedule/schedule.actions';
import { fetchRoomsStartAsync } from './redux/schedule/schedule.actions';
import { selectRooms } from './redux/schedule/schedule.selectors';

import {
  selectIsRoomdataFetching,
  selectIsRoomdataLoaded,
  selectIsBookingsFetching,
  selectIsBookingsLoaded,
  selectIsRoomsFetching,
  selectIsRoomsLoaded,
} from './redux/schedule/schedule.selectors';

import { createStructuredSelector } from 'reselect';

import WithSpinner from './components/with-spinner/with-spinner.component';

import BookingForm from './components/booking-form/booking-form.component';

import {
  Button,
  Checkbox,
  Form,
  Input,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

const HomePageWithSpinner = WithSpinner(HomePage);

class App extends Component {
  state = {
    animation: 'push',
    direction: 'top',
    dimmed: false,
    visible: false,
  };

  handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }));

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked });

  handleDirectionChange = (direction) => () =>
    this.setState({ direction, visible: false });

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    const { setCurrentRoom } = this.props;

    const { fetchRoomdataStartAsync } = this.props;
    fetchRoomdataStartAsync();

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
    this.unsubscribeFromSnapshot();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { animation, dimmed, direction, visible } = this.state;
    const vertical = direction === 'bottom' || direction === 'top';

    const {
      activeItem,
      currentUser,
      currentRoom,
      isRoomdataFetching,
      isRoomdataLoaded,
      isBookingsLoaded,
      isRoomsLoaded,
    } = this.props;

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
            SCHEMA
          </Menu.Item>
          {this.props.currentUser ? (
            <Menu.Item
              name="newbooking"
              active={activeItem === 'newbooking'}
              onClick={this.handleAnimationChange('push')}
            >
              NY BOKNING
            </Menu.Item>
          ) : null}
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

        <Sidebar.Pushable>
          <BookingForm
            animation="overlay"
            direction={'top'}
            visible={visible}
            currentUser={currentUser}
            currentRoom={currentRoom}
            onToggleForm={this.handleAnimationChange}
          />

          <Sidebar.Pusher dimmed={false}>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <HomePageWithSpinner
                    isLoading={!isRoomdataLoaded}
                    {...props}
                  />
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
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom,
  isRoomdataFetching: selectIsRoomdataFetching,
  isRoomdataLoaded: selectIsRoomdataLoaded,
  isBookingsLoaded: selectIsBookingsLoaded,
  isRoomsLoaded: selectIsRoomsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
  fetchRoomdataStartAsync: () => dispatch(fetchRoomdataStartAsync()),
  fetchBookingsStartAsync: () => dispatch(fetchBookingsStartAsync()),
  fetchRoomsStartAsync: () => dispatch(fetchRoomsStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
