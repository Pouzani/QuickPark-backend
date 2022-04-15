const express = require('express');
const router = express.Router();

const { getHello } = require('../controllers/users');

router.get("/hello", getHello);

module.exports = router;