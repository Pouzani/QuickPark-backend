const firebase = require('firebase/app');
const { getAuth} = require("firebase/auth");
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpxANLyS-OWmv3bs1zC2dJhhyMTaqHZ40",
  authDomain: "quickpark-4b23e.firebaseapp.com",
  projectId: "quickpark-4b23e",
  storageBucket: "quickpark-4b23e.appspot.com",
  messagingSenderId: "164469478891",
  appId: "1:164469478891:web:d579e75d5618fe2c4cf5ae",
  measurementId: "G-N39HN37EF1"
  };
firebase.initializeApp(firebaseConfig); //initialize firebase app 
const auth = getAuth();
module.exports = { firebase, auth};