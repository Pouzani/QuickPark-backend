const express = require('express');
const router = express.Router();

const {addCar} = require('../controllers/cars');

router.post("/:userId",addCar);

module.exports = router;