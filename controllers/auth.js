const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const {
  auth,
  db,
  collection,
  addDoc,
  setDoc,
  getDoc,
  query,
  where,
  doc,
} = require("../helpers/firebaseHandler");
const { User } = require("../models/User");
const { CustomError } = require("../helpers/CustomError");
const { use } = require("../routes/parkings");

exports.register = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new CustomError("Missing data", "missing-data");
    }
    await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
    const newUser = new User(firstName, lastName, email.toLowerCase(), []);
    await setDoc(doc(db, "users", email.toLowerCase()), newUser.data);

    res
      .status(201)
      .json({ success: true, operation: "Register", data: newUser });
  } catch (error) {
    console.log(error);
    req.quickpark = { errorCode: error.code };
    next();
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError("Missing data", "missing-data");
    }
    await signInWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "users", email.toLowerCase());
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    res
      .status(200)
      .json({ success: true, operation: "Login", data: docSnap.data() });
  } catch (error) {
    req.quickpark = { errorCode: error.code };
    next();
  }
};
