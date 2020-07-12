import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignupPage from './pages/sign-in-and-signup/sign-in-and-signup.component';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signin" component={SignInAndSignupPage} />
    </Switch>
  );
}
