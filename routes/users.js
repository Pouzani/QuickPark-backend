const express = require('express');
const router = express.Router();

const { getUsers,getUser,addUser} = require('../controllers/users');

router.get("/", getUsers).get("/:userId",getUser).post("/",addUser);

module.exports = router;