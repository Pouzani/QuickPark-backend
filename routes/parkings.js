const express = require('express');
const router = express.Router();

const { getParking,getParkings,addParking,updateParking,deleteParking, getRecentlyVisitedParkings } = require('../controllers/parkings');

router.get("/", getParkings).get("/:parkingId",getParking).post("/",addParking).put("/:parkingId",updateParking).delete("/:parkingId", deleteParking).get("/userid/:userId",getRecentlyVisitedParkings);

module.exports = router;