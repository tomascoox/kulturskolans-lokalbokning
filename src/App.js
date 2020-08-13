import React, { Component, Fragment } from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignupPage from './pages/sign-in-and-signup/sign-in-and-signup.component';
import MySchedulePage from './pages/my-schedule-page/my-schedule-page.component';
import Help from './pages/help/help.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { selectCurrentRoom } from './redux/user/user.selectors';
import { setCurrentUser, setCurrentRoom } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setToggleNewBooking } from './redux/bookingforms/bookingforms.actions';
import { selectToggleNewBooking } from './redux/bookingforms/bookingforms.selectors';

import { fetchBookingsStartAsync } from './redux/schedule/schedule.actions';
import { fetchRoomsStartAsync } from './redux/schedule/schedule.actions';

import Footer from './components/footer/footer.component';

import {
  selectIsBookingsLoaded,
  selectIsRoomsLoaded,
} from './redux/schedule/schedule.selectors';

import { createStructuredSelector } from 'reselect';

import WithSpinner from './components/with-spinner/with-spinner.component';

import BookingForm from './components/booking-form/booking-form.component';

import { Menu } from 'semantic-ui-react';

const HomePageWithSpinner = WithSpinner(HomePage);
const MySchedulePageWithSpinner = WithSpinner(MySchedulePage);

class App extends Component {
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
    const {
      activeItem,
      currentUser,
      currentRoom,
      isBookingsLoaded,
    } = this.props;

    const localToggleNewBookingForm = () => {
      !this.props.toggleNewBooking
        ? this.props.setToggleNewBooking({
            toggleNewBooking: true,
          })
        : this.props.setToggleNewBooking({
            toggleNewBooking: false,
          });
    };

    return (
      <Fragment>
        <Menu inverted compact fluid fixed="top" size="tiny">
          <Menu.Item
            as="a"
            href="/"
            name="schema"
            active={activeItem === 'schema'}
            onClick={this.handleItemClick}
          >
            SCHEMAN
          </Menu.Item>
          {this.props.currentUser && this.props.location.pathname === '/' ? (
            <Menu.Item
              name="newbooking"
              active={activeItem === 'newbooking'}
              onClick={() => localToggleNewBookingForm()}
            >
              BOKA
            </Menu.Item>
          ) : null}
          {(this.props.currentUser &&
            this.props.location.pathname === '/my-schedule') ||
          (this.props.currentUser && this.props.location.pathname === '/') ||
          (this.props.currentUser &&
            this.props.location.pathname === '/help') ? (
            <Menu.Item
              as="a"
              href="/my-schedule"
              name="my-schedule"
              active={activeItem === 'my-schedule'}
            >
              MITT SCHEMA
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
          <Route
            exact
            path="/my-schedule"
            render={(props) => (
              <MySchedulePageWithSpinner
                isLoading={!isBookingsLoaded}
                {...props}
              />
            )}
          />
        </Switch>
        <Footer />
        {this.props.toggleNewBooking ? (
          <BookingForm currentUser={currentUser} currentRoom={currentRoom} />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom,
  isBookingsLoaded: selectIsBookingsLoaded,
  isRoomsLoaded: selectIsRoomsLoaded,
  toggleNewBooking: selectToggleNewBooking,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
  fetchBookingsStartAsync: () => dispatch(fetchBookingsStartAsync()),
  fetchRoomsStartAsync: () => dispatch(fetchRoomsStartAsync()),
  setToggleNewBooking: (bookingforms) =>
    dispatch(setToggleNewBooking(bookingforms)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
