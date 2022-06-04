const express = require('express');
const router = express.Router();

const { getUsers,getUser,addUser,updateUser,deleteUser, changePassword,setToFavoriteParkings,getFavoriteParkings} = require('../controllers/users');

router.get("/", getUsers).get("/:userId",getUser).post("/",addUser).put("/:userId",updateUser).delete("/:userId", deleteUser).put("/resetpassword",changePassword).post("/favoriteparkings",setToFavoriteParkings).get("/favoriteparkings/:userId",getFavoriteParkings);

module.exports = router;