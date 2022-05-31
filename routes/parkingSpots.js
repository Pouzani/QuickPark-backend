const express = require('express');
const router = express.Router();

const {addParkingSpot} = require('../controllers/parkingSpots');

router.post("/:parkingId",addParkingSpot);

module.exports = router;