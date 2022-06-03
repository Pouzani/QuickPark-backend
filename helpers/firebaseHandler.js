const firebase = require('firebase/app');
const { getAuth,updatePassword} = require("firebase/auth");
const { getFirestore, collection, addDoc, query,getDoc,doc,getDocs,updateDoc,deleteDoc,where,setDoc} = require("firebase/firestore/lite");
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARu_zNn42dIRB3uEbrhgPhTjAJnd5Zpr4",
  authDomain: "quickpark-db.firebaseapp.com",
  projectId: "quickpark-db",
  storageBucket: "quickpark-db.appspot.com",
  messagingSenderId: "330023300570",
  appId: "1:330023300570:web:38f67eaf1bf33f4c86a4e3",
  measurementId: "G-H5X0XF3Y8X"
  };
const app = firebase.initializeApp(firebaseConfig); //initialize firebase app 
const auth = getAuth();
const db = getFirestore(app);
module.exports = { firebase, auth,db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc,updatePassword,where,setDoc};