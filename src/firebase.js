import firebase from "firebase";
require('firebase/firestore')
require('firebase/auth')
const firebaseConfig = {
  apiKey: "AIzaSyD2QSTJhGR8mbk1IQPkBZ6k0AmnQZejYbI",
  authDomain: "clone-42a44.firebaseapp.com",
  projectId: "clone-42a44",
  storageBucket: "clone-42a44.appspot.com",
  messagingSenderId: "51166510648",
  appId: "1:51166510648:web:2a133d961a47bdb3aab0cd",
  measurementId: "G-JR2DTQN326",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp
  .firestore()
const auth = firebaseApp.auth();
export { db, auth };
