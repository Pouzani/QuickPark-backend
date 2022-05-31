const express = require('express');
const router = express.Router();

const {addParkingSpot, getParkingSpots} = require('../controllers/parkingSpots');

router.get("/:parkingId", getParkingSpots).post("/:parkingId",addParkingSpot);

module.exports = router;