import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage/dist/index.esm'

const firebaseConfig = {
  apiKey: "AIzaSyAI03INOUCdXDKd5JNwfrIKRuk_M_mLoNw",
  authDomain: "gestiondepropiedades-4dcce.firebaseapp.com",
  databaseURL: "https://gestiondepropiedades-4dcce.firebaseio.com",
  projectId: "gestiondepropiedades-4dcce",
  storageBucket: "gestiondepropiedades-4dcce.appspot.com",
  messagingSenderId: "158035033432",
  appId: "1:158035033432:web:4471059158d32dff93392d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage().ref();

export {
    db,
    storage,
    firebase,
}