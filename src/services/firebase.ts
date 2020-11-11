import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyBFBBlouxsvNYfiBNkrlV6nlS-uL3LrVvs",
  authDomain: "mylifeinweeks.firebaseapp.com",
  databaseURL: "https://mylifeinweeks.firebaseio.com",
  projectId: "mylifeinweeks",
  storageBucket: "mylifeinweeks.appspot.com",
  messagingSenderId: "97214016479",
  appId: "1:97214016479:web:9526ff85ba7063f162726a",
  measurementId: "G-4CVNY9N5NB"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.firestore();

export const signup = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signin = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};
export default firebase;
