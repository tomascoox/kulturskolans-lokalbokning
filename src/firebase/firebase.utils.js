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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const createNewBooking = async (
  weekDay,
  startTime,
  endTime,
  currentUser,
  currentRoom
) => {
  let { id, displayName, team, color } = currentUser;
  let roomID = currentRoom.id;
  let roomTitle = currentRoom.roomTitle;

  if (currentUser) {
    try {
      const bookingRef = await firestore.collection('bookings');

      await bookingRef.add({
        createdAt: new Date(),
        userID: id,
        userDisplayName: displayName,
        team: team,
        color: color,
        startTime: startTime,
        endTime: endTime,
        roomID: roomID,
        roomTitle: roomTitle,
        weekDay: weekDay,
      });
    } catch (error) {}
  }
};

export const updateBooking = async (bookingID, startTime, endTime, weekDay) => {
  await firestore
    .collection('bookings')
    .doc(bookingID)
    .update({
      weekDay: weekDay,
      startTime: startTime,
      endTime: endTime,
    })
    .then(function () {
      console.log('Document successfully updated!');
    })
    .catch(function (error) {
      console.error('Error updating document: ', error);
    });
};

export const deleteBooking = async (bookingID) => {
  await firestore
    .collection('bookings')
    .doc(bookingID)
    .delete()
    .then(function () {
      console.log('Document successfully deleted!');
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// ROOMDATA
export const convertRoomdataSnapshotToMap = (roomdata) => {
  const transformedRoomdata = roomdata.docs.map((doc) => {
    const { title, bookings } = doc.data();

    return {
      title,
      bookings,
    };
  });
  return transformedRoomdata.reduce((accumulator, collection) => {
    accumulator[collection.title] = collection;
    return accumulator;
  }, {});
};

// BOOKINGS
export const convertBookingsSnapshotToMap = (bookings) => {
  const transformedBookings = bookings.docs.map((doc) => {
    const id = doc.id;
    const {
      color,
      createdAt,
      endTime,
      roomID,
      roomTitle,
      startTime,
      team,
      userDisplayName,
      userID,
      weekDay,
    } = doc.data();

    return {
      id,
      color,
      createdAt,
      endTime,
      roomID,
      roomTitle,
      startTime,
      team,
      userDisplayName,
      userID,
      weekDay,
    };
  });
  return transformedBookings.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection;
    return accumulator;
  }, {});
};

// ROOMS
export const convertRoomsSnapshotToMap = (rooms) => {
  const transformedRooms = rooms.docs.map((doc) => {
    const id = doc.id;
    const { roomTitle } = doc.data();

    return {
      id,
      roomTitle,
    };
  });
  return transformedRooms.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
