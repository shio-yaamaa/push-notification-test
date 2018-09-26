// TODO: Import only what you need
// https://www.npmjs.com/package/firebase#include-only-the-features-you-need

import * as firebase from 'firebase';

export const setupFirebase = () => {
  const config = {
    apiKey: "AIzaSyAkaiw024vfZ1X14Pn-9S0ZIkyUyFl32NY",
    authDomain: "push-notification-test-c6921.firebaseapp.com",
    databaseURL: "https://push-notification-test-c6921.firebaseio.com",
    projectId: "push-notification-test-c6921",
    storageBucket: "push-notification-test-c6921.appspot.com",
    messagingSenderId: "207186942344"
  };
  firebase.initializeApp(config);
  
  // Firestore
  const firestore = firebase.firestore();
  // Needed to make firestore up-to-date?
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
};