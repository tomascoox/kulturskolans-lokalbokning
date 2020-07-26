import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignupPage from './pages/sign-in-and-signup/sign-in-and-signup.component';
import {
  auth,
  firestore,
  createUserProfileDocument,
  convertRoomdataSnapshotToMap,
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { updateRoomdata } from './redux/schedule/schedule.actions';

import { createStructuredSelector } from 'reselect';

import WithSpinner from './components/with-spinner/with-spinner.component';

import Sidebar from './components/sidebar/sidebar.component';

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';

const HomePageWithSpinner = WithSpinner(HomePage);

class App extends Component {
  state = {
    loading: true,
  };

  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

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

    const { updateRoomdata } = this.props;
    const roomRef = firestore.collection('roomdata');

    this.unsubscribeFromSnapshot = roomRef.onSnapshot(async (snapshot) => {
      const roomdataMap = convertRoomdataSnapshotToMap(snapshot);
      updateRoomdata(roomdataMap);
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnapshot();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { loading } = this.state;
    const { activeItem } = this.state;
    const { currentUser } = this.props;
    console.log(currentUser);

    return (
      <Fragment>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item
              as="a"
              href="/"
              name="schema"
              active={activeItem === 'features'}
              onClick={this.handleItemClick}
            >
              SCHEMA
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
          </Container>
        </Menu>

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <HomePageWithSpinner isLoading={loading} {...props} />
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
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  updateRoomdata: (roomdataMap) => dispatch(updateRoomdata(roomdataMap)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
