const express = require('express');
const router = express.Router();

const {addParkingSpot, getParkingSpots, getParkingSpot} = require('../controllers/parkingSpots');

router.get("/:parkingId", getParkingSpots).get("/:parkingId/:parkingSpotId",getParkingSpot).post("/:parkingId",addParkingSpot);

module.exports = router;