import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDmRLd7BIVWPR6rhXVL_wnuFp6rWY62iWI',
  authDomain: 'kulturskolans-lokalbokning.firebaseapp.com',
  databaseURL: 'https://kulturskolans-lokalbokning.firebaseio.com',
  projectId: 'kulturskolans-lokalbokning',
  storageBucket: 'kulturskolans-lokalbokning.appspot.com',
  messagingSenderId: '525113140233',
  appId: '1:525113140233:web:73353a7b1aaee31bcc84d8',
  measurementId: 'G-C7MSBZR8MW',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
