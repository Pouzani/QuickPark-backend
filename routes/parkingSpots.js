const express = require('express');
const router = express.Router();

const {addParkingSpot, getParkingSpots, getParkingSpot,updateParkingSpot,deleteParkingSpot} = require('../controllers/parkingSpots');

router.get("/:parkingId", getParkingSpots).get("/:parkingId/:parkingSpotId",getParkingSpot).post("/:parkingId",addParkingSpot).put("/:parkingId/:parkingSpotId",updateParkingSpot).delete("/:parkingId/:parkingSpotId", deleteParkingSpot);

module.exports = router;