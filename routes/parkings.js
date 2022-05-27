const express = require('express');
const router = express.Router();

const { getParking,getParkings,addParking,updateParking,deleteParking } = require('../controllers/parkings');

router.get("/", getParkings).get("/:parkingId",getParking).post("/",addParking).put("/:parkingId",updateParking).delete("/:parkingId", deleteParking);

module.exports = router;