const express = require('express');
const router = express.Router();

const {addCar, getCars, getCar, updateCar, deleteCar, accessCarControl} = require('../controllers/cars');

router.post("/:userId",addCar).get("/accesscarcontrol",accessCarControl).get("/userid/:userId", getCars).get("/:userId/:carId",getCar).put("/:userId/:carId",updateCar).delete("/:userId/:carId", deleteCar);

module.exports = router;