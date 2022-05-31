const express = require('express');
const router = express.Router();

const {addCar, getCars, getCar} = require('../controllers/cars');

router.post("/:userId",addCar).get("/:userId", getCars).get("/:userId/:carId",getCar);

module.exports = router;