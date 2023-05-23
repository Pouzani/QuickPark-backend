const firebase = require("firebase/app");
const { getAuth, updatePassword } = require("firebase/auth");
const {
  getFirestore,
  collection,
  addDoc,
  query,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  where,
  setDoc,
} = require("firebase/firestore/lite");
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZIrThanqllbBcMh8BHdq0FeRKzBH4gBE",
  authDomain: "smartpark-backend.firebaseapp.com",
  projectId: "smartpark-backend",
  storageBucket: "smartpark-backend.appspot.com",
  messagingSenderId: "132297735925",
  appId: "1:132297735925:web:a2ce5aa0897ecdb35ccfbc",
  measurementId: "G-ZGTLPNBZPE",
};
const app = firebase.initializeApp(firebaseConfig); //initialize firebase app
const auth = getAuth();
const db = getFirestore(app);
module.exports = {
  firebase,
  auth,
  db,
  collection,
  addDoc,
  query,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  updatePassword,
  where,
  setDoc,
};
