import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import './sign-in-and-signup.styles.scss';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAndSignupPage = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndSignupPage;
