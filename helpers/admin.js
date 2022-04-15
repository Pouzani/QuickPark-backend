const {initializeApp,cert} = require("firebase-admin/app");
const {getFirestore} = require ("firebase-admin/firestore");



const serviceAccount = require("../quickpark-key-firebase.json");

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
module.exports = { app, db };