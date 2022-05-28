const express = require('express');
const router = express.Router();

const { getUsers,getUser,addUser,updateUser,deleteUser} = require('../controllers/users');

router.get("/", getUsers).get("/:userId",getUser).post("/",addUser).put("/:userId",updateUser).delete("/:userId", deleteUser);

module.exports = router;